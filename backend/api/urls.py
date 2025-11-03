from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *


urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("user-profile/", user_profile, name="user-profile"),
    path("parent_profile_teacherview/", parent_profile_teacherview, name="parent_profile"),
     path("roles/", get_roles, name="roles"),
    path("logout", logout_api, name="logout"),
    path("login/", login_view, name="login"),
    path("parent/", parent_profile, name="parent-profile"),
    path("child_register/", child_register, name="register_child"),
    path("time_completions/", time_completions,name="time_completions" ),
    path("upload_file/", upload_file, name="upload-file"),
    path("files/", list_files, name="list-files"),
    path("delete_file/<int:pk>/", delete_file, name="delete_file"),
    path("save_progress/", save_progress, name="save-progress"),
    path("child_profile/", student_profile_teacherview, name="child_profile"),
    path("delete_child/", delete_child, name="delete_child"),
    path('register/', register_user, name='register_user'),
    path('users/', list_all_users, name='list_all_users'),
    path('users/<int:user_id>/', update_user, name='update_user'),
    path('users/<int:user_id>/delete-info/', get_user_deletion_info, name='get_user_deletion_info'),
    path('users/<int:user_id>/delete/', delete_user, name='delete_user'),
    path('parent-children/', list_parent_children, name='list_parent_children'),
    path('children/<int:child_id>/', update_child, name='update_child'),
]