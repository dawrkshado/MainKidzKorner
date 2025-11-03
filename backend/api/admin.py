from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin

# Register your models here.

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'first_name', 'last_name', 'get_role', 'is_staff', 'is_active']
    list_filter = ['role', 'is_staff', 'is_active']

    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('role',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('role',)}),
    )

    def get_role(self, obj):
        return obj.role.role if obj.role else '-'
    get_role.short_description = 'Role'


class UserChildAdmin(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'section', 'class_sched','birth_date', 'get_parent_full_name']
    list_filter = ['parent']
    search_fields = ['first_name', 'last_name', 'parent__first_name', 'parent__last_name']

    def get_parent_full_name(self, obj):
        if obj.parent:
            return f"{obj.parent.first_name} {obj.parent.last_name}"
        return '-'
    get_parent_full_name.short_description = "Parent Full Name"


class GameAdmin(admin.ModelAdmin):
    list_display = ['game_name', 'difficulty', 'level']
    list_filter = ['game_name', 'difficulty', 'level']
    search_fields = ['game_name', 'difficulty']


class TimeCompletionAdmin(admin.ModelAdmin):
    model = TimeCompletion
    list_display = ['child', 'get_game_type', 'get_difficulty', 'get_level', 'time', 'star']
    list_filter = ['game_level__game_name', 'game_level__difficulty', 'star']
    search_fields = ['child__first_name', 'child__last_name']
    readonly_fields = ['star']

    def get_game_type(self, obj):
        return obj.game_level.game_name   
    get_game_type.short_description = 'Game Type'
    get_game_type.admin_order_field = 'game_level__game_name'  
    def get_difficulty(self, obj):
        return obj.game_level.difficulty
    get_difficulty.short_description = 'Difficulty'
    get_difficulty.admin_order_field = 'game_level__difficulty'

    def get_level(self, obj):
        return obj.game_level.level
    get_level.short_description = 'Level'
    get_level.admin_order_field = 'game_level__level'


admin.site.register(Game, GameAdmin)
admin.site.register(TimeCompletion, TimeCompletionAdmin)
admin.site.register(Roles)
admin.site.register(UserChild, UserChildAdmin)
admin.site.register(CustomUser, CustomUserAdmin)
