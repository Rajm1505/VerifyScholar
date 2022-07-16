from django.shortcuts import render 
from .models import StudentDetails
from .Serializers import StudentDetailsSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators import csrf_exempt 

# Create your views here.

def index(request):
    context = {}
    return render(request, 'index.html', context)

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        no = StudentDetails.objects.latest('sid')
        if no == '':
            context = {'sid' : 'S1'}
        else:
            no = sid[1:]
            no = int(no)
            no+=1
            sid = 'S' + str(no)
            context = {'sid' : sid} 
            
        serializer = StudentDetailsSerializer(data=data,context=context)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


