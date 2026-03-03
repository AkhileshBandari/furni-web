const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
const container = document.getElementById("cart-container");
const totalDisplay = document.getElementById("total");

if (!loggedUser) {
    localStorage.setItem("redirectAfterLogin", "cart.html");
    alert("Please login to view your cart.");
    window.location.href = "login.html";
}

const cartKey = "cart_" + loggedUser.email;
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];


// ==========================
// RENDER CART
// ==========================
function renderCart() {
    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<h3>Your cart is empty</h3>";
        totalDisplay.innerText = "";
        return;
    }

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" width="80">
                <div>
                    <h3>${item.name}</h3>
                    <p>$${item.price}</p>

                    <div class="qty-controls">
                        <button onclick="decreaseQty(${index})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQty(${index})">+</button>
                    </div>

                    <p>Subtotal: $${itemTotal.toFixed(2)}</p>
                    <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
                </div>
            </div>
        `;
    });

    totalDisplay.innerText = "Total: $" + total.toFixed(2);
}


// ==========================
// INCREASE
// ==========================
function increaseQty(index) {
    cart[index].quantity += 1;
    localStorage.setItem(cartKey, JSON.stringify(cart));
    renderCart();
}


// ==========================
// DECREASE
// ==========================
function decreaseQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    renderCart();
}


// ==========================
// REMOVE
// ==========================
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem(cartKey, JSON.stringify(cart));
    renderCart();
}


// ==========================
// CHECKOUT
// ==========================
function checkout() {

    if (cart.length === 0) {
        alert("Cart is empty.");
        return;
    }

    alert("Purchase Successful!");

    localStorage.removeItem(cartKey);
    cart = [];
    renderCart();
}

renderCart();