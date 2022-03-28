from django.test import TestCase
from django.core.exceptions import ValidationError
from django.db import IntegrityError

from account.models import User


class TestModelUser(TestCase):

    @classmethod
    def setUpTestData(cls):

        user = User.objects.create_user(username='test', email='test@test.test',
                                        phone_number='380872343211')
        user.set_password('hello')
        user.save()

    def test_email_validators(self):
        with self.assertRaises(IntegrityError):
            User.objects.create_user(username='test', email='test@test.ds',
                                     phone_number='380872343211')

    def test_object_username(self):
        user = User.objects.get(id=1)

        self.assertEqual(str(user.username), 'test')

    def test_phone_number_max_length(self):
        user = User.objects.get(id=1)
        max_length = user._meta.get_field('phone_number').max_length

        self.assertEqual(max_length, 20)

    def test_email_label(self):
        user = User.objects.get(id=1)

        field_label = user._meta.get_field('email').verbose_name

        self.assertEqual(field_label, 'Email address')

