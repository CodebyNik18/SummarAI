"""
URL configuration for summarai_main project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
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
from django.urls import path, include
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Main Pages
    path('', views.home, name='home'),
    path('login/', views.login, name='login'),
    path('learn-more/', views.learn_more, name='learn_more'),
    path('register/', views.register, name='register'),
    path('about/', views.about, name='about'),
    
    # API Pages
    path('api/v3/accounts/', include('accounts.urls')),
    path('api/v3/summarizer/', include('summarizer.urls')),
    path('api-auth/', include('rest_framework.urls'))
]