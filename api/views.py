from django.shortcuts import render 
from .models import StudentDetails
from .Serializers import StudentDetailsSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def index(request):
    context = {}
    return render(request, 'index.html', context)

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        
        # Inserting Date



        # Adding Sid
        no = StudentDetails.objects.latest('date_of_registration').sid 
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


