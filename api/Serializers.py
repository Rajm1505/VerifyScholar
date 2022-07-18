from rest_framework import serializers
from .models import StudentDetails

class StudentDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentDetails
        fields = ['sid','nsp_id_radio','nsp_id','pms_benificiary_id_radio',
        'pms_benificiary_id','caste_category','name','fname','gender','mobile_number',
        'emailid','dob','password','state_of_passing_10th_exam','board_10th_certificate_number',
        'year_of_passing_10th_board']

