// Initialize EmailJS
(function() {
  emailjs.init("qI8QutFmaJq4FBIPk"); // my EmailJS public key
})();

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  emailjs.sendForm('service_v0foyoc', 'template_iu01qf6', this)
    .then(function(response) {
      document.getElementById('status').textContent = "Message sent successfully!";
    }, function(error) {
      document.getElementById('status').textContent = "Failed to send message. Please try again.";
    });

  this.reset();
});
