// ==========================
// LOAD USERS
// ==========================
let users = JSON.parse(localStorage.getItem("users")) || [];


// ==========================
// REGISTER
// ==========================
function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        alert("Account already exists.");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful.");
    window.location.href = "login.html";
}


// ==========================
// LOGIN
// ==========================
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const errorBox = document.getElementById("login-error");

    if (errorBox) errorBox.textContent = "";

    const user = users.find(user => user.email === email);

    if (!user) {
        if (errorBox) errorBox.textContent = "No account found.";
        return;
    }

    if (user.password !== password) {
        if (errorBox) errorBox.textContent = "Incorrect password.";
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // Redirect to previous action if exists
    const redirect = localStorage.getItem("redirectAfterLogin");
    if (redirect) {
        localStorage.removeItem("redirectAfterLogin");
        window.location.href = redirect;
    } else {
        window.location.href = "index.html";
    }
}


// ==========================
// LOGOUT
// ==========================
// =============================
// LOGOUT FUNCTION
// =============================
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully.");
    window.location.href = "index.html";   // go to main page
}

// Attach logout event safely
document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
            e.preventDefault();
            logout();
        });
    }
});