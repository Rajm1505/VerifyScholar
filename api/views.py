import requests
from django.shortcuts import render 
import jwt,datetime
from .models import StudentDetails,User,FormDetails
from rest_framework.views import APIView

from .Serializers import StudentDetailsSerializer,FormDetailsSerializer,StudentDetailsFetchSerializer,UserSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
# from django.contrib.auth.models import User
from django.contrib.auth import authenticate,get_user_model
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed

# Create your views here.

def index(request):
    return render('index.html')
    
User = get_user_model()

# @csrf_exempt
class LoginView(APIView):
    def post(self,request):
        print(request.data)
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed("User not found")

        if not user.check_password(password):
            raise AuthenticationFailed("Invalid password")
        
        payload = {
            'sid': user.sid,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }
        
        token = jwt.encode(payload,'secret',algorithm='HS256')
        
        response = Response()
        response.set_cookie(key='jwt',value=token,httponly=True)
        
        response.data = {
            'jwt' : token
        }
        
        return response
    
class UserView(APIView):
    
    def get(self,request):
        token = request.COOKIES.get('jwt')
        
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        
        try:
            payload = jwt.decode(token,'secret',algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
            
        user = User.objects.filter(sid = payload['sid']).first()
        serializer = UserSerializer(user)
        
        return Response(serializer.data)
    
    
class LogoutView(APIView):
    def post(self,request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
         'message' : "Logout Success"   
        }
        return response
    
    
def isAuth(request):
    token = request.COOKIES.get('jwt')
        
    if not token:
        raise AuthenticationFailed('Unauthenticated')
        
    try:
        payload = jwt.decode(token,'secret',algorithms=['HS256'])
        response = Response()
        response.data = {
            'sid' : payload['sid']
        }
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated')
    
    return response
            
    # user = User.objects.filter(sid = payload['sid']).first()
    # serializer = UserSerializer(user)
    
    
    
@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        # Adding Sid
        # try:
        #     no = StudentDetails.objects.latest('date_of_registration').sid
        # except  StudentDetails.DoesNotExist:
        #     no = ''
        # if no == '':
        #     data['sid'] = 'S1'
        # else:
        #     temp = no[1:]
        #     number = int(temp)
        #     number+=1
        #     sid = 'S' + str(number)
        #     data['sid'] = sid
        
        userializer = UserSerializer(data=data)
        userializer.is_valid(raise_exception=True)
        userializer.save()
        
        data['sid'] = User.objects.get(email=data['email']).sid
        print(data)
        
        serializer = StudentDetailsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def register_fetch(request):
    if request.method == 'GET':
        response = isAuth(request)
        sid = response.data['sid']
        try:   
            studentdetails = StudentDetails.objects.filter(pk=sid).first()
            print(studentdetails)
        except(StudentDetails.DoesNotExist):
            return JsonResponse(studentdetails.errors, status=404)
    
        if request.method == 'GET':   
            serializer = StudentDetailsFetchSerializer(studentdetails)
            return JsonResponse(serializer.data)

@csrf_exempt
def formregister(request):
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
   
