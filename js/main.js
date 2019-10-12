(function() {
  "use strict";

  var menu = document.getElementById('menu');

  function handlePrintClick() {
    window.print();
  }

  function handleMenuClick() {
    if (menu.hasAttribute("hidden")) {
      menu.removeAttribute("hidden");
    } else {
      menu.setAttribute("hidden", true);
    }
  }

  function handleMenuClose(evt) {
    if (evt.target.dataset.action === "toggle-menu") {
      return;
    } else if (!evt.target.closest("#menu") && !menu.hasAttribute("hidden")) {
      menu.setAttribute("hidden", true);
    }
  }

  function handleKeyDown(evt) {
    if (menu.hasAttribute("hidden")) {
      return;
    } else if (evt.key === "Escape") {
      menu.setAttribute("hidden", true);
    }
  }

  document.querySelector('[data-action="toggle-print"]').addEventListener("click", handlePrintClick);
  document.querySelector('[data-action="toggle-menu"]').addEventListener("click", handleMenuClick);
  document.body.addEventListener("click", handleMenuClose);
  window.addEventListener("keydown", handleKeyDown);
})();