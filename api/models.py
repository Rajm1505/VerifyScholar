from pyexpat import model
from django.db import models

# Create your models here.
castecategory = (
    ('SC','SC'),
    ('OBC','OBC')
)
passingstates = (
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

class StudentRegistration(models.Model):
    sid = models.CharField(max_length=15)
    nsp_id_radio = models.BooleanField(default=False)
    nsp_id = models.CharField(max_length = 20)
    pms_benificiary_id_radio = models.BooleanField(default=False)
    pms_benificiary_id = models.CharField(max_length = 20)
    caste_category = models.CharField(max_length=20, choices=castecategory, default = '--Select--')
    name = models.CharField(max_length=100)
    fname = models.CharField(max_length=100)
    gender = models.CharField(max_length=6)  
    mobile_number = models.CharField(max_length=13)
    emailid =  models.CharField(max_length=100)
    dob = models.DateField()
    password = models.CharField(max_length=100)
    state_of_passing_10th_exam = models.CharField(max_length=50, choices = passingstates)
    board_10th_certificate_number = models.CharField(max_length=10)
    year_of_passing_10th_board = models.IntegerField()
    date_of_registration = models.DateField(auto_now_add=True)
    date_of_lastupdate = models.DateField(auto_now = True)



    def __str__(self):
        return self.name
    
