<div dir="rtl" style="text-align: right; font-family: 'Vazir', sans-serif;">

# 🌐 سیستم تشخیص پسماند با بهره‌گیری از هوش مصنوعی

[![انگلیسی](https://img.shields.io/badge/Language-English-blue)](README.md) [![فارسی](https://img.shields.io/badge/Language-Persian-green)](README.fa.md)

به پروژه جنگو من خوش آمدید! این برنامه برای تشخیص زباله با استفاده از فناوری هوش مصنوعی با رابط کاربری آسان طراحی شده است.

## ✨ ویژگی‌ها

- تشخیص مبتنی بر هوش مصنوعی
- رابط کاربری ساده
- راه حل یکپارچه
- انعطاف پذیری
- قابل دسترسی از دستگاه‌های مختلف

## 🛠️ نصب
نکته: پروژه فقط روی Linux و MacOS باز می‌شود.
1. **نصب پایتون و کلون کردن پروژه:**
    ```bash
    sudo apt install python3
    git clone https://github.com/mehdirexon/waste-detection.git
    ```

2. **ورود به دایرکتوری پروژه:**
    ```bash
    cd waste-detection
    ```

3. **نصب بسته‌های مورد نیاز:**
    ```bash
    pip install -r requirements.txt
    ```

## 📚 استفاده

بعد از نصب جنگو و اجزای آن، نیاز به به‌روزرسانی برخی تنظیمات دارید.

1. **به‌روزرسانی `ALLOWED_HOSTS`:**
    - آدرس IP سرور خود را به لیست `ALLOWED_HOSTS` در `settings.py` اضافه کنید.

2. **افزودن اپ‌های مورد نیاز به `INSTALLED_APPS`:**
    - اپ‌های `daphne` و `main` را به لیست `INSTALLED_APPS` در `settings.py` اضافه کنید.

3. **پیکربندی Channels و Redis:**
    - این خطوط را به `settings.py` اضافه کنید تا channels و Redis پیکربندی شوند:
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

4. **به‌روزرسانی TEMPLATES:**
    - `'DIRS': [BASE_DIR / 'templates']` را به لیست `TEMPLATES` در `settings.py` اضافه کنید:
    ```python
    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [BASE_DIR / 'templates'],
            ...
        },
    ]
    ```

5. **تنظیم WSGI و ASGI applications:**
    - مطمئن شوید این خطوط در `settings.py` وجود دارند:
    ```python
    WSGI_APPLICATION = 'your_base_app.wsgi.application'
    ASGI_APPLICATION = 'your_base_app.asgi.application'
    ```

6. **پیکربندی فایل‌های استاتیک:**
    - این خطوط را به `settings.py` اضافه کنید:
    ```python
    STATIC_URL = '/static/'

    STATICFILES_DIRS = [
        os.path.join(BASE_DIR, 'static'),
    ]
    ```

7. **ایجاد و پیکربندی `asgi.py`:**
    - در اپ پایه خود، `asgi.py` را با کد زیر ایجاد یا به‌روزرسانی کنید:
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

8. **اجرای سرور:**
    - از این دستور برای اطمینان از عملکرد صحیح استفاده کنید:
    ```bash
    python manage.py runserver
    ```
    - باید خروجی مشابه زیر ببینید:
    ```
    System check identified no issues (0 silenced).
    June 16, 2024 - 15:09:58
    Django version 4.2.11, using settings 'your_base_app.settings'
    Starting ASGI/Daphne version 4.1.2 development server at http://192.168.1.101:8000/
    Quit the server with CONTROL-C.
    ```

9. **ایجاد superuser و دسترسی به رابط مدیریت:**
    - ایجاد یک superuser:
    ```bash
    python manage.py createsuperuser
    ```
    - سرور را اجرا کنید و به `http://192.168.1.101:8000/login` بروید و با اطلاعات خود وارد شوید.

## 📜 مجوز

این پروژه تحت [مجوز MIT](LICENSE) منتشر شده است.

## 📧 تماس

اگر سوال یا بازخوردی دارید، با من در [m.ghazanfari1384@gmail.com] در تماس باشید.

---

# 🌐 انتخاب زبان

[![انگلیسی](https://img.shields.io/badge/Language-English-blue)](README.md) [![فارسی](https://img.shields.io/badge/Language-Persian-green)](README.fa.md)
