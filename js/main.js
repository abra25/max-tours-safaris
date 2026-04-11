const heroSlides = [
  {
    img: "img/c (24).jpeg",
    title: "Discover the beauty of Zanzibar & Tanzania"
  },
  {
    img: "img/c (186).jpeg",
    title: "Authentic Tours Across Zanzibar"
  },
  {
    img: "img/c (177).jpeg",
    title: "Adventure, Culture & Beach Escapes"
  },
  {
    img: "img/c (277).jpeg",
    title: "Explore Tanzania's Natural Wonders"
  },
  {
    img: "img/c (241).jpeg",
    title: "Create Unforgettable Travel Memories"
  }
];

const aboutImages = [
  "img/g.jpeg",
  "img/g1.jpeg",
  "img/g2.jpeg",
  "img/g3.jpeg",
  "img/g4.jpeg",
  "img/g5.jpeg",
  "img/g6.jpeg",
  "img/g7.jpeg",
  "img/g8.jpeg"
];

const attractions = [
  {
    title: "Serengeti National Park",
    image: "img/IMG_098_22. (18).jpg",
    desc: "World-renowned for its annual wildebeest migration, the Serengeti offers vast savannahs teeming with wildlife and unforgettable safari experiences.",
    details: "The Serengeti is one of Africa’s most iconic safari destinations, known for wildlife, endless plains, and breathtaking natural beauty."
  },
  {
    title: "Zanzibar Archipelago",
    image: "img/Mnemba Atoll Trip.jpeg",
    desc: "Zanzibar is famed for its white-sand beaches, turquoise waters, and rich Swahili culture.",
    details: "The islands offer beach relaxation, spice tours, diving, snorkeling, and cultural heritage in one unforgettable destination."
  },
  {
    title: "Ngorongoro Conservation Area",
    image: "img/Ngorongoro creater.jpg",
    desc: "Famous for the Ngorongoro Crater, this area is a haven for wildlife and Maasai culture.",
    details: "Ngorongoro combines dramatic scenery, abundant wildlife, and cultural richness, making it a top safari destination."
  },
  {
    title: "Selous / Nyerere National Park",
    image: "img/IMG_098_22. (16).jpg",
    desc: "One of Africa’s largest protected areas, known for wild landscapes and boat safaris.",
    details: "Visitors enjoy wildlife viewing, river scenery, and a quieter safari experience away from crowds."
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
const attractionDetails = document.getElementById("attractionDetails");

const prevAttractionBtn = document.getElementById("prevAttractionBtn");
const nextAttractionBtn = document.getElementById("nextAttractionBtn");
const attractionMoreBtn = document.getElementById("attractionMoreBtn");

const testimonialImage = document.getElementById("testimonialImage");
const testimonialText = document.getElementById("testimonialText");
const testimonialAuthor = document.getElementById("testimonialAuthor");
const testimonialMeta = document.getElementById("testimonialMeta");

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const modal = document.getElementById("siteModal");
const modalClose = document.getElementById("modalClose");
const modalContent = document.getElementById("modalContent");

const contactForm = document.getElementById("contactForm");

let heroIndex = 0;
let aboutIndex = 0;
let attractionIndex = 0;
let testimonialIndex = 0;

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
  updateHeroSlide();

  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroSlides.length;
    updateHeroSlide();
  }, 5200);
}

/* About image slider */
function startAboutSlider() {
  if (!aboutMainImage) return;

  setInterval(() => {
    aboutIndex = (aboutIndex + 1) % aboutImages.length;
    aboutMainImage.src = aboutImages[aboutIndex];
  }, 3200);
}

/* Attractions */
function updateAttraction() {
  if (!attractionImage || !attractionTitle || !attractionDesc || !attractionDetails) return;

  const item = attractions[attractionIndex];
  attractionImage.src = item.image;
  attractionImage.alt = item.title;
  attractionTitle.textContent = item.title;
  attractionDesc.textContent = item.desc;
  attractionDetails.textContent = item.details;
}

if (prevAttractionBtn) {
  prevAttractionBtn.addEventListener("click", function () {
    attractionIndex = (attractionIndex - 1 + attractions.length) % attractions.length;
    updateAttraction();
  });
}

if (nextAttractionBtn) {
  nextAttractionBtn.addEventListener("click", function () {
    attractionIndex = (attractionIndex + 1) % attractions.length;
    updateAttraction();
  });
}

if (attractionMoreBtn) {
  attractionMoreBtn.addEventListener("click", function () {
    const item = attractions[attractionIndex];
    openModal(item.title, item.image, item.details);
  });
}

/* Testimonials */
function updateTestimonial() {
  if (!testimonialImage || !testimonialText || !testimonialAuthor || !testimonialMeta) return;

  const item = testimonials[testimonialIndex];
  testimonialImage.src = item.image;
  testimonialImage.alt = item.author;
  testimonialText.textContent = item.text;
  testimonialAuthor.textContent = item.author;
  testimonialMeta.textContent = item.meta;
}

function startTestimonialSlider() {
  if (!testimonialImage) return;

  updateTestimonial();
  setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    updateTestimonial();
  }, 4200);
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



//update year 
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
updateAttraction();
startHeroSlider();
startAboutSlider();
startTestimonialSlider();
setCurrentYear();
initLucideIcons();