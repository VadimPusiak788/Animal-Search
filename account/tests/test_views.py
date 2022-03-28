from django.urls import reverse
import json

from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from faker import Faker

from account.tests.factory import UserFactory
from account.models import User


class TestUserSighUpView(APITestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.user_object = UserFactory.build()
        cls.user_saved = UserFactory.create()
        cls.client = APIClient()
        cls.sighup_url = reverse('registration')
        cls.faker_obj = Faker()

    def test_if_data_correct_then_signup(self):
        signup_dict = {
            'username': self.user_object.username,
            'password1': self.user_object.password,
            'password2': self.user_object.password,
            'phone_number': self.user_object.phone_number,
            'email':  self.user_object.email
        }

        response = self.client.post(self.sighup_url, signup_dict, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertEqual(User.objects.count(), 2)

        new_user = User.objects.get(username=self.user_object.username)

        self.assertEqual(
            new_user.phone_number,
            self.user_object.phone_number,
        )
        self.assertEqual(
            new_user.email,
            self.user_object.email,
        )

    def test_if_username_already_exist_dont_sighup(self):

        signup_dict = {
            'username': self.user_saved.username,
            'password1': self.user_object.password,
            'password2': self.user_object.password,
            'phone_number': self.user_object.phone_number,
            'email': self.user_object.email
        }

        response = self.client.post(self.sighup_url, signup_dict)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        self.assertEqual(response.data['username'][0], 'A user with that username already exists.')

        username_query = User.objects.filter(username=self.user_saved.username)

        self.assertEqual(username_query.count(), 1)


class TestUserSighInView(APITestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.user_object = UserFactory.build()
        cls.user_saved = UserFactory.create(password='new_pass')
        cls.client = APIClient()
        cls.sighin_url = reverse('login')
        cls.faker_obj = Faker()

        cls.token, cls.created = Token.objects.get_or_create(user=cls.user_saved)

    def test_if_user_exist(self):

        signin_dict = {
            'username': self.user_saved.username,
            'password': 'new_pass',
        }

        response = self.client.post(self.sighin_url, signin_dict, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.data['token'], str(self.token))

        username_query = User.objects.filter(username=self.user_saved.username)

        self.assertEqual(username_query.count(), 1)

    def test_if_user_dont_exist(self):

        signin_dict = {
            'username': self.user_object.username,
            'password': self.user_object.password,
        }

        response = self.client.post(self.sighin_url, signin_dict, format='json')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.assertEqual(response.data['detail'], 'Wrong Username or Password')


