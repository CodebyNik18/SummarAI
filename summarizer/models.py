from django.db import models
from django.contrib.auth.models import User

class UserSummary(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    text = models.TextField(default="")
    summary = models.TextField(default="")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.user.username