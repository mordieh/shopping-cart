

// Define product

let productsDom = document.querySelector(".products");
let products = productsDB;

// Display Products
let drawProductsUI;
(drawProductsUI = function(products = []){
    let productsUI = products.map((item) => {
        // console.log("eee", item);
        return `
        <div class="product-item" style="border: ${
            item.isMe === "Y" ? "1px solid green" : ""
        }">
                <img src="${item.imgeUrl}"
                 class="product-item-img" alt="head phone" />

                <div class="product-item-desc">
                    <a onclick='saveItemData(${item.id})'> ${item.title} </a>
                    <p> ${item.desc} </p>
                    <span> size: ${item.size} </span>

                    ${item.isMe === "Y" && "<button class= 'edit-product' onclick= 'editProduct(" + item.id + ")'> Edite Product </button>"}
                </div>

                <div class="product-item-action">

                    <button class="add-to-cart" onclick="addedToCart(${item.id})">Add To Cart</button>
                    <i class="fa-regular fa-heart favorite" style="color: ${item.liked == true ? 'red' : ''}"onclick="addedToFavorite(${item.id})"></i>

                </div>

            </div>


        `;
    });

    productsDom.innerHTML = productsUI.join("");
})(JSON.parse(localStorage.getItem("products")) || products);


// Add To Cart

function addedToCart(id) {

    if(localStorage.getItem("username")){
        let products = JSON.parse(localStorage.getItem("products")) || products;
        let product = products.find((item) => item.id === id);
        let isProductInCart = addedItem.some((i) => i.id === product.id);

        if (isProductInCart) {
            addedItem = addedItem.map((p) => {
                if (p.id === product.id) p.qty += 1;
                return p;
            });
        } else {
            addedItem.push(product);
        }
        //UI
        cartProductDivDom.innerHTML = "";
        addedItem.forEach((item) => {
            cartProductDivDom.innerHTML += `<p> ${item.title} <span class="item-qty">${item.qty}</span></p>`;
        });
       
        //save data
        localStorage.setItem("productsInCart", JSON.stringify(addedItem));
        let cartProductItems = document.querySelectorAll(".carts-products div p");
        
        // Add counter of Items
        badgeDom.style.display = "block";
        badgeDom.innerHTML = cartProductItems.length;
    } else {
        window.location = "login.html";
    };
};

function getUniqueArr(arr, filterType) {
    let unique = arr
    .map((item) => item[filterType])
    .map((item, i, final) => final.indexOf(item) === i && i)
    .filter((item) => arr[item])
    .map((item) => arr[item]);

    return unique;
}


function saveItemData(id) {
    localStorage.setItem("productId", id);
    window.location = "cartDetails.html";
}

//search function
let input = document.getElementById("search");

input.addEventListener("keyup", function(e) {
    search(e.target.value, JSON.parse(localStorage.getItem("products")));

    if (e.target.value.trim() === "")
      drawProductsUI(JSON.parse(localStorage.getItem("products")));
});

function search(title, myArray) {
    let arr = myArray.filter(
        (item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1);
    drawProductsUI(arr);
}



// Add To Favorite
let favoriteItems = localStorage.getItem("productsFavorite")
? JSON.parse(localStorage.getItem("productsFavorite"))
: [];
function addedToFavorite(id) {

    if(localStorage.getItem("username")){
        let choosenItem = products.find((item) => item.id === id);
        choosenItem.liked = true;
        favoriteItems = [...favoriteItems, choosenItem]
        let uniqueProducts = getUniqueArr(favoriteItems, "id");
        localStorage.setItem("productsFavorite", JSON.stringify(uniqueProducts));
        products.map((item) => {
            if (item.id === choosenItem.id) {
                item.liked = true;
            }
        });
        localStorage.setItem("products", JSON.stringify(products));
        drawProductsUI(products)
    } else {
        window.location = "login.html";
    };
};


// Filter Products By Size
let sizeFilter = document.getElementById("size-filter");
sizeFilter.addEventListener("change", getProductsFilterBySize);

function getProductsFilterBySize(e) {
    let val = e.target.value;
    let products = JSON.parse(localStorage.getItem("products")) || products;
    
    if (val === "all") {
        drawProductsUI(products);
    } else {
        products = products.filter((i) => i.size === val);
        drawProductsUI(products);
    } 
}


// Edit function 

function editProduct(id) {
    localStorage.setItem("editProduct", id);

    window.location = "editProduct.html";
}








