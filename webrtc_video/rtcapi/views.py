from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.authentication import SessionAuthentication
from .serializer import RegisterSerializer, GetPeerSerializer
from rest_framework.response import Response
from .models import Peer


class RegisterApi(APIView):
    # authentication_classes = (SessionAuthentication,)
    serializer_class = RegisterSerializer

    def post(self, request):
        return self.create(request)

    def create(self, request):
        print(request.data)
        serializer = self.serializer_class(data=request.data)
        print(serializer.is_valid())
        if serializer.is_valid(raise_exception=Response(status=400)):
            serializer.save()
            return Response(serializer.data,status=204)
        else:
            return Response(status=400)


class GetPeerId(RetrieveAPIView):
    # authentication_classes = (SessionAuthentication,)
    serializer_class = GetPeerSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer_class()
        serializer_data = serializer(instance)
        return Response(serializer_data.data)

    def get_object(self):
        email = self.request.data.get('email')
        return Peer.objects.get(email=email)
