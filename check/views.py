import json
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from common.utils.handlers import RequestModelHandler
from django.shortcuts import redirect

handler = RequestModelHandler()

# Create your views here.
def check(request):
    return render(
        request=request,
        template_name="check.html",
    )

@csrf_exempt
def process(request):
    data = json.loads(request.body)
    content_type = data.get('type')
    content = data.get('content')
    
    response = handler.get_result(type=content_type, content=content)
    
    return HttpResponse(**response)

@csrf_exempt
def load_model(request):
    data = json.loads(request.body)

    if data.get('load'):
        response = handler.load_model()
        return HttpResponse(**response)
    
def custom_404_handler(request, exception):
    return redirect("/")