// Initialize EmailJS
(function() {
  emailjs.init("YOUR_EMAILJS_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
    .then(function(response) {
      document.getElementById('status').textContent = "Message sent successfully!";
    }, function(error) {
      document.getElementById('status').textContent = "Failed to send message. Please try again.";
    });

  this.reset();
});
