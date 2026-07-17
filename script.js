/* =========================================================
   WasteManage LK — Shared Script
   Purpose: Handles the district search box behavior on the
   homepage and small interactive touches (keyboard support
   for the "Enter" key, simple input validation).
   The Quick Action cards themselves are plain <a href="..">
   links in the HTML, so they work even with JavaScript
   disabled — this file only adds extra convenience on top.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  // ---- Collection schedule search ----
  const searchForm = document.getElementById("schedule-search-form");
  const searchInput = document.getElementById("district-input");

  if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault(); // stop the page from reloading

      const district = searchInput.value.trim();

      if (district === "") {
        // Simple validation: let the user know a district is required
        searchInput.focus();
        searchInput.style.borderColor = "#e0483f"; // flash red border on error
        setTimeout(() => {
          searchInput.style.borderColor = ""; // reset back to default styling
        }, 1200);
        return;
      }

      // Redirect to the Collection Schedule page, passing the
      // district as a URL query parameter (?district=Colombo)
      // so that page can read it and show matching results.
      window.location.href =
        "collection-schedule.html?district=" + encodeURIComponent(district);
    });

    // ---- Dark mode toggle ----
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Restore saved preference on page load
    if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark-mode");
      if (themeToggle) themeToggle.textContent = "☀️";
    }

    if (themeToggle) {
      themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        const isDark = body.classList.contains("dark-mode");
        themeToggle.textContent = isDark ? "☀️" : "🌙";
        localStorage.setItem("theme", isDark ? "dark" : "light");
      });
    }
  }

  // ---- Quick Action / Waste-type card keyboard accessibility ----
  // Cards are already <a> tags (naturally focusable + clickable),
  // but we also make sure pressing "Enter" or "Space" triggers
  // navigation when a card is reached via keyboard (Tab key),
  // matching native link behavior for accessibility.
  const interactiveCards = document.querySelectorAll(
    ".action-card, .coverage-card",
  );
  interactiveCards.forEach((card) => {
    card.addEventListener("keydown", function (e) {
      if ((e.key === "Enter" || e.key === " ") && card.tagName === "A") {
        // Default anchor behavior already handles Enter;
        // this is just an explicit safeguard for consistency.
        card.click();
      }
    });
  });
});
