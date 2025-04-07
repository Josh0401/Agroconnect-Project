<template>
  <div class="reset-page min-vh-100 d-flex flex-column">
    <div class="row g-0 flex-fill">
      <!-- Left Side (Image/Graphic) -->
      <div
        class="col-md-6 d-none d-md-block reset-left"
        style="
          background-image: url('/src/assets/smiley-woman.svg');
          background-size: cover;
          background-position: center;
        "
      ></div>

      <!-- Right Side (Form) -->
      <div
        class="col-md-6 d-flex align-items-center justify-content-center p-4 p-md-5 bg-white"
      >
        <div class="reset-form w-100" style="max-width: 400px">
          <!-- Back Button (Optional) -->
          <button
            class="btn btn-link back text-muted p-0 mb-3 d-inline-flex align-items-center"
            @click="goBack"
          >
            <i class="bi bi-arrow-left me-2"></i> Back
          </button>

          <h2 class="fw-bold mb-1">Reset Password</h2>
          <p class="text-muted mb-4">
            Kindly enter the email used to sign into AgroConnect
          </p>

          <form @submit.prevent="onReset">
            <!-- Email Field -->
            <div class="mb-3">
              <label for="email" class="form-label">Email Address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter Email Address"
                v-model="email"
              />
            </div>

            <!-- Continue Button -->
            <button type="submit" class="btn btn-success w-100 py-2">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResetPasswordComponent",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    goBack() {
      // Navigate back in history or to a specific route
      this.$router ? this.$router.go(-1) : window.history.back();
    },
    onReset() {
      // Handle reset password logic here
      alert(`A reset link has been sent to ${this.email}`);
    },
  },
};
</script>

<style scoped>
/* Basic styling for the layout. Adjust colors/images as needed. */
.reset-page {
  background-color: #f9f9f9;
}

/* Left side (image) hidden on smaller screens */
.reset-left {
  background-color: #43b28c; /* fallback if image fails */
}
.back {
  text-decoration: none;
}
</style>
