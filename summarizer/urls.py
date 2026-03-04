from django.urls import path
from . import views

urlpatterns = [
    path('summarizer-text/', views.TextSummarizer.as_view()),
]