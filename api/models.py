from pyexpat import model
from tkinter import CASCADE
from django.db import models

# Create your models here.
castecategory = (
    ('SC','SC'),
    ('OBC','OBC')
)
marital_status = (
    ('Married','Married'),
    ('Unmarried','Unmarried'),
    ('Divorced','Divorced'),
    ('Seprated','Seprated')
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

class StudentRegistration(models.Model):
    sid = models.CharField(max_length=15)
    nsp_id_radio = models.BooleanField(default=False)
    nsp_id = models.CharField(max_length = 20)
    pms_benificiary_id_radio = models.BooleanField(default=False)
    pms_benificiary_id = models.CharField(max_length = 20)
    caste_category = models.CharField(max_length=20, choices=castecategory, default = '--Select--')
    name = models.CharField(max_length=50)
    fname = models.CharField(max_length=50)
    gender = models.CharField(max_length=1)  
    mobile_number = models.CharField(max_length=10)
    emailid =  models.CharField(max_length=100)
    dob = models.DateField()
    password = models.CharField(max_length=100)
    state_of_passing_10th_exam = models.CharField(max_length=50, choices = states)
    board_10th_certificate_number = models.CharField(max_length=10)
    year_of_passing_10th_board = models.IntegerField()
    date_of_registration = models.DateField(auto_now_add=True)
    date_of_lastupdate = models.DateField(auto_now = True)



    def __str__(self):
        return self.name

class FormDetails(models.Model):

    # fullName = models.CharField(max_length=50)
    # fname = models.CharField(max_length=50)
    # gender = models.CharField(max_length=1)
    # dob = models.DateField()
    # mobile_number= models.CharField(max_length=10)
    # emailid =  models.CharField(max_length=100)
    plus18 = models.BooleanField(default=False)
    adhar = models.CharField(max_length = 20)
    minority_category = models.BooleanField(default=False)
    disablity = models.BooleanField(default=False)
    matiral_status = models.CharField(max_length = 10,choices=marital_status)
    state = models.CharField(max_length=20,choices=states)
    district = models.CharField(max_length=30)
    address = models.CharField(max_length=300)
    pincode = models.CharField(max_length=6)
    coaching_required = models.CharField(max_length=70)
    qualification = models.CharField(max_length=70)
    qualification_status = models.BooleanField(default=False)
    instituatName_10 = models.CharField(max_length = 20)
    district_10 = models.CharField(max_length=30)
    address_instituat_10 = models.CharField(max_length=200)
    subject_teken = models.CharField(max_length=10)
    scoring_system = models.CharField(max_length=10,choices= scoring_system)
    availed_benefit = models.BooleanField(default=False)
    num_siblings_availd_benefit = models.CharField(2,choices=num_siblings)
    bank_accountholder_name = models.CharField(max_length=30)
    bank_name = models.CharField(max_length=30)
    bank_account_no = models.CharField(max_length=20)
    bank_IFSC_code = models.CharField(max_length=10)
    declaration_action = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
class family_income(models.Model):

    sid = models.ForeignKey(StudentRegistration.sid,on_delete=CASCADE)
    relation = models.CharField(max_length=10)
    name = models.CharField(max_length=30)
    age = models.CharField(max_length=3)
    Employeement = models.CharField(max_length=15)
    yearly_income = models.CharField(max_length=10)
    ITR_status = models.BooleanField(default=False)


    def __str__(self):
        return self.name