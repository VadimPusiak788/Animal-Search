from django.urls import reverse

from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIClient
from rest_framework import status

from board.models import FounderPet
from board.tests.factory import PetFactory
from account.tests.factory import UserFactory


class TestFoundPetView(APITestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.user_object = UserFactory.build()
        cls.user_saved = UserFactory.create()

        cls.found_pet_saved = PetFactory.create_batch(10)
        cls.found_pet_object = PetFactory.build()
        cls.client = APIClient()

    def test_list_found_pet(self):
        list_url = reverse('founder_pet')
        response = self.client.get(list_url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        found_pet_count = FounderPet.objects.count()

        self.assertEqual(len(response.data), found_pet_count)

    def test_detail_found_pet(self):
        found_pet = FounderPet.objects.get(id=1)

        detail_url = reverse('detail_founder_pet', kwargs={'pk': found_pet.id})

        response = self.client.get(detail_url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.data['description'], found_pet.description)


class TestMyFoundPet(APITestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.user_object = UserFactory.build()
        user_saved = UserFactory.create()

        cls.found_pet_saved = PetFactory.create(founder=user_saved)
        cls.found_pet_object = PetFactory.build()
        cls.client = APIClient()
        cls.token = Token.objects.create(user=user_saved)

    def test_create_found_pet(self):
        post_url = reverse('create_found_pet')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        found_pet_dict = {
            'type':  self.found_pet_object.type,
            'latitude':  self.found_pet_object.latitude,
            'longitude':  self.found_pet_object.longitude,
            'age': self.found_pet_object.age,
            'date': self.found_pet_object.date,
            'description': self.found_pet_object.description,
            'gender': self.found_pet_object.gender,
        }

        response = self.client.post(post_url, found_pet_dict, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertEqual(FounderPet.objects.count(), 2)

    def test_delete_found_pet_by_founder(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        delete_url = reverse('request_user_found_detail', kwargs={'pk': self.found_pet_saved.id})

        response = self.client.delete(delete_url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.assertEqual(FounderPet.objects.count(), 0)

    def test_update_found_pet_by_founder(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        update_url = reverse('request_user_found_detail', kwargs={'pk': self.found_pet_saved.id})

        found_pet_dict_update = {
            'type': self.found_pet_object.type,
            'latitude': self.found_pet_object.latitude,
            'longitude': self.found_pet_object.longitude,
            'age': self.found_pet_object.age,
            'description': self.found_pet_object.description,
        }

        response = self.client.patch(update_url, found_pet_dict_update, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
