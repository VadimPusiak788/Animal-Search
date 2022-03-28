from rest_framework import serializers
from account.models import User
import django.contrib.auth.password_validation as validators


class RegistrationSerializers(serializers.ModelSerializer):

    password1 = serializers.CharField(write_only=True, required=True, validators=[validators.validate_password])
    password2 = serializers.CharField(write_only=True, required=True, validators=[validators.validate_password])

    class Meta:
        model = User
        fields = ('username', 'password1', 'password2', 'email', 'phone_number')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password1 = validated_data.pop("password1")
        password2 = validated_data.pop("password2")

        if password1 != password2:
            raise serializers.ValidationError('Password dont match')

        user = User(**validated_data)
        user.set_password(password1)
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'phone_number', 'email')


