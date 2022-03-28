from django.test import TestCase
from django.core.validators import MaxValueValidator, MinValueValidator
from django.core.exceptions import ValidationError

from board.models import LostPet, FounderPet
from account.models import User


class TestModelPet(TestCase):

    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(username='test', email='test@test.test',
                                        phone_number='380872343211')
        user.set_password('hello')
        user.save()

        pet = LostPet.objects.create(
            owner=user, type='CT', gender='UNK',
            latitude=25.55456, longitude=52.561236,
            age=5, date='2022-10-05', name='Lost'
        )
        pet.save()

    def test_object_validators_age(self):
        pet = LostPet.objects.get(id=1)

        validators = pet._meta.get_field('age').validators
        for age in validators:
            if isinstance(age, MinValueValidator):
                self.assertEqual(age.limit_value, 1)
            else:
                self.assertEqual(age.limit_value, 30)

    def test_object_validators_longitude(self):
        pet = LostPet.objects.get(id=1)

        validators = pet._meta.get_field('longitude').validators
        for age in validators:
            if isinstance(age, MinValueValidator):
                self.assertEqual(age.limit_value, -180)
            else:
                self.assertEqual(age.limit_value, 180)

    def test_object_validators_latitude(self):
        pet = LostPet.objects.get(id=1)

        validators = pet._meta.get_field('latitude').validators
        for age in validators:
            if isinstance(age, MinValueValidator):
                self.assertEqual(age.limit_value, -90)
            else:
                self.assertEqual(age.limit_value, 90)

    def test_date(self):
        with self.assertRaises(ValidationError):
            user = User.objects.get(id=1)
            LostPet.objects.create(owner=user, age=-100, date='202210-05',
                                   latitude=25.55456, longitude=52.561236)

    def test_choice_field(self):
        pet = LostPet.objects.get(id=1)
        default_value = pet._meta.get_field('image').default

        self.assertEqual(default_value, 'media/pet/img.png')
