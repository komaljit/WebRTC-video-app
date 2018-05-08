from django.conf.urls import url
from .views import RegisterApi, GetPeerId

urlpatterns = [
    url('register', RegisterApi.as_view(), name='register'),
    url('getpeer', GetPeerId.as_view(), name='getpeer')
]
