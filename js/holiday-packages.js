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

const currentYear = document.getElementById("currentYear");

let packages = [];
let activePackage = null;

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function splitLines(text = "") {
  if (!text || typeof text !== "string") return [];
  return text
    .split(/\n|•|-/g)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function makeFeatureChips(pkg) {
  const items = splitLines(pkg.short_description || pkg.full_description);
  if (items.length) return items.slice(0, 4);

  return [
    pkg.location ? pkg.location.charAt(0).toUpperCase() + pkg.location.slice(1) : "Zanzibar",
    pkg.duration || "Flexible",
    pkg.price || "Custom Quote",
    pkg.is_featured ? "Top Pick" : "Available"
  ];
}

function makeHighlights(pkg) {
  const items = splitLines(pkg.full_description || pkg.short_description);
  if (items.length) return items.slice(0, 6);

  return [
    "Holiday planning support",
    "Flexible package arrangement",
    "Comfortable travel experience",
    "Booking confirmation after review"
  ];
}

function makeItinerary(pkg) {
  const items = splitLines(pkg.full_description);

  if (items.length >= 2) {
    return items.slice(0, 6).map((item, index) => ({
      day: index + 1,
      title: `Package Step ${index + 1}`,
      desc: item
    }));
  }

  return [
    {
      day: 1,
      title: "Arrival & Planning",
      desc: "Arrival support and start of your holiday arrangement."
    },
    {
      day: 2,
      title: "Holiday Experience",
      desc: pkg.short_description || "Enjoy the main experiences included in this package."
    },
    {
      day: 3,
      title: "Flexible Continuation",
      desc: "Continue the package based on the selected travel plan."
    }
  ];
}

function makeInclusions(pkg) {
  const list = [];

  if (pkg.duration) list.push(`Duration: ${pkg.duration}`);
  if (pkg.location) list.push(`Location: ${pkg.location}`);
  if (pkg.price) list.push(`Price: ${pkg.price}`);

  list.push("Planning support");
  list.push("Direct communication with our team");

  return list;
}

function makeTerms(pkg) {
  return [
    "Booking request is reviewed before confirmation",
    "Payment is handled outside the website",
    "Final travel details are confirmed directly with our team",
    pkg.is_featured ? "Featured package option" : "Standard package option"
  ];
}

function normalizePackage(row) {
  return {
    id: row.id,
    title: row.title || "Holiday Package",
    duration: row.duration || "Flexible",
    price: row.price || "Custom Quote",
    rating: row.is_featured ? "Top Pick" : "Available",
    image: row.image_url || "../img/c (193).jpeg",
    summary:
      row.short_description ||
      "Explore this holiday package with flexible planning and memorable travel experiences.",
    overview:
      row.full_description ||
      row.short_description ||
      "Discover this package and contact our team for more details.",
    features: makeFeatureChips(row),
    highlights: makeHighlights(row),
    itinerary: makeItinerary(row),
    inclusions: makeInclusions(row),
    essentials: makeTerms(row),
    raw: row
  };
}

function renderPackages() {
  if (!packageGrid) return;

  if (!packages.length) {
    packageGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 28px 18px;">
        <h3 style="margin-bottom: 10px;">No holiday packages available right now</h3>
        <p>Please check again soon or contact our team for custom planning.</p>
      </div>
    `;
    return;
  }

  packageGrid.innerHTML = packages.map((pkg) => `
    <article class="package-card">
      <div class="package-image">
        <img src="${escapeHtml(pkg.image)}" alt="${escapeHtml(pkg.title)}">
        <span class="package-badge">${escapeHtml(pkg.duration)}</span>
        <span class="package-price">From ${escapeHtml(pkg.price)}</span>
      </div>

      <div class="package-body">
        <h3>${escapeHtml(pkg.title)}</h3>
        <p class="package-summary">${escapeHtml(pkg.summary)}</p>

        <div class="package-features">
          ${pkg.features.map((item) => `<span class="feature-chip">${escapeHtml(item)}</span>`).join("")}
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
      ${pkg.highlights.map((item) => `<div class="highlight-item">${escapeHtml(item)}</div>`).join("")}
    </div>
  `;

  modalItinerary.innerHTML = pkg.itinerary.map((day) => `
    <div class="itinerary-day">
      <strong>Step ${day.day}: ${escapeHtml(day.title)}</strong>
      <p>${escapeHtml(day.desc)}</p>
    </div>
  `).join("");

  modalInclusions.innerHTML = `
    <div class="inclusion-list">
      ${pkg.inclusions.map((item) => `<div class="inclusion-item">${escapeHtml(item)}</div>`).join("")}
    </div>
  `;

  modalTerms.innerHTML = `
    <div class="terms-list">
      ${pkg.essentials.map((item) => `<div class="terms-item">${escapeHtml(item)}</div>`).join("")}
    </div>
  `;

  activateTab("highlights");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closePackageModal() {
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function bookPackageById(packageId) {
  const pkg = packages.find((item) => item.id === packageId);
  if (!pkg) return;

  const packageParam = encodeURIComponent(pkg.title);
  window.location.href = `booking.html?type=holiday_package&package=${packageParam}`;
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

async function loadHolidayPackages() {
  if (typeof supabaseClient === "undefined") {
    console.error("Supabase client is not available.");
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from("packages")
      .select("*")
      .eq("category", "holiday_package")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) throw error;

    console.log("Holiday packages from DB:", data);

    packages = Array.isArray(data) ? data.map(normalizePackage) : [];
    renderPackages();
  } catch (error) {
    console.error("Failed to load holiday packages:", error);

    if (packageGrid) {
      packageGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 28px 18px;">
          <h3 style="margin-bottom: 10px;">Failed to load packages</h3>
          <p>Please try again later or contact our team directly.</p>
        </div>
      `;
    }
  }
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

if (modalClose) modalClose.addEventListener("click", closePackageModal);
if (modalBackBtn) modalBackBtn.addEventListener("click", closePackageModal);

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closePackageModal();
  });
}

if (modalBookBtn) {
  modalBookBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!activePackage) return;
    bookPackageById(activePackage.id);
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

loadHolidayPackages();