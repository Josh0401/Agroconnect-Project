<template>
  <section class="hero d-flex align-items-center">
    <div class="container">
      <div class="row">
        <div class="col-md-6 hero-text text-white">
          <h1>Empowering Individuals in the Global Agri-Market</h1>
          <p>
            Whether you’re a small-scale farmer, a home-based food processor, or
            an agri-enthusiast, AgroConnect connects you with a vibrant digital
            marketplace. Our platform simplifies the way you buy, sell, and
            learn about agri-produce. Experience the ease of digital agri-trade
            tailored for your individual needs.
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
</template>

<script>
export default {
  name: "HeroSection",
};
</script>

<style scoped>
.hero {
  min-height: 60vh;
  background: url("../assets/New.png") no-repeat center center / cover;
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
.btn:hover {
  background-color: #fff;
  color: #198754;
}
</style>
