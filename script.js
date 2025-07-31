// Initialize EmailJS
(function () {
  emailjs.init("qI8QutFmaJq4FBIPk"); // EmailJS public key
})();

const form = document.getElementById("contact-form");
const statusEl = document.getElementById("status");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Show sending message
  statusEl.textContent = "📤 Sending your message...";
  statusEl.style.color = "#007bff";

  // Send the form
  emailjs.sendForm("service_v0foyoc", "template_iu01qf6", this)
    .then(function () {
      statusEl.textContent = "✅ Message sent successfully!";
      statusEl.style.color = "green";
      form.reset();
    }, function () {
      statusEl.textContent = "❌ Failed to send message. Please try again.";
      statusEl.style.color = "red";
    });

  // Clear message after 5 seconds
  setTimeout(() => {
    statusEl.textContent = "";
  }, 5000);
});
