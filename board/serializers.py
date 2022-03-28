from rest_framework import serializers
import django.contrib.auth.password_validation as validators

from account.models import User
from board.models import LostPet, FounderPet
from account.serializers import UserSerializer


class ChoiceField(serializers.ChoiceField):

    def to_representation(self, obj):
        if obj == '' and self.allow_blank:
            return obj
        return self._choices[obj]

    def to_internal_value(self, data):
        if data == '' and self.allow_blank:
            return ''

        for key, val in self._choices.items():
            if val == data:
                return key
        self.fail('invalid_choice', input=data)


class LostPetSerializer(serializers.ModelSerializer):
    owner = UserSerializer()
    type = ChoiceField(choices=LostPet.TYPE)
    gender = ChoiceField(choices=LostPet.GENDER)

    class Meta:
        model = LostPet
        fields = '__all__'


class FounderPetSerializer(serializers.ModelSerializer):
    founder = UserSerializer()
    type = ChoiceField(choices=FounderPet.TYPE)
    gender = ChoiceField(choices=FounderPet.GENDER)

    class Meta:
        model = FounderPet
        fields = '__all__'


class CreateFounderPetSerializer(serializers.ModelSerializer):

    class Meta:
        model = FounderPet
        fields = ('id', 'type', 'image', 'latitude', 'longitude', 'age', 'date', 'description', 'gender')


class CreateLostPetSerializer(serializers.ModelSerializer):

    class Meta:
        model = LostPet
        fields = ('id', 'type', 'image', 'latitude', 'longitude', 'age', 'date', 'description', 'gender', 'name')


class FounderPetSerializerDetail(serializers.ModelSerializer):

    class Meta:
        model = FounderPet
        fields = '__all__'



