const dropdown = document.getElementById("dropdown");
const profileMenu = document.querySelector(".profile__menu");

let slideIndex = 0;
let timeoutId = null;
const slides = document.getElementsByClassName("content__slider-item");
const dots = document.getElementsByClassName("slide__btn");

window.addEventListener("DOMContentLoaded", function () {
  /* Show and hide user navigation menu */
  if (dropdown) {
    dropdown.addEventListener("click", function () {
      profileMenu.classList.toggle("show");
    });

    /* Hide user navigation menu when target loses focus */
    document.addEventListener("click", (e) => {
      if (!profileMenu.contains(e.target) && !dropdown.contains(e.target)) {
        profileMenu.classList.remove("show");
      }
    });
  }

  showSlides();
});

function currentSlide(index) {
  slideIndex = index;

  showSlides();
}

function plusSlides(step) {
  if (step < 0) {
    slideIndex -= 2;

    if (slideIndex < 0) {
      slideIndex = slides.length - 1;
    }
  }

  showSlides();
}

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].classList.remove("active");
  }

  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";

  dots[slideIndex - 1].classList.add("active");

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(showSlides, 5000); // Change image every 5 seconds
}
