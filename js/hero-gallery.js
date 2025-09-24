let slideIndex = 0;
showSlides();

// Next/previous controls
document.querySelector('.prev').addEventListener('click', () => {
  plusSlides(-1);
});

document.querySelector('.next').addEventListener('click', () => {
  plusSlides(1);
});

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("hero-slide");
  if (slideIndex >= slides.length) {slideIndex = 0}
  if (slideIndex < 0) {slideIndex = slides.length - 1}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex].style.display = "block";
  slides[slideIndex].classList.add("fade");
}

// Automatic slideshow
setInterval(() => {
    plusSlides(1);
}, 5000); // Change image every 5 seconds