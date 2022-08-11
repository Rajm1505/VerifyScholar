from django.shortcuts import render
from django.http import JsonResponse
import requests, json, xmltodict



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

        accesstokencall = requests.post(url, json = myobj, headers = {"Content-Type": "application/json"})
        accesstoken = accesstokencall.json().get('access_token')
        print(accesstoken)

        # API call for obtaining list of files in user's digilocker
        

        filelistcall = requests.get('https://api.digitallocker.gov.in/public/oauth2/2/files/issued',headers = {"Authorization": "bearer " + accesstoken})

        filelist = filelistcall.json()
        print(filelist)

        # Extracting uris of required files from the file list



        requiredfiles = ['Class X Marksheet','Aadhaar Card']
        fileuris = []
        for i in range(len(filelist['items'])):
            for rfile in range(len(requiredfiles)):
                if(filelist['items'][i]['name'] == requiredfiles[rfile]):
                    fileuris.append(filelist['items'][i]['uri'])

        try:
            for fileuri in fileuris:
                file = requests.get("https://api.digitallocker.gov.in/public/oauth2/1/xml/" + fileuri,headers = {"Authorization": "bearer " + accesstoken})
                content  = xmltodict.parse(file.content)
                # print("content = " + content)

                # with open("data.json",'w') as f:
                #    f.write(content)     

                # print(content['KycRes']['UidData']['Poi'])
                # print(content['KycRes']['UidData']['Poa'])
                uid = content['KycRes']['UidData']['@uid'][8:]
                studentname = content['KycRes']['UidData']['Poi']['@name']
                dob = content['KycRes']['UidData']['Poi']['@dob']
                gender = content['KycRes']['UidData']['Poi']['@gender']
                print(uid,studentname,dob,gender)
                print(fileuris) 
        except NameError:
            for file in requiredfiles:
                print("These file does not exist: " + file)

        return JsonResponse(filelist)
    
    # {'access_token': 'cfc7cfa52b5eb2d24d861ef3100008b4013d39ee', 'expires_in': 3600, 'token_type': 'Bearer', 'scope': None, 'refresh_token': 'c9241729f73eb2b0026718d16e62e9b72837b50c', 'digilockerid': '1f80c52d-d4a2-11e9-ae46-9457a564506c', 'name': 'Mandaviya Raj Jayesh', 'dob': '15052003', 'gender': 'M', 'eaadhaar': 'Y', 'reference_key': '', 'mobile': '9724197043', 'new_account': 'N'}