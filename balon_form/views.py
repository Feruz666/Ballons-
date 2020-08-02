from django.shortcuts import render, redirect
from .models import Balon
from .forms import BalonForm
from django.views.generic import TemplateView

# Create your views here.


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
        if request.method == 'GET':
            pass

        return render(request, self.template_name, context={'balons':balons, 'form':form})








    # if request.method == 'POST':
    #     balon_num = request.POST['balon_num']
    #     balon_status = request.POST['balon_status']
    #     balon_state = request.POST['balon_state']

    #     x = Balon.objects.create(balon_num=balon_num,balon_status=balon_status,balon_state=balon_state)
    #     x.save()
    #     print("Balon has Created")
    #     return redirect("/")
    # return render(request, 'balon_form/index.html')


       # def get(self, request):
    #     form = BalonForm()
    #     return render(request, 'balon_form/index.html', context={'form':form})

    # def post(self, request):
    #     bound_form = BalonForm(request.POST)

    #     if bound_form.is_valid():
    #         new_balon = bound_form.save()
    #         return render(request, 'balon_form/index.html', context={'form': bound_form})