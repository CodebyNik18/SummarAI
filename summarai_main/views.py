from django.shortcuts import render
from django.http import HttpResponse


def home(request):
    return render(request=request, template_name='home.html')

def learn_more(request):
    return render(request=request, template_name='learn_more.html')

def register(request):
    return render(request=request, template_name='register.html')

def about(request):
    return render(request=request, template_name='about.html')

def login(request):
    return render(request=request, template_name='login.html')