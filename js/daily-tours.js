const tourGrid = document.getElementById("tourGrid");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const modal = document.getElementById("tourModal");
const modalClose = document.getElementById("modalClose");
const modalBackBtn = document.getElementById("modalBackBtn");

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

let dayTours = [];
let activeTour = null;
let currentFilter = "all";
let currentSearch = "";

function lucideRefresh() {
  if (window.createLucideIcons) {
    window.createLucideIcons();
  } else if (typeof lucide !== "undefined") {
    lucide.createIcons();
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
  const value = String(duration).toLowerCase();

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
    String(tour.title || "").toLowerCase().includes(q) ||
    String(tour.description || "").toLowerCase().includes(q) ||
    String(tour.overview || "").toLowerCase().includes(q)
  );
}

function renderEmptyState(message = "No tours found.") {
  if (!tourGrid) return;

  tourGrid.innerHTML = `
    <div class="empty-state">
      <i data-lucide="search-x"></i>
      <p>${message}</p>
    </div>
  `;
  lucideRefresh();
}

function splitLines(text = "") {
  return String(text)
    .split(/\n|•/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseItineraryRows(items = []) {
  if (Array.isArray(items) && items.length) {
    return items.map((item, index) => ({
      title: item.title || `Step ${item.day || index + 1}`,
      desc: item.desc || ""
    }));
  }

  return [];
}

function normalizeTour(row) {
  let numericRating = 4;

  if (row.rating) {
    const parsed = parseInt(String(row.rating).replace(/[^\d]/g, ""), 10);
    if (!Number.isNaN(parsed)) {
      numericRating = Math.max(1, Math.min(parsed, 5));
    }
  }

  return {
    id: row.id,
    title: row.title || "Day Tour",
    img: row.image_url || "../img/c (193).jpeg",
    duration: row.duration || "3 hours",
    rating: numericRating,
    description: row.short_description || "Enjoy a memorable Zanzibar day tour.",
    overview: row.full_description || row.short_description || "Explore this day tour with our local team.",
    details: row.details || `<p>${row.full_description || row.short_description || "Tour details will be confirmed directly with our team."}</p>`,
    itinerary: parseItineraryRows(row.itinerary),
    inclusions: Array.isArray(row.inclusions) ? row.inclusions : []
  };
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
              <a href="booking.html?type=day_tour&package=${encodeURIComponent(tour.title)}" class="btn btn-primary">Book Now</a>
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
  if (!modal) return;
  modal.classList.remove("active");
  document.body.classList.remove("modal-open");
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

async function loadDayTours() {
  if (typeof supabaseClient === "undefined") {
    console.error("Supabase client is not available.");
    renderEmptyState("Could not connect to day tour data.");
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from("packages")
      .select("*")
      .eq("category", "day_tour")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) throw error;

    dayTours = Array.isArray(data) ? data.map(normalizeTour) : [];
    renderTours();
  } catch (error) {
    console.error("Failed to load day tours:", error);
    renderEmptyState("Failed to load tours.");
  }
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    if (mainNav) mainNav.classList.toggle("active");
  });
}

document.addEventListener("click", (e) => {
  const viewBtn = e.target.closest("[data-view-id]");
  const tabBtn = e.target.closest(".tab-btn");
  const navLink = e.target.closest("#mainNav a");
  const filterBtn = e.target.closest(".filter-btn");

  if (viewBtn) {
    const id = Number(viewBtn.dataset.viewId);
    const tour = dayTours.find((item) => item.id === id);
    if (tour) openTourModal(tour);
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
    if (mainNav) mainNav.classList.remove("active");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
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
  if (e.key === "Escape" && modal && modal.classList.contains("active")) {
    closeTourModal();
  }
});

loadDayTours();