<template>
  <div>
    <!-- Hero Section -->
    <section class="hero d-flex align-items-center">
      <div class="container">
        <div class="row">
          <div class="col-md-6 hero-text text-white">
            <h1>Welcome to AgroConnect</h1>
            <p>
              At AgroConnect, we're driven by a passion for transforming the
              agricultural landscape through digital innovation. Our team
              comprises of experts who believe in harnessing the power of
              technology to create a more efficient, transparent, and profitable
              agri-sector. From the fields to the market, our digital solutions
              are designed to empower every stakeholder in the agricultural
              value chain. We are committed to building a platform that not only
              serves the immediate needs of the agri-community but also fosters
              long- term growth and sustainability in agriculture.
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

    <!-- Mission Statement -->
    <section class="mission-section">
      <div class="container">
        <h2 class="text-center mb-4">Mission Statement</h2>
        <div class="row align-items-center">
          <div class="col-md-6 mb-4 mb-md-0">
            <p class="lead">
              Our mission is to revolutionize agriculture by providing an
              innovative platform that bridges the gap between farmers, buyers,
              and sellers. We strive to create a more efficient, sustainable,
              and profitable agricultural ecosystem for all.
            </p>
          </div>
          <div class="col-md-6">
            <!-- Replace with your own image -->
            <img
              src="../assets/missionimg.svg"
              alt="Mission"
              class="img-fluid rounded"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Vision Section -->
    <section class="vision-section py-5" style="background-color: #e7f7f4">
      <div class="container">
        <div class="row align-items-center">
          <!-- Left: Image -->
          <div class="col-md-6 mb-4 text-center" data-aos="fade-right">
            <!-- Replace with your actual image -->
            <img
              src="../assets/about-img.avif"
              alt="Vision"
              class="img-fluid rounded"
            />
          </div>

          <!-- Right: Text Content -->
          <div class="col-md-6" data-aos="fade-left">
            <!-- Heading -->
            <h2 class="fw-bold mb-4">Vision Statement</h2>
            <p>
              To provide a unified platform where farmers, agri-allied
              businesses, retailers, and consumers benefit from the power of
              digital solutions, ensuring a prosperous and food-secure future.
            </p>

            <!-- Sub-Section 1 -->
            <h4 class="mt-4 fw-bold">Digitizing Agri-Trade</h4>
            <p>
              We envision a future where agriculture is seamless, accessible,
              and fully digitized, eliminating inefficiencies and bridging the
              gap between producers and end-users. Our platform simplifies the
              trade of agri-produce, making it straightforward, transparent, and
              profitable for all.
            </p>

            <!-- Sub-Section 2 -->
            <h4 class="mt-4 fw-bold">Reducing Food Loss</h4>
            <p>
              We aim to significantly reduce food waste by streamlining supply
              chain processes from farm through to the consumer. Our digital
              system ensures timely transactions and better food traceability,
              minimizing losses and ensuring higher-quality produce for
              consumers.
            </p>

            <!-- Sub-Section 3 -->
            <h4 class="mt-4 fw-bold">Leading Agri-Digital Platform</h4>
            <p>
              Our goal is to set the benchmark for a global agri-digital
              platform, championing best practices for all stakeholders. Through
              continuous innovation and collaboration, we aim to revolutionize
              how agriculture is perceived and conducted.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section">
      <div class="container">
        <h2 class="text-center mb-4">Values</h2>
        <div class="row align-items-center">
          <div class="col-md-4 mb-4 mb-md-0">
            <!-- Replace with your own image -->
            <img
              src="../assets/values.svg"
              alt="Values"
              class="img-fluid rounded"
            />
          </div>
          <div class="col-md-8">
            <div class="row">
              <div class="col-sm-6 mb-3">
                <h5 class="fw-bold">Sustainability</h5>
                <p>
                  We prioritize eco-friendly practices that protect our
                  environment.
                </p>
              </div>
              <div class="col-sm-6 mb-3">
                <h5 class="fw-bold">Innovation</h5>
                <p>
                  We embrace technology to solve agricultural challenges
                  efficiently.
                </p>
              </div>
              <div class="col-sm-6 mb-3">
                <h5 class="fw-bold">Collaboration</h5>
                <p>
                  We believe in the power of partnership and shared knowledge.
                </p>
              </div>
              <div class="col-sm-6 mb-3">
                <h5 class="fw-bold">Integrity</h5>
                <p>
                  We uphold honesty, fairness, and transparency in all we do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "AboutUsComponent",

  mounted() {
    AOS.init({
      duration: 800, // Animation duration in ms
      once: true, // Run animation only once per element
    });
  },
};
</script>

<style scoped>
/*
    Adjust these colors/sizes to match your exact design.
    Replace the placeholder images with real ones in the template above.
  */

/* Hero Section */
h2 {
  color: #333;
}

.hero {
  min-height: 60vh;
  background: url("../assets/about_us.png") no-repeat center center / cover;
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
/* Mission Statement */
.mission-section {
  padding: 3rem 0;
}

/* Vision Section */
.vision-section {
  background-color: #e4f7f2;
  padding: 3rem 0;
}

/* Values Section */
.values-section {
  padding: 3rem 0;
}

/* Headline Section */
.headline-section {
  background-color: #e4f7f2;
  padding: 3rem 0;
}

/* Logos Section */
.logos-section {
  padding: 3rem 0;
}
.btn:hover {
  background-color: #fff;
  color: #198754;
}
</style>
