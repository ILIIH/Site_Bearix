from django import urls
from django.contrib import admin
from django.urls import path
from site1 import views
from django.conf.urls import url 

urlpatterns = [
    path('admin/', admin.site.urls),
    url('upload/', views.get_uppload_csv, name='upload'),
    url('example/', views.get_example, name='example'),
    path('', views.get_home, name='home'),
  
]