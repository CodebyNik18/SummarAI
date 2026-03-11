from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from .serializers import UserSummarySerializer
from .models import UserSummary
from .services import summary_generator
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class TextSummarizer(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = UserSummary.objects.all()
    serializer_class = UserSummarySerializer
    
    def perform_create(self, serializer):
        summary = summary_generator(serializer.validated_data["text"])
        serializer.save(
            user=self.request.user,
            summary=summary
        )