const packages = [
  {
    id: 1,
    title: "Zanzibar 8-Day Tour",
    img: "../img/c (267).jpeg",
    duration: "8 Days",
    rating: "Holiday Package",
    summary:
      "A full Zanzibar and safari experience combining Stone Town, Nakupenda, spice farm, village life, safari, Safari Blue, Mnemba, Jozani, and a sunset cruise.",
    overview:
      "An 8-day journey blending culture, beach relaxation, snorkeling, forest adventure, and safari.",
    details: `
      <p>This package combines Zanzibar’s most loved highlights with a short safari experience, giving guests a balanced trip of beach, nature, culture, and marine exploration.</p>
      <h6>Best For</h6>
      <p>Travelers who want a rich all-in-one holiday covering Zanzibar culture, sea trips, forest experiences, and wildlife.</p>
      <h6>Style of Trip</h6>
      <p>Private or guided holiday program with airport support, multi-location activities, and memorable island experiences.</p>
    `,
    program: [
      {
        title: "Day 1: Arrival & Airport Transfer",
        desc: "Welcome to Zanzibar. Airport pick-up and transfer to your hotel. Relax or visit a nearby beach."
      },
      {
        title: "Day 2: Stone Town & Nakupenda Sandbank + Lunch",
        desc: "Explore Stone Town, then take a boat to Nakupenda Sandbank for relaxation, swimming, and a fresh lunch."
      },
      {
        title: "Day 3: Spice Farm & Village Tour",
        desc: "Visit a spice farm, then enjoy a village tour to experience daily local life and traditions."
      },
      {
        title: "Day 4–5: Safari National Park",
        desc: "Begin a 2-day safari with wildlife viewing, overnight lodge or camp stay, and return on Day 5."
      },
      {
        title: "Day 6: Safari Blue Trip + Lunch & Snorkeling",
        desc: "Full-day marine excursion with snorkeling, turquoise waters, and fresh seafood lunch."
      },
      {
        title: "Day 7: Mnemba Atoll Snorkeling & Dolphin Watching",
        desc: "Boat trip to Mnemba for snorkeling, swimming, colorful fish, and dolphin experiences."
      },
      {
        title: "Day 8: Jozani Forest & Sunset Cruise",
        desc: "Visit Jozani Forest, see red colobus monkeys, then finish with a sunset cruise and airport drop-off."
      }
    ],
    inclusions: [
      "Airport pick-up and drop-off",
      "Guided tours and island activities",
      "Boat trips where included in the program",
      "Selected lunches mentioned in the itinerary",
      "Safari segment as described in the package"
    ],
    highlights: [
      "Stone Town & Nakupenda",
      "Spice Farm & Village Tour",
      "2-Day Safari Experience",
      "Safari Blue",
      "Mnemba Atoll",
      "Jozani Forest & Sunset Cruise"
    ]
  },
  {
    id: 2,
    title: "Pacchetto Escursioni Zanzibar – 5 Giorni (Tour Privati)",
    img: "../img/c (191).jpeg",
    duration: "5 Days",
    rating: "Private Tour Package",
    summary:
      "A private 5-day Zanzibar package including Prison Island, Nakupenda, Jozani, Salaam Cave, Mtende, Mnemba, Safari Blue, Stone Town, spice farm, and The Rock.",
    overview:
      "A private Italian-friendly package designed for guests who want curated day-by-day island experiences.",
    details: `
      <p>This private 5-day package focuses on Zanzibar’s top marine, cultural, and scenic locations in a compact and elegant itinerary.</p>
      <h6>Best For</h6>
      <p>Couples, friends, or private travelers who want a smooth multi-day experience with iconic Zanzibar excursions.</p>
      <h6>Style of Trip</h6>
      <p>Private guided holiday program with beach time, snorkeling, cultural visits, and scenic food experiences.</p>
    `,
    program: [
      {
        title: "Giorno 1 – Prison Island & Nakupenda Sandbank",
        desc: "Visit giant tortoises on Prison Island, then enjoy Nakupenda with relaxation, snorkeling, and lunch."
      },
      {
        title: "Giorno 2 – Foresta di Jozani, Salaam Cave & Spiaggia di Mtende",
        desc: "See red colobus monkeys in Jozani, explore Salaam Cave, and relax at Mtende Beach."
      },
      {
        title: "Giorno 3 – Isola di Mnemba (Delfini & Snorkeling)",
        desc: "Enjoy a Mnemba trip with dolphin spotting, snorkeling, fresh fruit, and beach relaxation."
      },
      {
        title: "Giorno 4 – Safari Blu",
        desc: "Traditional dhow trip with Blue Lagoon snorkeling, mangrove exploration, fruits, and fish lunch."
      },
      {
        title: "Giorno 5 – Stone Town, Piantagione di Spezie & The Rock",
        desc: "Cultural Stone Town tour, spice plantation tasting, and a meal stop at The Rock Restaurant."
      }
    ],
    inclusions: [
      "Private guided excursions",
      "Boat experiences where included",
      "Selected meals mentioned in the itinerary",
      "Transfers included as described",
      "Snorkeling and sightseeing experiences"
    ],
    highlights: [
      "Prison Island & Nakupenda",
      "Jozani Forest",
      "Salaam Cave",
      "Mtende Beach",
      "Mnemba Island",
      "Safari Blue",
      "Stone Town & Spice Farm",
      "The Rock Restaurant"
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
const modalMeta = document.getElementById("modalMeta");
const modalOverview = document.getElementById("modalOverview");
const modalProgram = document.getElementById("modalProgram");
const modalDetails = document.getElementById("modalDetails");
const modalDuration = document.getElementById("modalDuration");
const modalInclusions = document.getElementById("modalInclusions");

let activePackage = null;

function renderPackages() {
  packageGrid.innerHTML = packages
    .map(
      (pkg) => `
        <article class="package-card">
          <div class="package-image">
            <img src="${pkg.img}" alt="${pkg.title}">
            <span class="package-badge">${pkg.duration}</span>
          </div>

          <div class="package-body">
            <h3>${pkg.title}</h3>
            <p class="package-summary">${pkg.summary}</p>

            <ul class="package-mini-list">
              ${pkg.highlights.slice(0, 4).map((item) => `<li>${item}</li>`).join("")}
            </ul>

            <div class="card-actions">
              <button class="btn btn-outline" data-view-id="${pkg.id}">View Program</button>
              <button class="btn btn-primary" data-book-id="${pkg.id}">Book Now</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function openPackageModal(pkg) {
  activePackage = pkg;

  modalImage.src = pkg.img;
  modalImage.alt = pkg.title;
  modalTitle.textContent = pkg.title;
  modalMeta.textContent = `${pkg.duration} | ${pkg.rating}`;
  modalOverview.textContent = pkg.overview || pkg.summary || "";
  modalDuration.textContent = pkg.duration || "";

  modalProgram.innerHTML =
    pkg.program && pkg.program.length
      ? pkg.program
          .map(
            (day) => `
              <div class="program-day">
                <strong>${day.title}</strong>
                <p>${day.desc}</p>
              </div>
            `
          )
          .join("")
      : "<p>No program available.</p>";

  modalDetails.innerHTML = pkg.details || "<p>No extra details available.</p>";

  modalInclusions.innerHTML =
    pkg.inclusions && pkg.inclusions.length
      ? `
        <h6>Included</h6>
        <ul>
          ${pkg.inclusions.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      `
      : "<p>No inclusions listed.</p>";

  activateTab("program");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closePackageModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function bookPackageById(packageId) {
  const pkg = packages.find((item) => item.id === packageId);
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

  window.location.href = "index.html#contact";
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

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  const viewBtn = e.target.closest("[data-view-id]");
  const bookBtn = e.target.closest("[data-book-id]");
  const tabBtn = e.target.closest(".tab-btn");

  if (viewBtn) {
    const id = Number(viewBtn.dataset.viewId);
    const pkg = packages.find((item) => item.id === id);
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

modalClose.addEventListener("click", closePackageModal);
modalBackBtn.addEventListener("click", closePackageModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closePackageModal();
});

modalBookBtn.addEventListener("click", (e) => {
  if (!activePackage) {
    e.preventDefault();
    return;
  }
  bookPackageById(activePackage.id);
});

renderPackages();