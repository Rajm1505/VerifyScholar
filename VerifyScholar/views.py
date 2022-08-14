from django.shortcuts import render
from django.http import JsonResponse
import requests, json, xmltodict
import os

from api.models import StudentDocuments

# from ..api.models import StudentDocuments



def index(request):
    return render(request, 'index.html ')


def callback(request):
    if request.method == 'GET':
        code = request.GET.get('code')
        state = request.GET.get('state')

        url = 'https://api.digitallocker.gov.in/public/oauth2/1/token'
        myobj = {
            "code": code,
            "grant_type": "authorization_code",
            "client_id": "2407FC9F",
            "client_secret": "69e83492f63f996bfd5d",
            "redirect_uri": "http://localhost:8000/callback"
        }
        # API call for obtaining accesstoken

        accesstoken = requests.post(url, json = myobj, headers = {"Content-Type": "application/json"}).json().get('access_token')
        print(accesstoken)

        # API call for obtaining list of files in user's digilocker
        

        filelist = requests.get('https://api.digitallocker.gov.in/public/oauth2/2/files/issued',headers = {"Authorization": "bearer " + accesstoken}).json()
        print(filelist)

        # Extracting uris of required files from the file list

        requiredfiles = ['Class X Marksheet','Aadhaar Card','Income Certificate']
        fileuris = []
        filenames = []
        for i in range(len(filelist['items'])):
            for rfile in range(len(requiredfiles)):
                if(filelist['items'][i]['name'] == requiredfiles[rfile]):
                    fileuris.append(filelist['items'][i]['uri'])
                    filenames.append(filelist['items'][i]['name'])

        print(fileuris) 
        #Files which are not uploaded in users digilocker account
        resdict = {}
        for i in requiredfiles:
            if i not in filenames:
                resdict[i] = False
            else:
                resdict[i] = True
        print(resdict)

    # Requesting XML of files from digilocker
        try:
            for fileuri in fileuris:
                if 'ADHAR' in fileuri:
                    file = requests.get("https://api.digitallocker.gov.in/public/oauth2/1/xml/" + fileuri,headers = {"Authorization": "bearer " + accesstoken})
                    content  = xmltodict.parse(file.content)
                    uid = content['KycRes']['UidData']['@uid'][8:]
                    studentname = content['KycRes']['UidData']['Poi']['@name']
                    dob = content['KycRes']['UidData']['Poi']['@dob']
                    gender = content['KycRes']['UidData']['Poi']['@gender']
                    print(uid,studentname,dob,gender)
                    
                
                if 'INCER' in fileuri:
                    file = requests.get("https://api.digitallocker.gov.in/public/oauth2/1/file/" + fileuri,headers = {"Authorization": "bearer " + accesstoken})    
                    sid = "1"
                    path = "media/"+sid+'/'
                    os.chdir(path)
                    filename = sid + '_income certificate.pdf'
                    open(filename, "wb").write(file.content)
                    doc = StudentDocuments(incomecertificate = path+filename)
                    doc.save()
                    # StudentDocuments.objects.create()
                    #OCR CODE HERE
                    print(fileuri)
                
                # else if fileuri[0]:
                    
        except NameError:
            for file in requiredfiles:
                print("These file does not exist: " + file)

        # return render(request, 'index.html',resdict)
        return JsonResponse(resdict)
    
    # {'access_token': 'cfc7cfa52b5eb2d24d861ef3100008b4013d39ee', 'expires_in': 3600, 'token_type': 'Bearer', 'scope': None, 'refresh_token': 'c9241729f73eb2b0026718d16e62e9b72837b50c', 'digilockerid': '1f80c52d-d4a2-11e9-ae46-9457a564506c', 'name': 'Mandaviya Raj Jayesh', 'dob': '15052003', 'gender': 'M', 'eaadhaar': 'Y', 'reference_key': '', 'mobile': '9724197043', 'new_account': 'N'}