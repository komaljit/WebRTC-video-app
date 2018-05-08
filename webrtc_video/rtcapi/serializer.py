from rest_framework.serializers import ModelSerializer
from .models import Peer


class RegisterSerializer(ModelSerializer):

    class Meta:
        model = Peer
        fields = ('email', 'rtc_id')


class GetPeerSerializer(ModelSerializer):

    class Meta:
        model = Peer
        fields = ('email', 'rtc_id')

