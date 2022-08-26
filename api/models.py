from http.cookiejar import DefaultCookiePolicy
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.conf import settings


# Create your models here.
castecategory = (
    ('sc','SC'),
    ('obc','OBC')
)
marital_status = (
    ('Married','Married'),
    ('Unmarried','Unmarried'),
    ('Divorced','Divorced'),
    ('Separated','Separated')
)
states = (
        ('Andhra Pradesh','Andhra Pradesh'),
        ('Arunachal Pradesh','Arunachal Pradesh'),
        ('Assam','Assam'),
        ('Bihar','Bihar'),
        ('Chhattisgarh','Chhattisgarh'),
        ('Delhi','Delhi'),
        ('Goa','Goa'),
        ('Gujarat','Gujarat'),
        ('Haryana','Haryana'),
        ('Himachal Pradesh','Himachal Pradesh'),
        ('Jammu and Kashmir','Jammu and Kashmir'),
        ('Jharkhand','Jharkhand'),
        ('Karnataka','Karnataka'),
        ('Kerala','Kerala'),
        ('Madhya Pradesh','Madhya Pradesh'),
        ('Maharashtra','Maharashtra'),
        ('Manipur','Manipur'),
        ('Meghalaya','Meghalaya'),
        ('Mizoram','Mizoram'),
        ('Nagaland','Nagaland'),
        ('Orissa','Orissa'),
        ('Punjab','Punjab'),
        ('Rajasthan','Rajasthan'),
        ('Sikkim','Sikkim'),
        ('Tamil Nadu','Tamil Nadu'),
        ('Tripura','Tripura'),
        ('Uttar Pradesh','Uttar Pradesh'),
        ('Uttarakhand','Uttarakhand'),
        ('West Bengal','West Bengal'),
        ('Other','Other') )
scoring_system=(
    ('CGPA/OGPA','CGPA/OGPA'),
    ('% Marks','% Marks')
    )
num_siblings=(
    ('0','0'),
    ('1','1'),
    ('2','2'),
    ('3','3'),
    ('4','4'),
    ('5','5')
)

qualification_status=(
    ('Appearing','Appearing'),
    ('Passed','Passed')
)


class User(AbstractUser):
    sid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    refreshtoken = models.CharField(max_length=255, default=None,null=True)
    vpass = models.SmallIntegerField(default = 0,null=True)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return str(self.sid)

class StudentDetails(models.Model):
    sid = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True,default=None,db_column='sid')
    nsp_id = models.CharField(max_length = 20, null=True)
    aadhaar_no = models.CharField(max_length=12,default=None)
    pms_benificiary_id = models.CharField(max_length = 20, null=True)
    caste_category = models.CharField(max_length=20, choices=castecategory, default = '--Select--')
    name = models.CharField(max_length=50)
    fname = models.CharField(max_length=50) 
    mobile_number = models.CharField(max_length=12, default=None)
    date_of_registration = models.DateTimeField(default=timezone.now)
    date_of_lastupdate = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.sid)

class FormDetails(models.Model):

    sid = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True,default=None,db_column='sid')
    # plus18 = models.BooleanField(default=False)
    # aadhaar = models.CharField(max_length = 12)
    # minority_category = models.BooleanField(default=False)
    disablity = models.BooleanField(default=False)
    coaching_required = models.CharField(max_length=70)
    qualification = models.CharField(max_length=70)
    qualification_status = models.CharField(max_length=10,choices=qualification_status)
    bank_accountholder_name = models.CharField(max_length=30)
    bank_name = models.CharField(max_length=30)
    bank_account_no = models.CharField(max_length=20)
    bank_IFSC_code  =models.CharField(max_length=10)
    def __str__(self):
        return self.aadhaar
    
# class family_income(models.Model):

#     sid = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True,default=None,db_column='sid')
#     relation = models.CharField(max_length=10)
#     name = models.CharField(max_length=30)
#     age = models.CharField(max_length=3)
#     employment = models.CharField(max_length=15)
#     yearly_income = models.CharField(max_length=10)
#     itr_status = models.BooleanField(default=False)
    
#     def __str__(self):
#         return self.name
    
    
class StudentDocuments(models.Model):
   
    def use_directory_path(instance,filename):
        return 'media/'+str(instance)+'/'+filename

    sid = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True,default=None,db_column='sid')
    inc_status = models.CharField(max_length=30,null=True,default=None)
    aadhaar_status = models.CharField(max_length=30,null=True, default=None)
    creamy_status = models.CharField(max_length=30,null=True,default=None)
    marksheet10_status = models.CharField(max_length=30,null=True,default=None)
    marksheet12_status = models.CharField(max_length=30,null=True,default=None)
    disability_status = models.CharField(max_length=30,null=True,default=None)
    vpass = models.SmallIntegerField(default = 0)    
    def date_trunc_field(self):
        return self.adob.date()
    
    def __str__(self):
        return str(self.sid)

class StuDocAdmin(models.Model):
    def use_directory_path(instance,filename):
        return 'media/'+str(instance)+'/'+filename

    sid = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True,default=None,db_column='sid') 
    incomecertificate = models.FileField(upload_to=use_directory_path,default=None)
    auid = models.SmallIntegerField(default=None)
    aname = models.CharField(max_length = 50, default=None,null=True)
    agender = models.CharField(max_length=1,default=None,null=True)
    aaddress = models.CharField(max_length = 255, default=None,null=True)
    adob = models.DateField(default=None,null=True)
    noncreamylayer = models.FileField(upload_to=use_directory_path,default=None)
    marksheet10 = models.FileField(upload_to=use_directory_path,default=None)
    marksheet12 = models.FileField(upload_to=use_directory_path,default=None)
    disabilitycert = models.FileField(upload_to=use_directory_path,default=None)
    rationcard = models.FileField(upload_to=use_directory_path,default=None)
    
    def __str__(self):
        return str(self.sid)
    
