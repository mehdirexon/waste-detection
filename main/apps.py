from django.apps import AppConfig
# from .detection import ImageClassificationThread


class MainConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'main'

    def ready(self):
        pass