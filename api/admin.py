from django.contrib import admin
from .models import StudentDetails,FormDetails,family_income

# Register your models here.


# admin.site.register(StudentDetails)
admin.site.register(FormDetails)
admin.site.register(family_income)

class AdminStudentDetails(admin.ModelAdmin):
    readonly_fields = ('date_of_registration','date_of_lastupdate')
    list_display = ('sid', 'name','gender','emailid')
admin.site.register(StudentDetails, AdminStudentDetails)