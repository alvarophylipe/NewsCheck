from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

# Create your views here.
def check(request):
    return render(
        request=request,
        template_name="check.html",
    )

@csrf_exempt
def process(request):
    return JsonResponse({"prediction": 0, "waiting": True})