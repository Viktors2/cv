const arrow = document.querySelector(".down");
const resume = document.querySelector(".button-t");
const navLinks = document.querySelectorAll(".nav-links a");
const elements = document.querySelectorAll(".c");
const main = document.querySelector(".con");

resume.addEventListener("click", function () {
  main.scrollIntoView({ behavior: "smooth" });
});
navLinks.forEach((link, index) => {
  link.addEventListener("click", function () {
    elements[index + 1].scrollIntoView({ behavior: "smooth" });
  });
});

arrow.addEventListener("click", function () {
  elements[1].scrollIntoView({ behavior: "smooth" });
});
