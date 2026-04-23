let form = document.querySelector("form");
form.addEventListener("submit", e=> {
    e.preventDefault();
    let loginField = document.getElementById("login");
    let passwordField = document.getElementById("password");

    let login = loginField.value;
    let password = passwordField.value;

    let valid = true;
    //тут валидация

    if(valid) {
        fetch("/api/v1/handler", {
            method: "POST",
            body: JSON.stringify({
                login,password
            }),
            headers: {
                "Content-Type":"application/json"
            }
        }).then(response => {
            return response.text();
        }).then(data => alert(data));
    }
})

// осинхронный запрос

// let xhr = new XMLHttpRequest();
// xhr.open("POST","http://localhost:5000/api/v1/handler");

// xhr.onload = function() {
//     console.log(xhr.responseText);
// }

// xhr.send();


// отправка запросов в джава скрипте
// промисы
// оссинхронный код

