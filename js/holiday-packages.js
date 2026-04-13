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

function splitTextToList(text = "") {
  if (!text || typeof text !== "string") return [];

  return text
    .split(/\n|•|- /g)
    .map(item => item.trim())
    .filter(item => item.length > 0);
}

function buildHighlights(pkg) {
  const shortItems = splitTextToList(pkg.short_description);
  const fullItems = splitTextToList(pkg.full_description);

  const merged = [...shortItems, ...fullItems];
  const unique = [...new Set(merged)];

  if (unique.length) {
    return unique.slice(0, 6);
  }

  return [
    "Well-planned Zanzibar holiday experience",
    "Flexible travel support from our team",
    "Comfortable package arrangement",
    "Suitable for leisure and island discovery"
  ];
}

function buildItinerary(pkg) {
  const items = splitTextToList(pkg.full_description);

  if (items.length >= 2) {
    return items.slice(0, 6).map((item, index) => ({
      day: index + 1,
      title: `Package Day ${index + 1}`,
      desc: item
    }));
  }

  return [
    {
      day: 1,
      title: "Arrival & Welcome",
      desc: "Arrival, transfer assistance, and introduction to your holiday plan."
    },
    {
      day: 2,
      title: "Holiday Experience",
      desc: pkg.short_description || "Enjoy a memorable Zanzibar holiday experience."
    },
    {
      day: 3,
      title: "Flexible Activities",
      desc: "Relax or continue with planned experiences based on your package."
    }
  ];
}

function buildInclusions(pkg) {
  const items = splitTextToList(pkg.short_description);

  if (items.length) {
    return [
      "Package planning support",
      "Travel coordination",
      ...items.slice(0, 3)
    ];
  }

  return [
    "Package planning support",
    "Travel coordination",
    "Selected holiday arrangement details"
  ];
}

function buildEssentials(pkg) {
  const essentials = [];

  if (pkg.price) {
    essentials.push(`Price: ${pkg.price}`);
  }

  if (pkg.duration) {
    essentials.push(`Duration: ${pkg.duration}`);
  }

  essentials.push("Booking confirmation is arranged after request review.");
  essentials.push("Payment is handled outside the website.");
  essentials.push("Travel details can be confirmed directly with our team.");

  return essentials;
}

function normalizePackage(row) {
  return {
    id: row.id,
    title: row.title || "Holiday Package",
    duration: row.duration || "Flexible",
    price: row.price || "Custom Quote",
    rating: row.is_featured ? "Top Pick" : "Available",
    image: row.image_url || "../img/c (193).jpeg",
    summary: row.short_description || "Discover a Zanzibar holiday package tailored for comfort, leisure, and memorable island experiences.",
    overview: row.full_description || row.short_description || "Explore this holiday package and contact our team for planning, availability, and final arrangement details.",
    features: buildHighlights(row).slice(0, 4),
    highlights: buildHighlights(row),
    itinerary: buildItinerary(row),
    inclusions: buildInclusions(row),
    essentials: buildEssentials(row),
    raw: row
  };
}

function renderPackages() {
  if (!packageGrid) return;

  if (!packages.length) {
    packageGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 28px 18px;">
        <h3 style="margin-bottom: 10px;">No holiday packages available right now</h3>
        <p>Please check again soon or contact our team for custom holiday planning.</p>
      </div>
    `;
    return;
  }

  packageGrid.innerHTML = packages.map(pkg => `
    <article class="package-card">
      <div class="package-image">
        <img src="${escapeHtml(pkg.image)}" alt="${escapeHtml(pkg.title)}">
        <span class="package-badge">${escapeHtml(pkg.duration)}</span>
        <span class="package-price">${escapeHtml(pkg.price)}</span>
      </div>

      <div class="package-body">
        <h3>${escapeHtml(pkg.title)}</h3>
        <p class="package-summary">${escapeHtml(pkg.summary)}</p>

        <div class="package-features">
          ${pkg.features.map(item => `<span class="feature-chip">${escapeHtml(item)}</span>`).join("")}
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
      ${pkg.highlights.map(item => `<div class="highlight-item">${escapeHtml(item)}</div>`).join("")}
    </div>
  `;

  modalItinerary.innerHTML = pkg.itinerary.map(day => `
    <div class="itinerary-day">
      <strong>Step ${day.day}: ${escapeHtml(day.title)}</strong>
      <p>${escapeHtml(day.desc)}</p>
    </div>
  `).join("");

  modalInclusions.innerHTML = `
    <div class="inclusion-list">
      ${pkg.inclusions.map(item => `<div class="inclusion-item">${escapeHtml(item)}</div>`).join("")}
    </div>
  `;

  modalTerms.innerHTML = `
    <div class="terms-list">
      ${pkg.essentials.map(item => `<div class="terms-item">${escapeHtml(item)}</div>`).join("")}
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
  const pkg = packages.find(item => item.id === packageId);
  if (!pkg) return;

  const packageParam = encodeURIComponent(pkg.title);
  window.location.href = `../page/booking.html?type=holiday_package&package=${packageParam}`;
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

async function loadHolidayPackages() {
  if (typeof supabaseClient === "undefined") {
    console.error("Supabase client is not available.");
    if (packageGrid) {
      packageGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 28px 18px;">
          <h3 style="margin-bottom: 10px;">Packages unavailable</h3>
          <p>Could not connect to package data right now.</p>
        </div>
      `;
    }
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from("packages")
      .select("*")
      .eq("category", "holiday_package")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

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
    e.preventDefault();
    if (!activePackage) return;
    bookPackageById(activePackage.id);
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

loadHolidayPackages();