const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const currentYear = document.getElementById("currentYear");
const bookingForm = document.getElementById("bookingForm");
const formStatus = document.getElementById("formStatus");
const serviceTypeSelect = document.getElementById("serviceType");
const packageNameSelect = document.getElementById("packageName");

const localPackages = [
  { id: 1, title: "Kuza Cave Jambiani", category: "day_tour", location: "Zanzibar", is_active: true },
  { id: 2, title: "Blue Lagoon Snorkeling Trip Zanzibar", category: "day_tour", location: "Zanzibar", is_active: true },
  { id: 3, title: "Nungwi Village Tour", category: "day_tour", location: "Zanzibar", is_active: true },
  { id: 4, title: "Salaam Cave Tour", category: "day_tour", location: "Zanzibar", is_active: true },
  { id: 5, title: "Mtende Beach Escape", category: "day_tour", location: "Zanzibar", is_active: true },
  { id: 6, title: "Kae Funk Sunset Experience", category: "day_tour", location: "Zanzibar", is_active: true },
  { id: 7, title: "Full Day North Coast Relaxation", category: "day_tour", location: "Zanzibar", is_active: true },
  { id: 8, title: "Spice Tour with Cooking Class", category: "day_tour", location: "Zanzibar", is_active: true },

  { id: 101, title: "3 Days Zanzibar Escape", category: "holiday_package", location: "Zanzibar", is_active: true },
  { id: 102, title: "4 Days Beach & Culture Package", category: "holiday_package", location: "Zanzibar", is_active: true },
  { id: 103, title: "5 Days Zanzibar Adventure Package", category: "holiday_package", location: "Zanzibar", is_active: true },
  { id: 104, title: "6 Days Zanzibar Holiday Experience", category: "holiday_package", location: "Zanzibar", is_active: true },
  { id: 105, title: "7 Days Zanzibar Honeymoon Package", category: "holiday_package", location: "Zanzibar", is_active: true },
  { id: 106, title: "7 Days Zanzibar Family Holiday", category: "holiday_package", location: "Zanzibar", is_active: true },

  { id: 201, title: "Stone Town", category: "visit_zanzibar", location: "Zanzibar", is_active: true },
  { id: 202, title: "Prison Island", category: "visit_zanzibar", location: "Zanzibar", is_active: true },
  { id: 203, title: "Safari Blue", category: "visit_zanzibar", location: "Zanzibar", is_active: true },
  { id: 204, title: "Mnemba Island", category: "visit_zanzibar", location: "Zanzibar", is_active: true },
  { id: 205, title: "Paje Beach", category: "visit_zanzibar", location: "Zanzibar", is_active: true },
  { id: 206, title: "Spice Tours", category: "visit_zanzibar", location: "Zanzibar", is_active: true },

  { id: 301, title: "Visit Tanzania Request", category: "visit_tanzania", location: "Tanzania", is_active: true }
];

let allPackages = [...localPackages];
let packagesSource = "local";

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

function sortPackagesByTitle(items) {
  return [...items].sort((a, b) => a.title.localeCompare(b.title));
}

async function loadPackages() {
  const urlParams = new URLSearchParams(window.location.search);
  const typeFromUrl = urlParams.get("type") || "";
  const packageFromUrl = urlParams.get("package") || "";

  try {
    if (typeof supabaseClient !== "undefined") {
      const { data, error } = await supabaseClient
        .from("packages")
        .select("id, title, category, location, is_active")
        .eq("is_active", true)
        .order("title", { ascending: true });

      if (!error && Array.isArray(data) && data.length) {
        allPackages = data;
        packagesSource = "supabase";
        console.log("Packages loaded from Supabase:", data);
      } else {
        allPackages = sortPackagesByTitle(localPackages.filter(item => item.is_active));
        packagesSource = "local";
        console.warn("Using local packages fallback.");
        if (error) {
          console.error("Supabase packages error:", error);
        }
      }
    } else {
      allPackages = sortPackagesByTitle(localPackages.filter(item => item.is_active));
      packagesSource = "local";
      console.warn("Supabase client is not available.");
    }
  } catch (error) {
    console.error("Failed to load packages from Supabase. Using local package list.", error);
    allPackages = sortPackagesByTitle(localPackages.filter(item => item.is_active));
    packagesSource = "local";
  }

  if (typeFromUrl) {
    serviceTypeSelect.value = typeFromUrl;
  }

  populatePackageOptions(typeFromUrl, packageFromUrl);
}

function populatePackageOptions(selectedType = "", selectedName = "") {
  packageNameSelect.innerHTML = "";

  if (!selectedType) {
    packageNameSelect.innerHTML = `<option value="">Select service type first</option>`;
    return;
  }

  if (selectedType === "agent_application") {
    packageNameSelect.innerHTML = `
      <option value="">Select application type</option>
      <option value="Become an Agent Application">Become an Agent Application</option>
    `;
    if (selectedName === "Become an Agent Application") {
      packageNameSelect.value = selectedName;
    }
    return;
  }

  if (selectedType === "general_inquiry") {
    packageNameSelect.innerHTML = `
      <option value="">Select inquiry type</option>
      <option value="General Inquiry">General Inquiry</option>
    `;
    if (selectedName === "General Inquiry") {
      packageNameSelect.value = selectedName;
    }
    return;
  }

  const filtered = sortPackagesByTitle(
    allPackages.filter((item) => item.category === selectedType && item.is_active !== false)
  );

  if (!filtered.length) {
    packageNameSelect.innerHTML = `<option value="">No items available for this type</option>`;
    return;
  }

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select a tour or package";
  packageNameSelect.appendChild(defaultOption);

  filtered.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.title;
    option.textContent = item.title;
    option.dataset.packageId = item.id;
    option.dataset.location = item.location || "";

    if (selectedName && selectedName === item.title) {
      option.selected = true;
    }

    packageNameSelect.appendChild(option);
  });
}

serviceTypeSelect.addEventListener("change", (e) => {
  populatePackageOptions(e.target.value, "");
});

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  formStatus.textContent = "";
  formStatus.className = "form-status";

  const selectedOption = packageNameSelect.options[packageNameSelect.selectedIndex];

  let packageId = null;
  if (packagesSource === "supabase" && selectedOption?.dataset?.packageId) {
    packageId = Number(selectedOption.dataset.packageId);
  }

  const formData = {
    full_name: document.getElementById("fullName").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    service_type: document.getElementById("serviceType").value,
    package_id: packageId,
    package_name: document.getElementById("packageName").value,
    travel_date: document.getElementById("travelDate").value || null,
    pickup_location: document.getElementById("pickupLocation").value.trim() || null,
    adults: Number(document.getElementById("adults").value || 1),
    children: Number(document.getElementById("children").value || 0),
    message: document.getElementById("message").value.trim() || null
  };

  if (
    !formData.full_name ||
    !formData.email ||
    !formData.phone ||
    !formData.service_type ||
    !formData.package_name
  ) {
    formStatus.textContent = "Please complete the required fields before sending your booking request.";
    formStatus.classList.add("error");
    return;
  }

  const submitButton = bookingForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    if (typeof supabaseClient !== "undefined") {
      console.log("Submitting booking data:", formData);

      const { error } = await supabaseClient
        .from("bookings")
        .insert([formData]);

      if (error) {
        console.error("Supabase booking insert error:", error);
        throw error;
      }
    } else {
      throw new Error("Supabase client is not available.");
    }

    formStatus.textContent = "Your booking request has been sent successfully. Our team will contact you soon.";
    formStatus.classList.add("success");
    bookingForm.reset();
    populatePackageOptions("", "");
  } catch (error) {
    console.error("Booking insert failed:", error);
    formStatus.textContent = error.message
      ? `Booking failed: ${error.message}`
      : "Something went wrong while sending your booking request. Please try again.";
    formStatus.classList.add("error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Booking Request";
  }
});

loadPackages();