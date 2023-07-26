### Steps to run the project
Clone the Repository 
```bash
git clone https://github.com/skulkarni0102/weather_app.git
```
#### Running backend
1. Navigating to backend
```bash
cd backend
```
2. Setting virtual environment
```bash
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
```
3. Weather API key 
get the key from -> https://openweathermap.org/

4. Create .env file and paste the key
 ```bash
WEATHER_KEY=Your Key
```

5. Running backend
```bash
python manage.py runserver
```

#### Running frontend

1. Navigating to frontend
```bash
cd frontend
```
2. Installing dependencies
```bash
npm install
```
3. Create you .env file and Paste your URL
```bash
REACT_APP_API_URL=Your Backend Url
```

3. Running frontend
```bash
npm start
```
