from django.contrib import admin
from .models import StudentDetails,FormDetails, StudentDocuments,family_income

# Register your models here.


# admin.site.register(StudentDetails)
admin.site.register(FormDetails)
admin.site.register(family_income)
admin.site.register(StudentDocuments)

class AdminStudentDetails(admin.ModelAdmin):
    readonly_fields = ('date_of_registration','date_of_lastupdate')
    list_display = ('sid','name','gender','email')
admin.site.register(StudentDetails, AdminStudentDetails)