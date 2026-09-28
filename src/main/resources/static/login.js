/* =========================================================
   SHIFTPLANNER LOGIN
========================================================= */

console.log("🔐 ShiftPlanner login.js loaded successfully");

document.addEventListener("DOMContentLoaded", function () {

    const loginButton = document.getElementById("loginButton");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const role = document.getElementById("role");
    const message = document.getElementById("loginMessage");

    function login() {

        const enteredUsername = username.value.trim();
        const enteredPassword = password.value.trim();
        const selectedRole = role.value;

        message.textContent = "";

        if (!enteredUsername || !enteredPassword) {

            message.textContent =
                "Please enter username and password.";

            message.style.color = "#d62828";

            return;
        }

        /* =========================
           MANAGER LOGIN
        ========================= */

        if (
            selectedRole === "manager" &&
            enteredUsername === "manager" &&
            enteredPassword === "manager123"
        ) {

            localStorage.setItem(
                "shiftplannerLoggedIn",
                "true"
            );

            localStorage.setItem(
                "shiftplannerRole",
                "manager"
            );

            localStorage.setItem(
                "shiftplannerUsername",
                "manager"
            );

            message.textContent =
                "Manager login successful!";

            message.style.color = "#008f7a";

            setTimeout(function () {

                window.location.href = "index.html";

            }, 500);

            return;
        }

        /* =========================
           EMPLOYEE LOGIN
        ========================= */

        if (
            selectedRole === "employee" &&
            enteredUsername === "employee" &&
            enteredPassword === "employee123"
        ) {

            localStorage.setItem(
                "shiftplannerLoggedIn",
                "true"
            );

            localStorage.setItem(
                "shiftplannerRole",
                "employee"
            );

            localStorage.setItem(
                "shiftplannerUsername",
                "employee"
            );

            message.textContent =
                "Employee login successful!";

            message.style.color = "#008f7a";

            setTimeout(function () {

                window.location.href = "index.html";

            }, 500);

            return;
        }

        /* =========================
           INVALID LOGIN
        ========================= */

        message.textContent =
            "Invalid username, password or role.";

        message.style.color = "#d62828";
    }

    loginButton.addEventListener(
        "click",
        login
    );

    password.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {
                login();
            }

        }
    );

});