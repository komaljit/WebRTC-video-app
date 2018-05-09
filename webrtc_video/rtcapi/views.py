from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from django.shortcuts import get_object_or_404
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
        print("here")
        serializer = self.serializer_class(data=request.data)
        print(serializer.is_valid())
        if serializer.is_valid(raise_exception=Response(status=400)):
            serializer.save()
            return Response(serializer.data,status=204)
        else:
            return Response(status=400)


class GetPeerId(APIView):
    # authentication_classes = (SessionAuthentication,)
    serializer_class = GetPeerSerializer

    def post(self, request):
        print(self.request.data)
        return self.retrieve(request)

    def retrieve(self, request):
        instance = self.get_object()
        serializer = self.serializer_class
        serializer_data = serializer(instance)
        print(serializer_data.data)
        return Response(serializer_data.data)

    def get_object(self):
        return get_object_or_404(Peer, email=self.request.data.get('email'))
