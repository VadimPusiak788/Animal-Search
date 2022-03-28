from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.http import Http404

from board.models import LostPet, FounderPet
from board.serializers import (LostPetSerializer, FounderPetSerializer, FounderPetSerializerDetail,
                               CreateFounderPetSerializer, CreateLostPetSerializer)


class LostPetView(generics.ListCreateAPIView):

    queryset = LostPet.objects.all()
    serializer_class = LostPetSerializer


class FounderPetView(generics.ListAPIView):

    queryset = FounderPet.objects.all()
    serializer_class = FounderPetSerializer


class FounderPetDetailView(generics.RetrieveAPIView):
    queryset = FounderPet.objects.all()
    serializer_class = CreateFounderPetSerializer


class LostPetDetailView(generics.RetrieveAPIView):
    queryset = LostPet.objects.all()
    serializer_class = CreateLostPetSerializer


class CreateFoundPetView(APIView):

    def post(self, request):
        serializer = CreateFounderPetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(founder=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateLostPetView(APIView):

    def post(self, request):
        serializer = CreateLostPetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRequestLostView(generics.ListAPIView):

    serializer_class = LostPetSerializer

    def get_queryset(self):
        user = self.request.user

        return LostPet.objects.filter(owner=user)


class UserRequestFoundView(generics.ListAPIView):

    serializer_class = FounderPetSerializer

    def get_queryset(self):

        user = self.request.user

        return FounderPet.objects.filter(founder=user)


class UserRequestDetailFoundView(APIView):

    def get_object(self, pk):
        try:
            return FounderPet.objects.get(pk=pk)
        except LostPet.DoesNotExist:
            raise Http404

    def patch(self, request, pk):

        found_pet = self.get_object(pk=pk)

        update_serializer = CreateFounderPetSerializer(found_pet, data=request.data, partial=True)
        if update_serializer.is_valid():
            update_serializer.save()

            return Response(update_serializer.data, status=status.HTTP_202_ACCEPTED)

        return Response(
            update_serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk):

        found_pet = self.get_object(pk=pk)
        found_pet.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class UserRequestDetailLostView(APIView):

    def get_object(self, pk):
        try:
            return LostPet.objects.get(pk=pk)
        except LostPet.DoesNotExist:
            raise Http404

    def patch(self, request, pk):

        lost_pet = self.get_object(pk=pk)

        update_serializer = CreateLostPetSerializer(lost_pet, data=request.data, partial=True)
        if update_serializer.is_valid():
            update_serializer.save()

            return Response(update_serializer.data, status=status.HTTP_202_ACCEPTED)

        return Response(
            update_serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk):

        lost_pet = self.get_object(pk=pk)
        lost_pet.delete()

        return Response(status=status.HTTP_200_OK)


