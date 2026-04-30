from flask import Flask, render_template, request, session,redirect,url_for

app = Flask(__name__)

# TODO: replace with secure key
app.secret_key = "supersecretkey123"

# TODO: replace with database
USERS = {
    "admin": 'admin123',
    "user": 'pass456'
}

NEWS = [
    {
                    "title": "Открыт новый маршрут для велопутешествий",
                    "text": "Вдоль побережья Черного моря запустили живописную велотрассу протяжённостью 120 км. Маршрут подходит как для любителей, так и для профессионалов.",
                    "author": "Анна Петрова",
                    "date": "2025-06-10"
                },
                {
                    "title": "Вышла новая версия образовательной платформы",
                    "text": "Добавлены интерактивные тренажёры по математике и программированию. Теперь ученики могут получать мгновенную обратную связь.",
                    "author": "Иван Смирнов",
                    "date": "2025-06-09"
                },
                {
                    "title": "Стартует фестиваль уличной еды",
                    "text": "С 20 по 25 июня в центральном парке пройдёт гастрономический фестиваль с участием 30 ресторанов и фуд-траков. Вход свободный.",
                    "author": "Мария Ковальчук",
                    "date": "2025-06-08"
                },
                {
                    "title": "Исследование: чтение перед сном улучшает память",
                    "text": "Учёные из университета нейронаук выяснили, что 20 минут чтения перед сном повышают когнитивные способности на 15%.",
                    "author": "Дмитрий Орлов",
                    "date": "2025-06-07"
                },
                {
                    "title": "Запущен сервис доставки книг за 1 час",
                    "text": "Новый стартап обещает привозить любые книги из городских библиотек и магазинов в течение 60 минут после заказа.",
                    "author": "Елена Власова",
                    "date": "2025-06-06"
                }
]

@app.route("/")
def main_page():
    login = session.get('username')
    if login is None:
        login = "Гость"
    return render_template('index.html', username=login)

@app.get("/login")
def hello_world():
    if session.get('username') is not None:
        return redirect(url_for('main_page'))
    return render_template('login.html')

@app.post("/login")
def auth_user():
    username = request.form.get('login')
    password = request.form.get('password')
# TODO: add validation
    print(username)
    
    if username in USERS and USERS[username] == password:
        session['username'] = username
    return redirect(url_for('main_page'))
        
@app.post("/registration")
def register_user():
    username = request.form.get('login')
    password = request.form.get('password')
    confirm_password = request.form.get('confirm_password')
    
    if username in USERS:
        return{"status": "error", "massage": "User already exists"}
        
    if password != confirm_password:
        return{"status": "error", "massage": "Password don't math"}
    
    # TODO: complete validation logic
    
    USERS[username] = password
    session['username'] = username
    return{
        "status" : "success",
        "message" : "User sucessfully created",
        "location" : url_for('main_page')
    }
        
@app.route("/forgot")
def forgot_pass():
    return render_template('forgot.html')

# @app.post("/api/v1/handler")
# def for_handler():
#     return "OK"

@app.get("/registration")
def registr_pass():
    if session.pop('username',None):
        return redirect(url_for('main_page'))
    return render_template('registration.html')

@app.get("/logout")
def logout():
    session.pop('username', None)
    return redirect(url_for('main_page'))

@app.get("/api/v1/news")
def get_news():
    return NEWS