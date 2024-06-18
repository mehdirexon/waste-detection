# Waste Detection using AI 🌐

[![English](https://img.shields.io/badge/Language-English-blue)](README.md) [![Persian](https://img.shields.io/badge/Language-Persian-green)](README.fa.md)

This project is created for **Khwarizmi Youth Awards** by Mehdi Ghazanfari.

In this project, the goal was to create an application capable of detecting waste on a conveyor belt. By following precise instructions to run the project, you will be able to use the code. Utilizing elements like Django for the web server and PyTorch for AI provides flexibility in development while keeping it user-friendly. This is not the final project code, but it has passed the MVP stage to ensure functionality. If the instructions are insufficient, feel free to contact me via the Contact section for assistance.

## Table of Contents

- [Features](#-features)
- [Installation](#️-installation)
- [Usage](#-usage)
- [TODO](#-todo)
- [License](#-license)
- [Contact](#-contact)
- [Thanks](#-thanks)
- [Language Options](#-choose-language)

## ✨ Features

- AI-based detection
- Easy-to-use interface
- Integrated solution
- Flexibility
- Multiplatform support
- Low latency for real-time processing

## 🛠️ Installation

1. **Install Python and clone the project:**
    ```bash
    sudo apt install python3
    git clone https://github.com/mehdirexon/waste-detection.git
    ```

2. **Navigate into the project directory:**
    ```bash
    cd waste-detection
    ```

3. **Install the required packages:**
    ```bash
    pip install -r requirements.txt
    ```

4. **Start a Django Project** (if not already created):
    ```bash
    django-admin startproject your_base_app
    cd your_base_app
    ```

5. **Set up Django settings:**

    - **Update `ALLOWED_HOSTS`**:
        ```python
        ALLOWED_HOSTS = ['your_server_ip', 'localhost']
        ```

    - **Add required apps to `INSTALLED_APPS`**:
        ```python
        INSTALLED_APPS = [
            ...
            'daphne',
            'main',
        ]
        ```

    - **Configure Channels and Redis**:
        ```python
        redis_host = os.environ.get('REDIS_HOST', 'localhost')

        CHANNEL_LAYERS = {
            "default": {
                "BACKEND": "channels_redis.core.RedisChannelLayer",
                "CONFIG": {
                    "hosts": [(redis_host, 6379)],
                },
            },
        }
        ```

    - **Update TEMPLATES**:
        ```python
        TEMPLATES = [
            {
                'BACKEND': 'django.template.backends.django.DjangoTemplates',
                'DIRS': [BASE_DIR / 'templates'],
                ...
            },
        ]
        ```

    - **Set WSGI and ASGI applications**:
        ```python
        WSGI_APPLICATION = 'your_base_app.wsgi.application'
        ASGI_APPLICATION = 'your_base_app.asgi.application'
        ```

    - **Configure Static Files**:
        ```python
        STATIC_URL = '/static/'

        STATICFILES_DIRS = [
            os.path.join(BASE_DIR, 'static'),
        ]
        ```

    - **Create and configure `asgi.py`**:
        ```python
        import os
        from django.core.asgi import get_asgi_application
        from channels.routing import ProtocolTypeRouter, URLRouter
        from channels.auth import AuthMiddlewareStack
        from main.routing import websocket_urlpatterns

        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_base_app.settings')

        application = ProtocolTypeRouter({
            "http": get_asgi_application(),
            "websocket": AuthMiddlewareStack(
                URLRouter(
                    websocket_urlpatterns
                )
            ),
        })
        ```

6. **Run the server:**
    - Use this command to ensure everything is working properly:
    ```bash
    python manage.py runserver
    ```
    - You should see output like this:
    ```
    System check identified no issues (0 silenced).
    June 16, 2024 - 15:09:58
    Django version 4.2.11, using settings 'your_base_app.settings'
    Starting ASGI/Daphne version 4.1.2 development server at http://192.168.1.101:8000/
    Quit the server with CONTROL-C.
    ```

7. **Create a superuser and access the admin interface:**
    - Create a superuser:
    ```bash
    python manage.py createsuperuser
    ```
    - Run the server and visit `http://192.168.1.101:8000/login`, then log in with your credentials.

## ✅ TODO

- [ ] Complete multidetection on the JS side
- [ ] Improve model accuracy for waste detection
- [ ] Add more tests units
- [ ] Enhance the user interface for better UX
- [ ] Optimize real-time processing for lower latency
- [ ] Create detailed documentation for developers
- [ ] Set up continuous integration and deployment


## 📜 License

This project is licensed under the [MIT License](LICENSE).

## 📧 Contact

If you have any questions or feedback, feel free to reach out to me at [m.ghazanfari1384@gmail.com].

## 🙏 Thanks

This project was created and continued in memory of my dear friend, Seyed Sajad Safaee. Although our time together was cut short, his spirit continues to inspire me in developing this and later projects. I dedicate this work to his memory.

## Contributers
<a href="https://github.com/mehdirexon/">
  <img src="https://contrib.rocks/image?repo=mehdirexon/Nobitex-Crypto-Price-Extractor" />
</a>


---

# 🌐 Choose Language

[![English](https://img.shields.io/badge/Language-English-blue)](README.md) [![Persian](https://img.shields.io/badge/Language-Persian-green)](README.fa.md)
