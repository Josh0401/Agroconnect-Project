<template>
  <section class="why-choose-us py-5">
    <div class="container">
      <!-- Heading & Subheading -->
      <div class="text-center mb-5" data-aos="fade-up">
        <h2 class="fw-bold">Why Choose Us?</h2>
        <p class="lead">
          Transform your trade with AgroConnect— where efficiency meets
          excellence in agricultural commerce.
        </p>
      </div>

      <div class="row align-items-center">
        <!-- Left: Image(s) -->
        <div class="col-md-6 mb-4 text-center" data-aos="fade-right">
          <!-- Replace with your actual image(s) -->
          <img
            src="../assets/why-us.avif"
            alt="Why Choose Us"
            class="img-fluid rounded"
          />
        </div>

        <!-- Right: 4 Cards -->
        <div class="col-md-6" data-aos="fade-left">
          <div class="row row-cols-1 row-cols-md-2 g-4">
            <!-- Card 1 -->
            <div class="col">
              <div class="card border-0 h-100">
                <div class="card-body">
                  <h5 class="card-title fw-bold">Unmatched Convenience</h5>
                  <p class="card-text">
                    Our platform simplifies buying and selling, making it
                    convenient for everyone involved. From the comfort of your
                    device, access a wide range of agricultural products and
                    services.
                  </p>
                </div>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="col">
              <div class="card border-0 h-100">
                <div class="card-body">
                  <h5 class="card-title fw-bold">Sustainable Agriculture</h5>
                  <p class="card-text">
                    We are committed to sustainable agricultural practices.
                    AgroConnect promotes methods that reduce waste and supports
                    responsible farming, ensuring a sustainable future for
                    agriculture.
                  </p>
                </div>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="col">
              <div class="card border-0 h-100">
                <div class="card-body">
                  <h5 class="card-title fw-bold">Empowering Agriculture</h5>
                  <p class="card-text">
                    Empowering local farmers and businesses is core to our
                    mission. AgroConnect provides the tools and exposure needed
                    to thrive in today’s competitive market.
                  </p>
                </div>
              </div>
            </div>

            <!-- Card 4 -->
            <div class="col">
              <div class="card border-0 h-100">
                <div class="card-body">
                  <h5 class="card-title fw-bold">Support and Guidance</h5>
                  <p class="card-text">
                    From continuous support and guidance to a smooth and
                    successful experience for all users, we’re here to help you
                    every step of the way.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- End row of cards -->
        </div>
        <!-- End right col -->
      </div>
      <!-- End row -->
    </div>
    <!-- End container -->
  </section>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: "WhyChooseUs",
  mounted() {
    // Initialize AOS for scroll-based animations
    AOS.init({
      duration: 800, // animation duration in ms
      once: true, // run animation only once
    });
  },
};
</script>

<style scoped>
/* Basic styling—adjust as needed */

.why-choose-us {
  background-color: #ffffff; /* or your preferred background color */
}

.card-title {
  color: #198754; /* example brand color */
}

.lead {
  color: #555; /* subtle text color */
}
</style>
