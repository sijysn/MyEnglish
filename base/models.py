from django.db import models
from django.contrib.auth.models import AbstractUser

from .consts.modelChoiceConsts import GENDER_IDENTITY_CHOICES, LAST_ANSWER_CHOICES

# Create your models here.

class User(AbstractUser):
  gender_identity = models.CharField(max_length=30, choices=GENDER_IDENTITY_CHOICES, default='未回答', null=True, blank=True)
  birth_date = models.DateField(null=True, blank=True)
  first_name = models.CharField(max_length=30, null=True, blank=True)
  last_name = models.CharField(max_length=30, null=True, blank=True)
  profession = models.CharField(max_length=30,null=True, blank=True)

  def __str__(self):
    return str(self.username)


class Folder(models.Model):
  user_id = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='folder_user_id')
  name = models.CharField(max_length=30, null=True, blank=True)
  created_at = models.DateField(auto_now_add=True)
  updated_at = models.DateField(auto_now=True)

  def __str__(self):
    return str(self.name)


class Quiz(models.Model):
  user_id = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='quiz_user_id')
  folder_id = models.ForeignKey(Folder, on_delete=models.SET_NULL, null=True, related_name='quiz_folder_id')
  word = models.CharField(max_length=50, null=True, blank=True)
  meaning = models.CharField(max_length=50, null=True, blank=True)
  mistake = models.IntegerField(default=0, null=True, blank=True)
  last_answer = models.CharField(max_length=30, choices=LAST_ANSWER_CHOICES, default='未回答', null=True, blank=True)
  is_active = models.BooleanField(default=True, null=True, blank=True)
  created_at = models.DateField(auto_now_add=True)
  updated_at = models.DateField(auto_now=True)

  def __str__(self):
    return str(self.word)