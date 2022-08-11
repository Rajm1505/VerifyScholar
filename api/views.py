import requests
from django.shortcuts import render 
from .models import StudentDetails
from .models import FormDetails
from .Serializers import StudentDetailsSerializer
from .Serializers import FormDetailsSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view

# Create your views here.

def index(request):
    context = {}
    return render(request, 'index.html', context)

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        # Adding Sid
        try:
            no = StudentDetails.objects.latest('date_of_registration').sid
        except  StudentDetails.DoesNotExist:

        print(no)
        if no == '':
            data['sid'] = 'S1'
        else:
            temp = no[1:]
            number = int(temp)
            number+=1
            sid = 'S' + str(number)
            data['sid'] = sid


        print(data)
        
        
        serializer = StudentDetailsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def register_fetch(request,pk):
        try:   
            studentdetails = StudentDetails.objects.get(pk=pk)
        except(StudentDetails.DoesNotExist):
            return JsonResponse(studentdetails.errors, status=404)
    
        if request.method == 'GET':   
            serializer = StudentDetailsSerializer(studentdetails)
            return JsonResponse(serializer.data)

@csrf_exempt
def registerall(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)

    serializer = FormDetailsSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    
    return JsonResponse(serializer.errors, status=400)
    
def login(request):
    if(request.method == 'POST'):
        user = authenticate(user = "", )

@api_view(['POST'])
def recaptcha(request):
    r = requests.post(
      'https://www.google.com/recaptcha/api/siteverify',
      data={
        'secret': '6Ld7UwUhAAAAAJdj0n7BaOTyPVr4PJvEhkT19Aw4',
        'response': request.data['captcha_value'],
      }
    )

    return Response({'captcha': r.json()})
   
