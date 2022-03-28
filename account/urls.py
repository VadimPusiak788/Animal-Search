from django.urls import path
from account.views import RegistrationView, LoginView, GetUserView


urlpatterns = [
    path('registration/', RegistrationView.as_view(), name='registration'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/', GetUserView.as_view(), name='profile'),
]