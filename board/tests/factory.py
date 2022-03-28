import datetime


from factory import django, Faker, LazyAttribute, Sequence, SubFactory
from factory.fuzzy import FuzzyDate, FuzzyText, FuzzyInteger


from account.tests.factory import UserFactory
from account.models import User
from board.models import FounderPet


TYPE_VALUES = [x[0] for x in FounderPet.TYPE]

GENDER_VALUES = [x[0] for x in FounderPet.GENDER]


class PetFactory(django.DjangoModelFactory):

    class Meta:
        model = FounderPet

    class Params:
        geo_data = Faker('location_on_land')

    id = Sequence(lambda n: n)

    type = Faker('random_element', elements=TYPE_VALUES)
    gender = Faker('random_element', elements=GENDER_VALUES)
    # image
    latitude = LazyAttribute(lambda o: o.geo_data[0])
    longitude = LazyAttribute(lambda o: o.geo_data[1])
    age = FuzzyInteger(0, 30)
    date = FuzzyDate(datetime.date.today()-datetime.timedelta(days=30), datetime.date.today())
    description = FuzzyText(length=100)

    founder = SubFactory(
        UserFactory,
    )

