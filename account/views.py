from account.serializers import RegistrationSerializers, UserSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed

from account.models import User
from board.models import LostPet, FounderPet
from board.serializers import LostPetSerializer, FounderPetSerializer


class RegistrationView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializers = RegistrationSerializers(data=request.data)

        if serializers.is_valid():
            user = serializers.save()
            if user:
                token = Token.objects.create(user=user)

                return Response({'token': token.key}, status=status.HTTP_201_CREATED)

        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        if (username == '') or (password == ''):
            raise AuthenticationFailed(
                'Username and Password required')

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise AuthenticationFailed('Wrong Username or Password')

        if not user.check_password(password):
            raise AuthenticationFailed('Wrong Username or Password')

        serialized_user = UserSerializer(user).data

        try:
            token = Token.objects.get(user=user)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Token Failed')

        return Response({'token': token.key, 'user': serialized_user}, status=status.HTTP_200_OK)


class GetUserView(APIView):

    def get(self, request):
        user = request.user
        serialized_user = UserSerializer(user).data
        return Response({'user': serialized_user})





