document.addEventListener("DOMContentLoaded", function() {
    updateCart();
    renderProducts();
});

// Cart System
let cart = [];

function addToCart(productName, price) {
    let found = cart.find(item => item.name === productName);
    
    if (found) {
        found.quantity++;
    } else {
        cart.push({ name: productName, price, quantity: 1 });
    }
    
    updateCart();
}

function updateCart() {
    let cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = cart.length === 0 ? "<p>Cart is empty!</p>" : "";

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        cartContainer.innerHTML += `<p>${item.name} x${item.quantity} - $${item.price * item.quantity}</p>`;
    });

    cartContainer.innerHTML += `<p><strong>Total: $${total}</strong></p>`;
}

// Show Alert Message
function showMessage() {
    alert("Welcome to Blu3 Drip! Start Shopping Now.");
}

// Contact Form Validation
function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (name === "" || email === "" || message === "") {
        alert("All fields are required!");
        return false;
    } else if (!email.includes("@")) {
        alert("Enter a valid email address!");
        return false;
    } else {
        alert("Form submitted successfully!");
        return true;
    }
}

// Dynamic Product Rendering
const products = [
    { name: "Stylish Hoodie", price: 50, img: "Photos/product1.jpeg" },
    { name: "Trendy Sneakers", price: 80, img: "Photos/product2.jpeg" },
    { name: "Denim Jacket", price: 100, img: "Photos/product3.jpeg" }
];

function renderProducts() {
    let shopContainer = document.getElementById("shop-grid");
    shopContainer.innerHTML = "";

    products.forEach(product => {
        shopContainer.innerHTML += `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                <button onclick="removeFromCart('${product.name}')">Remove</button>
            </div>
        `;
    });
}

function removeFromCart(productName) {
    let foundIndex = cart.findIndex(item => item.name === productName);
    
    if (foundIndex !== -1) {
        cart[foundIndex].quantity--;
        if (cart[foundIndex].quantity === 0) {
            cart.splice(foundIndex, 1);
        }
    }
    
    updateCart();
}
