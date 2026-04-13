const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const toggleAgentFormBtn = document.getElementById("toggleAgentFormBtn");
const closeAgentFormBtn = document.getElementById("closeAgentFormBtn");
const agentFormWrap = document.getElementById("agentFormWrap");
const agentApplicationForm = document.getElementById("agentApplicationForm");
const agentFormMessage = document.getElementById("agentFormMessage");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");

    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    menuToggle.textContent = mainNav.classList.contains("active") ? "✕" : "☰";
  });

  const navLinks = mainNav.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        mainNav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      mainNav.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    }
  });
}

function openAgentForm() {
  if (!agentFormWrap) return;
  agentFormWrap.classList.add("active");
  agentFormWrap.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeAgentForm() {
  if (!agentFormWrap) return;
  agentFormWrap.classList.remove("active");
}

if (toggleAgentFormBtn) {
  toggleAgentFormBtn.addEventListener("click", openAgentForm);
}

if (closeAgentFormBtn) {
  closeAgentFormBtn.addEventListener("click", closeAgentForm);
}

if (agentApplicationForm) {
  agentApplicationForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (typeof supabaseClient === "undefined") {
      agentFormMessage.textContent = "Supabase client is not available.";
      agentFormMessage.className = "agent-form-message error";
      return;
    }

    const submitBtn = agentApplicationForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    const payload = {
      full_name: document.getElementById("agentFullName")?.value.trim() || "",
      email: document.getElementById("agentEmail")?.value.trim() || "",
      phone: document.getElementById("agentPhone")?.value.trim() || "",
      country: document.getElementById("agentCountry")?.value.trim() || null,
      company_name: document.getElementById("agentCompany")?.value.trim() || null,
      experience: document.getElementById("agentExperience")?.value.trim() || null,
      message: document.getElementById("agentMessage")?.value.trim() || null
    };

    if (!payload.full_name || !payload.email || !payload.phone) {
      agentFormMessage.textContent = "Please complete full name, email, and phone.";
      agentFormMessage.className = "agent-form-message error";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    agentFormMessage.textContent = "";
    agentFormMessage.className = "agent-form-message";

    try {
      const { error } = await supabaseClient
        .from("agent_applications")
        .insert([payload]);

      if (error) throw error;

      agentFormMessage.textContent = "Your application has been sent successfully. Our team will contact you soon.";
      agentFormMessage.className = "agent-form-message success";
      agentApplicationForm.reset();
    } catch (error) {
      console.error("Agent application failed:", error);
      agentFormMessage.textContent = `Application failed: ${error.message}`;
      agentFormMessage.className = "agent-form-message error";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}