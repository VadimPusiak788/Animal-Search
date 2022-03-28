from django.db import models
from django.core.validators import MinLengthValidator, validate_email

from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):

    phone_number = models.CharField(max_length=20, help_text="User phone number",  unique=True, validators=[MinLengthValidator(6)])
    email = models.EmailField(_('Email address'), validators=[validate_email], unique=True)

    def __str__(self):
        return self.username
