from django.shortcuts import render
from rest_framework import generics, serializers
from .serializers import SignupSerializer, OTPSerialzier
from django.contrib.auth.models import User
from .models import OTP
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from faker import Faker
from django.core.exceptions import ValidationError

# generate otp after signup
class SignUpAPI(APIView):
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(detail="Email already exists..")
        return value
    
    
    def post(self, request):
        faker = Faker()
        serializer = SignupSerializer(data=request.data)
        # if serializer.is_valid():
        #     user = serializer.save()
        #     print(user.is_active, user.email)
        #     # generated_otp = faker.random_number(digits=6, fix_len=True)
        #     # OTP.objects.create(user=user, generated_otp=generated_otp)
        #     # send_mail(
        #     #     subject='for OTP Verification',
        #     #     message=f"Here is the OTP for otp verification {generated_otp}",
        #     #     from_email='ashumanager77@gmail.com',
        #     #     recipient_list=[request.data['email']]
        #     # )
        # else:
        #     print("Error in Data Syntax..")
            
    
    
class OTPAPI(generics.CreateAPIView):
    queryset = OTP.objects.all()
    serializer_class = OTPSerialzier