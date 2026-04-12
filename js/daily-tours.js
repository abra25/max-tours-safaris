const dayTours = [
  {
    id: 1,
    title: "Kuza Cave Jambiani",
    img: "../img/Kuza Cave.jpeg",
    duration: "3 hours",
    rating: 5,
    description: "Uncover the Magic of Kuza Cave Today!..",
    overview: "Discover Kuza Cave: A Hidden Gem in Jambiani, Zanzibar",
    details: `
      <p>Located along the stunning shores of Jambiani on Zanzibar's southeastern coast, Kuza Cave is a captivating destination that showcases the island's geological marvels and rich cultural heritage.</p>
      <h6>Geological Significance of Kuza Cave</h6>
      <p>Carved from coral limestone, this cave features tunnels, chambers, stalactites, and stalagmites that reveal a fascinating geological story.</p>
      <h6>Cultural Importance of Kuza Cave</h6>
      <p>The cave is closely tied to local folklore and traditions, and guided visits often include local storytelling and cultural insights.</p>
      <h6>Ecological Significance of Kuza Cave</h6>
      <p>Its humid microclimate supports cave life including bats and other organisms important to the ecosystem.</p>
      <h6>Visitor Experience</h6>
      <p>A visit combines adventure, learning, and a refreshing natural atmosphere in one of Zanzibar’s most unique hidden places.</p>
    `,
    itinerary: [
      {
        title: "Arrival at Kuza Cave, Jambiani",
        desc: "Begin a short hike through lush vegetation toward the cave entrance."
      },
      {
        title: "Explore the Limestone Cave",
        desc: "See impressive formations and learn about the cave’s geological history."
      },
      {
        title: "Cultural & Ecological Insights",
        desc: "Enjoy guided storytelling about local culture, cave life, and conservation."
      }
    ],
    inclusions: [
      "Guided tour led by knowledgeable local guides",
      "Cultural storytelling and local history insights",
      "Cave exploration and geological interpretation"
    ]
  },
  {
    id: 2,
    title: "Blue Lagoon Snorkeling Trip Zanzibar",
    img: "../img/Blue Lagoon Zanzibar.jpeg",
    duration: "3 hours",
    rating: 5,
    description: "Blue lagoon snorkeling tour..",
    overview: "Blue lagoon snorkeling tour",
    details: `
      <h6>Introduction</h6>
      <p>Blue Lagoon Zanzibar is a captivating paradise known for turquoise waters, soft white sand, and unforgettable marine experiences.</p>
      <h6>Natural Beauty and Geography</h6>
      <p>The lagoon is protected by coral reefs, creating calm waters ideal for swimming and snorkeling.</p>
      <h6>Recreational Activities</h6>
      <p>Guests can enjoy snorkeling, kayaking, paddleboarding, and nearby island exploration.</p>
      <h6>Cultural Significance</h6>
      <p>The experience also connects travelers with Zanzibar’s rich island culture and cuisine.</p>
    `,
    itinerary: [
      {
        title: "Arrival & Lagoon Orientation",
        desc: "Receive a short briefing about the lagoon, safety, and snorkeling plan."
      },
      {
        title: "Snorkeling & Water Activities",
        desc: "Explore coral gardens and marine life in calm clear waters."
      },
      {
        title: "Relaxation & Cultural Touchpoints",
        desc: "Relax by the shore and enjoy the surrounding island atmosphere."
      }
    ],
    inclusions: [
      "Guided snorkeling experience",
      "Safety briefing and local guide assistance",
      "Access to lagoon area and beach relaxation"
    ]
  },
  {
    id: 3,
    title: "Nungwi Village Tour",
    img: "../img/c (98).jpeg",
    duration: "3 hours",
    rating: 4,
    description: "nungwi village tour..",
    overview: "Nungwi Village Tour",
    details: `
      <h6>Overview</h6>
      <p>Nungwi is famous for beautiful beaches, local life, dhow building, and cultural energy.</p>
      <p>This guided tour takes visitors through parts of the village they may not easily discover alone.</p>
      <p>Stops can include the local market, dhow-making areas, schools, mosques, and Mnarani Natural Aquarium.</p>
    `,
    itinerary: [
      {
        title: "Village Walk & Local Life",
        desc: "Walk through Nungwi village and explore local neighborhoods."
      },
      {
        title: "Culture & Craft Stops",
        desc: "Visit the market, dhow yard, craft areas, schools, and mosques."
      },
      {
        title: "Mnarani Natural Aquarium",
        desc: "See sea turtles up close and learn about conservation."
      }
    ],
    inclusions: [
      "Guided Nungwi village tour",
      "Local market and craft visits",
      "Mnarani Natural Aquarium visit"
    ]
  },
  {
    id: 4,
    title: "Salaam Cave Tour",
    img: "../img/c (259).jpeg",
    duration: "2 hours",
    rating: 5,
    description: "Swim with Zanzibar’s majestic sea turtles in clear waters.",
    overview: "Discover the Magic of Salaam Cave!",
    details: `
      <p>Salaam Cave is a unique northern Zanzibar attraction where visitors can see and swim alongside sea turtles in crystal-clear turquoise waters.</p>
      <h6>Features & Benefits</h6>
      <ul>
        <li><strong>Close Encounters:</strong> Swim near sea turtles in their natural setting.</li>
        <li><strong>Educational Experience:</strong> Learn about turtle behavior and conservation.</li>
        <li><strong>Scenic Location:</strong> Enjoy a calm cave environment with clear waters.</li>
        <li><strong>Photography:</strong> Capture memorable underwater and cave moments.</li>
      </ul>
    `,
    itinerary: [
      {
        title: "Arrival & Safety Briefing",
        desc: "Meet your guides, receive instructions, and prepare for the experience."
      },
      {
        title: "Exploring Salaam Cave",
        desc: "Discover the cave’s peaceful setting before entering the water."
      },
      {
        title: "Swimming with Sea Turtles",
        desc: "Enjoy close encounters with turtles in turquoise waters."
      }
    ],
    inclusions: [
      "Expert-guided tour",
      "Snorkeling gear and safety briefing",
      "Access to Salaam Cave"
    ]
  },
  {
    id: 5,
    title: "Mtende Beach Escape",
    img: "../img/c (260).jpeg",
    duration: "Half Day",
    rating: 4,
    description: "Relax on Zanzibar’s serene and picturesque Mtende Beach.",
    overview: "Discover the Peace of Mtende Beach!",
    details: `
      <p>Mtende Beach is a peaceful Zanzibar escape known for white sand, crystal-clear water, and a calm natural setting away from crowds.</p>
      <h6>Highlights</h6>
      <ul>
        <li><strong>Pristine Scenery</strong></li>
        <li><strong>Peaceful Atmosphere</strong></li>
        <li><strong>Photo Opportunities</strong></li>
        <li><strong>Family-Friendly Setting</strong></li>
      </ul>
    `,
    itinerary: [
      {
        title: "Arrival & Welcome",
        desc: "Arrive and settle into the serene surroundings."
      },
      {
        title: "Relaxation & Swimming",
        desc: "Enjoy the beach, swim, and unwind by the ocean."
      },
      {
        title: "Photography & Sunset",
        desc: "Capture beautiful scenery and stay for late-day views."
      }
    ],
    inclusions: [
      "Guided beach experience",
      "Relaxation area",
      "Optional refreshments"
    ]
  },
  {
    id: 6,
    title: "Kae Funk Sunset Experience",
    img: "../img/c (261).jpeg",
    duration: "2 hours",
    rating: 3,
    description: "Relax and enjoy Zanzibar’s most peaceful sunset spot.",
    overview: "Witness the Magic of Kae Funk!",
    details: `
      <p>Kae Funk is a serene place on Zanzibar’s southeast coast where guests enjoy a peaceful sunset over the Indian Ocean.</p>
      <h6>Highlights</h6>
      <ul>
        <li><strong>Unforgettable Sunsets</strong></li>
        <li><strong>Peaceful Atmosphere</strong></li>
        <li><strong>Scenic Ocean Views</strong></li>
        <li><strong>Perfect for Couples & Families</strong></li>
      </ul>
    `,
    itinerary: [
      {
        title: "Arrival & Welcome",
        desc: "Arrive and settle into the peaceful surroundings."
      },
      {
        title: "Relaxation Time",
        desc: "Enjoy refreshments and take in the calm atmosphere."
      },
      {
        title: "Sunset Viewing",
        desc: "Watch the sun set over the Indian Ocean."
      }
    ],
    inclusions: [
      "Guided sunset experience",
      "Refreshments",
      "Scenic viewing spot"
    ]
  },
  {
    id: 7,
    title: "Full Day North Coast Relaxation",
    img: "../img/Full Day North Coast Nungwi Relaxation.jpeg",
    duration: "Full Day",
    rating: 5,
    description: "full day nungwi relaxation..",
    overview: "Full Day North Coast Relaxation: Experience Zanzibar’s Pristine Beauty",
    details: `
      <p>Spend a full day enjoying the beauty of Nungwi and Kendwa, two of Zanzibar’s best-loved north coast destinations.</p>
      <p>White sandy beaches, calmer tidal movement, optional water sports, and stunning sunsets make this a perfect full-day coastal escape.</p>
    `,
    itinerary: [
      {
        title: "Morning Transfer to North Coast",
        desc: "Travel to Nungwi and Kendwa and enjoy the scenic coastal drive."
      },
      {
        title: "Beach Relaxation & Optional Activities",
        desc: "Relax on the beach or add snorkeling, kayaking, diving, or jet skiing."
      },
      {
        title: "Sunset Views & Return",
        desc: "Enjoy late-day views before heading back."
      }
    ],
    inclusions: [
      "Round-trip transfer to North Coast (Nungwi/Kendwa)",
      "Beach relaxation time",
      "Local guide assistance"
    ]
  },
  {
    id: 8,
    title: "Spice Tour with Cooking Class",
    img: "../img/c (210).jpeg",
    duration: "3 hours",
    rating: 4,
    description: "spice tour and cooking class..",
    overview: "Discover the Ultimate Spice Tour with a Cooking Class in Zanzibar",
    details: `
      <p>Zanzibar’s spice heritage comes alive through this experience combining a spice plantation visit and a hands-on cooking session.</p>
      <h6>The Charm of Zanzibar's Spice Heritage</h6>
      <p>Learn about cloves, cinnamon, nutmeg, black pepper, and their role in local history and daily life.</p>
      <h6>Interactive Cooking Class Experience</h6>
      <p>After the plantation tour, join a cooking class to prepare traditional dishes with local ingredients and spices.</p>
    `,
    itinerary: [
      {
        title: "Spice Plantation Tour",
        desc: "Walk through plantations and discover Zanzibar’s world-famous spices."
      },
      {
        title: "Cooking Class",
        desc: "Prepare traditional dishes with guidance from local cooks."
      },
      {
        title: "Shared Meal",
        desc: "Enjoy the meal prepared during the class."
      }
    ],
    inclusions: [
      "Guided spice plantation tour",
      "Hands-on cooking class with local chefs",
      "Ingredients and cooking materials",
      "Shared meal of prepared dishes"
    ]
  }
];

const tourGrid = document.getElementById("tourGrid");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const modal = document.getElementById("tourModal");
const modalClose = document.getElementById("modalClose");
const modalBackBtn = document.getElementById("modalBackBtn");
const modalBookBtn = document.getElementById("modalBookBtn");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalOverview = document.getElementById("modalOverview");
const modalDetails = document.getElementById("modalDetails");
const modalItinerary = document.getElementById("modalItinerary");
const modalDuration = document.getElementById("modalDuration");
const modalInclusions = document.getElementById("modalInclusions");

const filterButtons = document.querySelectorAll(".filter-btn");
const tourSearch = document.getElementById("tourSearch");

let activeTour = null;
let currentFilter = "all";
let currentSearch = "";

function lucideRefresh() {
  if (window.createLucideIcons) {
    window.createLucideIcons();
  }
}

function starSVG() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11.999 2.5l2.935 5.947 6.565.955-4.75 4.63 1.121 6.538-5.871-3.087-5.871 3.087 1.121-6.538-4.75-4.63 6.565-.955L11.999 2.5z"></path>
    </svg>
  `;
}

function renderStars(count = 5, total = 5) {
  const safeCount = Math.max(0, Math.min(Number(count) || 0, total));
  let stars = '<span class="rating-stars" aria-label="' + safeCount + ' out of ' + total + ' stars">';

  for (let i = 1; i <= total; i++) {
    stars += `
      <span class="rating-star ${i <= safeCount ? "filled" : "empty"}">
        ${starSVG()}
      </span>
    `;
  }

  stars += "</span>";
  return stars;
}

function getDurationGroup(duration = "") {
  const value = duration.toLowerCase();

  if (value.includes("full")) return "full";
  if (value.includes("half")) return "half";
  return "short";
}

function matchesFilter(tour) {
  return currentFilter === "all" || getDurationGroup(tour.duration) === currentFilter;
}

function matchesSearch(tour) {
  if (!currentSearch.trim()) return true;

  const q = currentSearch.toLowerCase();
  return (
    tour.title.toLowerCase().includes(q) ||
    tour.description.toLowerCase().includes(q) ||
    tour.overview.toLowerCase().includes(q)
  );
}

function renderEmptyState() {
  tourGrid.innerHTML = `
    <div class="empty-state">
      <i data-lucide="search-x"></i>
      <p>No tours found.</p>
    </div>
  `;
  lucideRefresh();
}

function renderTours() {
  const filteredTours = dayTours.filter((tour) => matchesFilter(tour) && matchesSearch(tour));

  if (!filteredTours.length) {
    renderEmptyState();
    return;
  }

  tourGrid.innerHTML = filteredTours
    .map(
      (tour) => `
        <article class="tour-card">
          <div class="tour-card-image">
            <img src="${tour.img}" alt="${tour.title}" loading="lazy">
            <span class="tour-badge">${tour.duration}</span>
            <div class="tour-rating" aria-label="${tour.rating} star rating">
              ${renderStars(tour.rating)}
            </div>
          </div>

          <div class="tour-card-body">
            <h3>${tour.title}</h3>
            <p class="tour-desc">${tour.description}</p>

            <div class="tour-meta">
              <span class="tour-duration">
                <i data-lucide="clock-3"></i>
                ${tour.duration}
              </span>

              <span class="tour-link">
                Explore
                <i data-lucide="arrow-up-right"></i>
              </span>
            </div>

            <div class="card-actions">
              <button class="btn btn-outline" data-view-id="${tour.id}">View More</button>
              <button class="btn btn-primary" data-book-id="${tour.id}">Book Now</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  lucideRefresh();
}

function openTourModal(tour) {
  activeTour = tour;

  modalImage.src = tour.img;
  modalImage.alt = tour.title;
  modalTitle.textContent = tour.title;

  modalMeta.innerHTML = `
    <span class="modal-meta-item">
      <i data-lucide="clock-3"></i>
      ${tour.duration}
    </span>
    <span class="modal-meta-item">
      ${renderStars(tour.rating)}
    </span>
  `;

  modalOverview.textContent = tour.overview || tour.description || "";
  modalDetails.innerHTML = tour.details || "<p>No extra details available.</p>";
  modalDuration.textContent = tour.duration || "";

  modalItinerary.innerHTML =
    tour.itinerary && tour.itinerary.length
      ? tour.itinerary
          .map(
            (item) => `
              <div class="itinerary-item">
                <strong>${item.title}</strong>
                <p>${item.desc}</p>
              </div>
            `
          )
          .join("")
      : "<p>No itinerary available.</p>";

  modalInclusions.innerHTML =
    tour.inclusions && tour.inclusions.length
      ? `
        <h6>Inclusions</h6>
        <ul>
          ${tour.inclusions.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      `
      : "<p>No inclusions listed.</p>";

  activateTab("details");
  modal.classList.add("active");
  document.body.classList.add("modal-open");
  lucideRefresh();
}

function closeTourModal() {
  modal.classList.remove("active");
  document.body.classList.remove("modal-open");
}

function bookDayTourById(tourId) {
  const tour = dayTours.find((item) => item.id === tourId);
  if (!tour) return;

  const subj = "Booking: " + tour.title;
  const msg =
    "Hello, I am interested in the tour: " +
    tour.title +
    "\n" +
    (tour.description ? "Details: " + tour.description + "\n" : "") +
    "Please provide more information.";

  localStorage.setItem("contactSubject", subj);
  localStorage.setItem("contactMessage", msg);

  window.location.href = "./index.html#contact";
}

function activateTab(tabName) {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });

  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.remove("active");
  });

  const target = document.getElementById(`tab-${tabName}`);
  if (target) target.classList.add("active");
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    mainNav.classList.toggle("active");
  });
}

document.addEventListener("click", (e) => {
  const viewBtn = e.target.closest("[data-view-id]");
  const bookBtn = e.target.closest("[data-book-id]");
  const tabBtn = e.target.closest(".tab-btn");
  const navLink = e.target.closest("#mainNav a");
  const filterBtn = e.target.closest(".filter-btn");

  if (viewBtn) {
    const id = Number(viewBtn.dataset.viewId);
    const tour = dayTours.find((item) => item.id === id);
    if (tour) openTourModal(tour);
  }

  if (bookBtn) {
    const id = Number(bookBtn.dataset.bookId);
    bookDayTourById(id);
  }

  if (tabBtn) {
    activateTab(tabBtn.dataset.tab);
  }

  if (filterBtn) {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    filterBtn.classList.add("active");
    currentFilter = filterBtn.dataset.filter || "all";
    renderTours();
  }

  if (navLink && window.innerWidth <= 768) {
    mainNav.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (
    mainNav &&
    menuToggle &&
    !mainNav.contains(e.target) &&
    !menuToggle.contains(e.target) &&
    window.innerWidth <= 768
  ) {
    mainNav.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

if (tourSearch) {
  tourSearch.addEventListener("input", (e) => {
    currentSearch = e.target.value || "";
    renderTours();
  });
}

if (modalClose) {
  modalClose.addEventListener("click", closeTourModal);
}

if (modalBackBtn) {
  modalBackBtn.addEventListener("click", closeTourModal);
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeTourModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeTourModal();
  }
});

if (modalBookBtn) {
  modalBookBtn.addEventListener("click", (e) => {
    if (!activeTour) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    bookDayTourById(activeTour.id);
  });
}

renderTours();