from factory import django, Faker, PostGenerationMethodCall, Sequence

from account.models import User


class UserFactory(django.DjangoModelFactory):

    class Meta:
        model = User

    id = Sequence(lambda n: n)
    username = Faker('user_name')
    phone_number = Sequence(lambda n: '123-1234-%04d' % n)
    email = Faker('email')
    password = PostGenerationMethodCall(
        'set_password', 'defaultpassword'
    )



