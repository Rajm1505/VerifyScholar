# Generated by Django 4.0.6 on 2022-07-17 07:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentdetails',
            name='date_of_lastupdate',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='studentdetails',
            name='date_of_registration',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
