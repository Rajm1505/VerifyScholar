from django.shortcuts import render






# from ..api.models import StudentDocuments



def index(request):
    return render(request, 'index.html ')


