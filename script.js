//Arrow button
const arrow = document.querySelector(".down");
const container2 = document.querySelector("container2");

arrow.addEventListener("click", function () {
  container2.scrollIntoView({ behavior: "smooth" });
});