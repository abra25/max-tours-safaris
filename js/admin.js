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

const adminUser = localStorage.getItem("max_admin_user") || "@maxtours";
adminUserText.textContent = adminUser;

function openSection(sectionId) {
  pageSections.forEach((section) => {
    section.classList.toggle("active", section.id === sectionId);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.target === sectionId);
  });

  sidebar.classList.remove("active");
  sidebarBackdrop.classList.remove("active");
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
  window.location.href = "admin-login.html";
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

lucide.createIcons();