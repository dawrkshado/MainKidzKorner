from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        """
        Create default roles and admin user if they don't exist.
        This is a safety net - the data migrations are the primary method.
        Uses Django's post_migrate signal to avoid database access warnings.
        """
        from django.db.models.signals import post_migrate
        from django.contrib.auth.hashers import make_password
        
        def create_default_data_on_migrate(sender, app_config, **kwargs):
            """Create default roles and admin user after migrations complete"""
            # Only run for the api app
            if app_config.name == 'api':
                from .models import Roles, CustomUser
                
                # Create default roles
                default_roles = ["Teacher", "Parent", "Admin"]
                for role in default_roles:
                    Roles.objects.get_or_create(role=role)
                
                # Create default admin user
                admin_username = 'admin'
                admin_role = Roles.objects.filter(role='Admin').first()
                
                if admin_role and not CustomUser.objects.filter(username=admin_username).exists():
                    CustomUser.objects.create(
                        username=admin_username,
                        email='admin@kidzkorner.com',
                        password=make_password('admin123'),  # Default password - should be changed
                        first_name='Admin',
                        last_name='User',
                        role=admin_role,
                        is_staff=True,
                        is_superuser=True,
                        is_active=True
                    )
        
        # Connect to post_migrate signal
        post_migrate.connect(create_default_data_on_migrate)


    