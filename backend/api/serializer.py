from rest_framework import serializers
from .models import *


class UserChildSerializer(serializers.ModelSerializer):
    birth_date = serializers.DateField(format="%d %B, %Y")
    parent_full_name = serializers.SerializerMethodField()
    child_full_name = serializers.SerializerMethodField()

    class Meta:
        model = UserChild
        fields = ['id','child_full_name', 'section','class_sched','birth_date', 'parent_full_name']
    def get_parent_full_name(self, obj):
        parent = obj.parent
        return f"{parent.first_name} {parent.last_name}"
    
    def get_child_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    

class CustomUserSerializer(serializers.ModelSerializer):
    children = UserChildSerializer(many=True, read_only=True)
    role_name = serializers.SerializerMethodField()
    
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'role_name', 'is_active', 'date_joined', 'children']
    
    def get_role_name(self, obj):
        return obj.role.role if obj.role else None


class Game(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['game_name','difficulty','level']

class gameSerializer(serializers.ModelSerializer):
    child = UserChildSerializer(read_only=True)
    game_level = Game(read_only=True)

    difficulty = serializers.CharField(source='game.difficulty', read_only=True)
    game_type = serializers.CharField(source='game_level.game', read_only=True)

    class Meta:
        model = TimeCompletion
        fields = ['child','game_type', 'difficulty','game_level','time', 'star']



class UploadedFileSerializer(serializers.ModelSerializer):
    uploader_name = serializers.CharField(source='uploader.username', read_only=True)

    class Meta:
        model = UploadedFile
        fields = ['id', 'title', 'file', 'uploaded_at', 'uploader_name']
