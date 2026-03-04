from rest_framework import generics
from .serializers import SignupSerializer, OTPSerializer, LoginSerializer
from django.contrib.auth.models import User
from .models import OTP
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from faker import Faker
from django.http import Http404
from django.contrib.auth import authenticate, login

# generate otp after signup
class SignUpAPI(APIView):
    
    def post(self, request):
        faker = Faker()
        serializer = SignupSerializer(data=request.data)
        
        if serializer.is_valid():
            
            user = serializer.save()
            generated_otp = faker.random_number(digits=6, fix_len=True)
            
            OTP.objects.create(user=user, generated_otp=generated_otp)
            
            send_mail(
                subject='for OTP Verification',
                message=f"Here is the OTP for otp verification {generated_otp}",
                from_email='ashumanager77@gmail.com',
                recipient_list=[user.email]
            )
            
            message = {
                'message': 'User registered successfully, OTP is sent for verification'
            }
            
            return Response(message, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    
    
class OTPAPI(APIView):
    def post(self, request):
            
        serializer = OTPSerializer(data=request.data) # data send by user
        
        if serializer.is_valid():
            
            try:
                otp_object = OTP.objects.get(user__email=serializer.validated_data['email']) # otp stored in database
            except OTP.DoesNotExist:
                return Response(
                    {'message': "OTP not found.."},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            received_otp = serializer.validated_data['otp']
            generated_otp = otp_object.generated_otp
            
            if otp_object.user.is_active:
                return Response(
                    {'message': 'User already Verified'},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            else:
                
                if (received_otp == generated_otp):
                    otp_object.user.is_active = True
                    otp_object.user.save()
                    otp_object.delete()
                    return Response(
                        {'message': 'User is Verified..'},
                        status=status.HTTP_200_OK
                    )
                    
                else:
                    return Response(
                        {'message': 'Invalid OTP..'},
                        status=status.HTTP_409_CONFLICT
                    )
                
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class LoginAPI(APIView):
    pass