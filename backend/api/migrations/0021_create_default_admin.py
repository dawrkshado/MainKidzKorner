# Generated migration to create default admin user

from django.db import migrations
from django.contrib.auth.hashers import make_password


def create_default_admin_user(apps, schema_editor):
    """Create default admin user if it doesn't exist"""
    CustomUser = apps.get_model('api', 'CustomUser')
    Roles = apps.get_model('api', 'Roles')
    
    # Default admin credentials
    admin_username = 'admin'
    admin_password = 'admin123'  # Should be changed after first login
    admin_email = 'admin@kidzkorner.com'
    admin_first_name = 'Admin'
    admin_last_name = 'User'
    
    # Get or create Admin role first (should exist from previous migration)
    admin_role, _ = Roles.objects.get_or_create(role='Admin')
    
    # Create admin user if it doesn't exist
    if not CustomUser.objects.filter(username=admin_username).exists():
        admin_user = CustomUser.objects.create(
            username=admin_username,
            email=admin_email,
            password=make_password(admin_password),  # Hash the password properly
            first_name=admin_first_name,
            last_name=admin_last_name,
            role=admin_role,
            is_staff=True,  # Allows access to Django admin
            is_superuser=True,  # Full permissions
            is_active=True
        )
        print(f"[SUCCESS] Default admin user created: username='{admin_username}', password='{admin_password}'")
    else:
        print(f"[SKIP] Admin user '{admin_username}' already exists, skipping creation.")


def reverse_create_default_admin(apps, schema_editor):
    """Remove default admin user (optional - for migration reversal)"""
    CustomUser = apps.get_model('api', 'CustomUser')
    
    # Only delete if it's the default admin user
    default_admin = CustomUser.objects.filter(
        username='admin',
        email='admin@kidzkorner.com'
    ).first()
    
    if default_admin:
        default_admin.delete()
        print("Default admin user removed.")


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_create_default_roles'),  # Depends on roles existing
    ]

    operations = [
        migrations.RunPython(create_default_admin_user, reverse_create_default_admin),
    ]

