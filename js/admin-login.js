const ADMIN_USERNAME = "@maxtours";
const ADMIN_PASSWORD = "admin@Maxtours2026";

const loginForm = document.getElementById("adminLoginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");
const togglePasswordBtn = document.getElementById("togglePassword");

if (localStorage.getItem("max_admin_logged_in") === "true") {
  window.location.href = "admin.html";
}

togglePasswordBtn.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePasswordBtn.innerHTML = isPassword
    ? '<i data-lucide="eye-off"></i>'
    : '<i data-lucide="eye"></i>';
  lucide.createIcons();
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  loginMessage.textContent = "";
  loginMessage.className = "login-message";

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    localStorage.setItem("max_admin_logged_in", "true");
    localStorage.setItem("max_admin_user", username);

    loginMessage.textContent = "Login successful. Redirecting...";
    loginMessage.classList.add("success");

    setTimeout(() => {
      window.location.href = "admin.html";
    }, 700);
  } else {
    loginMessage.textContent = "Invalid username or password.";
    loginMessage.classList.add("error");
  }
});

lucide.createIcons();