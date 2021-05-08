from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import *


class UserSerializer(serializers.ModelSerializer):
  isAdmin = serializers.SerializerMethodField()

  class Meta:
    model = User
    fields = ['id', 'username', 'email', 'isAdmin']

  def get_isAdmin(self, obj):
    return obj.is_staff


class UserSerializerWithToken(UserSerializer):
  token = serializers.SerializerMethodField()

  class Meta:
    model = User
    fields = ['id', 'username', 'email', 'isAdmin', 'token']

  def get_token(self, user):
    refresh = RefreshToken.for_user(user)
    return str(refresh.access_token)


class UserDetailsSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['username', 'email', 'password', 'first_name', 'last_name', 'gender_identity', 'profession', 'birth_date', 'last_login']


class FolderSerializer(serializers.ModelSerializer):
  class Meta:
    model = Folder
    fields = '__all__'


class QuizSerializer(serializers.ModelSerializer):
  class Meta:
    model = Quiz
    fields = '__all__'
