const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
const desc = $("#desc");
const skillset = $("#skillset");
const contentArray = [desc, skillset]
const dots = $(".dot").toArray();
const body = $("body");
const arrows = $(".arrow");
const toggleMode = $("#toggle-mode");
const similarPaletteDark = ["#9AA0A2", "#6E7375", "#45494B", "#1F2325"];
const similarPaletteLight = ["#ECE9DE", "#B8B6AB", "#87857B", "#59574E"];
let currentContent = 0;

function toggleTheme() {
  body.toggleClass("background");
  $("#about").toggleClass("background-primary");
  skillPalette();
  if (body.hasClass("background")) {
    body.css("--color-primary", "#ece9de");
    body.css("--color-accent", "#76707F");
    body.css("--color-background", "#1f2325");
    arrows.removeClass("icon-primary");
    arrows.addClass("icon-background");
    toggleMode.attr("src", "assets/icons/moon.svg");
  } else {
    body.css("--color-primary", "#1F2325");
    body.css("--color-accent", "#6F7A86");
    body.css("--color-background", "#ece9de");
    arrows.addClass("icon-primary");
    arrows.removeClass("icon-background");
    toggleMode.attr("src", "assets/icons/sun.svg");
  }
}

function switchContent(num) {
  switch (num) {
    case -1:
      contentArray[currentContent].addClass("translate-x-[100vw]");
      contentArray[currentContent + num].removeClass("-translate-x-[100vw]");
      break;
    case 1:
      contentArray[currentContent].addClass("-translate-x-[100vw]");
      contentArray[currentContent + num].removeClass("translate-x-[100vw]");
      break;
  }
  currentContent += num;
  if (currentContent === 0) { $("#arrow-l").addClass("disabled"); }
  else { $("#arrow-l").removeClass("disabled"); }
  if (currentContent === contentArray.length - 1) { $("#arrow-r").addClass("disabled"); }
  else { $("#arrow-r").removeClass("disabled"); }
  dots.forEach(dot => {
    if (dot.id === `dot-${currentContent}`) {
      dot.classList.add("dot-active");
    } else {
      dot.classList.remove("dot-active");
    }
  });
}

function skillPalette() {
  const skills = $(".skill").toArray();
  const skillPalette = body.hasClass("background") ? similarPaletteDark : similarPaletteLight;
  skills.forEach(skill => {
    const skillName = skill.id;
    const skillLevel = skill.getAttribute("data-level");
    const skillColor = skillPalette[skillLevel - 1];
    $(`#${skillName}`).css("background-color", skillColor);
  });
}
$(document).ready(function () {
  skillPalette();
  if (!darkThemeMq.matches) {
    toggleTheme();
  }

  setTimeout(function () {
    body.removeClass("overflow-hidden");
    $("#navbar").toggleClass("hidden");
    $("#title").toggleClass("hidden");
    $("#homepage-content").toggleClass("hidden");
  }, 2000);

  toggleMode.click(toggleTheme);
  $(".cursor-pointer").hover(function () {
    $(this).toggleClass("accented");
    $(this).toggleClass("font-regular");
  });

  $("a").hover(function () {
    $(this).toggleClass("accented");
    $(this).toggleClass("font-regular");
    $(this).toggleClass("decorated");
  });

  $("#arrow-l").click(() => switchContent(-1));
  $("#arrow-r").click(() => switchContent(1));
});
