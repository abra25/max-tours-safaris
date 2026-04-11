const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

/* LIGHTBOX */
const items = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const close = document.getElementById("closeLightbox");

items.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

close.addEventListener("click", () => {
  lightbox.style.display = "none";
});