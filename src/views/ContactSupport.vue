<template>
  <div>
    <!-- Hero Banner -->
    <section
      class="contact-hero d-flex align-items-center"
      style="
        background-image: url('/src/assets/Contact.svg');
        background-size: cover;
        background-position: center;
        min-height: 40vh;
      "
    >
      <!-- <div class="container text-white">
        <h1 class="display-4 fw-bold">Contact Support</h1>
      </div> -->
    </section>

    <!-- Main Content -->
    <section class="py-5">
      <div class="container">
        <div class="row g-4">
          <!-- Left Column: Contact Info -->
          <div class="col-md-4">
            <!-- Email Info -->
            <div class="d-flex mb-4">
              <!-- Icon Placeholder -->
              <div class="me-3 text-success">
                <!-- Use your own icon or an inline SVG here -->
                <i class="bi bi-envelope-fill fs-3"></i>
              </div>
              <div>
                <h5 class="fw-bold mb-1">Email us</h5>
                <p class="mb-0">contact@agroconnect.com</p>
              </div>
            </div>

            <!-- Phone Info -->
            <div class="d-flex mb-4">
              <!-- Icon Placeholder -->
              <div class="me-3 text-success">
                <!-- Use your own icon or an inline SVG here -->
                <i class="bi bi-telephone-fill fs-3"></i>
              </div>
              <div>
                <h5 class="fw-bold mb-1">Call us</h5>
                <p class="mb-0">+234 0806 53 68742</p>
              </div>
            </div>

            <!-- WhatsApp Info -->
            <div class="d-flex mb-4">
              <!-- Icon Placeholder -->
              <div class="me-3 text-success">
                <!-- Use your own icon or an inline SVG here -->
                <i class="bi bi-whatsapp fs-3"></i>
              </div>
              <div>
                <h5 class="fw-bold mb-1">WhatsApp</h5>
                <p class="mb-0">+234 0806 53 68742</p>
              </div>
            </div>
          </div>

          <!-- Right Column: Quick Message Form -->
          <div class="col-md-8">
            <div class="p-4 rounded-3 quick-message-box">
              <h4 class="fw-bold mb-4">Quick Message</h4>
              <form>
                <div class="mb-3">
                  <label for="email" class="form-label">Email Address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Enter Your Email Address"
                  />
                </div>
                <div class="mb-3">
                  <label for="fullName" class="form-label">Full Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="fullName"
                    placeholder="Enter Your Full Name"
                  />
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label"
                    >Description</label
                  >
                  <textarea
                    class="form-control"
                    id="description"
                    rows="4"
                    placeholder="Enter Your Text Here"
                  ></textarea>
                </div>
                <button type="submit" class="btn btn-success px-4">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "ContactSupportComponent",
};
</script>

<style scoped>
/* Hero Banner */
.contact-hero {
  background-color: #43b28c; /* fallback if image fails to load */
  color: #fff;
  padding: 4rem 0;
}

/* Quick Message Box */
.quick-message-box {
  background-color: #e4f7f2; /* Light teal background to match the design */
}
</style>
