import Translator from "./translator.js";

(function() {
  "use strict";

  var translator = new Translator();
  
  translator.load();

  function togglePrint() {
    window.print();
  }

  function toggleMenu(selector) {
    var menu = document.querySelector(selector);

    if (menu.hasAttribute("hidden")) {
      menu.removeAttribute("hidden");
    } else {
      menu.setAttribute("hidden", true);
    }
  }

  function handleMenuClose(evt) {
    if (evt.type === "keydown") {
      if (evt.key !== "Escape") {
        return;
      }
    } else if (evt.type === "click") {
      if (evt.target.dataset.action === "toggle-menu" || evt.target.closest(".menu")) {
        return;
      }
    }

    var menus = document.querySelectorAll('[role="menu"]');

    menus.forEach((menu) => {
      menu.setAttribute("hidden", true);
    });
  }

  function handleFormClick(evt) {
    var input = evt.target;

    if (input.tagName === "INPUT" && input.name === "lang") {
      translator.load(input.value);

      localStorage.setItem("language", input.value);
    }
  }

  function handleNavigationClick(evt) {
    if (evt.target.dataset.action === "toggle-menu") {
      toggleMenu(evt.target.dataset.target);
    } else if (evt.target.dataset.action === "toggle-print") {
      togglePrint();
    }
  }

  document.querySelector('[data-action="form"]').addEventListener("click", handleFormClick);
  document.querySelector("nav").addEventListener("click", handleNavigationClick);
  document.body.addEventListener("click", handleMenuClose);
  window.addEventListener("keydown", handleMenuClose);
})();