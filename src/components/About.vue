<template>
  <section class="about-AgroConnect-section py-5">
    <div class="container">
      <div class="row align-items-center">
        <!-- Left side: Heading & Paragraph -->
        <div class="col-md-6 mb-4" data-aos="fade-right">
          <h2 class="fw-bold">About AgroConnect</h2>
          <p class="mt-3">
            AgroConnect is pioneering the digital transformation of agriculture.
            We are more than just a marketplace. We are a catalyst for change,
            bringing innovative solutions to the agri-business sector. Our
            platform is designed to digitize the trade of agri-produce and
            agro-allied products, fostering transparent and fair trade practices
            that link sellers and buyers with ease.
          </p>
        </div>

        <!-- Right side: Image -->
        <div class="col-md-6 mb-4 text-center" data-aos="fade-left">
          <img
            src="../assets/about-agro.avif"
            alt="About AgroConnect"
            class="img-fluid rounded"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: "AboutAgroConnectSection",
  mounted() {
    AOS.init({
      duration: 800, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once
    });
  },
};
</script>

<style scoped>
.about-AgroConnect-section {
  background-color: #ffffff; /* or any preferred background */
}
</style>
