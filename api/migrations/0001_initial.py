# Generated by Django 4.1 on 2022-08-24 17:54

import api.models
from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('sid', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=255, unique=True)),
                ('password', models.CharField(max_length=255)),
                ('vpass', models.SmallIntegerField(default=0)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='family_income',
            fields=[
                ('sid', models.OneToOneField(db_column='sid', default=None, on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('relation', models.CharField(max_length=10)),
                ('name', models.CharField(max_length=30)),
                ('age', models.CharField(max_length=3)),
                ('employment', models.CharField(max_length=15)),
                ('yearly_income', models.CharField(max_length=10)),
                ('itr_status', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='FormDetails',
            fields=[
                ('sid', models.OneToOneField(db_column='sid', default=None, on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('plus18', models.BooleanField(default=False)),
                ('aadhaar', models.CharField(max_length=12)),
                ('minority_category', models.BooleanField(default=False)),
                ('disablity', models.BooleanField(default=False)),
                ('marital_status', models.CharField(choices=[('Married', 'Married'), ('Unmarried', 'Unmarried'), ('Divorced', 'Divorced'), ('Separated', 'Separated')], max_length=10)),
                ('cstate', models.CharField(choices=[('Andhra Pradesh', 'Andhra Pradesh'), ('Arunachal Pradesh', 'Arunachal Pradesh'), ('Assam', 'Assam'), ('Bihar', 'Bihar'), ('Chhattisgarh', 'Chhattisgarh'), ('Delhi', 'Delhi'), ('Goa', 'Goa'), ('Gujarat', 'Gujarat'), ('Haryana', 'Haryana'), ('Himachal Pradesh', 'Himachal Pradesh'), ('Jammu and Kashmir', 'Jammu and Kashmir'), ('Jharkhand', 'Jharkhand'), ('Karnataka', 'Karnataka'), ('Kerala', 'Kerala'), ('Madhya Pradesh', 'Madhya Pradesh'), ('Maharashtra', 'Maharashtra'), ('Manipur', 'Manipur'), ('Meghalaya', 'Meghalaya'), ('Mizoram', 'Mizoram'), ('Nagaland', 'Nagaland'), ('Orissa', 'Orissa'), ('Punjab', 'Punjab'), ('Rajasthan', 'Rajasthan'), ('Sikkim', 'Sikkim'), ('Tamil Nadu', 'Tamil Nadu'), ('Tripura', 'Tripura'), ('Uttar Pradesh', 'Uttar Pradesh'), ('Uttarakhand', 'Uttarakhand'), ('West Bengal', 'West Bengal'), ('Other', 'Other')], max_length=20)),
                ('cdistrict', models.CharField(max_length=30)),
                ('pstate', models.CharField(choices=[('Andhra Pradesh', 'Andhra Pradesh'), ('Arunachal Pradesh', 'Arunachal Pradesh'), ('Assam', 'Assam'), ('Bihar', 'Bihar'), ('Chhattisgarh', 'Chhattisgarh'), ('Delhi', 'Delhi'), ('Goa', 'Goa'), ('Gujarat', 'Gujarat'), ('Haryana', 'Haryana'), ('Himachal Pradesh', 'Himachal Pradesh'), ('Jammu and Kashmir', 'Jammu and Kashmir'), ('Jharkhand', 'Jharkhand'), ('Karnataka', 'Karnataka'), ('Kerala', 'Kerala'), ('Madhya Pradesh', 'Madhya Pradesh'), ('Maharashtra', 'Maharashtra'), ('Manipur', 'Manipur'), ('Meghalaya', 'Meghalaya'), ('Mizoram', 'Mizoram'), ('Nagaland', 'Nagaland'), ('Orissa', 'Orissa'), ('Punjab', 'Punjab'), ('Rajasthan', 'Rajasthan'), ('Sikkim', 'Sikkim'), ('Tamil Nadu', 'Tamil Nadu'), ('Tripura', 'Tripura'), ('Uttar Pradesh', 'Uttar Pradesh'), ('Uttarakhand', 'Uttarakhand'), ('West Bengal', 'West Bengal'), ('Other', 'Other')], default=None, max_length=20)),
                ('pdistrict', models.CharField(default=None, max_length=30)),
                ('address', models.CharField(max_length=300)),
                ('pincode', models.CharField(max_length=6)),
                ('coaching_required', models.CharField(max_length=70)),
                ('qualification', models.CharField(max_length=70)),
                ('qualification_status', models.CharField(choices=[('Appearing', 'Appearing'), ('Passed', 'Passed')], max_length=10)),
                ('instituteName_10', models.CharField(max_length=20)),
                ('hstate', models.CharField(choices=[('Andhra Pradesh', 'Andhra Pradesh'), ('Arunachal Pradesh', 'Arunachal Pradesh'), ('Assam', 'Assam'), ('Bihar', 'Bihar'), ('Chhattisgarh', 'Chhattisgarh'), ('Delhi', 'Delhi'), ('Goa', 'Goa'), ('Gujarat', 'Gujarat'), ('Haryana', 'Haryana'), ('Himachal Pradesh', 'Himachal Pradesh'), ('Jammu and Kashmir', 'Jammu and Kashmir'), ('Jharkhand', 'Jharkhand'), ('Karnataka', 'Karnataka'), ('Kerala', 'Kerala'), ('Madhya Pradesh', 'Madhya Pradesh'), ('Maharashtra', 'Maharashtra'), ('Manipur', 'Manipur'), ('Meghalaya', 'Meghalaya'), ('Mizoram', 'Mizoram'), ('Nagaland', 'Nagaland'), ('Orissa', 'Orissa'), ('Punjab', 'Punjab'), ('Rajasthan', 'Rajasthan'), ('Sikkim', 'Sikkim'), ('Tamil Nadu', 'Tamil Nadu'), ('Tripura', 'Tripura'), ('Uttar Pradesh', 'Uttar Pradesh'), ('Uttarakhand', 'Uttarakhand'), ('West Bengal', 'West Bengal'), ('Other', 'Other')], default=None, max_length=20)),
                ('hdistrict', models.CharField(max_length=30)),
                ('address_institute_10', models.CharField(max_length=200)),
                ('subject_taken', models.CharField(max_length=10)),
                ('year_pass', models.CharField(default=None, max_length=10)),
                ('scoring_system', models.CharField(choices=[('CGPA/OGPA', 'CGPA/OGPA'), ('% Marks', '% Marks')], max_length=10)),
                ('percentage', models.CharField(default=None, max_length=5)),
                ('availed_benefit', models.BooleanField(default=False)),
                ('num_siblings_availd_benefit', models.CharField(choices=[('0', '0'), ('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5')], max_length=2)),
                ('bank_accountholder_name', models.CharField(max_length=30)),
                ('bank_name', models.CharField(max_length=30)),
                ('bank_account_no', models.CharField(max_length=20)),
                ('bank_IFSC_code', models.CharField(max_length=10)),
                ('declaration_action', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='StudentDetails',
            fields=[
                ('sid', models.OneToOneField(db_column='sid', default=None, on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('nsp_id', models.CharField(max_length=20, null=True)),
                ('pms_benificiary_id', models.CharField(max_length=20, null=True)),
                ('caste_category', models.CharField(choices=[('sc', 'SC'), ('obc', 'OBC')], default='--Select--', max_length=20)),
                ('name', models.CharField(max_length=50)),
                ('fname', models.CharField(max_length=50)),
                ('gender', models.CharField(max_length=1)),
                ('mobile_number', models.CharField(max_length=10)),
                ('dob', models.DateField()),
                ('state_of_passing_10th_exam', models.CharField(choices=[('Andhra Pradesh', 'Andhra Pradesh'), ('Arunachal Pradesh', 'Arunachal Pradesh'), ('Assam', 'Assam'), ('Bihar', 'Bihar'), ('Chhattisgarh', 'Chhattisgarh'), ('Delhi', 'Delhi'), ('Goa', 'Goa'), ('Gujarat', 'Gujarat'), ('Haryana', 'Haryana'), ('Himachal Pradesh', 'Himachal Pradesh'), ('Jammu and Kashmir', 'Jammu and Kashmir'), ('Jharkhand', 'Jharkhand'), ('Karnataka', 'Karnataka'), ('Kerala', 'Kerala'), ('Madhya Pradesh', 'Madhya Pradesh'), ('Maharashtra', 'Maharashtra'), ('Manipur', 'Manipur'), ('Meghalaya', 'Meghalaya'), ('Mizoram', 'Mizoram'), ('Nagaland', 'Nagaland'), ('Orissa', 'Orissa'), ('Punjab', 'Punjab'), ('Rajasthan', 'Rajasthan'), ('Sikkim', 'Sikkim'), ('Tamil Nadu', 'Tamil Nadu'), ('Tripura', 'Tripura'), ('Uttar Pradesh', 'Uttar Pradesh'), ('Uttarakhand', 'Uttarakhand'), ('West Bengal', 'West Bengal'), ('Other', 'Other')], max_length=50)),
                ('board_10th_certificate_number', models.CharField(max_length=10)),
                ('year_of_passing_10th_board', models.IntegerField()),
                ('date_of_registration', models.DateTimeField(default=django.utils.timezone.now)),
                ('date_of_lastupdate', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='StudentDocuments',
            fields=[
                ('sid', models.OneToOneField(db_column='sid', default=None, on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('aadhar', models.CharField(default=None, max_length=30, null=True)),
                ('aname', models.CharField(default=None, max_length=30)),
                ('agender', models.CharField(default=None, max_length=1)),
                ('auid', models.CharField(default=None, max_length=4)),
                ('adob', models.DateField(default=None)),
                ('vpass', models.SmallIntegerField(default=0)),
                ('icname', models.CharField(default=None, max_length=100, null=True)),
                ('icincome', models.IntegerField(default=None, null=True)),
                ('incomecertificate', models.FileField(default=None, upload_to=api.models.StudentDocuments.use_directory_path)),
            ],
        ),
    ]
