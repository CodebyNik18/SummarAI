from django.urls import path
from . import views


urlpatterns = [
    path('register_api/', views.SignUpAPI.as_view()),
    path('otp_api/', views.OTPAPI.as_view())
]