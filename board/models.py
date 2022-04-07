from django.db import models
from account.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


# def upload_to(instance, filename):
#     return f'pet/{instance}/{filename}'


class Pet(models.Model):
    MALE = "ML"
    FEMALE = "FM"
    UNKNOWN = "UNK"

    GENDER = [(MALE, "Male"), (FEMALE, "Female"), (UNKNOWN, "Unknown")]

    CAT = "CT"
    DOG = "DG"
    RABBIT = "RB"
    BIRD = "BD"
    TORTOISE = "TR"
    OTHER = "OTH"

    TYPE = [
        (CAT, "Cat"),
        (DOG, "Dog"),
        (RABBIT, "Rabbit"),
        (BIRD, "Bird"),
        (TORTOISE, "Tortoise"),
        (OTHER, "Other"),
    ]

    type = models.CharField(max_length=8, choices=TYPE, default=CAT)
    image = models.ImageField(
        upload_to="media", null=True, blank=True, default="media/pet/img.png"
    )

    latitude = models.FloatField(
        validators=[MinValueValidator(-90), MaxValueValidator(90)]
    )

    longitude = models.FloatField(
        validators=[MinValueValidator(-180), MaxValueValidator(180)]
    )

    age = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(30)]
    )

    date = models.DateField()
    description = models.TextField()
    gender = models.CharField(max_length=8, choices=GENDER, default=MALE)

    class Meta:
        abstract = True


class FounderPet(Pet):
    founder = models.ForeignKey(
        User, related_name="founder_pet", on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.gender} -> founder {self.founder}"


class LostPet(Pet):
    name = models.CharField(max_length=56)
    owner = models.ForeignKey(
        User, related_name="lost_pet_user", on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.gender} -> founder {self.owner}"
