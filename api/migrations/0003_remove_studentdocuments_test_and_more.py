# Generated by Django 4.1 on 2022-08-22 18:46

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_studentdocuments_test'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='studentdocuments',
            name='test',
        ),
        migrations.AddField(
            model_name='studentdocuments',
            name='icincome',
            field=models.IntegerField(default=None),
        ),
        migrations.AddField(
            model_name='studentdocuments',
            name='icname',
            field=models.CharField(default=None, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='studentdocuments',
            name='incomecertificate',
            field=models.FileField(default=None, upload_to=api.models.StudentDocuments.use_directory_path),
        ),
    ]