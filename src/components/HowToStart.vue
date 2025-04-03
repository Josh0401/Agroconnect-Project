<!-- <template>
  <section class="container py-5 text-center">
    <h2 class="mb-4">How to Get Started</h2>
    <div class="row">
      <div class="col-md-3 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Sign Up</h5>
            <p class="card-text">
              Register as a buyer or seller and unlock new opportunities.
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Explore Products</h5>
            <p class="card-text">
              Find what you need or list your products for sale.
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Connect and Transact</h5>
            <p class="card-text">
              Engage in secure transactions and build strong relationships.
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Finalize</h5>
            <p class="card-text">
              Complete the trade cycle with ease and confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HowToStart",
};
</script> -->
<template>
  <section class="how-to-get-started py-5">
    <div class="container">
      <div class="row align-items-center">
        <!-- Left side: heading, text, and button -->
        <div class="col-md-6 mb-4" data-aos="fade-up">
          <h2>How to Get Started</h2>
          <p>Begin your AgroConnect journey in four simple steps:</p>
          <router-link to="/signup">
            <button class="btn btn-primary get-started-btn rounded-pill py-2">
              Get Started
            </button>
          </router-link>
        </div>

        <div
          class="col-md-6 mb-4 text-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <img
            src="../assets/started.avif"
            alt="How to get started"
            class="img-fluid"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
</style>
