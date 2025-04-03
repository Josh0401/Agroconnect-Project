<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero d-flex align-items-center">
      <div class="container">
        <div class="row">
          <div class="col-md-6 hero-text text-white">
            <h1>Elevating Companies in the Digital Agri-Sphere</h1>
            <p>
              AgroConnect is where companies find their stride in the
              agricultural landscape. From sourcing premium agri-produce to
              connecting with reliable partners, our platform is designed for
              corporate efficiency and growth. We provide companies with the
              tools to navigate the agri-marketplace effortlessly. Take your
              company to the next level
            </p>
            <router-link to="/signup">
              <button class="btn btn-primary get-started-btn rounded-pill py-2">
                Get Started
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="benefits py-5">
      <div class="container">
        <h2 class="text-center mb-4">Benefits</h2>
        <p class="text-center mb-5">
          Experience unparalleled advantages for your company in the
          agri-sector.
        </p>

        <div class="row align-items-center">
          <!-- Left side images -->
          <div class="col-md-4 mb-4 text-center">
            <!-- Fade-in effect: data-aos="fade-up" -->
            <img
              data-aos="fade-up"
              src="../../assets/company.png"
              alt="Benefit 1"
              class="img-fluid mb-4"
            />
          </div>

          <!-- Right side content -->
          <div class="col-md-8">
            <div data-aos="fade-up" class="mb-4">
              <h3>Streamlined Sourcing Solutions</h3>
              <p>
                Access a comprehensive digital marketplace for all your
                agri-needs.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200" class="mb-4">
              <h3>Enhanced Market Visibility</h3>
              <p>
                Increase your brand’s presence and reach in the the local and
                international agri-markets.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="400">
              <h3>Robust Business Connections</h3>
              <p>
                Forge valuable partnerships and network with industry leaders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How to Get Started Section -->
    <section class="how-to-get-started py-5">
      <div class="container">
        <div class="row align-items-center">
          <!-- Left side: heading, text, and button -->
          <div class="col-md-6 mb-4" data-aos="fade-up">
            <h2>How to Get Started</h2>
            <p>Begin your AgroConnect journey in four simple steps:</p>
            <button class="btn btn-primary get-started-btn rounded-pill py-2">
              Get Started
            </button>
          </div>

          <!-- Right side: single image -->
          <div
            class="col-md-6 mb-4 text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <!-- Replace the src with your own image -->
            <img
              src="../../assets/started.avif"
              alt="How to get started"
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: "LandingPage",
  mounted() {
    // Initialize AOS for fade-in effects
    AOS.init({
      duration: 800, // animation duration
      once: true, // whether animation should happen only once
    });
  },
};
</script>

<style scoped>
/* Basic styling — customize as you see fit */

.landing-page {
  width: 100%;
  font-family: Arial, sans-serif;
}

/* Hero Section */
.hero {
  min-height: 60vh;
  background: url("../../assets/companies.png") no-repeat center center / cover;
  padding: 60px 0;
}

.hero-text h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero-text p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.get-started-btn {
  background-color: #198754; /* bootstrap "success" color, or your brand color */
  border: none;
}

/* Benefits Section */
.benefits h2 {
  font-size: 2rem;
  font-weight: bold;
}

.benefits img {
  border-radius: 8px;
}

/* How to Get Started */
.how-to-get-started h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.how-to-get-started p {
  margin-bottom: 1.5rem;
}

.get-started-btn {
  background-color: #198754; /* or your desired brand color */
  border: none;
}

.card {
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.btn:hover {
  background-color: #fff;
  color: #198754;
}
</style>
