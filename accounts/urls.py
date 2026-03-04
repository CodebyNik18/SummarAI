from django.urls import path
from . import views


urlpatterns = [
    path('register_api/', views.SignUpAPI.as_view()),
    path('verify_otp_api/', views.OTPAPI.as_view()),
    path('login_api/', views.LoginAPI.as_view())
]