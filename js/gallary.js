const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  });

  document.querySelectorAll("#mainNav a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
      mainNav.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const categories = document.querySelectorAll(".gallery-category");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    categories.forEach((category) => {
      const categoryName = category.dataset.category;

      if (filter === "all" || filter === categoryName) {
        category.classList.remove("hidden-category");
      } else {
        category.classList.add("hidden-category");
      }
    });

    window.scrollTo({
      top: document.querySelector(".gallery-section").offsetTop - 90,
      behavior: "smooth"
    });
  });
});

const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightbox = document.getElementById("closeLightbox");
const prevLightbox = document.getElementById("prevLightbox");
const nextLightbox = document.getElementById("nextLightbox");

let currentIndex = 0;
let visibleItems = [];

function getVisibleItems() {
  return galleryItems.filter((item) => {
    const parentCategory = item.closest(".gallery-category");
    return parentCategory && !parentCategory.classList.contains("hidden-category");
  });
}

function openLightbox(index) {
  visibleItems = getVisibleItems();
  currentIndex = index;

  const currentItem = visibleItems[currentIndex];
  const image = currentItem.querySelector("img");
  const caption = currentItem.querySelector("span");

  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt;
  lightboxCaption.textContent = caption ? caption.textContent : image.alt;

  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function closeBox() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
}

function showNext() {
  if (!visibleItems.length) return;
  currentIndex = (currentIndex + 1) % visibleItems.length;
  openLightbox(currentIndex);
}

function showPrev() {
  if (!visibleItems.length) return;
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  openLightbox(currentIndex);
}

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    visibleItems = getVisibleItems();
    const clickedIndex = visibleItems.indexOf(item);
    openLightbox(clickedIndex);
  });
});

if (closeLightbox) {
  closeLightbox.addEventListener("click", closeBox);
}

if (nextLightbox) {
  nextLightbox.addEventListener("click", showNext);
}

if (prevLightbox) {
  prevLightbox.addEventListener("click", showPrev);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeBox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("active")) return;

  if (event.key === "Escape") closeBox();
  if (event.key === "ArrowRight") showNext();
  if (event.key === "ArrowLeft") showPrev();
});