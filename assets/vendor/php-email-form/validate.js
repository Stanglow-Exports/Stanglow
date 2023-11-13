/**
 * PHP Email Form Validation - v3.6
 * URL: https://bootstrapmade.com/php-email-form/
 * Author: BootstrapMade.com
 */
(function () {
  "use strict";

  let forms = document.querySelectorAll(".php-email-form");

  forms.forEach(function (e) {
    e.addEventListener("submit", function (event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute("action");

      if (!action) {
        displayError(thisForm, "The form action property is not set!");
        return;
      }

      php_email_form_submit();
    });
  });

  function php_email_form_submit() {
    document.querySelector(".loading").classList.add("d-block");
    document.querySelector(".error-message").classList.remove("d-block");
    document.querySelector(".sent-message").classList.remove("d-block");

    Email.send({
      //SecureToken: "8eed899a-b776-4f4d-9d89-103669251f55",
      Host: "smtp.elasticemail.com",
      Username: "aditya.bajoria@stanglow.com",
      Password: "46DC5287717F57B778744F377E39C788E3DD",
      To: "aditya.bajoria@stanglow.com",
      From: "aditya.bajoria@stanglow.com",
      Subject: "Customer Query",
      Body:
        "Hey Stanglow, You have a new user query. Here are the details:<br>" +
        "<b>Email: </b>" +
        document.getElementById("email").value +
        "<br>" +
        "<b>Name: </b>" +
        document.getElementById("name").value +
        "<br>" +
        "<b>Phone: </b>" +
        document.getElementById("phone").value +
        "<br>" +
        "<b>Subject: </b>" +
        document.getElementById("subject").value +
        "<br>" +
        "<b>Message: </b>" +
        document.getElementById("message").value,
    })
      .then((response) => {
        if (response == "OK") {
          document.querySelector(".loading").classList.remove("d-block");
          document.querySelector(".sent-message").classList.add("d-block");
          document.getElementById("email").value = "";
          document.getElementById("name").value = "";
          document.getElementById("phone").value = "";
          document.getElementById("subject").value = "";
          document.getElementById("message").value = "";
          setTimeout(() => {
            document.querySelector(".sent-message").classList.remove("d-block");
          }, 3000);
        } else {
          displayError("Something went wrong, Please try again later.");
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
  }

  function displayError(error) {
    document.querySelector(".loading").classList.remove("d-block");
    document.querySelector(".error-message").innerHTML = error;
    document.querySelector(".error-message").classList.add("d-block");
    setTimeout(() => {
      document.querySelector(".error-message").classList.remove("d-block");
    }, 3000);
  }
})();
