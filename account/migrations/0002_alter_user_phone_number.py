# Generated by Django 4.0.2 on 2022-03-22 17:23

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("account", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="phone_number",
            field=models.CharField(
                help_text="User phone number",
                max_length=20,
                unique=True,
                validators=[django.core.validators.MinLengthValidator(6)],
            ),
        ),
    ]
