<template>
  <nav class="navbar navbar-expand-lg sticky-top bg-white shadow-sm py-3">
    <div class="container">
      <a class="navbar-brand d-flex align-items-center" href="/market">
        <img
          src="../assets/Agroconnect.png"
          alt=""
          height="40"
          class="me-2"
        />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about-us">About Us</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="servicesDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Services
            </a>
            <ul class="dropdown-menu" aria-labelledby="servicesDropdown">
              <router-link class="nav-link" to="/individuals"
                >Individuals</router-link
              >
              <router-link class="nav-link" to="/companies"
                >Companies</router-link
              >
              <router-link class="nav-link" to="/marketplace"
                >Marketplace</router-link
              >
            </ul>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/faq">FAQs</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact-support"
              >Contact Support</router-link
            >
          </li>
        </ul>
        <div class="d-flex align-items-center">
          <router-link class="nav-link me-3" to="/login">Login</router-link>
          <router-link
            class="nav-link me-3 btn btn-success text-white green rounded-pill px-4 py-1"
            to="/signup"
            >Get Started</router-link
          >
          <!-- <a href="#" class="btn btn-success rounded-pill px-4"></a> -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
};
</script>

<style scoped>
.nav-item.dropdown:hover .dropdown-menu {
  display: block;
  margin-top: 0;
}

.navbar-nav .nav-link {
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
}
.navbar-nav .nav-link:hover,
.navbar-nav .nav-link.active {
  color: black;
}
a {
  text-decoration: none;
}
body {
  width: 200% !important;
}
.green {
  background-color: rgb(25, 135, 84);
}
</style>
