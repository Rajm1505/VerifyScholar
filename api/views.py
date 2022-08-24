from asyncio.windows_events import NULL
from pydoc import doc
import re
import requests
from django.shortcuts import render, redirect
import jwt,datetime
from .models import StudentDetails,User,FormDetails,StudentDocuments
from rest_framework.views import APIView

from .Serializers import StudentDetailsSerializer,FormDetailsSerializer,StudentDetailsFetchSerializer,UserSerializer,StudentDocumentsSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
# from django.contrib.auth.models import User
from django.contrib.auth import authenticate,get_user_model
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from django.core.files.base import ContentFile


# for digilocker view
from django.http import JsonResponse
import requests, json, xmltodict
import os

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
        response = Response()

        if user is None:
            # raise AuthenticationFailed("User not found")
            response.data = {'error':'User not found',"detail": "Unauthenticated"}
            
            print(response.data)
            return response

        if not user.check_password(password):
            # raise AuthenticationFailed("Invalid password")
            response.data = {'error':'Invalid password',"detail": "Unauthenticated"}
            
            print(response.data)
            return response
        
        payload = {
            'sid': user.sid,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }
        
        token = jwt.encode(payload,'secret',algorithm='HS256')
        
        response.set_cookie(key='jwt',value=token,httponly=True)
        
        response.data = {
            'jwt' : token,
            'message' : 'Success'
        }
        print(response.data)
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

@api_view(['GET'])
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

@api_view(['GET'])
def userdoclist(request):
    response = isAuth(request)
    studentdetails = StudentDocuments.objects.filter(sid=response.data['sid']).first()
    print(studentdetails)
    doclist = {}
    if studentdetails!=None:
        serializer = StudentDocumentsSerializer(studentdetails)
        serializer.data['hello'] = 'hello'
        print(serializer.data)
        
        for i in serializer.data:
            if serializer.data[i] == None or serializer.data[i] == '' :
                doclist[i] = False
            elif str(serializer.data[i]).split(' ')[-1] == 'mismatch':
                doclist[i] = serializer.data[i]
            else:
                doclist[i] = True
                
        print(doclist)      

    else:
        doclist['Digilocker_Authorized'] = False
    return JsonResponse(doclist)
    
    
    
    

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





def callback(request):
    if request.method == 'GET':
        sid = isAuth(request).data['sid']
        sidinstance = User.objects.filter(sid = sid).first()
        studoc = StudentDocuments()
        studoc.sid  = sidinstance
        code = request.GET.get('code')
        state = request.GET.get('state')

        url = 'https://api.digitallocker.gov.in/public/oauth2/1/token'
        myobj = {
            "code": code,
            "grant_type": "authorization_code",
            "client_id": "2407FC9F",
            "client_secret": "69e83492f63f996bfd5d",
            "redirect_uri": "http://127.0.0.1:8000/api/callback"
        }
        # API call for obtaining accesstoken

        accesstoken = requests.post(url, json = myobj, headers = {"Content-Type": "application/json"}).json().get('access_token')
        print(accesstoken)

        # API call for obtaining list of files in user's digilocker
        

        filelist = requests.get('https://api.digitallocker.gov.in/public/oauth2/2/files/issued',headers = {"Authorization": "bearer " + accesstoken}).json()
        print(filelist)

        # Extracting uris of required files from the file list

        requiredfiles = ['Class X Marksheet','Aadhaar Card','Income Certificate']
        # category/caste certificate, 12th marksheet, self photo, self signature, permanent address proof, permanent address proof, disability certificate(if required)
        fileuris = []
        filenames = []
        for i in range(len(filelist['items'])):
            for rfile in range(len(requiredfiles)):
                if(filelist['items'][i]['name'] == requiredfiles[rfile]):
                    fileuris.append(filelist['items'][i]['uri'])
                    filenames.append(filelist['items'][i]['name'])

        print(fileuris) 
        # #Files which are not uploaded in users digilocker account
        # resdict = {}
        # for i in requiredfiles:
        #     if i not in filenames:
        #         resdict[i] = False
        #     else:
        #         resdict[i] = True
        # print(resdict)

    # Requesting XML of files from digilocker 
        try:
            for fileuri in fileuris:
                if 'ADHAR' in fileuri:
                    xml = requests.get("https://api.digitallocker.gov.in/public/oauth2/1/xml/" + fileuri,headers = {"Authorization": "bearer " + accesstoken})
                    content  = xmltodict.parse(xml.content)
                    uid = content['KycRes']['UidData']['@uid'][8:]
                    studentname = content['KycRes']['UidData']['Poi']['@name']
                    dob = content['KycRes']['UidData']['Poi']['@dob']
                    gender = content['KycRes']['UidData']['Poi']['@gender']
                    
                    studentdetails = StudentDetails.objects.get(sid=sid)
                    studoc.auid = uid
                    studoc.aname = studentname
                    studoc.agender = gender
                    temp = str(dob).split('-')[::-1]
                    dob = ''
                    for i in temp:
                        dob += i + '-' 
                    studoc.adob = dob[0:len(dob)-1]
                
                    
                    # print('object',studoc)
                    # print("|"+(studentdetails.name + " "+ studentdetails.fname).lower()+"|")
                    # print(type("|"+(studentdetails.name + " "+ studentdetails.fname).lower()+"|"))
                    # print("|"+studentname.lower()+"|")
                    # print(str(studentdetails.dob).split('-')[0:])
                    # print(str(dob).split('-')[::-1])
                    # print(studentdetails.gender)
                    # print(gender)
                
                    if str(studentdetails.name + " " +  studentdetails.fname).lower().strip() != str(studentname).lower().strip():
                        studoc.aadhar = 'name Mismatch'
                        
                    elif str(studentdetails.dob).split('-')[0:] != str(dob).split('-')[::-1]:
                        studoc.aadhar = 'dob Mismatch'
                                                    
                    elif studentdetails.gender != gender:
                        studoc.aadhar = 'gender Mismatch'
                        
                    else:
                        studoc.aadhar = 'verified'    
                        
                    studoc.save()
                    
                    # Mandaviya Raj Jayesh
                    print(uid,studentname,dob,gender)
                    
    # Downloading files from digilocker 
                
                if 'INCER' in fileuri:
                    file = requests.get("https://api.digitallocker.gov.in/public/oauth2/1/file/" + fileuri,headers = {"Authorization": "bearer " + accesstoken})    
                    # path = "media/"+str(sidinstance)+"/"
                    # if os.getcwd().replace("\\","/") != "E:/Study Material/SIH/VerifyScholar/"+"media/"+str(sidinstance):
                    #     os.chdir('media/')
                    # # print("E:\Study Material\SIH\VerifyScholar'\z'zz+ path)
                    #     print(os.getcwd())
                    #     if not os.path.exists(str(sidinstance)):
                    #         os.mkdir(str(sidinstance))
                    #     os.chdir(str(sidinstance))

                    # if filename not in os.listdir():
                    #     open(filename, "wb").write(file.content)
                    
                    # finalpath =os.path.join(path,filename)
                    # print(finalpath)
                    
                    # studoc.incomecertificate  = finalpath
                    filename = str(sidinstance) + '_income_certificate.pdf'
                    sid = str(sidinstance)
                    studoc = StudentDocuments.objects.filter(sid=sid).first()
                    f = ContentFile(file.content)
                    studoc.incomecertificate.save(filename,f)

                    
                    with open('fname-en', "w") as f:
                        f.write(translatedoc(sid,filename))

                    with open('fname-en', 'r',encoding='utf8') as f:
                        text=f.read()
                    start = text.find('(cid:7773)') + 11
                    end = text.find('&#10', start)
                    icname=text[start:end]

                    start = text.find('(cid:7671).&#10;&#10; ') + 22
                    end = text.find('/-', start)
                    icincome=text[start:end]

                    print("name: " + icname+"\nIncome: " + icincome)
                    studoc.icname = icname
                    studoc.icincome = icincome
                    studoc.save()    
                    # with open(filename,'rb') as f:
                    # content = ContentFile(file.content)
                    # doc = StudentDocuments.incomecertificate.save(filename, content)
                    # doc.save()
                    # print(doc)
                    # StudentDocuments.objects.create()
                    #OCR CODE HERE
                    print(fileuri)
                
                # else if fileuri[0]:
                    
        except NameError:
            for file in requiredfiles:
                print("These file does not exist: " + file)
        # print(resdict)
        # return render(request, 'index.html',resdict)
        return redirect('StuDoc')
    
    # {'access_token': 'cfc7cfa52b5eb2d24d861ef3100008b4013d39ee', 'expires_in': 3600, 'token_type': 'Bearer', 'scope': None, 'refresh_token': 'c9241729f73eb2b0026718d16e62e9b72837b50c', 'digilockerid': '1f80c52d-d4a2-11e9-ae46-9457a564506c', 'name': 'Mandaviya Raj Jayesh', 'dob': '15052003', 'gender': 'M', 'eaadhaar': 'Y', 'reference_key': '', 'mobile': '9724197043', 'new_account': 'N'}  
def translatedoc(sid,filename):
    from pdfminer.high_level import extract_text #pip install pdfminer.six
    import urllib.request
    pdf_path = "https://sihfilebucket.s3.ap-south-1.amazonaws.com/media/"+sid+"/"+filename
    def download_file(download_url, filename):
        response = urllib.request.urlopen(download_url)    
        file = open(filename, 'wb')
        file.write(response.read())
        file.close()
                    
    download_file(pdf_path, "Test.pdf")
    # Extract text from a pdf.
    text = extract_text('Test.pdf')
     # print(text)
    with open('fname', "w", encoding="utf-8") as f:
        f.write(text)

    with open('fname', 'r',encoding='utf8') as f:
        text=f.read()[:400]
    with open('fname', 'r',encoding='utf8') as f:
        text1 = f.read()[401:850]

    from translate import Translator #pip install translate
    translator=Translator(from_lang = "gu-IN",to_lang="en")
    translation=translator.translate(text)
    translation+=translator.translate(text1)
    return translation
    
   
