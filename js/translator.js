"use strict";

class Translator {
  constructor() {
    this._lang = this.getLanguage();
    this._elements = document.querySelectorAll("[data-i18n]");
  }

  getLanguage() {
    if (localStorage.getItem("language")) {
      return localStorage.getItem("language");
    }
    
    var lang = navigator.languages ? navigator.languages[0] : navigator.language;
    
    if (/\w{2}-\w{2}/i.test(lang)) {
      return lang.split("-")[0];
    }
    
    return lang;
  }

  load(lang = null) {
    if (lang) {
      this._lang = lang;
    }
  
    import(`../i18n/${this._lang}.js`).then((resources) => {
      this.translate(resources.default);
      this.toggleInput();
      this.toggleLangTag();
    }).catch(() => {
      console.error(`Could not load "${this._lang}.js". Please make sure that the path is correct.`);
    });
  }

  toggleLangTag() {
    if (document.documentElement.lang !== this._lang) {
      document.documentElement.lang = this._lang;
    }
  }
  
  translate(translation) {
    function replace(element) {
      var text = element.dataset.i18n.split('.').reduce((obj, i) => obj[i], translation);
  
      if (text) {
        element.innerHTML = text;
      }
    }
  
    this._elements.forEach(replace);
  }

  toggleInput() {
    document.querySelector(`input[type="radio"][value="${this._lang}"]`).checked = true;
  }
}

export default Translator;