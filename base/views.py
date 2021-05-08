from django.shortcuts import render
from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status

from .models import *
from .serializers import *

# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
          data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
  data = request.data

  is_registered = User.objects.filter(username=data['email']).exists()
  if is_registered:
    content = {'detail': 'This email has already been registered'}
    return Response(content, status=status.HTTP_400_BAD_REQUEST)

  user = User.objects.create(
    first_name = data['firstName'], 
    last_name = data['lastName'],
    username = data['email'],
    password = make_password(data['password']),
    email = data['email'],
  )

  serializer = UserDetailsSerializer(user, many=False)
  return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserDetails(request):
  user = request.user

  target_user = User.objects.get(id=user.id)

  serializer = UserDetailsSerializer(target_user, many=False)
  return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserDetails(request):
  user = request.user
  data = request.data

  target_user = User.objects.get(id=user.id)

  try:
    if data['email'] != '':
      target_user.username = data['email']
      target_user.email = data['email']
    if data['password'] != '':
      target_user.password = make_password(data['password'])
    if data['genderIdentity'] != '':
      target_user.gender_identity = data['genderIdentity']
    if data['birthDate'] != '':
      target_user.birth_date = data['birthDate']
    if data['firstName'] != '':
      target_user.first_name = data['firstName']
    if data['lastName'] != '':
      target_user.last_name = data['lastName']
    if data['profession'] != '':
      target_user.profession = data['profession']

    target_user.save()

    serializer = UserDetailsSerializer(target_user, many=False)
    return Response(serializer.data)
  except:
    content = {'detail': 'This email has already been used'}
    return Response(content, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFolders(request):
  user = request.user
  folders = Folder.objects.filter(user_id=user)

  serializer = FolderSerializer(folders, many=True)
  return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFolder(request, folderId):
  folder = Folder.objects.get(id=folderId)

  serializer = FolderSerializer(folder, many=False)
  return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createFolder(request):
  user = request.user
  data = request.data

  new_folder = Folder.objects.create(
    user_id=user,
    name=data['name']
  )

  serializer = FolderSerializer(new_folder, many=False)
  return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateFolder(request):
  user = request.user
  data = request.data

  try:
    selected_folder = Folder.objects.get(id=data['folderId'])

    selected_folder.name = data['name']

    selected_folder.save()

    serializer = FolderSerializer(selected_folder, many=False)
    return Response(serializer.data)
  except:
    content = {'detail': 'Does not exist'}
    return Response(content, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteFolder(request, folderId):
  try:
    selected_folder = Folder.objects.get(id=folderId)
    selected_folder.delete()

    serializer = FolderSerializer(selected_folder, many=False)
    deleted_folder_name = serializer.data['name']
    return Response(f'{deleted_folder_name} was deleted')

  except:
    content = {'detail': 'Does not exist'}
    return Response(content, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllQuizzes(request):
  user = request.user
  quizzes = Quiz.objects.filter(user_id=user)

  serializer = QuizSerializer(quizzes, many=True)
  return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getActiveQuizzes(request):
  user = request.user
  quizzes = Quiz.objects.filter(user_id=user, is_active=True)

  serializer = QuizSerializer(quizzes, many=True)
  return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllQuizzesByFolder(request, folderId):
  folder = Folder.objects.get(id=folderId)
  quizzes = Quiz.objects.filter(folder_id=folder)
  serializer = QuizSerializer(quizzes, many=True)
  return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getActiveQuizzesByFolder(request, folderId):
  folder = Folder.objects.get(id=folderId)
  quizzes = Quiz.objects.filter(folder_id=folder, is_active=True)
  serializer = QuizSerializer(quizzes, many=True)
  return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getQuiz(request, quizId):
  quiz = Quiz.objects.get(id=quizId)
  serializer = QuizSerializer(quiz, many=False)
  return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createQuiz(request):
  user = request.user
  data = request.data
  
  folder = Folder.objects.get(id=data['folderId'])

  quiz = Quiz.objects.create(
    user_id=user,
    folder_id=folder,
    word=data['word'],
    meaning=data['meaning'],
  )

  serializer = QuizSerializer(quiz, many=False)
  return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateQuiz(request):
  data = request.data

  try:
    quiz = Quiz.objects.get(id=data['quizId'])

    quiz.word = data['word']
    quiz.meaning = data['meaning']

    quiz.save()

    serializer = QuizSerializer(quiz, many=False)
    return Response(serializer.data)
  except:
    content = {'detail': 'Does not exist'}
    return Response(content, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateLastAnswer(request):
  data = request.data

  try:
    quiz = Quiz.objects.get(id=data['quizId'])

    quiz.last_answer = data['lastAnswer']
    if data['lastAnswer'] == '不正解':
      quiz.mistake += 1

    quiz.save()

    serializer = QuizSerializer(quiz, many=False)
    return Response(serializer.data)
  except:
    content = {'detail': 'Does not exist'}
    return Response(content, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def setQuiz(request):
  user = request.user
  data = request.data

  try:
    quiz = Quiz.objects.get(id=data['quizId'])

    if quiz.is_active == True:
      quiz.is_active = False
    else:
      quiz.is_active = True

    quiz.save()

    serializer = QuizSerializer(quiz, many=False)
    return Response(serializer.data)
  except:
    content = {'detail': 'Does not exist'}
    return Response(content, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteQuiz(request, quizId):
  try:
    quiz = Quiz.objects.get(id=quizId)
    quiz.delete()

    serializer = QuizSerializer(quiz, many=False)
    deleted_word = serializer.data['word']
    return Response(f'{deleted_word} was deleted')

  except:
    content = {'detail': 'Does not exist'}
    return Response(content, status=status.HTTP_400_BAD_REQUEST)