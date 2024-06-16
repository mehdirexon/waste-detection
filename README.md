# Waste Detection using AI 🌐

[![English](https://img.shields.io/badge/Language-English-blue)](README.md) [![Persian](https://img.shields.io/badge/Language-Persian-green)](README.fa.md)

This project is created for **Khwarizmi Youth Awards** by Mehdi Ghazanfari.

In this project, the goal was to create an application capable of detecting waste on a conveyor belt. By following precise instructions to run the project, you will be able to use the code. Utilizing elements like Django for the web server and PyTorch for AI provides flexibility in development while keeping it user-friendly. This is not the final project code, but it has passed the MVP stage to ensure functionality. If the instructions are insufficient, feel free to contact me via the Contact section for assistance.

## Table of Contents

- [Features](#-features)
- [Installation](#️-installation)
- [Usage](#-usage)
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

## 📚 Usage

After installing Django and its components, you need to update some settings.

1. **Update `ALLOWED_HOSTS`:**
    - Add your server IP address to the `ALLOWED_HOSTS` list in `settings.py`.

2. **Add required apps to `INSTALLED_APPS`:**
    - Add `daphne` and `main` apps to the `INSTALLED_APPS` list in `settings.py`.

3. **Configure Channels and Redis:**
    - Add these lines to `settings.py` to set up channels and Redis:
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

4. **Update TEMPLATES:**
    - Add `'DIRS': [BASE_DIR / 'templates']` to the `TEMPLATES` list in `settings.py`:
    ```python
    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [BASE_DIR / 'templates'],
            ...
        },
    ]
    ```

5. **Set WSGI and ASGI applications:**
    - Ensure these lines are in `settings.py`:
    ```python
    WSGI_APPLICATION = 'your_base_app.wsgi.application'
    ASGI_APPLICATION = 'your_base_app.asgi.application'
    ```

6. **Configure Static Files:**
    - Add these lines to `settings.py`:
    ```python
    STATIC_URL = '/static/'

    STATICFILES_DIRS = [
        os.path.join(BASE_DIR, 'static'),
    ]
    ```

7. **Create and configure `asgi.py`:**
    - In your base app, create or update `asgi.py` with the following code:
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

8. **Run the server:**
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

9. **Create a superuser and access the admin interface:**
    - Create a superuser:
    ```bash
    python manage.py createsuperuser
    ```
    - Run the server and visit `http://192.168.1.101:8000/login`, then log in with your credentials.

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

<a href="https://github.com/amirmasoudzamani/">
  <img src="https://contrib.rocks/image?repo=amirmasoudzamani/HTML-Tutorial"/>
</a>

<a href="https://github.com/sajadsafaei">
  <img src="https://contrib.rocks/image?repo=sajadsafaei/140108232"/>
</a>

---

# 🌐 Choose Language

[![English](https://img.shields.io/badge/Language-English-blue)](README.md) [![Persian](https://img.shields.io/badge/Language-Persian-green)](README.fa.md)
