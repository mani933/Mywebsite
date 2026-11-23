/* Contact form: opens WhatsApp with the message filled in. */
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  var f = e.target, text = "Hello Kapul, my name is " + f.name.value.trim() +
    ". I need help with: " + f.service.value + ".\n\n" + f.message.value.trim();
  window.open("https://wa.me/254768198051?text=" + encodeURIComponent(text), "_blank", "noopener");
});
