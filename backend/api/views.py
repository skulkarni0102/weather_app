from django.shortcuts import render
import requests
from django.http import JsonResponse
import os

def weather_api_view(request):

    api_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + \
        request.GET.get('city', '')+'&appid='+os.getenv('WEATHER_KEY')
    
    try:
        response = requests.get(api_url)
        if response.status_code == 200:
            data = response.json()
            return JsonResponse(data)
        else:
            return JsonResponse({'error': 'Enter correct city'}, status=response.status_code)
    except requests.RequestException as e:
        return JsonResponse({'error': 'API call failed', 'details': str(e)}, status=500)
