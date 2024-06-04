let productsDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".noProducts");

// Display Products
let drawProductsUI;
(drawProductsUI = function(products = []){
    let myProducts = products.filter((item) => item.isMe === "Y");
    if (myProducts.length != 0) {
    let productsUI = myProducts.map((item) => {
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

                   <button class= 'edit-product' onclick= 'editProduct(${
                    item.id
                   })'> Edite Product </button> <br>
                   <button class= 'edit-product' onclick= 'deleteProduct(${
                    item.id
                   })'> Delete Product </button>

                   </div>


            </div>


        `;
    });

    productsDom.innerHTML = productsUI.join("");
} else {
    noProductsDom.innerHTML = "No Products !!"
};
      

})(JSON.parse(localStorage.getItem("products")) || productsDB);


// Edit function 

function editProduct(id) {
    localStorage.setItem("editProduct", id);
    window.location = "editProduct.html";
}


//deleteProduct
function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem("products")) || productsDB;
    let myProducts = products.filter((item) => item.isMe === "Y");
    let filtered = myProducts.filter((i) => i.id !== id);

    let clickedItem = myProducts.find((i) => i.id === id);
    products = products.filter((i) => i.id !== clickedItem.id);
    localStorage.setItem("products", JSON.stringify(products));
    drawProductsUI(filtered);
}






