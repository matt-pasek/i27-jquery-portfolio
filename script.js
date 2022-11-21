$(document).ready(function () {
  $("#toggle-mode").click(function () {
    $("body").toggleClass("background");
    if ($("body").hasClass("background")) {
      $("body").css("--color-primary", "#ece9de");
      $("body").css("--color-accent", "#76707F");
      // change src of image
      $("#toggle-mode").attr("src", "assets/icons/moon.svg");
    } else {
      $("body").css("--color-primary", "#1F2325");
      $("body").css("--color-accent", "#6F7A86");
      $("#toggle-mode").attr("src", "assets/icons/sun.svg");
    }
  });
});
