from django.shortcuts import render, redirect
from .models import Balon
from .forms import BalonForm
from django.views.generic import TemplateView
import json
from django.core import serializers
from datetime import datetime, date, time
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import BalonsSerializer
from rest_framework.generics import get_object_or_404




class MainView(TemplateView):
    template_name = 'balon_form/index.html'

    def post(self, request):
        if request.method == 'POST':
            form = BalonForm(request.POST)
            if form.is_valid():
                obj = Balon()
                obj.balon_num = form.cleaned_data['balon_num']
                obj.balon_status = form.cleaned_data['balon_status']
                obj.balon_state = form.cleaned_data['balon_state']
                obj.save()

                print("Added!!!")
                return redirect("/")
        else:
            form = BalonForm()

        return render(request, self.template_name, context={'form':form})


    def get(self, request):
        form = BalonForm()
        balons = Balon.objects.all()
        balons_json = serializers.serialize('json', balons)
        return render(request, self.template_name, context={'balons':balons, 'form':form, 'json':balons_json})

class Api(APIView):
    def get(self, request):
        default_date = date.today()
        date_s = request.GET.get('balon_date', default_date)
        balons = Balon.objects.all().filter(date=date_s)
        serializer = BalonsSerializer(balons, many=True)
        return Response({"balons": serializer.data})
    def post(self, request):
        balons = request.data.get('balon')
        serializer = BalonsSerializer(data=balons)
        print(serializer)
        if serializer.is_valid(raise_exception=True):
            balons_saved = serializer.save()
        return Response({"success": "balon '{}' created successfully".format(balons_saved.balon_num)})

    def put(self, request, pk):
        saved_balon = get_object_or_404(Balon.objects.all(), pk=pk)
        data = request.data.get('balon')
        serializer = BalonsSerializer(instance=saved_balon, data=data, partial=True)

        if serializer.is_valid(raise_exception=True):
            balon_saved = serializer.save()
        return Response({"success": "balon '{}' updated successfully".format(balon_saved.balon_num)})
    
    def delete(self, request, pk):
        balon = get_object_or_404(Balon.objects.all(), pk=pk)
        balon.delete()
        return Response({"message": "balon with id `{}` has been deleted.".format(pk)}, status=204)