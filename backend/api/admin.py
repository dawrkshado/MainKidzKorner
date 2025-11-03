from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin

# -----------------------------
# CustomUser
# -----------------------------
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


# -----------------------------
# UserChild
# -----------------------------
class UserChildAdmin(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'section', 'class_sched','birth_date', 'get_parent_full_name']
    list_filter = ['parent']
    search_fields = ['first_name', 'last_name', 'parent__first_name', 'parent__last_name']

    def get_parent_full_name(self, obj):
        if obj.parent:
            return f"{obj.parent.first_name} {obj.parent.last_name}"
        return '-'
    get_parent_full_name.short_description = "Parent Full Name"


# -----------------------------
# Game
# -----------------------------
class GameAdmin(admin.ModelAdmin):
    list_display = ('game_name', 'level')  # removed 'difficulty'
    list_filter = ('game_name', 'level')  # removed 'difficulty'


# -----------------------------
# TimeCompletion
# -----------------------------
class TimeCompletionAdmin(admin.ModelAdmin):
    model = TimeCompletion
    list_display = ['child', 'get_game_name', 'get_level', 'time', 'star']
    list_filter = ['game_level__game_name', 'star']  # removed 'game_level__difficulty'
    search_fields = ['child__first_name', 'child__last_name']
    readonly_fields = ['star']

    def get_game_name(self, obj):
        return obj.game_level.game_name
    get_game_name.short_description = 'Game Name'
    get_game_name.admin_order_field = 'game_level__game_name'

    def get_level(self, obj):
        return obj.game_level.level
    get_level.short_description = 'Level'
    get_level.admin_order_field = 'game_level__level'


# -----------------------------
# Register Models
# -----------------------------
admin.site.register(Game, GameAdmin)
admin.site.register(TimeCompletion, TimeCompletionAdmin)
admin.site.register(Roles)
admin.site.register(UserChild, UserChildAdmin)
admin.site.register(CustomUser, CustomUserAdmin)
