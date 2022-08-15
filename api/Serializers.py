from rest_framework import serializers
from .models import StudentDetails
from .models import FormDetails, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['sid','name','email','password']
        extra_kwargs = {
            'password':{'write_only':True}
        }
        
    def create(self,validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance    
    

class StudentDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentDetails
        fields = ['sid','nsp_id',
        'pms_benificiary_id','caste_category','name','fname','gender','mobile_number',
        'email','dob','password','state_of_passing_10th_exam','board_10th_certificate_number',
        'year_of_passing_10th_board']
        
class StudentDetailsFetchSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentDetails
        fields = ['sid','name','gender','mobile_number']


class FormDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormDetails
        fields = ['plus18', 'aadhaar', 'minority_category', 'disablity', 'marital_status', 'state', 'district', 'address', 'pincode',
        'coaching_required', 'qualification', 'qualification_status', 'instituteName_10', 'district_10', 'address_institute_10',
        'subject_taken', 'scoring_system', 'availed_benefit', 'num_siblings_availd_benefit',
        'bank_accountholder_name', 'bank_name', 'bank_account_no', 'bank_IFSC_code', 'declaration_action']