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
          <router-link
            to="/"
            class="inline-block text-gray-700 hover:text-blue-500"
          >
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
              <path
                d="M0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8zm1.017 0a6.982 6.982 0 0 1 .696-3.032A12.366 12.366 0 0 0 4 8a12.366 12.366 0 0 0-2.287 3.032A6.982 6.982 0 0 1 1.017 8zm2.1 3.808A10.863 10.863 0 0 1 5.06 8a10.863 10.863 0 0 1-1.943-3.808A6.966 6.966 0 0 1 6.528 2.3c-.243.425-.45.96-.612 1.6a13.694 13.694 0 0 0-.393 2.306h1.64V4.383c0-.5.09-.871.267-1.117.179-.246.432-.37.765-.37.316 0 .569.124.747.37.179.246.27.617.27 1.117v1.823h1.64a13.694 13.694 0 0 0-.393-2.306c-.162-.64-.37-1.175-.612-1.6a6.966 6.966 0 0 1 3.433 1.892A10.863 10.863 0 0 1 10.94 8a10.863 10.863 0 0 1 1.943 3.808 6.966 6.966 0 0 1-3.433 1.892c.243-.425.45-.96.612-1.6.162-.64.27-1.364.393-2.306H8.528v1.823c0 .5-.09.871-.267 1.117-.179.246-.432.37-.765.37a.874.874 0 0 1-.747-.37c-.179-.246-.27-.617-.27-1.117V9.694H4.645c.123.942.23 1.666.393 2.306.162.64.37 1.175.612 1.6a6.966 6.966 0 0 1-3.433-1.892z"
              />
            </svg>
          </router-link>
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
