from django.contrib import admin

from board.models import LostPet, FounderPet

admin.site.register(LostPet)
admin.site.register(FounderPet)