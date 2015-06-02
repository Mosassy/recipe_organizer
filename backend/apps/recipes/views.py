from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from serializers import *
from models import Recipe


class RecipeList(generics.ListAPIView):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()


class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()


class AddRecipe(generics.CreateAPIView):
    serializer_class = RecipeSerializer


class GetUserInfo(generics.RetrieveAPIView):
    authentication_classes = (TokenAuthentication,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class RegisterUser(generics.CreateAPIView):
    serializer_class = UserSerializer


class GetUserRecipes(generics.ListAPIView):
    authentication_classes = (TokenAuthentication,)
    serializer_class = RecipeSerializer

    def get_queryset(self):
        return Recipe.objects.filter(owner=self.request.user)


