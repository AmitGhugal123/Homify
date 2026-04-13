(function () {
  const root = document.documentElement;
  const body = document.body;
  const navbar = document.querySelector("[data-navbar]");
  const darkToggle = document.querySelector("[data-theme-toggle]");
  const backToTop = document.querySelector("[data-back-to-top]");

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("homify-theme", theme);

    if (darkToggle) {
      const icon = darkToggle.querySelector("i");
      const label = darkToggle.querySelector("[data-theme-label]");
      const isDark = theme === "dark";

      darkToggle.setAttribute("aria-pressed", String(isDark));
      if (icon) {
        icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
      }
      if (label) {
        label.textContent = isDark ? "Light mode" : "Dark mode";
      }
    }
  }

  function initTheme() {
    const storedTheme = localStorage.getItem("homify-theme");
    const initialTheme = storedTheme || "light";
    setTheme(initialTheme);
  }

  function initScrollUi() {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 12;

      if (navbar) {
        navbar.classList.toggle("is-scrolled", isScrolled);
      }

      if (backToTop) {
        backToTop.classList.toggle("is-visible", window.scrollY > 420);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  function initFadeUps() {
    const items = document.querySelectorAll(".fade-up");
    if (!items.length || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((item) => observer.observe(item));
  }

  function initValidation() {
    const forms = document.querySelectorAll(".needs-validation");
    forms.forEach((form) => {
      form.addEventListener("submit", (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      });
    });
  }

  function initAutoDismissAlerts() {
    document.querySelectorAll("[data-auto-dismiss]").forEach((alert) => {
      const timeout = Number(alert.getAttribute("data-auto-dismiss")) || 5000;
      window.setTimeout(() => {
        if (!alert.isConnected) return;
        if (window.bootstrap?.Alert) {
          const instance = bootstrap.Alert.getOrCreateInstance(alert);
          instance.close();
        } else {
          alert.remove();
        }
      }, timeout);
    });
  }

  function initPasswordToggles() {
    document.querySelectorAll("[data-password-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-password-toggle");
        const input = document.getElementById(targetId);
        if (!input) return;

        const reveal = input.type === "password";
        input.type = reveal ? "text" : "password";

        const icon = button.querySelector("i");
        if (icon) {
          icon.className = reveal ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
        }
      });
    });
  }

  function initListingFilters() {
    const form = document.querySelector("[data-listing-filters]");
    if (!form) return;

    const minInput = form.querySelector("[data-price-min]");
    const maxInput = form.querySelector("[data-price-max]");
    const clearButton = form.querySelector("[data-clear-filters]");

    const syncRangeOrder = () => {
      if (!minInput || !maxInput) return;

      if (Number(minInput.value) > Number(maxInput.value)) {
        const currentMin = minInput.value;
        minInput.value = maxInput.value;
        maxInput.value = currentMin;
      }
    };

    [minInput, maxInput].forEach((input) => {
      if (input) {
        input.addEventListener("change", syncRangeOrder);
      }
    });

    if (clearButton) {
      clearButton.addEventListener("click", () => {
        form.reset();
        if (minInput) minInput.value = "";
        if (maxInput) maxInput.value = "";
      });
    }
  }

  function initBackToTop() {
    if (!backToTop) return;
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initScrollUi();
    initFadeUps();
    initValidation();
    initAutoDismissAlerts();
    initPasswordToggles();
    initListingFilters();
    initBackToTop();

    if (darkToggle) {
      darkToggle.addEventListener("click", () => {
        const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        setTheme(nextTheme);
      });
    }

    body.classList.add("app-ready");
  });
})();
