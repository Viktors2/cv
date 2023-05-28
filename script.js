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

///popup
let modalContent = document.querySelector(".popup-content");
let openModal = document.querySelector(".button-f");
let closeModal = document.querySelector(".close-popup");

let closeModalFunction = function () {
  modalContent.classList.add("hidden-popup");
}

openModal.addEventListener("click", function () {
  modalContent.classList.remove("hidden-popup");
});

closeModal.addEventListener("click", closeModalFunction);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modalContent.classList.contains("hidden-popup")) {
    closeModalFunction();
  }
});
