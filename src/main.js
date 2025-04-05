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

const app = createApp(App);
const pinia = createPinia(); // Create a Pinia instance
app.use(pinia); // Use Pinia in the Vue app

app.use(router);
app.mount("#app");
app.component("FooterTag", FooterTag);
app.component("HeaderTag", HeaderTag);
