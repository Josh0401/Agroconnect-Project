<template>
  <div class="login-page min-vh-100 d-flex flex-column">
    <div class="row g-0 flex-fill">
      <div
        class="col-md-6 d-none d-md-block login-left"
        style="
          background-image: url('/src/assets/smiley-woman.svg');
          background-size: cover;
          background-position: center;
        "
      ></div>

      <div
        class="col-md-6 d-flex align-items-center justify-content-center p-4 p-md-5 bg-white"
      >
        <div class="login-form w-100" style="max-width: 400px">
          <button
            class="btn btn-link text-muted back p-0 mb-3 d-inline-flex align-items-center"
            @click="goBack"
          >
            <i class="bi bi-arrow-left me-2"></i> Back
          </button>

          <h2 class="fw-bold mb-1">Login</h2>
          <p class="text-muted mb-4">
            Welcome back! So glad to have you back again.
          </p>

          <form @submit.prevent="onLogin">
            <div class="mb-3">
              <label for="emailOrPhone" class="form-label"
                >Email Address / Phone Number</label
              >
              <input
                type="text"
                class="form-control"
                id="emailOrPhone"
                placeholder="Enter Email Address / Phone Number"
                v-model="emailOrPhone"
              />
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Enter Password"
                v-model="password"
              />
            </div>

            <div class="d-flex justify-content-between align-items-center mb-3">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                  v-model="rememberMe"
                />
                <label class="form-check-label" for="rememberMe">
                  Remember Me
                </label>
              </div>

              <router-link to="/reset-password" class="text-decoration-none"
                >Forgot Password?</router-link
              >
            </div>

            <!-- Login Button -->
            <button type="submit" class="btn btn-success w-100 py-2 mb-3">
              Login
            </button>

            <!-- Sign Up Link -->
            <p class="text-center mb-0">
              Don’t have an account?
              <router-link to="/signup" class="text-decoration-none"
                >Create Account</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  name: "LoginComponent",
  data() {
    return {
      emailOrPhone: "",
      password: "",
      rememberMe: false,
    };
  },
  methods: {
    goBack() {
      // Navigate back in history or to a specific route
      this.$router ? this.$router.go(-1) : window.history.back();
    },
    onLogin() {
      // Handle login logic here
      // alert(`Logging in with ${this.emailOrPhone}`);
      setTimeout(() => {
        this.$router.push("/dashboard-seller");
      }, 1000);
    },
  },
};
</script>

<style scoped>
/* Basic styling for the layout. Adjust colors/images as needed. */
.login-page {
  background-color: #f9f9f9;
}
.back {
  text-decoration: none;
}
/* Left side (image) hidden on smaller screens */
.login-left {
  background-color: #43b28c; /* fallback if image fails */
}

/* Right side background color (white) is set inline in the template. */
</style>
