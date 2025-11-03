from django.apps import AppConfig
from django.db.models.signals import post_migrate
from django.contrib.auth.hashers import make_password

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        """
        Create default roles, admin user, and default games if they don't exist.
        """
        def create_default_data_on_migrate(sender, app_config, **kwargs):
            if app_config.name == 'api':
                from .models import Roles, CustomUser, Game

                # --- Default roles ---
                default_roles = ["Teacher", "Parent", "Admin"]
                for role in default_roles:
                    Roles.objects.get_or_create(role=role)

                # --- Default admin user ---
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

                # --- Default games ---
                GAME_CHOICES = [
                    'Lesson1 Activity1', 'Lesson1 Activity2',
                    'Lesson2 Activity1', 'Lesson2 Activity2',
                    'Lesson3 Activity1', 'Lesson3 Activity2',
                    'Lesson4 Activity1', 'Lesson4 Activity2',
                    'Lesson5 Activity1', 'Lesson5 Activity2',
                ]
                for game_name in GAME_CHOICES:
                    Game.objects.get_or_create(game_name=game_name)

        # Connect signal
        post_migrate.connect(create_default_data_on_migrate)
