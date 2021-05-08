from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import *

class CustomUser(UserAdmin):
  fieldsets = (
    (None, {'fields': ('username', 'password')}),
    ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'birth_date', 'gender_identity', 'profession')}),
    ('Permissions', {
        'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
    }),
    ('Important dates', {'fields': ('last_login', 'date_joined')}),
  )

# Register your models here.

admin.site.register(User, CustomUser)
admin.site.register(Folder)
admin.site.register(Quiz)