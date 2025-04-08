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
              <label for="emailOrPhone" class="form-label">
                Email Address
              </label>
              <input
                type="text"
                class="form-control"
                id="emailOrPhone"
                placeholder="Enter Email Address "
                v-model="email"
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

            <!-- Error Message -->
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>

            <!-- Login Button -->
            <button
              type="submit"
              class="btn btn-success w-100 py-2 mb-3"
              :disabled="loading"
            >
              <span
                v-if="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span v-else>Login</span>
            </button>

            <!-- Sign Up Link -->
            <p class="text-center mb-0">
              Don’t have an account?
              <router-link to="/signup" class="text-decoration-none">
                Create Account
              </router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../../stores/auth";

export default {
  name: "LoginComponent",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      errorMessage: "",
    };
  },
  methods: {
    goBack() {
      // Navigate back in history or to a specific route
      this.$router ? this.$router.go(-1) : window.history.back();
    },
    async onLogin() {
      this.loading = true;
      this.errorMessage = "";
      const authStore = useAuthStore();

      try {
        await authStore.login({
          email: this.email,
          password: this.password,
        });

        // Redirect based on userType
        if (authStore.userType === "seller") {
          this.$router.push("/dashboard-seller");
        } else if (authStore.userType === "buyer") {
          this.$router.push("/dashboard-buyer");
        } else {
          // Fallback route if userType is missing or unrecognized
          this.$router.push("/market");
        }
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Login failed. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  background-color: #f9f9f9;
}
.back {
  text-decoration: none;
}
.login-left {
  background-color: #43b28c; /* fallback color */
}
</style>
