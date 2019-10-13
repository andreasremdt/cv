import Translator from "./translator.js";

(function() {
  "use strict";

  var menu = document.getElementById('menu');
  var translator = new Translator();
  
  translator.load();

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
    }
    
    if (!evt.target.closest("#menu") && !menu.hasAttribute("hidden")) {
      menu.setAttribute("hidden", true);
    }
  }

  function handleKeyDown(evt) {
    if (!menu.hasAttribute("hidden") && evt.key === "Escape") {
      menu.setAttribute("hidden", true);
    }
  }

  function handleFormClick(evt) {
    var input = evt.target;

    if (input.tagName === "INPUT" && input.name === "lang") {
      translator.load(input.value);

      localStorage.setItem("language", input.value);
    }
  }

  document.querySelector('[data-action="toggle-print"]').addEventListener("click", handlePrintClick);
  document.querySelector('[data-action="toggle-menu"]').addEventListener("click", handleMenuClick);
  document.querySelector('[data-action="form"]').addEventListener("click", handleFormClick);
  document.body.addEventListener("click", handleMenuClose);
  window.addEventListener("keydown", handleKeyDown);
})();