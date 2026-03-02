from rest_framework import serializers
from django.contrib.auth.models import User
from .models import OTP



class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
        
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_active=False
        )
        return user
    
    

class OTPSerialzier(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    class Meta:
        model = OTP
        fields = ['user', 'otp']