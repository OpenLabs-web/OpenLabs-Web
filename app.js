document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector("[data-menu]");
  const nav = document.querySelector("[data-nav]");
  const mobileQuery = window.matchMedia("(max-width: 680px)");

  const syncMenu = () => {
    if (!nav || !menu) return;
    if (!mobileQuery.matches) {
      nav.classList.remove("open");
      nav.removeAttribute("aria-hidden");
      menu.setAttribute("aria-expanded", "false");
      menu.querySelector(".sr-only").textContent = "Open navigation";
      return;
    }
    nav.setAttribute("aria-hidden", String(!nav.classList.contains("open")));
  };

  if (menu && nav) {
    syncMenu();
    if (mobileQuery.addEventListener) mobileQuery.addEventListener("change", syncMenu);
    else if (mobileQuery.addListener) mobileQuery.addListener(syncMenu);

    menu.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(isOpen));
      menu.querySelector(".sr-only").textContent = isOpen ? "Close navigation" : "Open navigation";
      nav.setAttribute("aria-hidden", String(!isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
      menu.querySelector(".sr-only").textContent = "Open navigation";
      nav.setAttribute("aria-hidden", String(mobileQuery.matches));
    }));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
        menu.querySelector(".sr-only").textContent = "Open navigation";
        nav.setAttribute("aria-hidden", "true");
        menu.focus();
      }
    });
  }

  const root = document.documentElement;
  const settings = document.querySelector(".settings");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const themeLabel = document.querySelector("[data-theme-label]");
  let savedTheme = "";
  try { savedTheme = localStorage.getItem("openstudio-theme") || ""; } catch (error) { /* Storage may be disabled. */ }

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (themeToggle) {
      const light = theme === "light";
      themeToggle.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
      themeToggle.setAttribute("aria-pressed", String(light));
    }
    if (themeLabel) themeLabel.textContent = theme === "light" ? "Switch to dark theme" : "Switch to light theme";
  };

  applyTheme(savedTheme === "light" ? "light" : "dark");
  if (themeToggle) themeToggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    try { localStorage.setItem("openstudio-theme", nextTheme); } catch (error) { /* Theme still works for this page. */ }
  });

  if (settings) {
    const summary = settings.querySelector("summary");
    document.addEventListener("click", (event) => { if (!settings.contains(event.target)) settings.open = false; });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && settings.open) { settings.open = false; summary.focus(); }
    });
  }

  document.querySelectorAll("[data-year]").forEach((node) => { node.textContent = new Date().getFullYear(); });

  const form = document.querySelector("[data-demo-form]");
  if (form) form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    const subject = encodeURIComponent("OpenStudio website message");
    const body = encodeURIComponent(`From: ${name}\nReply to: ${email}\n\n${message}`);
    window.location.href = `mailto:nikethsreeraj2010@gmail.com?subject=${subject}&body=${body}`;
  });
});


// Subtle cursor glow for mouse and trackpad users.
const pointerFine = window.matchMedia("(hover: hover) and (pointer: fine)");
const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (pointerFine.matches && motionAllowed) {
  document.documentElement.classList.add("cursor-glow-enabled");
  window.addEventListener("pointermove", (event) => {
    document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
  }, { passive: true });
}

// A softly eased cursor ring for mouse and trackpad devices.
if (pointerFine.matches && motionAllowed) {
  const aura = document.createElement("span");
  aura.className = "cursor-aura";
  aura.setAttribute("aria-hidden", "true");
  document.body.append(aura);
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let animationFrame = 0;

  const easeAura = () => {
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;
    aura.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
    if (Math.abs(targetX - currentX) > 0.4 || Math.abs(targetY - currentY) > 0.4) {
      animationFrame = window.requestAnimationFrame(easeAura);
    } else {
      animationFrame = 0;
    }
  };

  window.addEventListener("pointermove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    aura.classList.add("is-visible");
    if (!animationFrame) animationFrame = window.requestAnimationFrame(easeAura);
  }, { passive: true });
  document.documentElement.addEventListener("pointerleave", () => aura.classList.remove("is-visible"));
}

document.addEventListener("DOMContentLoaded", () => {
  const recommendationForm = document.querySelector("[data-recommendation-form]");
  if (!recommendationForm) return;
  recommendationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!recommendationForm.reportValidity()) return;
    const name = recommendationForm.elements.name.value.trim();
    const email = recommendationForm.elements.email.value.trim();
    const message = recommendationForm.elements.message.value.trim();
    const subject = encodeURIComponent("OpenOS / Openix recommendation");
    const body = encodeURIComponent(`From: ${name}\nReply to: ${email}\n\n${message}`);
    window.location.href = `mailto:nikethsreeraj2010@gmail.com?subject=${subject}&body=${body}`;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const betaToggle = document.querySelector("[data-beta-toggle]");
  const betaDetails = document.querySelector("[data-beta-details]");
  if (!betaToggle || !betaDetails) return;

  betaToggle.addEventListener("click", () => {
    const isOpen = betaToggle.getAttribute("aria-expanded") === "true";
    betaToggle.setAttribute("aria-expanded", String(!isOpen));
    betaDetails.hidden = isOpen;
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && betaToggle.getAttribute("aria-expanded") === "true") {
      betaToggle.setAttribute("aria-expanded", "false");
      betaDetails.hidden = true;
      betaToggle.focus();
    }
  });
});
