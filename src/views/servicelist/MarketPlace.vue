<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero d-flex align-items-center">
      <div class="container">
        <div class="row">
          <div class="col-md-6 hero-text text-white">
            <h1>AgroConnect Marketplace</h1>
            <p>
              Where our passion for agriculture meets a commitment to
              sustainable food system practices. We are more than just a
              company; we are a community of dedicated individuals who believe
              in the transformative power of agriculture to feed the world,
              protect the environment, and build a brighter future.
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

    <!-- New Products -->
    <section class="benefits py-5">
      <div class="container">
        <h2 class="text-center mb-4">Marketplace</h2>
        <p class="text-center mb-5">
          Make the smart choice for your agribusiness—choose AgroConnect and
          <br />
          embrace the future of agriculture today.
        </p>
      </div>
    </section>
    <section class="newproduct">
      <div class="container">
        <div class="prod">
          <h3>New Products</h3>
        </div>
        <div class="container my-5">
          <div
            class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4"
          >
            <!-- Card 1 -->
            <div class="col">
              <div class="card h-100">
                <img
                  src="../../assets/hybrid-coconut.jpg"
                  class="card-img-top"
                  alt="Hybrid Coconut Seedlings"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Hybrid Coconut Seedlings</h5>
                  <p class="card-text">Rs10</p>
                </div>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="col">
              <div class="card h-100">
                <img
                  src="../../assets/hybrid_tenera_oil_palm.jpg"
                  class="card-img-top"
                  alt="Tenera Oil Palm Seedlings"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Hybrid Tenera Oil Palm Seedlings</h5>
                  <p class="card-text">Rs15</p>
                </div>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="col">
              <div class="card h-100">
                <img
                  src="../../assets/tenera_oil_palm_sprouted_seeds.jpg"
                  class="card-img-top"
                  alt="Tenera Oil Palm Sprouted Seeds"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Tenera Oil Palm Sprouted Seeds</h5>
                  <p class="card-text">Rs20</p>
                </div>
              </div>
            </div>

            <!-- Card 4 -->
            <div class="col">
              <div class="card h-100">
                <img
                  src="../../assets/cowpea.jpg"
                  class="card-img-top"
                  alt="Black-Eyed Pea (Cowpea)"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Black-Eyed Pea (Cowpea)</h5>
                  <p class="card-text">Rs25</p>
                </div>
              </div>
            </div>

            <!-- Card 5 -->
            <div class="col">
              <div class="card h-100">
                <img
                  src="../../assets/white-maize.jpg"
                  class="card-img-top"
                  alt="White Maize"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">White Maize</h5>
                  <p class="card-text">Rs30</p>
                </div>
              </div>
            </div>

            <!-- Card 6 -->
            <div class="col">
              <div class="card h-100">
                <img
                  src="../../assets/white-beans.jpg"
                  class="card-img-top"
                  alt="White Beans"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">White Beans</h5>
                  <p class="card-text">Rs35</p>
                </div>
              </div>
            </div>

            <!-- Card 7 -->
            <div class="col">
              <div class="card h-100">
                <img
                  src="../../assets/cassava.jpeg"
                  class="card-img-top"
                  alt="Cassava"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Cassava</h5>
                  <p class="card-text">Rs40</p>
                </div>
              </div>
            </div>

            <!-- Card 8 -->
            <div class="col">
              <div class="card h-100">
                <img
                  src="../../assets/mung-beans.jpg"
                  class="card-img-top"
                  alt="Mung Beans"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Mung Beans</h5>
                  <p class="card-text">Rs45</p>
                </div>
              </div>
            </div>

            <!-- Card 9 -->
            <div class="col">
              <div class="card h-100">
                <img
                  src="../../assets/red-kidney-beans.jpg"
                  class="card-img-top"
                  alt="Red kidney Beans"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Red kidney Beans</h5>
                  <p class="card-text">Rs50</p>
                </div>
              </div>
            </div>

            <!-- Card 10 -->
            <div class="col">
              <div class="card h-100">
                <img
                  src="../../assets/soursop-tea.jpg"
                  class="card-img-top"
                  alt="Soursop Tea with Ginger"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Soursop Tea with Ginger</h5>
                  <p class="card-text">Rs55</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How to Get Started Section -->
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
.card-img-top {
  object-fit: cover;
  height: 200px;
}
.landing-page {
  width: 100%;
  font-family: Arial, sans-serif;
}

/* Hero Section */
.hero {
  min-height: 60vh;
  background: url("../../assets/market.png") no-repeat center center / cover;
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
