if (localStorage.getItem("max_admin_logged_in") !== "true") {
  window.location.href = "admin-login.html";
}

const adminUserText = document.getElementById("adminUserText");
const logoutBtn = document.getElementById("logoutBtn");
const navLinks = document.querySelectorAll(".nav-link");
const pageSections = document.querySelectorAll(".page-section");
const quickButtons = document.querySelectorAll(".quick-btn");

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const mobileClose = document.getElementById("mobileClose");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");

const bookingsTableBody = document.getElementById("bookingsTableBody");
const bookingStatusMessage = document.getElementById("bookingStatusMessage");
const bookingSearch = document.getElementById("bookingSearch");
const refreshBookingsBtn = document.getElementById("refreshBookingsBtn");

const packageForm = document.getElementById("packageForm");
const packageFormTitle = document.getElementById("packageFormTitle");
const packageStatusMessage = document.getElementById("packageStatusMessage");
const packagesTableBody = document.getElementById("packagesTableBody");
const packageSearch = document.getElementById("packageSearch");
const refreshPackagesBtn = document.getElementById("refreshPackagesBtn");
const packageResetBtn = document.getElementById("packageResetBtn");
const packageSubmitBtn = document.getElementById("packageSubmitBtn");

const adminUser = localStorage.getItem("max_admin_user") || "@maxtours";
adminUserText.textContent = adminUser;

let allBookings = [];
let allPackages = [];

function openSection(sectionId) {
  pageSections.forEach((section) => {
    section.classList.toggle("active", section.id === sectionId);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.target === sectionId);
  });

  sidebar.classList.remove("active");
  sidebarBackdrop.classList.remove("active");

  if (sectionId === "bookingsSection") {
  loadBookings();
}

if (sectionId === "packagesSection") {
  loadPackagesAdmin();
}
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    openSection(link.dataset.target);
  });
});

quickButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openSection(button.dataset.target);
  });
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("max_admin_logged_in");
  localStorage.removeItem("max_admin_user");
  window.location.href = "./admin-login.html";
});

menuBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
  sidebarBackdrop.classList.add("active");
});

mobileClose.addEventListener("click", () => {
  sidebar.classList.remove("active");
  sidebarBackdrop.classList.remove("active");
});

sidebarBackdrop.addEventListener("click", () => {
  sidebar.classList.remove("active");
  sidebarBackdrop.classList.remove("active");
});

function setBookingMessage(message = "", type = "") {
  if (!bookingStatusMessage) return;
  bookingStatusMessage.textContent = message;
  bookingStatusMessage.className = "admin-info-message";
  if (type) {
    bookingStatusMessage.classList.add(type);
  }
}

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
    const guestsCount = `${booking.adults || 0} Adult${(booking.adults || 0) !== 1 ? "s" : ""}${(booking.children || 0) > 0 ? ` / ${booking.children} Child${booking.children !== 1 ? "ren" : ""}` : ""}`;

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

async function savePackage(formValues) {
  if (typeof supabaseClient === "undefined") {
    setPackageMessage("Supabase client is not available.", "error");
    return;
  }

  const packageId = document.getElementById("packageId").value.trim();

  const payload = {
    title: formValues.title,
    slug: formValues.slug || slugify(formValues.title),
    category: formValues.category,
    location: formValues.location,
    price: formValues.price || null,
    duration: formValues.duration || null,
    image_url: formValues.image_url || null,
    short_description: formValues.short_description || null,
    full_description: formValues.full_description || null,
    is_featured: formValues.is_featured,
    is_active: formValues.is_active
  };

  packageSubmitBtn.disabled = true;
  packageSubmitBtn.textContent = packageId ? "Updating..." : "Saving...";

  try {
    let error = null;

    if (packageId) {
      const result = await supabaseClient
        .from("packages")
        .update(payload)
        .eq("id", Number(packageId));

      error = result.error;
    } else {
      const result = await supabaseClient
        .from("packages")
        .insert([payload]);

      error = result.error;
    }

    if (error) throw error;

    setPackageMessage(
      packageId ? `Package #${packageId} updated successfully.` : "Package added successfully.",
      "success"
    );

    resetPackageForm();
    await loadPackagesAdmin();
  } catch (error) {
    console.error("Failed to save package:", error);
    setPackageMessage(`Failed to save package: ${error.message}`, "error");
  } finally {
    packageSubmitBtn.disabled = false;
    packageSubmitBtn.textContent = "Save Package";
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

if (packageForm) {
  const packageTitleInput = document.getElementById("packageTitle");
  const packageSlugInput = document.getElementById("packageSlug");

  packageTitleInput.addEventListener("input", () => {
    if (!document.getElementById("packageId").value.trim()) {
      packageSlugInput.value = slugify(packageTitleInput.value);
    }
  });

  packageForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const values = {
      title: document.getElementById("packageTitle").value.trim(),
      slug: document.getElementById("packageSlug").value.trim(),
      category: document.getElementById("packageCategory").value,
      location: document.getElementById("packageLocation").value,
      price: document.getElementById("packagePrice").value.trim(),
      duration: document.getElementById("packageDuration").value.trim(),
      image_url: document.getElementById("packageImageUrl").value.trim(),
      short_description: document.getElementById("packageShortDescription").value.trim(),
      full_description: document.getElementById("packageFullDescription").value.trim(),
      is_featured: document.getElementById("packageFeatured").value === "true",
      is_active: document.getElementById("packageActive").value === "true"
    };

    if (!values.title || !values.category || !values.location) {
      setPackageMessage("Please complete title, category, and location.", "error");
      return;
    }

    await savePackage(values);
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
        pkg.short_description
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query))
    );

    renderPackages(filtered);
  });
}

loadBookings();
loadPackagesAdmin();
lucide.createIcons();