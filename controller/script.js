document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");

  // Function to handle click event
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Remove 'active' class from all links
      navLinks.forEach((nav) => nav.classList.remove("active"));

      // Add 'active' class to the clicked link
      this.classList.add("active");

      // Change iframe content
      const page = this.getAttribute("data-page");
      if (page) {
        const iframe = document.getElementById("main-frame");
        iframe.src = page;
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logoutButton");
  const confirmLogout = document.getElementById("confirmLogout");

  logoutButton.addEventListener("click", function () {
    const logoutModal = new bootstrap.Modal(
      document.getElementById("logoutModal")
    );
    logoutModal.show();
  });

  confirmLogout.addEventListener("click", function () {
    // Perform the actual logout operation here

    window.location.href = "/pages/SignIn.html"; // Redirect to login page or any desired location
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const toggleButton = document.getElementById("menuToggle"); // Add a toggle button
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  // Toggle sidebar and overlay visibility
  toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  // Close sidebar when clicking on the overlay
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });
});
