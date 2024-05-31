from django.urls import path
from . import views

urlpatterns = [
    path('', views.main, name='home'),
    path('logout/', views.logOut, name='logout')
]
