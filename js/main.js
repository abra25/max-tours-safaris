const heroSlides = [
  {
    img: "img/c (24).jpeg",
    title: "Discover the beauty of Zanzibar & Tanzania"
  },
  {
    img: "img/Nakupenda Beach.jpeg",
    title: "Authentic Tours Across Zanzibar"
  },
  {
    img: "img/c (177).jpeg",
    title: "Adventure, Culture & Beach Escapes"
  },
  {
    img: "img/Mount Kilimanjaro National Park.jpeg",
    title: "Explore Tanzania's Natural Wonders"
  },
  {
    img: "img/c (51).jpeg",
    title: "Create Unforgettable Travel Memories"
  }
];

const aboutImages = [
  "img/g.jpeg",
  "img/c (19).jpeg",
  "img/g2.jpeg",
  "img/g3.jpeg",
  "img/g4.jpeg",
  "img/g6.jpeg",
  "img/g7.jpeg",
  "img/g8.jpeg"
];

const attractions = [
  {
    title: "Serengeti National Park",
    image: "img/IMG_098_22. (18).jpg",
    desc: "World-renowned for its annual wildebeest migration, the Serengeti offers vast savannahs teeming with wildlife, golden plains, and unforgettable safari experiences in the heart of Tanzania."
  },
  {
    title: "Zanzibar Archipelago",
    image: "img/Mnemba Atoll Trip.jpeg",
    desc: "Zanzibar is famed for its white-sand beaches, turquoise waters, rich Swahili culture, and relaxing island atmosphere that makes it one of East Africa’s most loved coastal destinations."
  },
  {
    title: "Ngorongoro Conservation Area",
    image: "img/Ngorongoro creater.jpg",
    desc: "Famous for the Ngorongoro Crater, this area is a haven for wildlife, dramatic landscapes, and Maasai culture, offering one of the most unique safari settings in Africa."
  },
  {
    title: "Selous / Nyerere National Park",
    image: "img/IMG_098_22. (16).jpg",
    desc: "One of Africa’s largest protected areas, known for wild landscapes, rich wildlife, peaceful river scenery, and unique boat safaris away from the crowds."
  }
];

const testimonials = [
  {
    text: "Max Tour & Safari made our trip to Zanzibar unforgettable! Their team are storytellers who make every place come alive. Highly recommended!",
    author: "Laisesma",
    meta: "Brazil • January 2025",
    image: "img/1 (1).jpeg"
  },
  {
    text: "The guides were knowledgeable and friendly. We loved every moment of our safari!",
    author: "Anna Müller",
    meta: "Germany • February 2025",
    image: "img/1 (2).jpeg"
  },
  {
    text: "A seamless experience from booking to the actual tour. Highly professional.",
    author: "John Smith",
    meta: "United Kingdom • March 2025",
    image: "img/1 (3).jpeg"
  },
  {
    text: "Fantastic service and unforgettable memories. Will book again!",
    author: "Yuki Tanaka",
    meta: "Japan • January 2026",
    image: "img/1 (10).jpeg"
  }
];

const heroSlider = document.getElementById("heroSlider");
const heroTitle = document.getElementById("heroTitle");
const aboutMainImage = document.getElementById("aboutMainImage");

const attractionImage = document.getElementById("attractionImage");
const attractionTitle = document.getElementById("attractionTitle");
const attractionDesc = document.getElementById("attractionDesc");
const attractionInfo = document.querySelector(".attraction-info");

const testimonialImage = document.getElementById("testimonialImage");
const testimonialText = document.getElementById("testimonialText");
const testimonialAuthor = document.getElementById("testimonialAuthor");
const testimonialMeta = document.getElementById("testimonialMeta");
const testimonialCard = document.querySelector(".testimonial-card");

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const modal = document.getElementById("siteModal");
const modalClose = document.getElementById("modalClose");
const modalContent = document.getElementById("modalContent");
const modalBookBtn = document.getElementById("modalBookBtn");

const contactForm = document.getElementById("contactForm");

let heroIndex = 0;
let aboutIndex = 0;
let attractionIndex = 0;
let testimonialIndex = 0;
let attractionInterval = null;

/* Mobile menu */
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", function () {
    mainNav.classList.toggle("active");
  });
}

/* Hero slider */
function animateHeroText() {
  if (!heroTitle) return;

  heroTitle.style.animation = "none";
  void heroTitle.offsetWidth;
  heroTitle.style.animation = "heroTextRise 1s ease 0.2s both";
}

function animateHeroSubtext() {
  const heroText = document.querySelector(".hero-content p");
  const heroBtn = document.querySelector(".hero-content .btn-primary");

  if (heroText) {
    heroText.style.animation = "none";
    void heroText.offsetWidth;
    heroText.style.animation = "heroTextRise 1s ease 0.36s both";
  }

  if (heroBtn) {
    heroBtn.style.animation = "none";
    void heroBtn.offsetWidth;
    heroBtn.style.animation = "heroTextRise 1s ease 0.5s both";
  }
}

function updateHeroSlide() {
  if (!heroSlider || !heroTitle) return;

  heroSlider.style.backgroundImage = `url('${heroSlides[heroIndex].img}')`;
  heroTitle.textContent = heroSlides[heroIndex].title;

  animateHeroText();
  animateHeroSubtext();
}

function startHeroSlider() {
  if (!heroSlider) return;

  updateHeroSlide();

  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroSlides.length;
    updateHeroSlide();
  }, 5200);
}

/* About image slider with fade */
function startAboutSlider() {
  if (!aboutMainImage) return;

  setInterval(() => {
    aboutMainImage.classList.add("is-switching");

    setTimeout(() => {
      aboutIndex = (aboutIndex + 1) % aboutImages.length;
      aboutMainImage.src = aboutImages[aboutIndex];
    }, 220);

    setTimeout(() => {
      aboutMainImage.classList.remove("is-switching");
    }, 520);
  }, 3400);
}

/* Preload attraction images */
function preloadAttractionImages() {
  attractions.forEach((item) => {
    const img = new Image();
    img.src = item.image;
  });
}

/* Attractions slider */
function setAttractionContent(index) {
  if (!attractionImage || !attractionTitle || !attractionDesc) return;

  const item = attractions[index];
  attractionImage.src = item.image;
  attractionImage.alt = item.title;
  attractionTitle.textContent = item.title;
  attractionDesc.textContent = item.desc;
}

function transitionAttraction() {
  if (!attractionImage || !attractionInfo) return;

  attractionImage.classList.add("attraction-fading");
  attractionInfo.classList.add("is-changing");

  setTimeout(() => {
    attractionIndex = (attractionIndex + 1) % attractions.length;
    setAttractionContent(attractionIndex);
  }, 320);

  setTimeout(() => {
    attractionImage.classList.remove("attraction-fading");
    attractionInfo.classList.remove("is-changing");
  }, 760);
}

function startAttractionSlider() {
  if (!attractionImage || !attractionTitle || !attractionDesc) return;

  preloadAttractionImages();
  setAttractionContent(attractionIndex);

  if (attractionInterval) {
    clearInterval(attractionInterval);
  }

  attractionInterval = setInterval(() => {
    transitionAttraction();
  }, 5000);
}

/* Testimonials with fade */
function updateTestimonial() {
  if (!testimonialImage || !testimonialText || !testimonialAuthor || !testimonialMeta) return;

  const item = testimonials[testimonialIndex];
  testimonialImage.src = item.image;
  testimonialImage.alt = item.author;
  testimonialText.textContent = item.text;
  testimonialAuthor.textContent = item.author;
  testimonialMeta.textContent = item.meta;
}

function transitionTestimonial() {
  if (!testimonialCard) return;

  testimonialCard.classList.add("is-changing");

  setTimeout(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    updateTestimonial();
  }, 220);

  setTimeout(() => {
    testimonialCard.classList.remove("is-changing");
  }, 520);
}

function startTestimonialSlider() {
  if (!testimonialImage) return;

  updateTestimonial();

  setInterval(() => {
    transitionTestimonial();
  }, 4300);
}

/* Modal */
function openModal(title, image, text) {
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="modal-body-custom">
      <img src="${image}" alt="${title}" />
      <h2>${title}</h2>
      <p>${text}</p>
      <button class="btn-primary" id="bookFromModalBtn">Book / Ask About This</button>
    </div>
  `;

  modal.classList.add("active");

  const bookFromModalBtn = document.getElementById("bookFromModalBtn");
  if (bookFromModalBtn) {
    bookFromModalBtn.addEventListener("click", function () {
      const subjectInput = document.getElementById("contact-subject");
      const messageInput = document.getElementById("contact-message");
      const contactSection = document.getElementById("contact");

      if (subjectInput) {
        subjectInput.value = `Booking: ${title}`;
      }

      if (messageInput) {
        messageInput.value = `Hello, I am interested in ${title}. Please provide more information.`;
      }

      modal.classList.remove("active");

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

document.querySelectorAll(".open-modal").forEach((button) => {
  button.addEventListener("click", function () {
    const title = this.getAttribute("data-title");
    const image = this.getAttribute("data-image");
    const text = this.getAttribute("data-text");
    openModal(title, image, text);
  });
});

if (modalClose && modal) {
  modalClose.addEventListener("click", function () {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}

if (modalBookBtn) {
  modalBookBtn.addEventListener("click", function () {
    modal.classList.remove("active");
  });
}

/* Contact form demo */
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("contact-name")?.value.trim();
    const email = document.getElementById("contact-email")?.value.trim();
    const subject = document.getElementById("contact-subject")?.value.trim();
    const message = document.getElementById("contact-message")?.value.trim();

    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    }

    alert("Form submitted successfully. Later we can connect this to your real backend or another method.");
    contactForm.reset();
  });
}

/* Update year */
function setCurrentYear() {
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function initLucideIcons() {
  if (window.lucide) {
    lucide.createIcons();
  }
}

/* Start */
startHeroSlider();
startAboutSlider();
startAttractionSlider();
startTestimonialSlider();
setCurrentYear();
initLucideIcons();