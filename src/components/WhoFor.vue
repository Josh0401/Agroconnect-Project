<template>
  <section
    class="who-is-AgroConnect-for py-5"
    style="background-color: #e7f7f4"
  >
    <div class="container">
      <!-- Heading and Subheading -->
      <div class="text-center mb-5">
        <h2 class="fw-bold">Who is AgroConnect For?</h2>
        <p class="lead">
          AgroConnect serves individuals, companies, and enterprises, offering
          simplified, tailored trade.
        </p>
      </div>

      <!-- Cards Row -->
      <div class="row justify-content-center">
        <!-- Card 1: Individuals -->
        <div
          class="col-md-6 col-lg-4 mb-4"
          data-aos="fade-up"
          data-aos-delay="0"
        >
          <div
            class="card h-100 border-0 shadow-sm rounded-3 bg-success text-white"
          >
            <div class="card-body d-flex flex-column justify-content-center">
              <div class="icon mb-3">
                <img src="../assets/white-person.png" alt="" />
              </div>
              <h4 class="card-title mb-3">Individuals</h4>
              <p class="card-text">
                Whether you’re a consumer seeking quality products or a
                small-scale farmer, AgroConnect is your gateway to a vibrant
                agri-led market.
              </p>
              <router-link to="/individual">
                <button
                  class="btn btn-primary get-started-btn rounded-pill py-2"
                >
                  Learn More <i class="bi bi-arrow-right me-2"></i>
                </button>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Card 2: Companies -->
        <div
          class="col-md-6 col-lg-4 mb-4"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div
            class="card h-100 border-0 shadow-sm rounded-3 bg-success text-white"
          >
            <div class="card-body d-flex flex-column justify-content-center">
              <div class="icon mb-3">
                <img src="../assets/white-person.png" alt="" />
              </div>
              <h4 class="card-title mb-3">Companies</h4>
              <p class="card-text">
                Focused on the food processing or agri-related sector?
                AgroConnect is an invaluable partner in sourcing top-quality
                produce and rapidly selling agri-related products.
              </p>
              <router-link to="/companies">
                <button
                  class="btn btn-primary get-started-btn rounded-pill py-2"
                >
                  Learn More <i class="bi bi-arrow-right me-2"></i>
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- End Cards Row -->
    </div>
  </section>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: "WhoIsAgroConnectForSection",
  mounted() {
    // Initialize AOS for scroll-based animations
    AOS.init({
      duration: 800, // animation duration in ms
      once: true, // whether animation should happen only once
    });
  },
};
</script>

<style scoped>
.get-started-btn {
  background-color: #198754; /* or your desired brand color */
  border: none;
}
.card-title {
  font-weight: 600;
}
.card-text {
  font-size: 1rem;
}
</style>
