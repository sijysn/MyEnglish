from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

from . import views

urlpatterns = [
  path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('users/register/', views.registerUser, name='user_register'),
  path('users/details/', views.getUserDetails, name='user_details'),
  path('users/details/update/', views.updateUserDetails, name='user_details_update'),

  path('folders/create/', views.createFolder, name='folder_create'),
  path('folders/update/', views.updateFolder, name='folder_update'),
  path('folders/delete/<int:folderId>/', views.deleteFolder, name='folder_delete'),
  path('folders/', views.getFolders, name='folders'),
  path('folders/<int:folderId>/', views.getFolder, name='folder'),

  path('quizzes/create/', views.createQuiz, name='quiz_create'),
  path('quizzes/update/', views.updateQuiz, name='quiz_update'),
  path('quizzes/set/', views.setQuiz, name='quiz_set'),
  path('quizzes/delete/<int:quizId>/', views.deleteQuiz, name='quiz_delete'),
  path('quizzes/last_answer/update/', views.updateLastAnswer, name='quizzes_last_answer_update'),
  path('quizzes/folder/<int:folderId>/', views.getAllQuizzesByFolder, name='quizzes_by_folder'),
  path('quizzes/folder/active/<int:folderId>/', views.getActiveQuizzesByFolder, name='quizzes_active_by_folder'),
  path('quizzes/active/', views.getActiveQuizzes, name='quizzes'),
  path('quizzes/<int:quizId>/', views.getQuiz, name='quiz'),
  path('quizzes/', views.getAllQuizzes, name='quizzes'),
]