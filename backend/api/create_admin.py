from django.contrib.auth import get_user_model
from .models import Roles

def create_default_admin():
    User = get_user_model()

    # Ensure roles exist
    admin_role, _ = Roles.objects.get_or_create(role="Admin")
    Roles.objects.get_or_create(role="Teacher")
    Roles.objects.get_or_create(role="Parent")

    # Create admin user if not exists
    if not User.objects.filter(username="admin").exists():
        User.objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="admin123",
            role=admin_role
        )
        print("✅ Default admin user created: username='admin', password='admin123'")
    else:
        print("ℹ️ Default admin user already exists.")
