const packages = [
  {
    id: 1,
    title: "7 Days in Zanzibar",
    duration: "7 Days",
    price: 880,
    childPrice: 616,
    rating: "5-Star",
    image: "../img/c (267).jpeg",
    summary: "A full island escape with Stone Town, Safari Blue, Prison Island, Jozani, beaches, and local experiences.",
    features: ["Stone Town", "Safari Blue", "Prison Island", "Beach Time"],
    overview: "A complete Zanzibar holiday blending culture, marine adventure, and beach relaxation.",
    highlights: [
      "Historic Stone Town exploration",
      "Safari Blue snorkeling and seafood lunch",
      "Prison Island and spice tour",
      "Jozani Forest and East Coast beach day"
    ],
    itinerary: [
      { day: 1, title: "Arrival & Stone Town", desc: "Airport pickup, hotel check-in, and a relaxed introduction to Stone Town." },
      { day: 2, title: "Safari Blue Adventure", desc: "Dhow cruise, snorkeling, seafood lunch, and sandbank moments." },
      { day: 3, title: "Prison Island & Spice Tour", desc: "Visit giant tortoises and explore Zanzibar’s spice heritage." },
      { day: 4, title: "Jozani & Paje Beach", desc: "See red colobus monkeys and enjoy beach relaxation." },
      { day: 5, title: "Nungwi & Village Tour", desc: "Northern beach experience with local culture." },
      { day: 6, title: "Leisure & Water Activities", desc: "Relax or enjoy optional extra activities." },
      { day: 7, title: "Departure", desc: "Breakfast, final free time, and airport transfer." }
    ],
    inclusions: [
      "Accommodation",
      "Airport transfers",
      "Selected tours and park fees",
      "Guide support",
      "Snorkeling equipment on marine day"
    ],
    essentials: [
      "50% deposit to confirm booking",
      "Balance before travel date",
      "Passport required",
      "Visa may be needed on arrival",
      "International flights not included"
    ]
  },
  {
    id: 2,
    title: "6 Days in Zanzibar",
    duration: "6 Days",
    price: 520,
    childPrice: 364,
    rating: "5-Star",
    image: "../img/c (191).jpeg",
    summary: "A balanced package with heritage, spice tour, Jozani, beach time, and Safari Blue marine adventure.",
    features: ["Stone Town", "Jozani", "Spice Tour", "East Coast"],
    overview: "Perfect for travelers who want Zanzibar highlights without a longer stay.",
    highlights: [
      "Stone Town guided experience",
      "Safari Blue full-day trip",
      "Spice farm and Jozani Forest",
      "Beach day on the East Coast"
    ],
    itinerary: [
      { day: 1, title: "Arrival & Stone Town", desc: "Transfer, hotel check-in, and Stone Town introduction." },
      { day: 2, title: "Safari Blue", desc: "Snorkeling, dhow cruise, lagoon stop, and lunch." },
      { day: 3, title: "Spice Tour & Jozani", desc: "Spice discovery and forest visit." },
      { day: 4, title: "East Coast Beach", desc: "Relaxation and optional water sports." },
      { day: 5, title: "Free Day", desc: "Beach leisure or optional extra activities." },
      { day: 6, title: "Departure", desc: "Breakfast and airport transfer." }
    ],
    inclusions: [
      "Hotel stay",
      "Airport transfers",
      "Guided excursions",
      "Transport during the package",
      "Travel support"
    ],
    essentials: [
      "Advance booking recommended",
      "Deposit required",
      "Sea activities depend on weather",
      "Travel documents required",
      "Optional extras are separate"
    ]
  },
  {
    id: 3,
    title: "5 Days in Zanzibar",
    duration: "5 Days",
    price: 420,
    childPrice: 294,
    rating: "5-Star",
    image: "../img/c (193).jpeg",
    summary: "A short but rewarding island stay with Stone Town, Safari Blue, spice experiences, and East Coast beaches.",
    features: ["Heritage", "Snorkeling", "Spice Farm", "Beach Escape"],
    overview: "Best for travelers who want a real Zanzibar holiday feeling in limited time.",
    highlights: [
      "Stone Town culture and history",
      "Safari Blue with reef experiences",
      "Spice plantation visit",
      "East Coast beach relaxation"
    ],
    itinerary: [
      { day: 1, title: "Arrival", desc: "Transfer and first evening in Zanzibar." },
      { day: 2, title: "Stone Town Tour", desc: "Historic landmarks and local heritage." },
      { day: 3, title: "Safari Blue", desc: "Marine excursion with snorkeling and lunch." },
      { day: 4, title: "Spice Tour & Beach", desc: "Spice discovery followed by beach time." },
      { day: 5, title: "Departure", desc: "Final morning and airport transfer." }
    ],
    inclusions: [
      "Accommodation",
      "Airport transfers",
      "Main listed tours",
      "Guide support",
      "Water during tours"
    ],
    essentials: [
      "Flights separate",
      "Visa may be needed",
      "Light tropical clothing recommended",
      "Respect local customs",
      "Booking deposit applies"
    ]
  },
  {
    id: 4,
    title: "4 Days in Zanzibar",
    duration: "4 Days",
    price: 580,
    childPrice: 406,
    rating: "5-Star",
    image: "../img/c (186).jpeg",
    summary: "A short island break with Stone Town, marine adventure, spice tour, and beach relaxation.",
    features: ["Quick Escape", "Snorkeling", "Stone Town", "Beach Time"],
    overview: "Great for long weekends, short holidays, or combining Zanzibar with another trip.",
    highlights: [
      "Stone Town walking experience",
      "Safari Blue and snorkeling",
      "Spice farm visit",
      "Compact but memorable beach itinerary"
    ],
    itinerary: [
      { day: 1, title: "Arrival & Stone Town", desc: "Welcome, check-in, and guided old town experience." },
      { day: 2, title: "Safari Blue", desc: "Dhow cruise, reef stop, and seafood lunch." },
      { day: 3, title: "Spice Tour & Beach", desc: "Spice farm discovery and beach time." },
      { day: 4, title: "Departure", desc: "Slow final morning and airport transfer." }
    ],
    inclusions: [
      "Hotel stay",
      "Airport transfers",
      "Selected guided tours",
      "Boat support",
      "Basic assistance"
    ],
    essentials: [
      "Short package, best booked early",
      "Weather may affect sea plans",
      "Beachwear plus modest town wear",
      "Personal expenses not included",
      "Deposit required"
    ]
  },
  {
    id: 7,
    title: "7 Days Zanzibar Itinerary",
    duration: "7 Days",
    price: 620,
    childPrice: 434,
    rating: "5-Star",
    image: "../img/c (177).jpeg",
    summary: "A guided seven-day island plan with classic Zanzibar activities, beach moments, and local highlights.",
    features: ["Itinerary", "Beach Days", "Culture", "Island Tours"],
    overview: "A structured Zanzibar plan ideal for travelers who want a full week with activity balance.",
    highlights: [
      "Week-long planned island experience",
      "Combination of culture and marine activities",
      "Flexible pace with beach time",
      "Great for first-time visitors"
    ],
    itinerary: [
      { day: 1, title: "Arrival", desc: "Airport pickup and check-in." },
      { day: 2, title: "Stone Town", desc: "Explore Zanzibar’s historic center." },
      { day: 3, title: "Marine Adventure", desc: "Enjoy reef or island activity." },
      { day: 4, title: "Culture & Spice", desc: "Discover local heritage and spice experiences." },
      { day: 5, title: "Beach Leisure", desc: "Relax and enjoy coastal views." },
      { day: 6, title: "Optional Excursions", desc: "Choose extra activities if desired." },
      { day: 7, title: "Departure", desc: "Final morning and airport transfer." }
    ],
    inclusions: [
      "Accommodation",
      "Transport support",
      "Selected tours",
      "Guide assistance",
      "Planning support"
    ],
    essentials: [
      "Package can be customized",
      "Activities depend on weather",
      "Travel documents required",
      "Optional extras not always included",
      "Deposit confirms booking"
    ]
  },
  {
    id: 12,
    title: "3 Days 2 Nights Zanzibar Vacation Package",
    duration: "3 Days / 2 Nights",
    price: 220,
    childPrice: 154,
    rating: "5-Star",
    image: "../img/c (252).jpeg",
    summary: "A quick Zanzibar escape with beach time, culture, and one signature island excursion.",
    features: ["Weekend Escape", "Beach", "Culture", "Short Stay"],
    overview: "Designed for travelers who want a short but satisfying taste of Zanzibar.",
    highlights: [
      "Beach relaxation",
      "Compact cultural experience",
      "Easy short-break format",
      "Good for couples or weekend travel"
    ],
    itinerary: [
      { day: 1, title: "Arrival", desc: "Transfer, hotel check-in, and relaxed evening." },
      { day: 2, title: "Tour Day", desc: "Main excursion plus cultural or beach activity." },
      { day: 3, title: "Departure", desc: "Breakfast and airport transfer." }
    ],
    inclusions: [
      "Accommodation",
      "Airport transfers",
      "Basic tour support",
      "Guide assistance",
      "Selected excursion"
    ],
    essentials: [
      "Ideal for short holidays",
      "Travel documents needed",
      "Flights not included",
      "Optional extras separate",
      "Deposit required"
    ]
  },
  {
    id: 14,
    title: "2 Days 1 Night Zanzibar Holiday Package from Dar es Salaam",
    duration: "2 Days / 1 Night",
    price: 290,
    childPrice: 203,
    rating: "5-Star",
    image: "../img/c (153).jpeg",
    summary: "A very short Zanzibar getaway covering Stone Town, spice experiences, Prison Island, and snorkeling.",
    features: ["Dar Transfer", "Stone Town", "Prison Island", "Short Break"],
    overview: "Perfect for travelers with limited time who still want to enjoy Zanzibar’s main flavor.",
    highlights: [
      "Quick island escape",
      "Stone Town and shopping moments",
      "Prison Island with snorkeling",
      "Spice farm experience"
    ],
    itinerary: [
      { day: 1, title: "Arrival & Activities", desc: "Pickup, island transfer, and first guided experiences." },
      { day: 2, title: "Tour & Departure", desc: "Enjoy final highlights before transfer back." }
    ],
    inclusions: [
      "Accommodation",
      "Round-trip transfers",
      "Basic guided activities",
      "Tour support",
      "Planning coordination"
    ],
    essentials: [
      "Best for tight schedules",
      "Flexible timing around arrival",
      "Visa and documents needed",
      "Optional extras not included",
      "Deposit confirms booking"
    ]
  },
  {
    id: 17,
    title: "14 Days 13 Nights Holiday Package Zanzibar",
    duration: "14 Days / 13 Nights",
    price: 1320,
    childPrice: 924,
    rating: "5-Star",
    image: "../img/c (224).jpeg",
    summary: "A long island holiday with Stone Town, spice farm, Prison Island, beach days, and optional marine excursions.",
    features: ["Long Stay", "Beach Days", "Stone Town", "Optional Excursions"],
    overview: "A relaxed long-stay Zanzibar package for travelers who want time, comfort, and flexibility.",
    highlights: [
      "Extended island stay",
      "Stone Town, spice farm, and Prison Island",
      "Multiple beach leisure days",
      "Optional Safari Blue and Mnemba add-ons"
    ],
    itinerary: [
      { day: 1, title: "Arrival", desc: "Airport transfer and resort check-in." },
      { day: 2, title: "Stone Town", desc: "Guided historic town experience." },
      { day: 3, title: "Spice Farm", desc: "Taste and discover Zanzibar spices." },
      { day: 4, title: "Prison Island", desc: "Excursion with historical and marine moments." },
      { day: 5, title: "Beach Leisure", desc: "Relax and enjoy the resort." },
      { day: 6, title: "Free Day", desc: "Flexible beach or optional activity day." },
      { day: 7, title: "Leisure", desc: "Enjoy island relaxation." },
      { day: 8, title: "Optional Safari Blue", desc: "Optional extra full-day marine excursion." },
      { day: 9, title: "Free Beach Day", desc: "Resort and beach time." },
      { day: 10, title: "Optional Mnemba", desc: "Optional dolphin or snorkeling trip." },
      { day: 11, title: "Cultural Visit", desc: "Optional local experience." },
      { day: 12, title: "Free Beach Day", desc: "More leisure and relaxation." },
      { day: 13, title: "Leisure Day", desc: "Final sunset and relaxed island mood." },
      { day: 14, title: "Departure", desc: "Transfer to airport." }
    ],
    inclusions: [
      "Long-stay accommodation",
      "Airport transfers",
      "Stone Town tour",
      "Spice farm visit",
      "Prison Island excursion"
    ],
    essentials: [
      "Long package with flexible pacing",
      "Optional excursions extra",
      "International flights excluded",
      "Deposit required",
      "Visa may be needed on arrival"
    ]
  },
  {
    id: 18,
    title: "10 Days 9 Nights Holiday Package Zanzibar",
    duration: "10 Days / 9 Nights",
    price: 1200,
    childPrice: 840,
    rating: "5-Star",
    image: "../img/c (243).jpeg",
    summary: "A fuller Zanzibar itinerary with Stone Town, Safari Blue, Prison Island, dolphin watching, Jozani, and beach days.",
    features: ["10 Days", "Stone Town", "Safari Blue", "Dolphins"],
    overview: "A complete mid-length island package for travelers wanting more activity and more beach time.",
    highlights: [
      "Stone Town and beach combination",
      "Safari Blue and Prison Island",
      "Dolphin watching and Jozani",
      "Several days for leisure and swimming"
    ],
    itinerary: [
      { day: 1, title: "Arrival", desc: "Arrival and hotel check-in." },
      { day: 2, title: "Stone Town", desc: "Historic town tour and exploration." },
      { day: 3, title: "Safari Blue", desc: "Marine excursion and lunch." },
      { day: 4, title: "Prison Island", desc: "Island visit and sightseeing." },
      { day: 5, title: "Beach Relaxation", desc: "Enjoy a slower island day." },
      { day: 6, title: "Dolphins & Jozani", desc: "Nature and marine highlights." },
      { day: 7, title: "Beach Day", desc: "Relax at the resort." },
      { day: 8, title: "Beach Day", desc: "Free time by the ocean." },
      { day: 9, title: "Beach Day", desc: "More leisure before departure." },
      { day: 10, title: "Departure", desc: "Final breakfast and airport transfer." }
    ],
    inclusions: [
      "Accommodation",
      "Airport transfers",
      "Stone Town tour",
      "Selected guided excursions",
      "Support during the package"
    ],
    essentials: [
      "Optional Mnemba trips can be extra",
      "Flights excluded",
      "Documents required",
      "Weather may affect sea trips",
      "Deposit confirms booking"
    ]
  },
  {
    id: 27,
    title: "8 Days Safari and Beach Zanzibar: Your Ultimate Bush and Beach Adventure",
    duration: "8 Days / 7 Nights",
    price: 2230,
    childPrice: 1561,
    rating: "5-Star",
    image: "../img/c (219).jpeg",
    summary: "A bush-and-beach journey combining safari landscapes with a relaxing Zanzibar finish.",
    features: ["Safari", "Beach", "Bush & Beach", "Adventure"],
    overview: "A balanced package for travelers who want wildlife excitement and tropical beach recovery in one trip.",
    highlights: [
      "Safari game drive experience",
      "Beach extension in Zanzibar",
      "Adventure plus relaxation",
      "Great contrast between mainland and island"
    ],
    itinerary: [
      { day: 1, title: "Arrival", desc: "Welcome and trip introduction." },
      { day: 2, title: "Safari Start", desc: "Enter the bush for wildlife viewing." },
      { day: 3, title: "Game Drives", desc: "Explore safari landscapes and wildlife." },
      { day: 4, title: "Transfer", desc: "Transition from safari to coastal or island segment." },
      { day: 5, title: "Beach Arrival", desc: "Settle into Zanzibar or beach resort." },
      { day: 6, title: "Leisure Day", desc: "Relax by the ocean or take optional excursions." },
      { day: 7, title: "Island Experience", desc: "Enjoy local highlights or marine activity." },
      { day: 8, title: "Departure", desc: "Final transfer and departure." }
    ],
    inclusions: [
      "Safari transport",
      "Beach stay",
      "Selected transfers",
      "Guide support",
      "Core listed activities"
    ],
    essentials: [
      "Safari schedule can start early",
      "Flights may be separate depending on route",
      "Pack for both bush and beach",
      "Weather may affect activity order",
      "Deposit required"
    ]
  },
  {
    id: 29,
    title: "14 Days Tanzania Safari and Zanzibar: An Unforgettable Adventure",
    duration: "14 Days / 13 Nights",
    price: 3700,
    childPrice: 2590,
    rating: "5-Star",
    image: "../img/c (241).jpeg",
    summary: "A major safari-and-island journey combining national parks, wildlife drives, and Zanzibar beach paradise.",
    features: ["Tanzania Safari", "Zanzibar", "Big Adventure", "Beach Paradise"],
    overview: "A premium multi-destination experience joining Tanzania’s wildlife highlights with island relaxation in Zanzibar.",
    highlights: [
      "Wildlife safari across top destinations",
      "4x4 game drives and scenic landscapes",
      "Zanzibar extension with beach relaxation",
      "Ideal for travelers wanting a full East Africa experience"
    ],
    itinerary: [
      { day: 1, title: "Arrival", desc: "Welcome and first overnight." },
      { day: 2, title: "Safari Begins", desc: "Enter the safari route and first game experience." },
      { day: 3, title: "Game Drive", desc: "Wildlife viewing and park exploration." },
      { day: 4, title: "More Safari", desc: "Continue through key safari zones." },
      { day: 5, title: "Scenic Transfer", desc: "Travel between safari highlights." },
      { day: 6, title: "Safari Leisure", desc: "Another day of wildlife adventure." },
      { day: 7, title: "Transition Day", desc: "Move toward coastal or flight transfer." },
      { day: 8, title: "Zanzibar Arrival", desc: "Check into island accommodation." },
      { day: 9, title: "Stone Town or Beach", desc: "Relax or explore cultural highlights." },
      { day: 10, title: "Beach Leisure", desc: "Ocean relaxation and optional excursions." },
      { day: 11, title: "Island Experience", desc: "Enjoy Zanzibar atmosphere and activities." },
      { day: 12, title: "Free Day", desc: "Flexible day for rest or extra tours." },
      { day: 13, title: "Final Leisure Day", desc: "Last sunset and beach time." },
      { day: 14, title: "Departure", desc: "Transfer for departure." }
    ],
    inclusions: [
      "Safari accommodation",
      "4x4 safari transport",
      "Selected meals",
      "Zanzibar stay",
      "Airport and ground transfers"
    ],
    essentials: [
      "Travel insurance recommended",
      "Flights and visa may be separate",
      "Longer journey with mixed terrain",
      "Pack for safari and beach conditions",
      "Advance booking strongly advised"
    ]
  }
];

const packageGrid = document.getElementById("packageGrid");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const modal = document.getElementById("packageModal");
const modalClose = document.getElementById("modalClose");
const modalBackBtn = document.getElementById("modalBackBtn");
const modalBookBtn = document.getElementById("modalBookBtn");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDuration = document.getElementById("modalDuration");
const modalRating = document.getElementById("modalRating");
const modalOverview = document.getElementById("modalOverview");
const modalHighlights = document.getElementById("modalHighlights");
const modalItinerary = document.getElementById("modalItinerary");
const modalInclusions = document.getElementById("modalInclusions");
const modalTerms = document.getElementById("modalTerms");

let activePackage = null;

function renderPackages() {
  packageGrid.innerHTML = packages.map(pkg => `
    <article class="package-card">
      <div class="package-image">
        <img src="${pkg.image}" alt="${pkg.title}">
        <span class="package-badge">${pkg.duration}</span>
        <span class="package-price">From $${pkg.price}</span>
      </div>
      <div class="package-body">
        <h3>${pkg.title}</h3>
        <p class="package-summary">${pkg.summary}</p>

        <div class="package-features">
          ${pkg.features.map(item => `<span class="feature-chip">${item}</span>`).join("")}
        </div>

        <div class="card-actions">
          <button class="btn btn-outline" data-view-id="${pkg.id}">View More</button>
          <button class="btn btn-primary" data-book-id="${pkg.id}">Book Now</button>
        </div>
      </div>
    </article>
  `).join("");
}

function openPackageModal(pkg) {
  activePackage = pkg;

  modalImage.src = pkg.image;
  modalImage.alt = pkg.title;
  modalTitle.textContent = pkg.title;
  modalDuration.textContent = pkg.duration;
  modalRating.textContent = pkg.rating;
  modalOverview.textContent = pkg.overview;

  modalHighlights.innerHTML = `
    <div class="highlight-list">
      ${pkg.highlights.map(item => `<div class="highlight-item">${item}</div>`).join("")}
    </div>
  `;

  modalItinerary.innerHTML = pkg.itinerary.map(day => `
    <div class="itinerary-day">
      <strong>Day ${day.day}: ${day.title}</strong>
      <p>${day.desc}</p>
    </div>
  `).join("");

  modalInclusions.innerHTML = `
    <div class="inclusion-list">
      ${pkg.inclusions.map(item => `<div class="inclusion-item">${item}</div>`).join("")}
    </div>
  `;

  modalTerms.innerHTML = `
    <div class="terms-list">
      ${pkg.essentials.map(item => `<div class="terms-item">${item}</div>`).join("")}
    </div>
  `;

  activateTab("highlights");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closePackageModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function bookPackageById(packageId) {
  const pkg = packages.find(item => item.id === packageId);
  if (!pkg) return;

  const subj = "Booking: " + pkg.title;
  const msg =
    "Hello, I am interested in the package: " +
    pkg.title +
    "\n" +
    (pkg.summary ? "Details: " + pkg.summary + "\n" : "") +
    "Please provide more information.";

  localStorage.setItem("contactSubject", subj);
  localStorage.setItem("contactMessage", msg);

  window.location.href = "../index.html#contact";
}

function activateTab(tabName) {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });

  document.querySelectorAll(".tab-panel").forEach(panel => {
    panel.classList.remove("active");
  });

  const target = document.getElementById(`tab-${tabName}`);
  if (target) target.classList.add("active");
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
  });
}

document.addEventListener("click", (e) => {
  const viewBtn = e.target.closest("[data-view-id]");
  const bookBtn = e.target.closest("[data-book-id]");
  const tabBtn = e.target.closest(".tab-btn");

  if (viewBtn) {
    const id = Number(viewBtn.dataset.viewId);
    const pkg = packages.find(item => item.id === id);
    if (pkg) openPackageModal(pkg);
  }

  if (bookBtn) {
    const id = Number(bookBtn.dataset.bookId);
    bookPackageById(id);
  }

  if (tabBtn) {
    activateTab(tabBtn.dataset.tab);
  }
});

if (modalClose) modalClose.addEventListener("click", closePackageModal);
if (modalBackBtn) modalBackBtn.addEventListener("click", closePackageModal);

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closePackageModal();
  });
}

if (modalBookBtn) {
  modalBookBtn.addEventListener("click", (e) => {
    if (!activePackage) {
      e.preventDefault();
      return;
    }
    bookPackageById(activePackage.id);
  });
}

document.getElementById("currentYear").textContent = new Date().getFullYear();

renderPackages();