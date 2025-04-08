<template>
  <nav class="navbar navbar-expand-lg sticky-top bg-white shadow-sm py-3">
    <div class="container">
      <a class="navbar-brand d-flex align-items-center" href="#">
        <img src="/logo.png" alt="AgroEase Logo" height="40" class="me-2" />
        <span class="fw-bold">Agroconnect</span>
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
            <a class="nav-link active fw-bold" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About Us</a>
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
              <li><a class="dropdown-item" href="#">Service 1</a></li>
              <li><a class="dropdown-item" href="#">Service 2</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">FAQ's</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Contact Support</a>
          </li>
        </ul>
        <div class="d-flex align-items-center">
          <a href="#" class="text-dark me-3 fw-bold">Login</a>
          <a href="#" class="btn btn-success rounded-pill px-4">Get Started</a>
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
.navbar-nav .nav-link {
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
}
.navbar-nav .nav-link:hover,
.navbar-nav .nav-link.active {
  color: black;
}
</style>
