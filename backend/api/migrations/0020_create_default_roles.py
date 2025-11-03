# Generated migration to create default roles

from django.db import migrations


def create_default_roles(apps, schema_editor):
    """Create default roles: Teacher, Parent, Admin"""
    Roles = apps.get_model('api', 'Roles')
    
    default_roles = ["Teacher", "Parent", "Admin"]
    for role_name in default_roles:
        Roles.objects.get_or_create(role=role_name)


def reverse_create_default_roles(apps, schema_editor):
    """Remove default roles (optional - for migration reversal)"""
    Roles = apps.get_model('api', 'Roles')
    
    default_roles = ["Teacher", "Parent", "Admin"]
    Roles.objects.filter(role__in=default_roles).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_alter_roles_role'),
    ]

    operations = [
        migrations.RunPython(create_default_roles, reverse_create_default_roles),
    ]

