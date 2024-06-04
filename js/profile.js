// Get form Localstorsge
let get_user = localStorage.getItem("username");
let get_email = localStorage.getItem("email");
let products = JSON.parse(localStorage.getItem("products"));
let myProducts = products.filter((i) => i.isMe === "Y");

// Variables
let userDom2 = document.getElementById('username');
let userEmailDom = document.getElementById('email');
let productsLength = document.querySelector("#productsLength span");


userDom2.innerHTML = get_user;
userEmailDom.innerHTML = get_email;
productsLength.innerHTML = myProducts.length;