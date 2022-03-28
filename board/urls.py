from django.urls import path

from board.views import (LostPetView, FounderPetView, FounderPetDetailView, LostPetDetailView, UserRequestDetailFoundView,
                         CreateFoundPetView, CreateLostPetView, UserRequestFoundView, UserRequestLostView, UserRequestDetailLostView)

urlpatterns = [
    path('lost_pet/', LostPetView.as_view(), name='lost_pet'),
    path('founder_pet/', FounderPetView.as_view(), name='founder_pet'),
    path('founder_pet/<int:pk>/', FounderPetDetailView.as_view(), name='detail_founder_pet'),
    path('lost_pet/<int:pk>/', LostPetDetailView.as_view(), name='detail_lost_pet'),
    path('create_found_pet/', CreateFoundPetView.as_view(), name='create_found_pet'),
    path('create_lost_pet/', CreateLostPetView.as_view(), name='create_lost_pet'),
    path('request_user/lots/', UserRequestLostView.as_view(), name='request_user_lost'),
    path('request_user/found/', UserRequestFoundView.as_view(), name='request_user_found'),
    path('request_user/found/<int:pk>/', UserRequestDetailFoundView.as_view(), name='request_user_found_detail'),
    path('request_user/lost/<int:pk>/', UserRequestDetailLostView.as_view(), name='request_user_lost_detail')

]