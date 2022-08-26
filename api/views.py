import requests
from requests.auth import HTTPBasicAuth
from django.shortcuts import render, redirect
import jwt,datetime
from .models import StudentDetails,User,FormDetails,StudentDocuments,StuDocAdmin
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
        sid = isAuth(request).data['sid']
        user = User.objects.get(sid=sid)
        try:   
            studentdetails = StudentDetails.objects.filter(pk=sid).first()
            print(studentdetails)
        except(StudentDetails.DoesNotExist):
            return JsonResponse(studentdetails.errors, status=404)
        # formdetails = FormDetails.objects.get(sid=sid)
        if request.method == 'GET':   
            serializer = StudentDetailsFetchSerializer(studentdetails)
            # serializer.data['email'] = user.email
            response = Response()
            response.data = serializer.data
            response.data['email'] = user.email
            response.data['verification_status'] = user.verification_status
            # response.data['coaching_required'] = formdetails.coaching_required
            return response

@csrf_exempt
def formregister(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        sid = isAuth(request).data['sid']
        data['sid'] = User.objects.get(sid=sid).sid

        # print(sid)
        # user = User.objects.get(sid=sid)
        # print(user)
        formdetails = FormDetails()
        # formdetails.sid = user

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
    sid = isAuth(request).data['sid']
    user = User.objects.get(sid=sid)
    try:
        studoc = StudentDocuments.objects.get(sid=sid)
    except:
        studoc = ''
    print('studoc1',studoc)
    doclist = {}
    if studoc!=None:
        serializer = StudentDocumentsSerializer(studoc)
        serializer.data['hello'] = 'hello'
        print(serializer.data)
        
        for i in serializer.data:
            if serializer.data[i] == None or serializer.data[i] == '' or serializer.data[i] == "False":
                doclist[i] = False
            elif str(serializer.data[i]).split(' ')[-1] == 'mismatch':
                doclist[i] = serializer.data[i]
            else:
                doclist[i] = True
        doclist['vpass'] = user.vpass
        if user.refreshtoken == '' or   user.refreshtoken == None :
            doclist['refreshtoken'] = False
        else:
            doclist['refreshtoken'] = True
        studentdetails = StudentDetails.objects.get(sid=sid)
        # formdetails = FormDetails.objects.get(sid=sid)
        # try:
        #     formdetails = FormDetails.objects.get(sid=sid)
        # except:
        #     response = Response()
        #     response.data = {
        #         'stuapp' : False
        #     }  
        #     return response
        # if formdetails.disablity =='True':
        #     doclist['disability_status'] = 'required'
        # else:
        #     doclist['disability_status'] = 'notrequired'

        # for i in doclist:
        #     if doclist[i] != '' or doclist[i] != 'required' or doclist[i] != None :
        #         doclist['allstatus'] = True
        #     else:
        #         doclist['allstatus'] = False


            

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


def getRefreshToken(request):
    if request.method == 'GET':
        sid = isAuth(request).data['sid']
        print("sidgetrefresh",sid)
        user = User.objects.get(sid = sid)
        # studoc = StudentDocuments.objects.get(sid=user)
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

        refreshtoken = requests.post(url, json = myobj, headers = {"Content-Type": "application/json"}).json().get('refresh_token')
        print(refreshtoken)

        user.refreshtoken = refreshtoken
        user.save()
                                                                                                                                                                                                                  
        return redirect('StuDoc')


def verify(request):
    if request.method == 'GET':
        sid = isAuth(request).data['sid']
        user = User.objects.get(sid = sid)
        studoc = StudentDocuments()
        user.vpass = user.vpass+1
        user.save()
        studoc.sid  = user
        print("userrefresh",user.refreshtoken)

        url = 'https://api.digitallocker.gov.in/public/oauth2/1/token'
        myobj = {
            "refresh_token": user.refreshtoken,
            "grant_type": "refresh_token",
        }
        # API call for obtaining accesstoken
    
        refreshtokencall = requests.post(url, json = myobj,auth = HTTPBasicAuth('2407FC9F', '69e83492f63f996bfd5d')).json()  
        accesstoken = refreshtokencall.get('access_token')
        refreshtoken = refreshtokencall.get('refresh_token')
        print("access: ",accesstoken)
        print("refresh_tokenL: ",refreshtoken)
        # open('hello.txt','wb').write(accesstoken)  
        print(refreshtokencall)
        user.refreshtoken = refreshtoken
        user.save()

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
        
        for fileuri in fileuris:
            if 'ADHAR' in fileuri:
                xml = requests.get("https://api.digitallocker.gov.in/public/oauth2/1/xml/" + fileuri,headers = {"Authorization": "bearer " + accesstoken})
                content  = xmltodict.parse(xml.content)
                # open('media/aadhar.json','w').write(content)
                uid = content['KycRes']['UidData']['@uid'][8:]
                studentname = content['KycRes']['UidData']['Poi']['@name']
                dob = content['KycRes']['UidData']['Poi']['@dob']
                gender = content['KycRes']['UidData']['Poi']['@gender']
                
                studentdetails = StudentDetails.objects.get(sid=sid)
               
            
                
                # print('object',studoc)
                # print("|"+(studentdetails.name + " "+ studentdetails.fname).lower()+"|")
                # print(type("|"+(studentdetails.name + " "+ studentdetails.fname).lower()+"|"))
                # print("|"+studentname.lower()+"|")
                # print(str(studentdetails.dob).split('-')[0:])
                # print(str(dob).split('-')[::-1])
                # print(studentdetails.gender)
                # print(gender)
            
                print("name entered",str(studentdetails.name + " " +  studentdetails.fname).lower().strip())
                print("aadhar",str(studentname).lower().strip())
                if str(studentdetails.name + " " +  studentdetails.fname).lower().strip() == str(studentname).lower().strip():
                    studoc.aadhaar_status = 'verified'
                    studoc.save()
                else:
                    studoc.aadhaar_status = 'name Mismatch'
                    studoc.save()
                # Mandaviya Raj Jayesh
                print(uid,studentname,dob,gender)
                
    # Dwnloading files from digilocker 
            
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
                filename = str(user) + '_income_certificate.pdf'
                sid = str(user)
                with open('media/'+filename,'wb') as f:
                    f.write(file.content)
    
                # with open('media/poppler_pdf-en', "w") as f:
                #     f.write()
                print(translatedocument(sid,filename))
                # print(name,income)
                # with open('media/poppler_pdf-en', 'r',encoding='utf8') as f:
                #     text=f.read()
                # start = text.find('(cid:7773)') + 11
                # end = text.find('&#10', start)
                # start = text.find('(cid:7671).&#10;&#10; ') + 22
                # end = text.find('/-', start)


                # start = text.find('Shri') + 5
                # end = text.find('\ n', start)
                # icname=text[start:end]
                # start = text.find('Rs.') + 3
                # end = text.find('/-', start)
                # icincome=text[start:end]
                # print("name: " + icname+"\nIncome: " + icincome)
                # icname1 = icname.split(' ')[0] +  ' ' + icname.split(' ')[2]
                # fathername = str(studentdetails.fname + ' ' + str(studentdetails.name).split(' ')[0] ).lower().strip()
               
                # # if icname1 == str(studentdetails.fname + ' ' + str(studentdetails.name).split(' ')[0] ).lower().strip():
                # count = 0
                # for i in icname1:+++++++++++++++++++++++++




                #     if i in fathername:
                #         count+=1
                # if count > len(fathername)-3:
                #     if int(icincome) < 600000:
                #         studoc.inc_status = 'verified'
                #     else:
                #         studoc.inc_status = 'income is more than 600000'
                # else:
                #     studoc.inc_status = 'name mismatch'
                #     studoc.save()


            # if 'gujarat.dst-CNCMY' in fileuri:
            #     file = requests.get("https://api.digitallocker.gov.in/public/oauth2/1/file/" + fileuri,headers = {"Authorization": "bearer " + accesstoken})    
            #     # open('media/creamy.txt').write(file.content)
            #     filename = str(user) + '_income_certificate.pdf'
            #     sid = str(user)
            #     studoc = StudentDocuments.objects.filter(sid=sid).first()
            #     f = ContentFile(file.content)
            #     studoc.creamcertificate.save(filename,f)
            #     studoc.crname=translateDoc_nonCremy(sid,filename)
            #     studoc.save()
            #     print(fileuri)
            
            # else if fileuri[0]:
                
    # except NameError:
    #     print(NameError)
    # print(resdict)
            if 'gseb-SSCER' in fileuri:
                xml = requests.get("https://api.digitallocker.gov.in/public/oauth2/1/xml/" + fileuri,headers = {"Authorization": "bearer " + accesstoken})    
                # studoc.incomecertificate  = finalpath
                content  = xmltodict.parse(xml.content)
                with open("media/sample.json", "w") as outfile:
                    json.dump(content, outfile)
                name10 = str(content['Certificate']['IssuedTo']['Person']['@name']).replace('  ',' ')
                print('name10',name10)

                file = requests.get("https://api.digitallocker.gov.in/public/oauth2/1/file/" + fileuri,headers = {"Authorization": "bearer " + accesstoken})    

                filename = str(user) + '_10th_marksheet.pdf'
                sid = str(user)
                with open('media/'+filename,'wb') as f:
                    f.write(file.content)
    
                # with open('media/poppler_pdf-en', "w") as f:
                #     f.write()
                print(translatedocument(sid,filename))
                
                if str(studentdetails.name + " " +  studentdetails.fname).lower().strip() == str(studentname).lower().strip():
                    studoc.marksheet10_status = 'verified'
                    studoc.save()
                else:
                    studoc.marksheet10_status = 'name Mismatch'
                    studoc.save()
                # open('media/10th.xml','wb').write(xml.content)
                # uid = content['KycRes']['UidData']['@uid'][8:]
                # studentname = content['KycRes']['UidData']['Poi']['@name']
                # dob = content['KycRes']['UidData']['Poi']['@dob']
                # gender = content['KycRes']['UidData']['Poi']['@gender']
                # filename = str(user) + '_10th_Marksheet.pdf'
                

    return redirect('StuDoc')
    
    # {'access_token': 'cfc7cfa52b5eb2d24d861ef3100008b4013d39ee', 'expires_in': 3600, 'token_type': 'Bearer', 'scope': None, 'refresh_token': 'c9241729f73eb2b0026718d16e62e9b72837b50c', 'digilockerid': '1f80c52d-d4a2-11e9-ae46-9457a564506c', 'name': 'Mandaviya Raj Jayesh', 'dob': '15052003', 'gender': 'M', 'eaadhaar': 'Y', 'reference_key': '', 'mobile': '9724197043', 'new_account': 'N'}  

def translatedocument(sid,filename):
    from multilingual_pdf2text.pdf2text import PDF2Text
    from multilingual_pdf2text.models.document_model.document import Document
    import logging
    logging.basicConfig(level=logging.INFO)

    def poppler_pdf_income():
        ## create document for extraction with configurations
        pdf_document = Document(
            document_path='media/6_income_certificate.pdf',
            language='guj'
            )
        pdf2text = PDF2Text(document=pdf_document)
        content = pdf2text.extract()
        with open('poppler_pdf','w',encoding='utf8') as f:
            f.write(str(content))
    poppler_pdf_income()
    with open('poppler_pdf', 'r',encoding='utf8') as f:
        text1 = f.read()[220:500]
    # from googletrans import Translator
    # translator = Translator()
    # text = translator.translate(text1,dest='en').text
    # print(text)
    # return text

    import boto3
    from decouple import config
    translate = boto3.client(
        'translate',
        region_name='ap-south-1',
        aws_access_key_id=config('AWS_ACCESS_KEY_ID_TRANSLATE'),
        aws_secret_access_key=config('AWS_SECRET_ACCESS_KEY_TRANSLATE'),
    )
    result = translate.translate_text(Text=text1,SourceLanguageCode="gu",TargetLanguageCode="en")
    # print(result)

    result = str(result)
    start = result.find('Shri') + 5
    end = result.find('is', start)
    name=result[start:end]

    print('nameinfunc',name[:-3])

    start = result.find('Rs.') + 4
    end = result.find('/-', start)
    income=result[start:end]
    print('incomeinfujnc',income)  
    return(name,income)  


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
    # text = extract_text('Test.pdf')

    #new pdf to text (ocr)
    from multilingual_pdf2text.pdf2text import PDF2Text
    from multilingual_pdf2text.models.document_model.document import Document
    import logging
    logging.basicConfig(level=logging.INFO)

    def poppler_pdf_income():
        ## create document for extraction with configurations
        pdf_document = Document(
            document_path='Test.pdf',
            language='guj'
            )
        pdf2text = PDF2Text(document=pdf_document)
        content = pdf2text.extract()
        with open('poppler_pdf','w',encoding='utf8') as f:
            f.write(str(content))
    poppler_pdf_income()
    with open('poppler_pdf', 'r',encoding='utf8') as f:
        text1 = f.read()[200:500]
    

     # print(text)
    # with open('fname', "w", encoding="utf-8") as f:
    #     f.write(text)

    # with open('fname', 'r',encoding='utf8') as f:
    #     text=f.read()[:400]
    # with open('fname', 'r',encoding='utf8') as f:
    #     text1 = f.read()[401:850]

    from translate import Translator #pip install translate
    translator=Translator(from_lang = "gu-IN",to_lang="en")
    translation=translator.translate(text1)
    # translation+=translator.translate(text1)
    return translation

def translateDoc_nonCremy(sid,filename):
    
    #pip install multilingual-pdf2text
    #env variable in pc 1.poppler 2.Tesseract-OCR
    from multilingual_pdf2text.pdf2text import PDF2Text
    from multilingual_pdf2text.models.document_model.document import Document
    import logging
    logging.basicConfig(level=logging.INFO)

    from pdfminer.high_level import extract_text #pip install pdfminer.six
    from langdetect import detect
    pdf_name = filename
    # Extract text from a pdf.
    text = extract_text(pdf_name)
    # print(text)
    if(detect(text) == 'gu'):
        lang = 'guj'
    else:
        lang = 'eng'
    # print(detect(text))

    def poppler_pdf_income():
        ## create document for extraction with configurations
        pdf_document = Document(
            document_path=pdf_name,
            language=lang
            )
        pdf2text = PDF2Text(document=pdf_document)
        content = pdf2text.extract()
        with open('poppler_pdf_nonCr','w',encoding='utf8') as f:
            f.write(str(content))
    poppler_pdf_income()
    # with open('poppler_pdf', 'r',encoding='utf8') as f:
    #     text=f.read()[:400]
    with open('poppler_pdf_nonCr', 'r',encoding='utf8') as f:
        text = f.read()[320:500]
        # text = f.read()[600:820]
        

    # print(text1)
    from translate import Translator #pip install translate
    translator=Translator(from_lang = "gu-IN",to_lang="en")
    # translation=translator.translate(text1)
    translation=translator.translate(text)
    with open('poppler_pdf_nonCr-en', 'w')as f:
        f.write(translation)

    with open('poppler_pdf_nonCr-en', 'r') as f:
        text =f.read()
    if (lang =='guj'):
        start = text.find('Shri') + 5
        end = text.find('\\n', start)
        name=text[start:end]
        return name
        # print(name)
    else:
        start = text.find('Shree') + 6
        end = text.find('\\n', start)
        name=text[start:end]
        return name
        # print(name)



def getFiles(request):
    if request.method == 'GET':
        sid = isAuth(request).data['sid']
        user = User.objects.get(sid = sid)
        studoca = StuDocAdmin()
        studoca.sid  = user
        print("userrefresh",user.refreshtoken)

        url = 'https://api.digitallocker.gov.in/public/oauth2/1/token'
        myobj = {
            "refresh_token": user.refreshtoken,
            "grant_type": "refresh_token",
        }
        # API call for obtaining accesstoken
    
        refreshtokencall = requests.post(url, json = myobj,auth = HTTPBasicAuth('2407FC9F', '69e83492f63f996bfd5d')).json()  
        accesstoken = refreshtokencall.get('access_token')
        refreshtoken = refreshtokencall.get('refresh_token')
        print("access: ",accesstoken)
        print("refresh_tokenL: ",refreshtoken)
        # open('hello.txt','wb').write(accesstoken)  
        print("refreshtokencall",refreshtokencall)
        user.refreshtoken = refreshtoken
        user.save()

        # API call for obtaining list of files in user's digilocker
        

        filelist = requests.get('https://api.digitallocker.gov.in/public/oauth2/2/files/issued',headers = {"Authorization": "bearer " + accesstoken}).json()
        print(filelist)

        # Extracting uris of required files from the file list

        requiredfiles = ['Class X Marksheet','Aadhaar Card','Income Certificate','Creamy - Non Creamy Layer Application']
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
                    open('media/aadhaartest.xml','wb').write(xml.content)
                    studentdetails = StudentDetails.objects.get(sid=sid)
                    studoca.auid = content['KycRes']['UidData']['@uid'][8:]
                    studoca.aname = content['KycRes']['UidData']['Poi']['@name']
                    dob = content['KycRes']['UidData']['Poi']['@dob']
                    studoca.agender = content['KycRes']['UidData']['Poi']['@gender']
                    studoca.aaddress = content['KycRes']['UidData']['Poa']['@co'] + ' ' + content['KycRes']['UidData']['Poa']['@lm'] + ' ' + content['KycRes']['UidData']['Poa']['@loc'] + ' ' + content['KycRes']['UidData']['Poa']['@vtc']
                    temp = str(dob).split('-')[::-1]
                    studoca.adob =  "-".join(temp)
                    studoca.save()
                    
                    # Mandaviya Raj Jayesh
                    print(studoca.auid,studoca.aname,dob,studoca.agender)
                    
    # Downloading files from digilocker 
                
                if 'INCER' in fileuri:
                    file = requests.get("https://api.digitallocker.gov.in/public/oauth2/1/file/" + fileuri,headers = {"Authorization": "bearer " + accesstoken})    
                    # studoc.incomecertificate  = finalpath
                    filename = str(user) + '_income_certificate.pdf'
                    sid = str(user)
                    studoca = StuDocAdmin.objects.get(sid=sid)
                    f = ContentFile(file.content)
                    studoca.incomecertificate.save(filename,f)

                if 'gujarat.dst-CNCMY' in fileuri or 'gujarat.dst-NLCER' in fileuri:
                    file = requests.get("https://api.digitallocker.gov.in/public/oauth2/1/file/" + fileuri,headers = {"Authorization": "bearer " + accesstoken})    
                    # studoc.incomecertificate  = finalpath
                    filename = str(user) + '_Non_creamy_layer_certificate.pdf'
                    sid = str(user)
                    studoca = StuDocAdmin.objects.get(sid=sid)
                    f = ContentFile(file.content)
                    studoca.noncreamylayer.save(filename,f)

                if 'gseb-SSCER' in fileuri:
                    file = requests.get("https://api.digitallocker.gov.in/public/oauth2/1/file/" + fileuri,headers = {"Authorization": "bearer " + accesstoken})    
                    # studoc.incomecertificate  = finalpath
                    filename = str(user) + '_10th_Marksheet.pdf'
                    sid = str(user)
                    studoca = StuDocAdmin.objects.get(sid=sid)
                    f = ContentFile(file.content)
                    studoca.marksheet10.save(filename,f)

                if 'gseb-HSCER' in fileuri:
                    file = requests.get("https://api.digitallocker.gov.in/public/oauth2/1/file/" + fileuri,headers = {"Authorization": "bearer " + accesstoken})    
                    # studoc.incomecertificate  = finalpath
                    filename = str(user) + '_10th_Marksheet.pdf'
                    sid = str(user)
                    studoca = StuDocAdmin.objects.get(sid=sid)
                    f = ContentFile(file.content)
                    studoca.marksheet12.save(filename,f)
            
        except NameError:
            for file in requiredfiles:
                print("These file does not exist: " + file)
        # print(resdict)
        # return render(request, 'index.html',resdict)
        
        return redirect('StuDoc')
    
   
