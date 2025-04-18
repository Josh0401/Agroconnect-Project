import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification"; // Import Toastification for notifications
import "vue-toastification/dist/index.css"; // Import Toastification CSS
import FooterTag from "./components/FooterTag.vue";
import HeaderTag from "./components/HeaderTag.vue";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import { createPinia } from "pinia"; // Import Pinia for state management
import { translations } from "./translations"; // Import translations
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { createI18n } from 'vue-i18n'; // Import vue-i18n

// Initialize the Pinia store
const pinia = createPinia();

// Setup FontAwesome
library.add(fas, far, fab);

// Get user's preferred language from localStorage or default to English
const savedLanguage = localStorage.getItem("userLanguage") || "en";

// Create i18n instance with options
const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: savedLanguage, // Use saved language or default
  fallbackLocale: 'en',
  messages: translations
});

// Create the Vue application instance
const app = createApp(App);

// Configure toast notifications
const toastOptions = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
};

// Register components and plugins
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("FooterTag", FooterTag);
app.component("HeaderTag", HeaderTag);

app.use(pinia);
app.use(router);
app.use(Toast, toastOptions);
app.use(i18n);

// Mount the app
app.mount("#app");