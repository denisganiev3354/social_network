let form = document.querySelector('form');

form.addEventListener('submit', async event => {
    event.preventDefault()

    let login = document.getElementById("login").value
    let password = document.getElementById("password").value
    let confirm_password = document.getElementById("confirm_password").value

    let response = await fetch("/registration", {
        "method":"post",
        "headers": {
            "Content-Type":"application/x-www-form-urlencoded",
            "Accept":"application/json"
        },
        "body": new URLSearchParams({login,password,confirm_password})
    });
    let data = await response.json();
    if (data.status === "error"){
        alert(data.message);
    }else if (data.status === "success"){
        location.assign(data.location);
    }
})