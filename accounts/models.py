from django.db import models
from django.contrib.auth.models import User


class OTP(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return self.user.username