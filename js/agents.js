const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});