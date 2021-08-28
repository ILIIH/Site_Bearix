from django.shortcuts import render
from django.core.mail import send_mail
from .transform import sig_and_mag
from .models import Data
import os
import csv
import codecs
from django.core import serializers

# Create your views here.


      
    


def get_example(request):
    return render(request,'example/index_example.html')

def get_home(request):
    if request.method == 'POST' :
        Name = request.POST.get('Name')
        LastName = request.POST.get('LastName')
        Email = request.POST.get('Email')
        Message = request.POST.get('Message')
        
        data = {
            'name' : Name,
            'lastName': LastName, 
            'Email' : Email, 
            'Message' : Message
        }
        data['Message'] = "Отправил "+str(data['name'])+" "+str(data['lastName'])+'\n'+str(data['Message'])
        send_mail(data['Email'],data['Message'],'',['bearixx2020@gmail.com']) 
        print(data)

    return render(request,'main_window/index_home.html')

def get_uppload_csv(request):
    if request.method == 'POST':
        file_name = request.FILES['filename'].temporary_file_path()
        u = []
        v = []
        m = []
        f = []
        for k in range(0, 6, 2):
            un, vo, ma, fr = sig_and_mag(k, file_name)
            u.append(un)
            v.append(vo)
            m.append(ma)
            f.append(fr)
        Data.objects.create(units=u, volts=v, freqs=f, mags=m)
        return render(request,'uppload_csv/index_upload.html',{'freequency3':u[2],'Magnitude3':m[2],'freequency2':u[1],'Magnitude2':m[1],'freequency':u[0],'Magnitude':m[0],'Need_to_Load':1})
   
    return render(request,'uppload_csv/index_upload.html',{'Need_to_Load':0})

