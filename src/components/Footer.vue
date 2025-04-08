<template>
  <footer class="bg-white text-dark border-top py-4">
    <!-- Top Row -->
    <div class="container">
      <div class="row align-items-center mb-3">
        <!-- Left: Logo + Tagline -->
        <div class="col-md-4 d-flex align-items-center mb-3 mb-md-0">
          <!-- Logo (replace /logo.png with your own) -->
          <a class="navbar-brand d-flex align-items-center" href="/market">
            <img
              src="../assets/Agroconnect.png"
              alt="AgroEase Logo"
              height="40"
              class="me-2"
            />
          </a>
        </div>

        <!-- Middle: Main Nav -->
        <div class="col-md-4 mb-3 mb-md-0">
          <ul class="nav justify-content-center">
            <li class="nav-item">
              <router-link class="nav-link text-dark px-2 fw-bold" to="/"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link text-dark px-2 fw-bold"
                to="/about-us"
                >About Us</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link text-dark px-2 fw-bold"
                to="/individuals"
                >Services</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-dark px-2 fw-bold" to="/faq"
                >FAQs</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link text-dark px-2 fw-bold"
                to="/contact-support"
                >Contact Support</router-link
              >
            </li>
          </ul>
        </div>

        <!-- Right: Social Icons & Store Badges -->
        <div
          class="col-md-4 d-flex justify-content-md-end justify-content-center"
        >
          <!-- Social Icons (Inline SVG placeholders) -->
          <a href="#" class="me-3 text-dark" aria-label="Facebook">
            <!-- Facebook Icon -->
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
              <path
                d="M8.94 8.94h1.51l.22-1.48H8.94V6.37c0-.43.12-.73.75-.73h.81V4.25A10.9 10.9 0 0 0 8.59 4c-1.05 0-1.76.64-1.76 1.8v1.66H5.78v1.48h1.05v3.88h1.59V8.94z"
              />
            </svg>
          </a>
          <a href="#" class="me-3 text-dark" aria-label="Instagram">
            <!-- Instagram Icon -->
            <svg width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
              <path
                d="M8 5.79A2.21 2.21 0 1 0 10.21 8 2.21 2.21 0 0 0 8 5.79Zm0 3.64A1.43 1.43 0 1 1 9.43 8 1.43 1.43 0 0 1 8 9.43Z"
              />
              <path
                d="M12.6 3.79A2.61 2.61 0 0 0 10 1.2H6A2.61 2.61 0 0 0 3.4 3.79v4.09A2.61 2.61 0 0 0 6 10.49h4a2.61 2.61 0 0 0 2.6-2.61ZM8 10.92A2.92 2.92 0 1 1 10.92 8 2.93 2.93 0 0 1 8 10.92ZM10.66 5.12a.7.7 0 1 1 .7.7.7.7 0 0 1-.7-.7Z"
              />
            </svg>
          </a>
          <a href="#" class="me-3 text-dark" aria-label="LinkedIn">
            <!-- LinkedIn Icon -->
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path
                d="M1.146 1.146a.5.5 0 0 1 .708 0L8 7.293 14.146 1.146a.5.5 0 1 1 .708.708L8.707 8l6.147 6.146a.5.5 0 0 1-.708.708L8 8.707l-6.146 6.147a.5.5 0 1 1-.708-.708L7.293 8 1.146 1.854a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </a>
          <a href="#" class="text-dark" aria-label="Twitter">
            <!-- Twitter Icon -->
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path
                d="M5 15c6 0 9.293-5 9.293-9.293 0-.14 0-.28-.01-.42A6.653 6.653 0 0 0 16 3.127a6.578 6.578 0 0 1-1.889.518A3.301 3.301 0 0 0 15.555.241a6.573 6.573 0 0 1-2.084.797 3.286 3.286 0 0 0-5.595 2.993A9.325 9.325 0 0 1 1.114.597a3.286 3.286 0 0 0 1.017 4.382A3.323 3.323 0 0 1 .64 4.577v.04A3.286 3.286 0 0 0 3.277 8.21a3.203 3.203 0 0 1-.865.115c-.212 0-.418-.02-.62-.058a3.286 3.286 0 0 0 3.067 2.279A6.588 6.588 0 0 1 .78 12.26a6.32 6.32 0 0 1-.78-.045 9.286 9.286 0 0 0 5.034 1.474"
              />
            </svg>
          </a>
        </div>
      </div>
      <!-- Bottom Row -->
      <div class="row">
        <!-- Left: Copyright -->
        <div class="col-md-6 text-md-start text-center mb-2 mb-md-0">
          &copy; 2025 All rights reserved
        </div>

        <!-- Right: Footer Links -->
        <div class="col-md-6 text-md-end text-center">
          <a href="#" class="text-dark me-3">Privacy Policy</a>
          <a href="#" class="text-dark me-3">Terms & Conditions</a>
          <a href="#" class="text-dark me-3">Legal</a>
          <a href="#" class="text-dark">Help</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
footer {
  font-size: 0.95rem;
}
a {
  text-decoration: none;
  color: inherit;
}
</style>
