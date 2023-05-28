from rest_framework import serializers
from .models import StudentDetails, StudentDocuments
from .models import FormDetails, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['uid','name','email','password']
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
        fields = ['uid','nsp_id','aadhaar_no',
        'pms_benificiary_id','caste_category','name','fname','mobile_number']
        
        extra_kwargs = {
            'uid':{'write_only':True}
        }
        
class StudentDetailsFetchSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentDetails
        fields = ['name','aadhaar_no','mobile_number']


class FormDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormDetails
        fields = ['sid','coaching_required', 'qualification', 'qualification_status',
        'bank_accountholder_name', 'bank_name', 'bank_account_no', 'bank_IFSC_code']
        
        extra_kwargs = {
            'sid':{'write_only':True}
        }
        
        
class StudentDocumentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentDocuments
        fields = ['sid','inc_status','aadhaar_status','creamy_status','marksheet10_status','marksheet12_status','disability_status','vpass']