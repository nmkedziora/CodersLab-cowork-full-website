$(document).ready(function() {


  parallax();
  validateFormOptional();

  // added to prevent background image in header from bumping on mobile
  // more details at:
  // http://stackoverflow.com/questions/24944925/background-image-jumps-when-address-bar-hides-ios-android-mobile-chrome
  var bg = $(".background-box");

  $(window).resize("resizeBackground");
  function resizeBackground() {
    bg.height($(window).height() + 60);
  }
  resizeBackground();

  function parallax() {
    $(window).on("scroll", function () {
      var windowScroll = $(this).scrollTop();

      // parallax on header
      $(".logo").css({
        "transform": "translate(0px, "+ windowScroll / 3 + "%)"
      });

      $(".back-image").css({
        "transform": "translate(0px, "+ windowScroll / 8 + "%)"
      });

      $(".fore-image").css({
        "transform": "translate(0px, -"+ windowScroll / 20 + "%)"
      });

      // parallax on team section
      if (windowScroll > $(".team").offset().top - $(window).height() / 2) {

        $(".photo-placeholder").each(function (i) {
          var self = $(this);

          if (!self.hasClass("is-visible")) {
            setTimeout(function () {
              self.addClass("is-visible");
            }, 250 * (i + 1));
          }
        }); // each
      }
    }); // window scroll
  } // parallax


  // Validate optional form inputs (name, email), when checkbox is checked
  function validateFormOptional() {
    var form = $("form");
    var submitButton = $("input[type=submit]");
    var checkbox = $("#optional");
    var nameInput = $("#name");
    var emailInput = $("#email");
    var nameLabel = $("label[for=name]");
    var emailLabel = $("label[for=email]");

    var nameError = $("#name-error");
    var emailError = $("#email-error");

    nameInput.on("blur", isNameValid);
    emailInput.on("blur", isEmailValid);

    checkbox.on("change", function () {
      if (checkbox.prop('checked')) {

        // enable inpputs and fill in input placeholder
        nameInput.prop("disabled", false);
        nameInput.attr("placeholder", "Your Name");
        nameLabel.text("Name - required");

        emailInput.prop("disabled", false);
        emailInput.attr("placeholder", "Your Email Address");
        emailLabel.text("Email - required");

      } else {

        // disable inputs, clear input's placeholder and value
        nameInput.prop("disabled", true);
        nameInput.attr("placeholder", "");
        nameInput.val("");
        nameLabel.text("Name");
        nameError.html("&nbsp;");

        emailInput.prop("disabled", true);
        emailInput.attr("placeholder", "");
        emailInput.val("");
        emailLabel.text("Email");
        emailError.html("&nbsp;");
      }
    });

    // prevent from reloading the page on submit
    form.on("submit", function (event) {
      event.preventDefault();

      if (checkbox.prop('checked') && isNameValid() && isEmailValid()) {
        submitForm();
      }
    });


    // validation functions
    function isNameValid() {
      var name = nameInput.val();

      if (name.length < 3) {
        nameError.text("Name too short - min. 3 letters");
        return false;
      } else {
        nameError.html("&nbsp;");
        return true;
      }
    }

    function isEmailValid() {
      var email = emailInput.val();
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

      if (! emailRegex.test(email)) {
        emailError.text("Invalid email address");
        return false;
      } else {
        emailError.html("&nbsp;");
        return true;
      }
    }

    function submitForm() {
      var processingButton = $(".processing-button");
      var successButton = $(".success-button");

      // after submiting, when the form is processing
      submitButton.fadeOut(1000, function() {
        processingButton.fadeIn(2000, function() {

          // when processing ends - success information
          setTimeout(function () {
            processingButton.fadeOut(1000, function () {
              successButton.fadeIn(2000);
            });
          }, 2000);
        });
      });
    }

  } // validateFormOptional()

}); // $(document).ready(function()
