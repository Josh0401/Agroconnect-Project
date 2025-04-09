import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import FooterTag from "./components/FooterTag.vue";
import HeaderTag from "./components/HeaderTag.vue";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import { createPinia } from "pinia"; // Import Pinia for state management
import { createLanguageContext } from './context/LanguageContext';
import { translations } from './translations'; // Import translations
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

const app = createApp(App);
const pinia = createPinia(); // Create a Pinia instance
app.use(pinia); // Use Pinia in the Vue app

// Create language context
createLanguageContext();

// Add global language properties
app.config.globalProperties.$translations = translations;

library.add(fas, far, fab)

// Create a global event bus for language changes using provide/inject pattern
app.provide('setLanguage', (lang) => {
  // Store the language preference
  localStorage.setItem('preferredLanguage', lang);
  
  // Create a custom event that components can listen for
  const event = new CustomEvent('language-changed', { detail: lang });
  window.dispatchEvent(event);
});

// Add global method to get current language
app.config.globalProperties.$getLanguage = () => {
  return localStorage.getItem('preferredLanguage') || 'en';
};

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router);
app.mount("#app");
app.component("FooterTag", FooterTag);
app.component("HeaderTag", HeaderTag);