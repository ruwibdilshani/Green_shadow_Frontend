document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signinForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const termsCheck = document.getElementById("termsCheck");
    const togglePassword = document.getElementById("togglePassword");

    // Show/Hide password functionality
    togglePassword.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.classList.replace("bi-eye-slash", "bi-eye");
        } else {
            passwordInput.type = "password";
            togglePassword.classList.replace("bi-eye", "bi-eye-slash");
        }
    });

    // Form validation and submission
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Check if email format is valid and filled
        if (!emailInput.checkValidity()) {
            alert("Please enter a valid email address.");
            emailInput.focus();
            return;
        }

        // Check if password is entered
        if (passwordInput.value === "") {
            alert("Please enter your password.");
            passwordInput.focus();
            return;
        }

        // Check if terms are agreed to
        if (!termsCheck.checked) {
            alert("Please agree to the terms, privacy policy, and fees.");
            termsCheck.focus();
            return;
        }

        // If all validations pass
        alert("Login successful! Redirecting to your dashboard...");
        window.location.href = "../index.html"; // Redirect to new path
    });
});
