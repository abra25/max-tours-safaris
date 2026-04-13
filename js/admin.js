if (localStorage.getItem("max_admin_logged_in") !== "true") {
  window.location.href = "admin-login.html";
}

/* =========================
   DOM REFERENCES
========================= */
const adminUserText = document.getElementById("adminUserText");
const logoutBtn = document.getElementById("logoutBtn");
const navLinks = document.querySelectorAll(".nav-link");
const pageSections = document.querySelectorAll(".page-section");
const quickButtons = document.querySelectorAll(".quick-btn");

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const mobileClose = document.getElementById("mobileClose");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");

/* Bookings */
const bookingsTableBody = document.getElementById("bookingsTableBody");
const bookingStatusMessage = document.getElementById("bookingStatusMessage");
const bookingSearch = document.getElementById("bookingSearch");
const refreshBookingsBtn = document.getElementById("refreshBookingsBtn");

/* Packages table/list */
const packagesTableBody = document.getElementById("packagesTableBody");
const packageStatusMessage = document.getElementById("packageStatusMessage");
const packageSearch = document.getElementById("packageSearch");
const refreshPackagesBtn = document.getElementById("refreshPackagesBtn");
const openPackageModalBtn = document.getElementById("openPackageModalBtn");

/* Package modal/editor */
const packageEditorModal = document.getElementById("packageEditorModal");
const packageEditorBackdrop = document.getElementById("packageEditorBackdrop");
const closePackageModalBtn = document.getElementById("closePackageModalBtn");
const packageEditorMessage = document.getElementById("packageEditorMessage");
const packageForm = document.getElementById("packageForm");
const packageFormTitle = document.getElementById("packageFormTitle");
const packageResetBtn = document.getElementById("packageResetBtn");
const packageSubmitBtn = document.getElementById("packageSubmitBtn");

/* Package form fields */
const packageIdEl = document.getElementById("packageId");
const packageTitleEl = document.getElementById("packageTitle");
const packageSlugEl = document.getElementById("packageSlug");
const packageCategoryEl = document.getElementById("packageCategory");
const packageLocationEl = document.getElementById("packageLocation");
const packagePriceEl = document.getElementById("packagePrice");
const packageChildPriceEl = document.getElementById("packageChildPrice");
const packageDurationEl = document.getElementById("packageDuration");
const packageRatingEl = document.getElementById("packageRating");
const packageImageFileEl = document.getElementById("packageImageFile");
const packageImageUrlEl = document.getElementById("packageImageUrl");
const packageFeaturedEl = document.getElementById("packageFeatured");
const packageActiveEl = document.getElementById("packageActive");
const packageShortDescriptionEl = document.getElementById("packageShortDescription");
const packageFullDescriptionEl = document.getElementById("packageFullDescription");
const packageDetailsEl = document.getElementById("packageDetails");
const packageFeaturesEl = document.getElementById("packageFeatures");
const packageHighlightsEl = document.getElementById("packageHighlights");
const packageItineraryEl = document.getElementById("packageItinerary");
const packageInclusionsEl = document.getElementById("packageInclusions");
const packageEssentialsEl = document.getElementById("packageEssentials");

const adminUser = localStorage.getItem("max_admin_user") || "@maxtours";
if (adminUserText) adminUserText.textContent = adminUser;

let allBookings = [];
let allPackages = [];

/* =========================
   GENERAL UI
========================= */
function openSection(sectionId) {
  pageSections.forEach((section) => {
    section.classList.toggle("active", section.id === sectionId);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.target === sectionId);
  });

  if (sidebar) sidebar.classList.remove("active");
  if (sidebarBackdrop) sidebarBackdrop.classList.remove("active");

  if (sectionId === "bookingsSection") {
    loadBookings();
  }

  if (sectionId === "packagesSection") {
    loadPackagesAdmin();
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => openSection(link.dataset.target));
});

quickButtons.forEach((button) => {
  button.addEventListener("click", () => openSection(button.dataset.target));
});

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("max_admin_logged_in");
    localStorage.removeItem("max_admin_user");
    window.location.href = "admin-login.html";
  });
}

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    if (sidebar) sidebar.classList.add("active");
    if (sidebarBackdrop) sidebarBackdrop.classList.add("active");
  });
}

if (mobileClose) {
  mobileClose.addEventListener("click", () => {
    if (sidebar) sidebar.classList.remove("active");
    if (sidebarBackdrop) sidebarBackdrop.classList.remove("active");
  });
}

if (sidebarBackdrop) {
  sidebarBackdrop.addEventListener("click", () => {
    if (sidebar) sidebar.classList.remove("active");
    if (sidebarBackdrop) sidebarBackdrop.classList.remove("active");
  });
}

/* =========================
   HELPERS
========================= */
function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function formatDateTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function slugify(text = "") {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parseLines(text = "") {
  return String(text)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseItinerary(text = "") {
  return String(text)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const [day, title, ...rest] = line.split("|");
      return {
        day: Number(day) || index + 1,
        title: (title || `Step ${index + 1}`).trim(),
        desc: rest.join("|").trim()
      };
    });
}

function stringifyItinerary(items = []) {
  if (!Array.isArray(items)) return "";
  return items
    .map((item, index) => `${item.day || index + 1}|${item.title || ""}|${item.desc || ""}`)
    .join("\n");
}

function setBookingMessage(message = "", type = "") {
  if (!bookingStatusMessage) return;
  bookingStatusMessage.textContent = message;
  bookingStatusMessage.className = "admin-info-message";
  if (type) bookingStatusMessage.classList.add(type);
}

function setPackageMessage(message = "", type = "") {
  if (packageStatusMessage) {
    packageStatusMessage.textContent = message;
    packageStatusMessage.className = "admin-info-message";
    if (type) packageStatusMessage.classList.add(type);
  }

  if (packageEditorMessage) {
    packageEditorMessage.textContent = message;
    packageEditorMessage.className = "admin-info-message";
    if (type) packageEditorMessage.classList.add(type);
  }
}

/* =========================
   BOOKINGS
========================= */
function renderBookings(rows) {
  if (!bookingsTableBody) return;

  if (!rows.length) {
    bookingsTableBody.innerHTML = `
      <tr>
        <td colspan="8">No bookings found.</td>
      </tr>
    `;
    return;
  }

  bookingsTableBody.innerHTML = rows.map((booking) => {
    const adults = Number(booking.adults || 0);
    const children = Number(booking.children || 0);

    const guestsCount = `${adults} Adult${adults !== 1 ? "s" : ""}${
      children > 0 ? ` / ${children} Child${children !== 1 ? "ren" : ""}` : ""
    }`;

    return `
      <tr>
        <td>${booking.id}</td>
        <td>
          <div class="booking-guest">
            <strong>${booking.full_name || "—"}</strong>
            <span>${booking.email || "—"}</span>
            <span>${booking.phone || "—"}</span>
          </div>
        </td>
        <td>
          <div class="booking-package">
            <strong>${booking.package_name || "—"}</strong>
            <span>${booking.service_type || "—"}</span>
          </div>
        </td>
        <td>${formatDate(booking.travel_date)}</td>
        <td>${guestsCount}</td>
        <td>${formatDateTime(booking.created_at)}</td>
        <td>
          <span class="status ${booking.status || "pending"}">${booking.status || "pending"}</span>
        </td>
        <td>
          <div class="booking-actions-stack">
            <select class="status-select" data-booking-id="${booking.id}">
              <option value="pending" ${booking.status === "pending" ? "selected" : ""}>Pending</option>
              <option value="confirmed" ${booking.status === "confirmed" ? "selected" : ""}>Confirmed</option>
              <option value="rejected" ${booking.status === "rejected" ? "selected" : ""}>Rejected</option>
            </select>

            <div class="booking-row-actions">
              <button class="table-action-btn" data-save-booking-id="${booking.id}">Save</button>
              <button class="table-delete-btn" data-delete-booking-id="${booking.id}">Delete</button>
            </div>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  bindBookingActionButtons();
}

function bindBookingActionButtons() {
  const saveButtons = document.querySelectorAll("[data-save-booking-id]");
  const deleteButtons = document.querySelectorAll("[data-delete-booking-id]");

  saveButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const bookingId = Number(button.dataset.saveBookingId);
      const select = document.querySelector(`select[data-booking-id="${bookingId}"]`);
      const newStatus = select ? select.value : "pending";
      await updateBookingStatus(bookingId, newStatus, button);
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const bookingId = Number(button.dataset.deleteBookingId);
      const confirmed = window.confirm(`Delete booking #${bookingId}? This action cannot be undone.`);
      if (!confirmed) return;
      await deleteBooking(bookingId, button);
    });
  });
}

async function loadBookings() {
  if (typeof supabaseClient === "undefined") {
    setBookingMessage("Supabase client is not available.", "error");
    return;
  }

  setBookingMessage("Loading bookings...");

  const { data, error } = await supabaseClient
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load bookings:", error);
    setBookingMessage(`Failed to load bookings: ${error.message}`, "error");

    if (bookingsTableBody) {
      bookingsTableBody.innerHTML = `
        <tr>
          <td colspan="8">Could not load bookings.</td>
        </tr>
      `;
    }
    return;
  }

  allBookings = Array.isArray(data) ? data : [];
  renderBookings(allBookings);
  setBookingMessage(`Loaded ${allBookings.length} booking(s).`, "success");
}

async function updateBookingStatus(bookingId, newStatus, button) {
  if (typeof supabaseClient === "undefined") {
    setBookingMessage("Supabase client is not available.", "error");
    return;
  }

  const oldText = button.textContent;
  button.disabled = true;
  button.textContent = "Saving...";

  const { error } = await supabaseClient
    .from("bookings")
    .update({ status: newStatus })
    .eq("id", bookingId);

  if (error) {
    console.error("Failed to update booking status:", error);
    setBookingMessage(`Failed to update booking #${bookingId}: ${error.message}`, "error");
    button.disabled = false;
    button.textContent = oldText;
    return;
  }

  setBookingMessage(`Booking #${bookingId} updated to ${newStatus}.`, "success");
  await loadBookings();
}

async function deleteBooking(bookingId, button) {
  if (typeof supabaseClient === "undefined") {
    setBookingMessage("Supabase client is not available.", "error");
    return;
  }

  const oldText = button.textContent;
  button.disabled = true;
  button.textContent = "Deleting...";

  const { error } = await supabaseClient
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error("Failed to delete booking:", error);
    setBookingMessage(`Failed to delete booking #${bookingId}: ${error.message}`, "error");
    button.disabled = false;
    button.textContent = oldText;
    return;
  }

  setBookingMessage(`Booking #${bookingId} deleted successfully.`, "success");
  await loadBookings();
}

if (bookingSearch) {
  bookingSearch.addEventListener("input", () => {
    const query = bookingSearch.value.trim().toLowerCase();

    if (!query) {
      renderBookings(allBookings);
      return;
    }

    const filtered = allBookings.filter((booking) => {
      return [
        booking.full_name,
        booking.email,
        booking.phone,
        booking.package_name,
        booking.service_type,
        booking.status
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });

    renderBookings(filtered);
  });
}

if (refreshBookingsBtn) {
  refreshBookingsBtn.addEventListener("click", loadBookings);
}

/* =========================
   PACKAGES MODAL / FORM
========================= */
function openPackageEditorModal() {
  if (packageEditorModal) {
    packageEditorModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closePackageEditorModal() {
  if (packageEditorModal) {
    packageEditorModal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function toggleCategoryFields(categoryValue) {
  const holidayFields = document.querySelectorAll(".holiday-only-field");
  const dayFields = document.querySelectorAll(".day-only-field");

  holidayFields.forEach((field) => {
    field.classList.toggle("hidden-category-field", categoryValue !== "holiday_package");
  });

  dayFields.forEach((field) => {
    field.classList.toggle("hidden-category-field", categoryValue !== "day_tour");
  });
}

function resetPackageForm() {
  const fields = {
    packageId: "",
    packageTitle: "",
    packageSlug: "",
    packageCategory: "",
    packageLocation: "",
    packagePrice: "",
    packageChildPrice: "",
    packageDuration: "",
    packageRating: "",
    packageImageUrl: "",
    packageShortDescription: "",
    packageFullDescription: "",
    packageDetails: "",
    packageFeatures: "",
    packageHighlights: "",
    packageItinerary: "",
    packageInclusions: "",
    packageEssentials: ""
  };

  Object.entries(fields).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.value = value;
  });

  if (packageFeaturedEl) packageFeaturedEl.value = "false";
  if (packageActiveEl) packageActiveEl.value = "true";
  if (packageImageFileEl) packageImageFileEl.value = "";

  if (packageFormTitle) packageFormTitle.textContent = "Add New Package";
  if (packageSubmitBtn) packageSubmitBtn.textContent = "Save Package";

  setPackageMessage("");
  toggleCategoryFields("");
}

async function uploadPackageImage(file) {
  if (!file) return null;

  if (typeof supabaseClient === "undefined") {
    throw new Error("Supabase client is not available.");
  }

  const safeName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const filePath = `packages/${safeName}`;

  const { error } = await supabaseClient.storage
    .from("tour-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false
    });

  if (error) {
    throw error;
  }

  const { data } = supabaseClient.storage
    .from("tour-images")
    .getPublicUrl(filePath);

  return data?.publicUrl || null;
}

/* =========================
   PACKAGES TABLE
========================= */
async function loadPackagesAdmin() {
  if (typeof supabaseClient === "undefined") {
    setPackageMessage("Supabase client is not available.", "error");
    return;
  }

  setPackageMessage("Loading packages...");

  const { data, error } = await supabaseClient
    .from("packages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load packages:", error);
    setPackageMessage(`Failed to load packages: ${error.message}`, "error");

    if (packagesTableBody) {
      packagesTableBody.innerHTML = `
        <tr>
          <td colspan="7">Could not load packages.</td>
        </tr>
      `;
    }
    return;
  }

  allPackages = Array.isArray(data) ? data : [];
  renderPackages(allPackages);
  setPackageMessage(`Loaded ${allPackages.length} package(s).`, "success");
}

function renderPackages(rows) {
  if (!packagesTableBody) return;

  if (!rows.length) {
    packagesTableBody.innerHTML = `
      <tr>
        <td colspan="7">No packages found.</td>
      </tr>
    `;
    return;
  }

  packagesTableBody.innerHTML = rows.map((pkg) => `
    <tr>
      <td>${pkg.id}</td>
      <td>
        <div class="package-title-cell">
          <strong>${pkg.title || "—"}</strong>
          <span>${pkg.duration || "No duration"}</span>
        </div>
      </td>
      <td>${pkg.category || "—"}</td>
      <td>${pkg.location || "—"}</td>
      <td>${pkg.price || "—"}</td>
      <td>
        <span class="status ${pkg.is_active ? "confirmed" : "rejected"}">
          ${pkg.is_active ? "active" : "inactive"}
        </span>
      </td>
      <td>
        <div class="package-actions">
          <button class="table-edit-btn" data-edit-package-id="${pkg.id}">Edit</button>
          <button class="table-delete-btn" data-delete-package-id="${pkg.id}">Delete</button>
        </div>
      </td>
    </tr>
  `).join("");

  bindPackageActionButtons();
}

function bindPackageActionButtons() {
  const editButtons = document.querySelectorAll("[data-edit-package-id]");
  const deleteButtons = document.querySelectorAll("[data-delete-package-id]");

  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const packageId = Number(button.dataset.editPackageId);
      const pkg = allPackages.find((item) => item.id === packageId);
      if (!pkg) return;

      const setValue = (el, value) => {
        if (el) el.value = value ?? "";
      };

      setValue(packageIdEl, pkg.id);
      setValue(packageTitleEl, pkg.title);
      setValue(packageSlugEl, pkg.slug);
      setValue(packageCategoryEl, pkg.category);
      setValue(packageLocationEl, pkg.location);
      setValue(packagePriceEl, pkg.price);
      setValue(packageChildPriceEl, pkg.child_price);
      setValue(packageDurationEl, pkg.duration);
      setValue(packageRatingEl, pkg.rating);
      setValue(packageImageUrlEl, pkg.image_url);
      setValue(packageShortDescriptionEl, pkg.short_description);
      setValue(packageFullDescriptionEl, pkg.full_description);
      setValue(packageDetailsEl, pkg.details);
      setValue(packageFeaturesEl, Array.isArray(pkg.features) ? pkg.features.join("\n") : "");
      setValue(packageHighlightsEl, Array.isArray(pkg.highlights) ? pkg.highlights.join("\n") : "");
      setValue(packageItineraryEl, stringifyItinerary(pkg.itinerary));
      setValue(packageInclusionsEl, Array.isArray(pkg.inclusions) ? pkg.inclusions.join("\n") : "");
      setValue(packageEssentialsEl, Array.isArray(pkg.essentials) ? pkg.essentials.join("\n") : "");
      setValue(packageFeaturedEl, String(!!pkg.is_featured));
      setValue(packageActiveEl, String(!!pkg.is_active));

      if (packageImageFileEl) packageImageFileEl.value = "";

      if (packageFormTitle) packageFormTitle.textContent = `Edit Package #${pkg.id}`;
      if (packageSubmitBtn) packageSubmitBtn.textContent = "Update Package";

      toggleCategoryFields(pkg.category || "");
      setPackageMessage(`Editing package #${pkg.id}.`, "success");
      openPackageEditorModal();
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const packageId = Number(button.dataset.deletePackageId);
      const confirmed = window.confirm(`Delete package #${packageId}?`);
      if (!confirmed) return;
      await deletePackage(packageId, button);
    });
  });
}

async function savePackage(formValues) {
  if (typeof supabaseClient === "undefined") {
    setPackageMessage("Supabase client is not available.", "error");
    return;
  }

  const packageId = packageIdEl?.value.trim() || "";

  const payload = {
    title: formValues.title,
    slug: formValues.slug || slugify(formValues.title),
    category: formValues.category,
    location: formValues.location,
    price: formValues.price || null,
    child_price: formValues.child_price || null,
    duration: formValues.duration || null,
    rating: formValues.rating || null,
    image_url: formValues.image_url || null,
    short_description: formValues.short_description || null,
    full_description: formValues.full_description || null,
    details: formValues.details || null,
    features: formValues.features || [],
    highlights: formValues.highlights || [],
    itinerary: formValues.itinerary || [],
    inclusions: formValues.inclusions || [],
    essentials: formValues.essentials || [],
    is_featured: formValues.is_featured,
    is_active: formValues.is_active
  };

  if (packageSubmitBtn) {
    packageSubmitBtn.disabled = true;
    packageSubmitBtn.textContent = packageId ? "Updating..." : "Saving...";
  }

  try {
    let result;

    if (packageId) {
      result = await supabaseClient
        .from("packages")
        .update(payload)
        .eq("id", Number(packageId));
    } else {
      result = await supabaseClient
        .from("packages")
        .insert([payload]);
    }

    if (result.error) {
      throw result.error;
    }

    setPackageMessage(
      packageId ? `Package #${packageId} updated successfully.` : "Package added successfully.",
      "success"
    );

    resetPackageForm();
    await loadPackagesAdmin();
  } catch (error) {
    console.error("Failed to save package:", error);
    setPackageMessage(`Failed to save package: ${error.message}`, "error");
    throw error;
  } finally {
    if (packageSubmitBtn) {
      packageSubmitBtn.disabled = false;
      packageSubmitBtn.textContent = "Save Package";
    }
  }
}

async function deletePackage(packageId, button) {
  if (typeof supabaseClient === "undefined") {
    setPackageMessage("Supabase client is not available.", "error");
    return;
  }

  const oldText = button.textContent;
  button.disabled = true;
  button.textContent = "Deleting...";

  const { error } = await supabaseClient
    .from("packages")
    .delete()
    .eq("id", packageId);

  if (error) {
    console.error("Failed to delete package:", error);
    setPackageMessage(`Failed to delete package #${packageId}: ${error.message}`, "error");
    button.disabled = false;
    button.textContent = oldText;
    return;
  }

  setPackageMessage(`Package #${packageId} deleted successfully.`, "success");
  await loadPackagesAdmin();
}

/* =========================
   PACKAGE EVENTS
========================= */
if (packageTitleEl && packageSlugEl) {
  packageTitleEl.addEventListener("input", () => {
    if (!packageIdEl || !packageIdEl.value.trim()) {
      packageSlugEl.value = slugify(packageTitleEl.value);
    }
  });
}

if (packageCategoryEl) {
  packageCategoryEl.addEventListener("change", (e) => {
    toggleCategoryFields(e.target.value);
  });
}

if (packageForm) {
  packageForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      let imageUrl = packageImageUrlEl?.value.trim() || "";
      const selectedFile = packageImageFileEl?.files?.[0];

      if (selectedFile) {
        setPackageMessage("Uploading image...", "success");
        imageUrl = await uploadPackageImage(selectedFile);
        if (packageImageUrlEl) packageImageUrlEl.value = imageUrl;
      }

      const values = {
        title: packageTitleEl?.value.trim() || "",
        slug: packageSlugEl?.value.trim() || "",
        category: packageCategoryEl?.value || "",
        location: packageLocationEl?.value || "",
        price: packagePriceEl?.value.trim() || "",
        child_price: packageChildPriceEl?.value.trim() || "",
        duration: packageDurationEl?.value.trim() || "",
        rating: packageRatingEl?.value.trim() || "",
        image_url: imageUrl,
        short_description: packageShortDescriptionEl?.value.trim() || "",
        full_description: packageFullDescriptionEl?.value.trim() || "",
        details: packageDetailsEl?.value.trim() || "",
        features: parseLines(packageFeaturesEl?.value || ""),
        highlights: parseLines(packageHighlightsEl?.value || ""),
        itinerary: parseItinerary(packageItineraryEl?.value || ""),
        inclusions: parseLines(packageInclusionsEl?.value || ""),
        essentials: parseLines(packageEssentialsEl?.value || ""),
        is_featured: packageFeaturedEl?.value === "true",
        is_active: packageActiveEl?.value === "true"
      };

      if (!values.title || !values.category || !values.location) {
        setPackageMessage("Please complete title, category, and location.", "error");
        return;
      }

      await savePackage(values);
      closePackageEditorModal();
    } catch (error) {
      console.error("Package submit failed:", error);
      setPackageMessage(`Package submit failed: ${error.message}`, "error");
    }
  });
}

if (packageResetBtn) {
  packageResetBtn.addEventListener("click", () => {
    resetPackageForm();
    setPackageMessage("Form reset.");
  });
}

if (refreshPackagesBtn) {
  refreshPackagesBtn.addEventListener("click", loadPackagesAdmin);
}

if (packageSearch) {
  packageSearch.addEventListener("input", () => {
    const query = packageSearch.value.trim().toLowerCase();

    if (!query) {
      renderPackages(allPackages);
      return;
    }

    const filtered = allPackages.filter((pkg) =>
      [
        pkg.title,
        pkg.slug,
        pkg.category,
        pkg.location,
        pkg.price,
        pkg.duration,
        pkg.short_description,
        pkg.rating
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query))
    );

    renderPackages(filtered);
  });
}

if (openPackageModalBtn) {
  openPackageModalBtn.addEventListener("click", () => {
    resetPackageForm();
    openPackageEditorModal();
  });
}

if (closePackageModalBtn) {
  closePackageModalBtn.addEventListener("click", closePackageEditorModal);
}

if (packageEditorBackdrop) {
  packageEditorBackdrop.addEventListener("click", closePackageEditorModal);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && packageEditorModal?.classList.contains("active")) {
    closePackageEditorModal();
  }
});

/* =========================
   INITIAL LOAD
========================= */
loadBookings();
loadPackagesAdmin();

if (typeof lucide !== "undefined") {
  lucide.createIcons();
}