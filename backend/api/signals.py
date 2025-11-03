from django.db.models.signals import post_migrate
from django.dispatch import receiver

@receiver(post_migrate)
def create_default_games(sender, **kwargs):
    from .models import Game  # import here to avoid circular imports

    GAME_CHOICES = [
        ('Lesson1 Activity1', 'Lesson1 Activity1'),
        ('Lesson1 Activity2', 'Lesson1 Activity2'),
        ('Lesson2 Activity1', 'Lesson2 Activity1'),
        ('Lesson2 Activity2', 'Lesson2 Activity2'),
        ('Lesson3 Activity1', 'Lesson3 Activity1'),
        ('Lesson3 Activity2', 'Lesson3 Activity2'),
        ('Lesson4 Activity1', 'Lesson4 Activity1'),
        ('Lesson4 Activity2', 'Lesson4 Activity2'),
        ('Lesson5 Activity1', 'Lesson5 Activity1'),
        ('Lesson5 Activity2', 'Lesson5 Activity2'),
    ]

    for game_name, _ in GAME_CHOICES:
        Game.objects.get_or_create(game_name=game_name)
