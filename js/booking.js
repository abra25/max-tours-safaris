const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const currentYear = document.getElementById("currentYear");
const bookingForm = document.getElementById("bookingForm");
const formStatus = document.getElementById("formStatus");
const serviceTypeSelect = document.getElementById("serviceType");
const packageNameSelect = document.getElementById("packageName");

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

/*
  Replace this array later with:
  - fetched data from Supabase
  - or a shared tours/packages file
*/
const bookingOptions = [
  { type: "day_tour", name: "Prison Island Tour" },
  { type: "day_tour", name: "Safari Blue Tour" },
  { type: "day_tour", name: "Mnemba Snorkeling Tour" },
  { type: "day_tour", name: "Stone Town Tour" },
  { type: "holiday_package", name: "3 Days Zanzibar Escape" },
  { type: "holiday_package", name: "5 Days Beach Holiday" },
  { type: "holiday_package", name: "7 Days Zanzibar Experience" },
  { type: "visit_zanzibar", name: "Visit Zanzibar Experience" },
  { type: "visit_tanzania", name: "Visit Tanzania Experience" },
  { type: "agent_application", name: "Become an Agent Application" },
  { type: "general_inquiry", name: "General Inquiry" }
];

function populatePackageOptions(selectedType = "", selectedName = "") {
  packageNameSelect.innerHTML = `<option value="">Select a tour or package</option>`;

  const filtered = selectedType
    ? bookingOptions.filter(item => item.type === selectedType)
    : bookingOptions;

  filtered.forEach(item => {
    const option = document.createElement("option");
    option.value = item.name;
    option.textContent = item.name;

    if (selectedName && selectedName === item.name) {
      option.selected = true;
    }

    packageNameSelect.appendChild(option);
  });
}

const urlParams = new URLSearchParams(window.location.search);
const typeFromUrl = urlParams.get("type") || "";
const packageFromUrl = urlParams.get("package") || "";

if (typeFromUrl) {
  serviceTypeSelect.value = typeFromUrl;
}

populatePackageOptions(typeFromUrl, packageFromUrl);

serviceTypeSelect.addEventListener("change", (e) => {
  populatePackageOptions(e.target.value, "");
});

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  formStatus.textContent = "";
  formStatus.className = "form-status";

  const formData = {
    full_name: document.getElementById("fullName").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    service_type: document.getElementById("serviceType").value,
    package_name: document.getElementById("packageName").value,
    travel_date: document.getElementById("travelDate").value,
    pickup_location: document.getElementById("pickupLocation").value.trim(),
    adults: Number(document.getElementById("adults").value || 0),
    children: Number(document.getElementById("children").value || 0),
    message: document.getElementById("message").value.trim()
  };

  if (!formData.full_name || !formData.email || !formData.phone || !formData.service_type || !formData.package_name) {
    formStatus.textContent = "Please complete the required fields before sending your booking request.";
    formStatus.classList.add("error");
    return;
  }

  try {
    /*
      TEMPORARY DEMO MODE
      Later we will replace this with Supabase insert
    */
    console.log("Booking submitted:", formData);

    formStatus.textContent = "Your booking request has been sent successfully. Our team will contact you soon.";
    formStatus.classList.add("success");
    bookingForm.reset();
    populatePackageOptions("", "");
  } catch (error) {
    console.error(error);
    formStatus.textContent = "Something went wrong while sending your booking request. Please try again.";
    formStatus.classList.add("error");
  }
});