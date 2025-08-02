// Initialize EmailJS (Insert your EmailJS Public Key here)
(function () {
  emailjs.init("qI8QutFmaJq4FBIPk"); //  EmailJS public key
})();

// Contact Form Submission
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  statusEl.textContent = "📤 Sending your message...";
  statusEl.style.color = "#007bff";

  //  EmailJS Service ID and Template ID
  emailjs.sendForm("service_v0foyoc", "template_iu01qf6", this)
    .then(function () {
      statusEl.textContent = "✅ Message sent successfully!";
      statusEl.style.color = "green";
      form.reset();
    }, function (error) {
      console.error("Email send error:", error);
      statusEl.textContent = "❌ Failed to send message. Please try again.";
      statusEl.style.color = "red";
    });

  // Clear message after 5 seconds
  setTimeout(() => {
    statusEl.textContent = "";
  }, 5000);
});

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");  // Toggle dark mode class
  themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// Load saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
  }
});
