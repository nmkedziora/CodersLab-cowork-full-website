$(document).ready(function() {


  parallax();


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


}); // $(document).ready(function()
