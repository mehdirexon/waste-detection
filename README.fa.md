<div dir="rtl" style="text-align: right; font-family: 'Vazir', sans-serif;">

# تشخیص زباله با استفاده از هوش مصنوعی 🌐

[![انگلیسی](https://img.shields.io/badge/Language-English-blue)](README.md) [![فارسی](https://img.shields.io/badge/Language-Persian-green)](README.fa.md)

این پروژه برای **جشنواره جوان خوارزمی** توسط مهدی غضنفری ایجاد شده است.

در این پروژه، هدف ایجاد یک برنامه‌ای است که قادر به تشخیص زباله بر روی نوار نقاله باشد. با دنبال کردن دستورالعمل‌های دقیق برای اجرای پروژه، می‌توانید از کد استفاده کنید. استفاده از عناصری مانند جنگو برای سرور وب و PyTorch برای هوش مصنوعی، انعطاف‌پذیری در توسعه را فراهم می‌کند و در عین حال کاربری آسان را حفظ می‌کند. این کد نهایی پروژه نیست، اما مرحله MVP را برای اطمینان از عملکرد گذرانده است. اگر دستورالعمل‌ها کافی نبودند، لطفاً از طریق بخش تماس با من تماس بگیرید.

## فهرست مطالب

- [ویژگی‌ها](#-ویژگی‌ها)
- [نصب](#️-نصب)
- [استفاده](#-استفاده)
- [وظایف](#-وظایف)
- [مجوز](#-مجوز)
- [تماس](#-تماس)
- [تشکر](#-تشکر)
- [انتخاب زبان](#-انتخاب-زبان)

## ✨ ویژگی‌ها

- تشخیص مبتنی بر هوش مصنوعی
- رابط کاربری آسان
- راه‌حل یکپارچه
- انعطاف‌پذیری
- پشتیبانی چند پلتفرمی
- تأخیر کم برای پردازش زمان واقعی

## 🛠️ نصب

1. **نصب پایتون و کلون کردن پروژه:**
    ```bash
    sudo apt install python3
    git clone https://github.com/mehdirexon/waste-detection.git
    ```

2. **وارد دایرکتوری پروژه شوید:**
    ```bash
    cd waste-detection
    ```

3. **نصب پکیج‌های مورد نیاز:**
    ```bash
    pip install -r requirements.txt
    ```

4. **ایجاد یک پروژه جنگو** (اگر هنوز ایجاد نشده است):
    ```bash
    django-admin startproject your_base_app
    cd your_base_app
    ```

5. **پیکربندی تنظیمات جنگو:**

    - **به‌روزرسانی `ALLOWED_HOSTS`:**
        ```python
        ALLOWED_HOSTS = ['your_server_ip', 'localhost']
        ```

    - **افزودن اپلیکیشن‌های مورد نیاز به `INSTALLED_APPS`:**
        ```python
        INSTALLED_APPS = [
            ...
            'daphne',
            'main',
        ]
        ```

    - **پیکربندی Channels و Redis:**
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

    - **به‌روزرسانی TEMPLATES:**
        ```python
        TEMPLATES = [
            {
                'BACKEND': 'django.template.backends.django.DjangoTemplates',
                'DIRS': [BASE_DIR / 'templates'],
                ...
            },
        ]
        ```

    - **تنظیم WSGI و ASGI applications:**
        ```python
        WSGI_APPLICATION = 'your_base_app.wsgi.application'
        ASGI_APPLICATION = 'your_base_app.asgi.application'
        ```

    - **پیکربندی فایل‌های استاتیک:**
        ```python
        STATIC_URL = '/static/'

        STATICFILES_DIRS = [
            os.path.join(BASE_DIR, 'static'),
        ]
        ```

    - **ایجاد و پیکربندی `asgi.py`:**
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

6. **اجرای سرور:**
    - از این دستور برای اطمینان از کارکرد صحیح استفاده کنید:
    ```bash
    python manage.py runserver
    ```
    - شما باید خروجی مشابه این ببینید:
    ```
    System check identified no issues (0 silenced).
    June 16, 2024 - 15:09:58
    Django version 4.2.11, using settings 'your_base_app.settings'
    Starting ASGI/Daphne version 4.1.2 development server at http://192.168.1.101:8000/
    Quit the server with CONTROL-C.
    ```

7. **ایجاد یک سوپر یوزر و دسترسی به رابط کاربری مدیریت:**
    - ایجاد یک سوپر یوزر:
    ```bash
    python manage.py createsuperuser
    ```
    - سرور را اجرا کنید و به `http://your_server_ipaddress:8000/login` بروید، سپس با اعتبار خود وارد شوید.

## ✅ وظایف

- [X] اضافه کردن چندتشخیص
- [ ] بهبود دقت مدل برای تشخیص زباله
- [ ] افزودن تست‌های جامع‌تر برای مدل هوش مصنوعی
- [ ] پیاده‌سازی احراز هویت و مجوزدهی کاربران
- [ ] بهبود رابط کاربری برای تجربه بهتر
- [ ] بهینه‌سازی پردازش زمان واقعی برای کاهش تأخیر
- [ ] افزودن پشتیبانی چند زبانه برای زبان‌های بیشتر
- [ ] ایجاد مستندات دقیق برای توسعه‌دهندگان
- [ ] تنظیم یکپارچه‌سازی و استقرار مداوم

## 📜 مجوز

این پروژه تحت [مجوز MIT](LICENSE) منتشر شده است.

## 📧 تماس

اگر سوال یا نظری دارید، لطفاً با من از طریق [m.ghazanfari1384@gmail.com] تماس بگیرید.

## 🙏 تشکر

این پروژه به یاد دوست عزیزم، سید سجاد صفایی ایجاد و ادامه یافت. هرچند زمان ما با هم کوتاه بود، اما روح او همچنان الهام‌بخش من در توسعه این و پروژه‌های بعدی است. این کار را به یاد او تقدیم می‌کنم.

## مشارکت‌کنندگان
<a href="https://github.com/mehdirexon/">
  <img src="https://contrib.rocks/image?repo=mehdirexon/waste-detection" />
</a>

---

# 🌐 انتخاب زبان

[![انگلیسی](https://img.shields.io/badge/Language-English-blue)](README.md) [![فارسی](https://img.shields.io/badge/Language-Persian-green)](README.fa.md)
