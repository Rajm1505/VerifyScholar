from django.contrib import admin
from django.contrib.auth.admin import UserAdmin 
from django.contrib.auth.models import AbstractUser


from .models import StudentDetails,FormDetails, StudentDocuments,family_income,User

# Register your models here.


# admin.site.register(StudentDetails)
admin.site.register(FormDetails)
admin.site.register(family_income)
admin.site.register(StudentDocuments)
admin.site.register(User)


class AdminStudentDetails(admin.ModelAdmin):
    readonly_fields = ('date_of_registration','date_of_lastupdate')
    list_display = ('sid','gender')
admin.site.register(StudentDetails, AdminStudentDetails)

# class CustomUserAdmin(UserAdmin):
#     ordering = ('email',)
    