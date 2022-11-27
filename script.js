const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
const dots = $(".dot").toArray();
const body = $("body");
const arrows = $(".arrow");


// theming
const toggleMode = $("#toggle-mode");

function toggleTheme() {
  body.toggleClass("background");
  $("#about").toggleClass("background-primary");
  const icons = $(".icon-react").toArray();
  skillPalette();
  if (body.hasClass("background")) {
    body.css("--color-primary", "#ece9de");
    body.css("--color-accent", "#76707F");
    body.css("--color-background", "#1f2325");
    arrows.removeClass("icon-primary");
    arrows.addClass("icon-background");
    toggleMode.attr("src", "assets/icons/moon.svg");
    icons.forEach(icon => {
      icon.classList.remove("icon-background");
      icon.classList.add("icon-primary");
    });
  } else {
    body.css("--color-primary", "#1F2325");
    body.css("--color-accent", "#6F7A86");
    body.css("--color-background", "#ece9de");
    arrows.addClass("icon-primary");
    arrows.removeClass("icon-background");
    toggleMode.attr("src", "assets/icons/sun.svg");
    icons.forEach(icon => {
      icon.classList.remove("icon-primary");
      icon.classList.add("icon-background");
    });
  }
}

// home page
let currentContent = 0;
const desc = $("#desc");
const skillset = $("#skillset");
const contentArray = [desc, skillset]

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

// projects

class project {
  constructor(role, name, description, link, image, opnsrc, srclink, tech) {
    this.role = role;
    this.name = name;
    this.description = description;
    this.link = link;
    this.image = image;
    this.opnsrc = opnsrc;
    this.srclink = srclink;
    this.tech = tech;
  }
}

const projectsArray = [
  new project(
    "Product Designer | UI/UX | Frontend Developer",
    "e-Sąsiad",
    " is a project created for the HackHeroes competition. It's a neighborhood-focused social networking platform similar to Facebook. Anyone will be able to seek assistance, assist your neighbors, and interact with them using our platform's forum feature. All of this is accomplished through the use of a simple yet effective user interface.",
    "https://e-sasiad.pl",
    "https://e-sasiad.pl/img/mockup1.d94d19ae.png",
    true,
    "https://github.com/IT-Students-Association/esasiad-frontend",
    ["VueJS", "NodeJS", "TypeScript", "ExpressJS", "MongoDB", "TailwindCSS", "Figma"]
  ),
  new project(
    "UI/UX | Frontend Developer",
    "CyberInfo",
    "is a collaborative effort developed for the computer competition \"Zwolnieni z Teorii.\" It's a project created by young enthusiasts for everyone who wants to make their web browsing a little more safe. Our mission is to provide everyone with verifiable information concerning cybersecurity and privacy issues.",
    "https://cyberinfo.website",
    "assets/cyberinfo-dark.png",
    false,
    "",
    ["NodeJS", "VueJS", "JavaScript", "ExpressJS", "HTML", "MongoDB", "CSS", "Figma"]
  ),
  new project(
    "UI/UX | Frontend Developer",
    "OpenSourceCasino",
    "A place where you can enjoy playing casino games with cyberdonuts (fake money)! Game was made by LucasHazardous as a side project. He asked me to completely redesign the UI and make it responsive. I also added some new features and fixed some bugs.",
    "https://lucashazardous.github.io/OpenSourceCasino/#/",
    "assets/osc.png",
    true,
    "https://github.com/LucasHazardous/OpenSourceCasino",
    ["ViteJS", "JavaScript", "TailwindCSS", "HTML", "Figma"]
  ),
];

function loadProjects() {
  projectsArray.forEach(project => {
    const projectCard = $(`
      <div id="${project.name}" class="cursor-pointer project flex flex-col items-center text-center sm:max-w-[20vw] gap-2 rounded-xl transition-all overflow-hidden border background-primary">
        <div class="w-full p-1 h-1/2 max-h-[30vh] overflow-hidden">
          <img src="${project.image}" alt="${project.name}" class="w-full object-fit object-center" />
        </div>
        <div class="flex flex-col p-5 pt-3">
          <p class="opacity-60">${project.role}</p>
          <h2 class="text-2xl font-bold">${project.name}</h2>
          <p><a class="accented decorated transition-all" target="_blank" href="https://e-sasiad.pl">${project.name}</a> ${project.description}</p>
        </div>
      </div>
    `);
    $("#projects-cont").append(projectCard);
  });
}

function showProjectModal(projectName) {
  const modal = $("#modal");
  body.css("overflow", "hidden");
  const project = projectsArray.find(project => project.name === projectName);
  const projectInfo = $(`
    <div class="flex flex-col gap-2 p-10 sm:w-2/3 sm:max-h-[70vh] background-background rounded-xl transition-all p-5 slideFromDown">
      <div class="w-full">
        <img src="assets/icons/close-square.svg" alt="close" id="closeModal" class="pt-14 w-10 cursor-pointer icon-react icon-primary" />
      </div>
      <div class="overflow-hidden">
        <img src="${project.image}" alt="${project.name}" class="max-h-[40vh] object-fit object-center" />
      </div>
      <h2 class="text-2xl font-bold">${project.name}</h2>
      <p class="opacity-60">${project.role}</p>
      <p>${project.name} ${project.description}</p>
      <a class="accented decorated transition-all" target="_blank" href="${project.link}">${project.link}</a>
    </div>
  `);
  modal.removeClass("hidden");
  modal.append(projectInfo);
  $("img#closeModal").click(function () {
    body.css("overflow", "auto");
    $("#modal").addClass("hidden");
    $("#modal").empty();
  });
}

// all projects
function loadAllProjects() {
  projectsArray.forEach(project => {
    const projectCard = $(`
      <div id="${project.name}-all" class="cursor-pointer project-all flex flex-col sm:flex-row text-center sm:text-left justify-center gap-2 rounded-xl transition-all overflow-hidden">
        <div class="p-1 max-h-[40vh] sm:max-w-[30vw] overflow-hidden">
          <img src="${project.image}" alt="${project.name}" class="h-full w-auto object-cover object-center p-0" />
        </div>
        <div id="${project.name}-details" class="flex flex-col flex-1 gap-1 justify-center p-5 pt-3">
          <p class="text-lg font-medium opacity-60">${project.role}</p>
          <div id="${project.name}-tech" class="flex flex-wrap justify-center sm:justify-start gap-y-1 gap-x-3"></div>
          <h2 class="text-2xl font-bold">${project.name}</h2>
          <p><a class="accented decorated transition-all" target="_blank" href="${project.link}">${project.name}</a> ${project.description}</p>
        </div>
      </div>
    `);
    $("#all-projects-cont").append(projectCard);
    project.tech.forEach(tech => {
      const techIcon = $(`
        <div class="flex items-center justify-center gap-1 sm:gap-2">
          <img src="assets/icons/${tech.toLowerCase()}.svg" alt="${tech}" class="w-5" />
          <p class="opacity-60">${tech}</p>
        </div>
      `);
      $(`#${project.name}-tech`).append(techIcon);
    });
    if (project.opnsrc) {
      const srcLink = $(`
        <a class="accented decorated transition-all" target="_blank" href="${project.src}">Source code</a>
      `);
      $(`#${project.name}-details`).append(srcLink);
    }
  });
}

// skills
const similarPaletteDark = ["#9AA0A2", "#6E7375", "#45494B", "#1F2325"];
const similarPaletteLight = ["#ECE9DE", "#B8B6AB", "#87857B", "#59574E"];

class skill {
  constructor(id, name, level) {
    this.id = id;
    this.name = name;
    this.level = level;
  }
}

const techSkillsArray = [
  new skill("nodejs", "NodeJS", 2),
  new skill("js", "JavaScript", 3),
  new skill("ts", "TypeScript", 2),
  new skill("cpp", "C++", 1),
  new skill("csh", "C#", 1),
  new skill("html", "HTML", 3),
  new skill("css", "CSS", 3),
  new skill("sass", "SASS", 2),
  new skill("java", "Java", 3),
  new skill("kotlin", "Kotlin", 2),
  new skill("jetcomp", "Jetpack Compose", 1),
  new skill("git", "Git/GitHub", 3),
  new skill("tailwind", "TailwindCSS", 4),
  new skill("vue", "VueJS", 3),
  new skill("react", "React", 1),
  new skill("py", "Python", 2),
  new skill("php", "PHP", 2),
  new skill("sql", "SQL", 3),
  new skill("mongo", "MongoDB", 1),
  new skill("maria", "MariaDB", 2),
];

const skillsetArray = [
  new skill("ui", "UI/UX designing", 3),
  new skill("hrm", "Human Resources Management", 2),
  new skill("pm", "Project Management", 2),
  new skill("event", "Event Organization", 2),
  new skill("smm", "Social Media Management", 3),
];

function loadSkills() {
  const techSkills = $("#tech-skills");
  const skillset = $("#skills");
  techSkillsArray.forEach(skill => {
    const skillCard = $(`
      <div id="${skill.id}" data-level="${skill.level}" class="flex flex-col rounded-xl skill p-2">
        <p class="">${skill.name}</p>
      </div>
    `);
    techSkills.append(skillCard);
  });
  skillsetArray.forEach(skill => {
    const skillCard = $(`
      <div id="${skill.id}" data-level="${skill.level}" class="flex flex-col rounded-xl skill p-2">
        <p class="">${skill.name}</p>
      </div>
    `);
    skillset.append(skillCard);
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

// tab switching

function goTo(fromId, toId) {
  const from = $(`#${fromId}`);
  const to = $(`#${toId}`);
  from.addClass("absolute");
  from.addClass("!-translate-x-[100vw]");
  from.removeClass("active-tab");
  from.removeClass("duration-500");
  to.removeClass("hidden");
  setTimeout(() => {
    from.addClass("hidden");
    to.addClass("active-tab");
    to.addClass("duration-500");
    to.removeClass("!-translate-x-[100vw]");
    setTimeout(() => {
      to.removeClass("absolute");
    }, 500);
  }, 500);
}

function getCurrentTab() {
  return body.children(".active-tab").attr('id');
}

// main function

$(document).ready(function () {
  loadProjects();
  loadSkills()
  skillPalette();
  loadAllProjects();
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

  $(".project").click(function () {
    showProjectModal($(this).attr("id"));
  });

  $(".project").hover(function() {
    let cyberinfo = $("img[alt='CyberInfo']");
    $(this).toggleClass("background-background");
    if ($(this).has(cyberinfo).length) {
      if ($(this).hasClass("background-background")) {
        cyberinfo.attr("src", "assets/cyberinfo-light.png");
      } else {
        cyberinfo.attr("src", "assets/cyberinfo-dark.png");
      }
    }
  });

  const btnProjects = $("#button-project");
  btnProjects.click(function() {
    goTo("homepage", "all-projects");
  });
  btnProjects.hover(function() {
    $(this).toggleClass("accented");
    $(this).toggleClass("font-regular");
  });

  $("#nav-home").click(function() {
    goTo(getCurrentTab(), "homepage");
  });
  $("#nav-contact").click(function() {
    goTo(getCurrentTab(), "contact");
  });
  $("#nav-projects").click(function() {
    goTo(getCurrentTab(), "all-projects");
  });
});
