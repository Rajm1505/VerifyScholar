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
    vpass = models.SmallIntegerField(default = 0)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return str(self.sid)

class StudentDetails(models.Model):
    sid = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True,default=None,db_column='sid')
    nsp_id = models.CharField(max_length = 20, null=True)
    pms_benificiary_id = models.CharField(max_length = 20, null=True)
    caste_category = models.CharField(max_length=20, choices=castecategory, default = '--Select--')
    name = models.CharField(max_length=50)
    fname = models.CharField(max_length=50)
    gender = models.CharField(max_length=1)  
    mobile_number = models.CharField(max_length=10)
    dob = models.DateField()
    state_of_passing_10th_exam = models.CharField(max_length=50, choices = states)
    board_10th_certificate_number = models.CharField(max_length=10)
    year_of_passing_10th_board = models.IntegerField()
    date_of_registration = models.DateTimeField(default=timezone.now)
    date_of_lastupdate = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.sid)

class FormDetails(models.Model):

    # fullName = models.CharField(max_length=50)
    # fname = models.CharField(max_length=50)
    # gender = models.CharField(max_length=1)
    # dob = models.DateField()
    # mobile_number= models.CharField(max_length=10)
    # emailid =  models.CharField(max_length=100)
    sid = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True,default=None,db_column='sid')
    plus18 = models.BooleanField(default=False)
    aadhaar = models.CharField(max_length = 12)
    minority_category = models.BooleanField(default=False)
    disablity = models.BooleanField(default=False)
    marital_status = models.CharField(max_length = 10,choices=marital_status)
    cstate = models.CharField(max_length=20,choices=states)
    cdistrict = models.CharField(max_length=30)
    pstate = models.CharField(max_length=20,choices=states,default=None)
    pdistrict = models.CharField(max_length=30,default=None)
    address = models.CharField(max_length=300)
    pincode = models.CharField(max_length=6)
    coaching_required = models.CharField(max_length=70)
    qualification = models.CharField(max_length=70)
    qualification_status = models.CharField(max_length=10,choices=qualification_status)
    instituteName_10 = models.CharField(max_length = 20)
    hstate = models.CharField(max_length=20,choices=states,default=None)
    hdistrict = models.CharField(max_length=30)
    address_institute_10 = models.CharField(max_length=200)
    subject_taken = models.CharField(max_length=10)
    year_pass = models.CharField(max_length=10,default=None)
    scoring_system = models.CharField(max_length=10,choices= scoring_system)
    percentage = models.CharField(max_length=5,default=None)
    availed_benefit = models.BooleanField(default=False)
    num_siblings_availd_benefit = models.CharField(max_length=2,choices=num_siblings)
    bank_accountholder_name = models.CharField(max_length=30)
    bank_name = models.CharField(max_length=30)
    bank_account_no = models.CharField(max_length=20)
    bank_IFSC_code  =models.CharField(max_length=10)
    declaration_action = models.BooleanField(default=False)

    def __str__(self):
        return self.aadhaar
    
class family_income(models.Model):

    sid = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True,default=None,db_column='sid')
    relation = models.CharField(max_length=10)
    name = models.CharField(max_length=30)
    age = models.CharField(max_length=3)
    employment = models.CharField(max_length=15)
    yearly_income = models.CharField(max_length=10)
    itr_status = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name
    
    
class StudentDocuments(models.Model):
   
    def use_directory_path(instance,filename):
        return 'media/'+str(instance)+'/'+filename

    sid = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True,default=None,db_column='sid')
    aadhar = models.CharField(max_length=30,null=True, default=None)
    aname = models.CharField(max_length=30,default=None)
    agender = models.CharField(max_length=1,default=None)
    auid = models.CharField(max_length=4,default=None)
    adob = models.DateField(default=None)
    incomecertificate = models.CharField(max_length=250,null=True, default=None)
    vpass = models.SmallIntegerField(default = 0)
    icname = models.CharField(max_length=100,null=True,default=None)
    icincome = models.IntegerField(default=None,null=True)
    incomecertificate = models.FileField(upload_to=use_directory_path,default=None)
    
    def date_trunc_field(self):
        return self.adob.date()
    
    def __str__(self):
        return str(self.sid)



    

