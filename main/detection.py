from typing import List, Tuple, Dict, Any
import supervision as sv
import torch
import torchvision.transforms as transforms
from ultralytics import YOLO
import os

project_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')


class RecyclingClassifier:
    transform: transforms.Compose = transforms.Compose([
        transforms.Resize(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

    subclasses: Dict[str, Dict[int, str]] = {
        "plastic": {0: "HDPE", 1: "PETE"},
        "paper": {0: "colored", 1: "white"},
        "glass": {0: "brown", 1: "green", 2: "transparent"}
    }

    box_annotator: sv.BoxAnnotator = sv.BoxAnnotator(
        thickness=1,
        text_thickness=1,
        text_scale=1
    )

    yolo_model: YOLO = YOLO(os.path.join(project_dir, 'models', 'machine vision', 'best1.pt'),
                            task='detect')

    plastic_model: torch.nn.Module = torch.load(
        os.path.join(project_dir, 'models', 'image classification', 'plastic_model.pth'))
    plastic_model.eval()

    glass_model: torch.nn.Module = torch.load(
        os.path.join(project_dir, 'models', 'image classification', 'glass_model.pth'))
    glass_model.eval()

    paper_model: torch.nn.Module = torch.load(
        os.path.join(project_dir, 'models', 'image classification', 'paper_model.pth'))
    paper_model.eval()

    @classmethod
    def detect(cls, results: Any) -> sv.Detections:
        return sv.Detections.from_ultralytics(results)
