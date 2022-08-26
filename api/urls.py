"""VerifyScholar URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path 
from api import views
from .views import LoginView, UserView, LogoutView

urlpatterns = [
    path('', views.index),
    path('login/', LoginView.as_view()),
    path('user/', UserView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('register/', views.register),
    path('registerfetch/', views.register_fetch),
    path('formregister/', views.formregister),
    path('userdoclist/', views.userdoclist),
    path('callback/', views.getRefreshToken),
    path('getfiles/', views.getFiles),
    # path('verify/', views.verify),

    path('recaptcha/', views.recaptcha)
]
