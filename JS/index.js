// =======================
// ADD TO CART (LOGIN PROTECTED)
// =======================

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {

        const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

        if (!loggedUser) {
            localStorage.setItem("redirectAfterLogin", "index.html");
            alert("Please login to add items to cart.");
            window.location.href = "login.html";
            return;
        }

        const id = this.dataset.id;
        const name = this.dataset.name;
        const price = parseFloat(this.dataset.price);
        const image = this.dataset.image;

        const cartKey = "cart_" + loggedUser.email;
        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                image,
                quantity: 1
            });
        }

        localStorage.setItem(cartKey, JSON.stringify(cart));
        alert("Item Added To Cart");
    });
});