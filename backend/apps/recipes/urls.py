__author__ = 'mosassy'
from django.conf.urls import patterns, url
from django.contrib import admin
from rest_framework .authtoken import views
from django.conf import settings
from views import *


urlpatterns = [
     url('^recipes/$', RecipeList.as_view(), name='recipe-list'),
     url('^recipes/(?P<pk>[0-9]+)/$', RecipeDetail.as_view(), name='recipe-detail'),#regular expression catches all numbers.
     url('^add-recipe/$', AddRecipe.as_view(), name='add-recipe'),

     url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
     url(r'^admin/', include(admin.site.urls)),
     url(r'^api-token-auth/', views.obtain_auth_token),
     url(r'^get-user-info/', GetUserInfo.as_view())
]

