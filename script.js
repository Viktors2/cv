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
      modalContent.style.opacity = 0;
      setTimeout(function() {
        modalContent.classList.add("hidden-popup");
      }, 300); // Wait for the transition to complete before hiding the popup
    }

    openModal.addEventListener("click", function () {
      modalContent.style.opacity = 1;
      modalContent.classList.remove("hidden-popup");
    });

    closeModal.addEventListener("click", closeModalFunction);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !modalContent.classList.contains("hidden-popup")) {
        closeModalFunction();
      }
    });

    ///slider   
    const slider = document.querySelector('.slider');
    const sliderContainer = document.querySelector('.slider-container');
    const sliderItems = document.querySelectorAll('.slider-item');
    const imageWidth = slider.offsetWidth;
    let currentIndex = 0;

    //position of the slider
    sliderContainer.style.transform = `translateX(${-currentIndex * imageWidth}px)`;

    function nextSlide() {
      currentIndex++;
      if (currentIndex >= sliderItems.length) {
        currentIndex = 0;
      }
      sliderContainer.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
    }

    setInterval(nextSlide, 7000); // Change slide every 7 seconds

    //lightbox
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');

    function openLightbox(imageUrl) {
      lightboxImage.src = imageUrl;
      lightbox.classList.add('active');
    }

    lightbox.addEventListener('click', function() {
      lightbox.classList.remove('active');
    });