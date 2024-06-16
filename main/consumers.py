import numpy
from channels.generic.websocket import AsyncWebsocketConsumer
import json
import base64
from io import BytesIO
from PIL import Image
import torch
import cv2
import asyncio
from typing import Optional, Any, Dict
from .detection import RecyclingClassifier
import os , time


class MainConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        self.group_name: str = "main_group"
        self.cap: cv2.VideoCapture = cv2.VideoCapture(0)
        self.task_running: bool = True
        self.model_map: Dict[str, Optional[torch.nn.Module]] = {
            'glass': RecyclingClassifier.glass_model,
            'plastic': RecyclingClassifier.plastic_model,
            'paper': RecyclingClassifier.paper_model,
            'none': None
        }

    async def connect(self) -> None:
        await self.accept()
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name,
        )
        self.task_running = True
        _ = asyncio.create_task(self.task())

    async def disconnect(self, close_code: int) -> None:
        self.task_running = False
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name,
        )
        self.cap.release()

    async def task(self) -> None:
        while self.task_running:
            ret: bool
            frame: Optional[cv2.Mat]
            ret, frame = self.cap.read()
            if not ret:
                await asyncio.sleep(0.01)
                continue

            # Predicting (first detection layer)
            results = \
                RecyclingClassifier.yolo_model.track(frame, agnostic_nms=True, persist=True, conf=0.6,iou=0.8,
                                                     save_crop=True, verbose=False)[
                    0]
            detections = RecyclingClassifier.detect(results)

            if detections:
                labels: list[str] = [
                    f"{RecyclingClassifier.yolo_model.names[class_id]} {confidence:0.2f} {tracker_id}"
                    for xyxy, mask, confidence, class_id, tracker_id, data in detections
                ]

                output: cv2.Mat = RecyclingClassifier.box_annotator.annotate(scene=frame, detections=detections,
                                                                             labels=labels)

                # Converting to numpy array and crop predicted area
                img: Image.Image = Image.fromarray(output)
                cropped: Image.Image = img.crop(results.boxes.xyxy[0].numpy())

                buffered_output: BytesIO = BytesIO()
                img.save(buffered_output, format="JPEG")
                buffered_output_base64: str = base64.b64encode(buffered_output.getvalue()).decode('utf-8')

                # Image transformation and prediction
                img_transformed: torch.Tensor = RecyclingClassifier.transform(cropped)
                img_transformed = img_transformed.unsqueeze(0)

                # Extract the class name from the first label
                class_name: str = labels[0][:-4].split()[0]
                subclass_label: str = "none"

                # Dynamically select the model based on the class name(second detection layer)
                if class_name in self.model_map:
                    model: Optional[torch.nn.Module] = self.model_map[class_name]
                    if model is not None:
                        with torch.no_grad():
                            outputs: torch.Tensor = model(img_transformed)
                            test, predicted_tensor = torch.max(outputs, 1)
                            subclass: numpy.ndarray = predicted_tensor.numpy()[0]
                            probabilities: float = round(torch.softmax(outputs, dim=1).tolist()[0][
                                                             subclass], 2)
                            subclass_label = RecyclingClassifier.subclasses[class_name][
                                                 subclass] + " " + str(probabilities)
                        cropped.close()

                await self.channel_layer.group_send(
                    self.group_name,
                    {
                        'type': 'broadcast_outputs',
                        'ai_output': {
                            "class": labels[0],
                            "subclass": subclass_label,
                            "image": buffered_output_base64
                        }
                    }
                )

            else:
                img: Image.Image = Image.fromarray(frame)
                buffered_output: BytesIO = BytesIO()
                img.save(buffered_output, format="JPEG")
                buffered_output_base64: str = base64.b64encode(buffered_output.getvalue()).decode('utf-8')
                await self.channel_layer.group_send(
                    self.group_name,
                    {
                        'type': 'broadcast_outputs',
                        'ai_output': {
                            "class": "none",
                            "subclass": "none",
                            "image": buffered_output_base64
                        }
                    }
                )

            await asyncio.sleep(0.01)

    async def broadcast_outputs(self, event: Dict[str, Any]) -> None:
        ai_output: Dict[str, str] = event['ai_output']
        await self.send(text_data=json.dumps({"outputs": ai_output}))
