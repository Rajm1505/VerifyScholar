from django.shortcuts import render,redirect
from api.models import StuDocAdmin, StudentDetails, StudentDocuments, User
from django.core import serializers 
import jwt
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response


# Create your views here.

def index(request):
    
    
    users = User.objects.filter(vpass=3)
    context = {'users':users}
    return render(request,'semiadmin.html',context)

def verifypage(request):
    sid = request.GET.get('sid')
    print(sid)
    studoc = StudentDocuments.objects.get(sid=sid)
    user = User.objects.filter(sid=sid).first()
    try:
        studentdetails = StudentDetails.objects.get(sid=sid)
    except:
        studentdetails = "  "
    try:
        studoc = StudentDocuments.objects.get(sid=sid)
    except:
        studoc = None
    try:
        studoca = StuDocAdmin.objects.get(sid=sid)
    except:
        studoca = None


    list1 = []
    # for i in range(0,len(vpasslist)):
    #     list1.append(vpasslist[i].pk)
    # print(list1)
    # user = User.objects.get(user__sid__in=list1)
    # print(user)
    # vpasslistjson = serializers.serialize('json',vpasslist)
    # print(type(vpasslistjson))
    # print(vpasslist[0].aadhaar)
    # print(len(vpasslist))
    # for i in range(0,len(vpasslist)):
    #     print(vpasslist[i])

    context = {'studoca':studoca,'user':user,'studentdetails':studentdetails,'studoc':studoc}
    
        # context['sid'+str(i)] = dict(str(vpasslist[i]))
        # print('hello')
        # context['sid'+str(i)]['aadhaar'] = vpasslist[i].aadhaar
        
    print(context)

    return render(request,'verifypage.html',context)

def approvedrequests(request):
    if request.method == 'GET':
        sid = 1
        users = User.objects.filter(verification_status = True)
        # print(user)
        context = {'users':users}

        return render(request,'approved-requests.html',context)
        




def login(request):
    return render(request,'slogin.html')

def isAuth(request):

    token = request.COOKIES.get('jwt')
        
    if not token:
        # raise AuthenticationFailed('Unauthenticated')
        return redirect('login')
        
    try:
        payload = jwt.decode(token,'secret',algorithms=['HS256'])
        response = Response()
        response.data = {
            'sid' : payload['sid']
        }
    except jwt.ExpiredSignatureError:
        return redirect('login')
