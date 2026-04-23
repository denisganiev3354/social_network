from flask import Flask, render_template, request, session,redirect,url_for

app = Flask(__name__)

# TODO: replace with secure key
app.secret_key = "supersecretkey123"

# TODO: replace with database
USERS = {
    "admin": 'admin123',
    "user": 'pass456'
}

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
