from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate,  get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Game, TimeCompletion, UserChild, UploadedFile, CustomUser,Roles
from .serializer import CustomUserSerializer, UploadedFileSerializer, UserChildSerializer, gameSerializer


from rest_framework.permissions import AllowAny

# Create your views here.
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username_or_email = request.data.get('username')
    password = request.data.get('password')
    
    user = None
    
    # Check if input is an email (contains @)
    if '@' in username_or_email:
        try:
            # Try to find user by email first
            user_obj = CustomUser.objects.get(email=username_or_email)
            # Authenticate using the username from the found user
            user = authenticate(username=user_obj.username, password=password)
        except CustomUser.DoesNotExist:
            user = None
    else:
        # Try authenticating as username
        user = authenticate(username=username_or_email, password=password)

    if user is not None:
        # If user has no role, assign default "Parent" role
        if user.role is None:
            try:
                default_role = Roles.objects.get(role="Parent")
                user.role = default_role
                user.save()
            except Roles.DoesNotExist:
                # If roles don't exist, create them
                Roles.objects.get_or_create(role="Teacher")
                Roles.objects.get_or_create(role="Parent")
                Roles.objects.get_or_create(role="Admin")
                default_role = Roles.objects.get(role="Parent")
                user.role = default_role
                user.save()
        
        refresh = RefreshToken.for_user(user)
        role = user.role.role if user.role else 'Parent'

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "username": user.username,
                "role": role,  
            }
        })
    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_api(request):
    try:
        refresh_token = request.data.get("refresh_token")

        if not refresh_token:
            return Response({"error": "No refresh token provided."}, status=status.HTTP_400_BAD_REQUEST)

        token = RefreshToken(refresh_token)
        token.blacklist() 

        return Response({"message": "Logged out successfully."}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def child_register(request):
    user = request.user
    first_name = request.data.get('first_name')
    last_name =  request.data.get('last_name')
    birth_date = request.data.get('birth_date')
    section = request.data.get('section')
    class_sched = request.data.get('class_sched')

    if not all([first_name, last_name, birth_date]):
        return Response(
            {"error": "All fields are required."},
            status=status.HTTP_400_BAD_REQUEST
            )

    child = UserChild.objects.create(
        parent=user,
        first_name=first_name,
        last_name=last_name,
        birth_date=birth_date,
        section=section,
        class_sched=class_sched
    )
    

    serializer = UserChildSerializer(child)

    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    role = user.role.role if user.role else None

    return Response({
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "username": user.username,
        "email": user.email,
        "role": role,
    })



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def time_completions(request):
    user = request.user

    if not user.role:
        return Response({"error": "User has no role assigned."}, status=status.HTTP_403_FORBIDDEN)

    if user.role.role == "Parent" :
        children = UserChild.objects.filter(parent=user)
        completions = TimeCompletion.objects.filter(child__in=children)
    elif user.role.role == "Teacher" :
        completions = TimeCompletion.objects.all()
    else:
        completions = TimeCompletion.objects.none()

    serializer = gameSerializer(completions, many=True)

  
    
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(["GET"])
@permission_classes([IsAuthenticated]) 
def parent_profile(request):
    user = request.user

    if not user.role or user.role.role.lower() not in ["parent","teacher","admin"]:
        return Response(
            {"error": "Access denied. Only parents can view this information."},
            status=status.HTTP_403_FORBIDDEN,
        )

    serializer = CustomUserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated]) 
def parent_profile_teacherview(request):
    user = request.user
    users = CustomUser.objects.filter(role__role="Parent") 
    serializer = CustomUserSerializer(users, many=True) 

    if not user.role or user.role.role.lower() not in ["teacher","admin",]:
        return Response(
            {"error": "Access denied. Only parents can view this information."},
            status=status.HTTP_403_FORBIDDEN,
        )
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated]) 
def student_profile_teacherview(request):
    user = request.user
    users =  UserChild.objects.all()  
    serializer = UserChildSerializer(users,many=True) 

    if not user.role or user.role.role.lower() not in ["teacher","admin"]:
        return Response(
            {"error": "Access denied. Only parents can view this information."},
            status=status.HTTP_403_FORBIDDEN,
        )
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def delete_child(request):
    child_id = request.data.get("child_id")
    if not child_id:
        return Response({"error": "Child ID is required"}, status=400)

    try:
        child = UserChild.objects.get(id=child_id)
        child.delete()
        return Response({"message": "Child deleted successfully"}, status=200)
    except UserChild.DoesNotExist:
        return Response({"error": "Child not found"}, status=404)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_child(request, child_id):
    """Update a child profile - Parent can only update their own children"""
    user = request.user
    
    try:
        child = UserChild.objects.get(id=child_id)
    except UserChild.DoesNotExist:
        return Response(
            {"error": "Child not found."},
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Check if the user is the parent of this child
    if child.parent != user:
        return Response(
            {"error": "You can only edit your own children's profiles."},
            status=status.HTTP_403_FORBIDDEN
        )
    
    # Update fields
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    birth_date = request.data.get('birth_date')
    class_sched = request.data.get('class_sched')
    
    if first_name:
        child.first_name = first_name
    if last_name:
        child.last_name = last_name
    if birth_date:
        child.birth_date = birth_date
    if class_sched:
        child.class_sched = class_sched
    
    child.save()
    
    serializer = UserChildSerializer(child)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_parent_children(request):
    """List all children of the authenticated parent"""
    user = request.user
    
    # Check if user is a parent
    if not user.role or user.role.role != "Parent":
        return Response(
            {"error": "Access denied. Only parents can view their children."},
            status=status.HTTP_403_FORBIDDEN
        )
    
    children = UserChild.objects.filter(parent=user)
    serializer = UserChildSerializer(children, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)




@api_view(["POST"])
@permission_classes([IsAuthenticated])
def upload_file(request):
    user = request.user

    # Only allow teachers to upload
    if not user.role or user.role.role != "Teacher":
        return Response({"error": "Only teachers can upload files."}, status=status.HTTP_403_FORBIDDEN)

    file = request.FILES.get("file")
    title = request.data.get("title", "Untitled")

    if not file:
        return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

    uploaded = UploadedFile.objects.create(uploader=user, title=title, file=file)
    serializer = UploadedFileSerializer(uploaded)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_files(request):
    # Everyone can view files (students, teachers, parents)
    files = UploadedFile.objects.all().order_by("-uploaded_at")
    serializer = UploadedFileSerializer(files, many=True)
    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_file(request, pk):
    try:
        file = UploadedFile.objects.get(pk=pk)
    except UploadedFile.DoesNotExist:
        return Response({"error": "File not found"}, status=status.HTTP_404_NOT_FOUND)

    # Only the uploader or an admin can delete
    if request.user != file.uploader and not request.user.is_staff:
        return Response({"error": "Not allowed to delete this file"}, status=status.HTTP_403_FORBIDDEN)

    file.delete()
    return Response({"message": "File deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_progress(request):
    try:
        child_id = request.data.get('child_id')
        game_name = request.data.get('game')
        difficulty = request.data.get('difficulty')
        level = request.data.get('level')
        time = request.data.get('time')

        if not all([child_id, game_name, difficulty, level, time]):
            return Response({"error": "Missing fields"}, status=status.HTTP_400_BAD_REQUEST)


        try:
            game = Game.objects.get(game_name=game_name, difficulty=difficulty, level=level)
        except Game.DoesNotExist:
            return Response({"error": "Game level not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            print("DEBUG — Game type is:", Game)
            child = UserChild.objects.get(id=child_id)
        except UserChild.DoesNotExist:
            return Response({"error": "Child not found"}, status=status.HTTP_404_NOT_FOUND)

        completion = TimeCompletion.objects.create(
            child=child,
            game_level=game,
            time=time
        )

        serializer = gameSerializer(completion)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        import traceback
        print("SAVE PROGRESS ERROR:", e)
        traceback.print_exc()  
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    



@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    confirm_password = request.data.get('confirm_password')
    email = request.data.get('email')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    role_name = request.data.get('role')  # e.g. "Parent" or "Teacher"

    if not all([username, password, confirm_password, email, first_name, last_name]):
        return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)
    
    if password != confirm_password:
        return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

    # Get role
    try:
        role = Roles.objects.get(role=role_name)
    except Roles.DoesNotExist:
        return Response({"error": "Invalid role."}, status=status.HTTP_400_BAD_REQUEST)

    # Check if username exists
    if CustomUser.objects.filter(username=username).exists():
        return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

    # Create user
    user = CustomUser.objects.create_user(
        username=username,
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name,
        role=role
    )

    return Response({
        "message": "User registered successfully!",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": role.role,
        }
    }, status=status.HTTP_201_CREATED)


from .models import Roles

@api_view(['GET'])
@permission_classes([AllowAny])
def get_roles(request):
    """Return all available roles from the Roles model."""
    roles = Roles.objects.all().values_list('role', flat=True)
    return Response(list(roles))


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_all_users(request):
    """List all users - Admin only"""
    user = request.user
    
    # Check if user is admin
    if not user.role or user.role.role != "Admin":
        return Response(
            {"error": "Access denied. Only admins can view all users."},
            status=status.HTTP_403_FORBIDDEN
        )
    
    users = CustomUser.objects.all().select_related('role')
    serializer = CustomUserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_user(request, user_id):
    """Update a user - Admin only"""
    current_user = request.user
    
    # Check if current user is admin
    if not current_user.role or current_user.role.role != "Admin":
        return Response(
            {"error": "Access denied. Only admins can update users."},
            status=status.HTTP_403_FORBIDDEN
        )
    
    try:
        target_user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return Response(
            {"error": "User not found."},
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Prevent admin from deleting themselves
    if target_user.id == current_user.id and request.data.get('is_active') == False:
        return Response(
            {"error": "You cannot deactivate yourself."},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Update fields
    username = request.data.get('username')
    email = request.data.get('email')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    role_name = request.data.get('role')
    is_active = request.data.get('is_active')
    password = request.data.get('password')
    
    if username:
        # Check if username is taken by another user
        if CustomUser.objects.filter(username=username).exclude(id=user_id).exists():
            return Response(
                {"error": "Username already exists."},
                status=status.HTTP_400_BAD_REQUEST
            )
        target_user.username = username
    
    if email:
        target_user.email = email
    if first_name:
        target_user.first_name = first_name
    if last_name:
        target_user.last_name = last_name
    if role_name:
        try:
            role = Roles.objects.get(role=role_name)
            target_user.role = role
        except Roles.DoesNotExist:
            return Response(
                {"error": "Invalid role."},
                status=status.HTTP_400_BAD_REQUEST
            )
    if is_active is not None:
        target_user.is_active = is_active
    
    if password:
        target_user.set_password(password)
    
    target_user.save()
    
    serializer = CustomUserSerializer(target_user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_deletion_info(request, user_id):
    """Get information about what will be deleted if a user is deleted"""
    current_user = request.user
    
    # Check if current user is admin
    if not current_user.role or current_user.role.role != "Admin":
        return Response(
            {"error": "Access denied. Only admins can view this information."},
            status=status.HTTP_403_FORBIDDEN
        )
    
    try:
        target_user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return Response(
            {"error": "User not found."},
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Count related data
    children_count = UserChild.objects.filter(parent=target_user).count()
    uploaded_files_count = UploadedFile.objects.filter(uploader=target_user).count()
    
    # Count time completions for all children of this user
    children = UserChild.objects.filter(parent=target_user)
    time_completions_count = TimeCompletion.objects.filter(child__in=children).count()
    
    return Response({
        "username": target_user.username,
        "children_count": children_count,
        "uploaded_files_count": uploaded_files_count,
        "time_completions_count": time_completions_count,
        "has_related_data": children_count > 0 or uploaded_files_count > 0 or time_completions_count > 0
    }, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request, user_id):
    """Delete a user - Admin only"""
    current_user = request.user
    
    # Check if current user is admin
    if not current_user.role or current_user.role.role != "Admin":
        return Response(
            {"error": "Access denied. Only admins can delete users."},
            status=status.HTTP_403_FORBIDDEN
        )
    
    try:
        target_user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return Response(
            {"error": "User not found."},
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Prevent admin from deleting themselves
    if target_user.id == current_user.id:
        return Response(
            {"error": "You cannot delete yourself."},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    target_user.delete()
    return Response(
        {"message": "User deleted successfully."},
        status=status.HTTP_200_OK
    )
