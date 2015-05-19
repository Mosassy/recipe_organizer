from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class UserProfile(models.Model):
    User = models.OnetoOneField('User', related_name='profile')
    Address = models.CharField(max_length=100)
    City = models.CharField(max_length=100)
    State = models.CharField(max_length=100)
    Zip = models.CharField(max_length=30)


class Ingredient(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Recipe(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    directions = models.TextField()
    ingredients = models.ManyToManyField(Ingredient)
    photo = models.ImageField(upload_to='photos', blank=True, null=True)
    owner = models.ForeignKey('User', related_name='recipes')

    def __str__(self):
        return self.name







# if your class ends in y or you want to change how it appears in Django admin
#class Meta:
 #       verbose_name_plural = "Companies"