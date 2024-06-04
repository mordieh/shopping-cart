// Registar User 
let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");

let registarBtn = document.querySelector("#sign_up");


registarBtn.addEventListener("click", register);

function register(e) {
        e.preventDefault();
        if(username.value === "" || email.value === "" || password.value === ""){
            alert("please fill data");
        } else {
            localStorage.setItem('username', username.value);
            localStorage.setItem('email', email.value);
            localStorage.setItem('password', password.value);
    
            setTimeout(() => {
                window.location = "login.html";
            }, 1500)
        }
    
}

