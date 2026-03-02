from django.shortcuts import render
from rest_framework import generics
from .serializers import SignupSerializer, OTPSerialzier
from django.contrib.auth.models import User
from .models import OTP

class SignUpAPI(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    
    
class OTPAPI(generics.CreateAPIView):
    queryset = OTP.objects.all()
    serializer_class = OTPSerialzier