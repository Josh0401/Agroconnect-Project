<template>
  <div class="create-account d-flex flex-row min-vh-100">
    <div class="left-col d-none d-md-block col-md-6 p-0"></div>

    <div
      class="right-col col-12 col-md-6 d-flex flex-column justify-content-center px-4"
    >
      <button
        class="btn btn-link text-muted p-0 back mb-3 d-inline-flex align-items-center"
        @click="goBack"
      >
        <i class="bi bi-arrow-left me-2"></i> Back
      </button>

      <h2 class="fw-bold mb-2">Create Account</h2>
      <p class="text-muted mb-3">Create an account to join for a good start</p>

      <div class="steps d-flex align-items-center mb-4">
        <span class="step-circle active">1</span>
        <span class="mx-2">—</span>
        <span class="step-circle">2</span>
        <span class="mx-2">—</span>
        <span class="step-circle">3</span>
      </div>

      <form @submit.prevent="continueSignup" class="mb-4">
        <div class="mb-3">
          <label class="form-label fw-semibold">First Name</label>
          <input
            type="text"
            class="form-control form-control-lg"
            placeholder="Enter Your First Name"
            v-model="signupStore.firstName"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Last Name</label>
          <input
            type="text"
            class="form-control form-control-lg"
            placeholder="Enter Your Last Name"
            v-model="signupStore.lastName"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Email Address</label>
          <input
            type="email"
            class="form-control form-control-lg"
            placeholder="Enter Your Email Address"
            v-model="signupStore.email"
            required
          />
        </div>
      </form>

      <!-- Continue Button -->
      <button class="btn btn-success w-100 py-2 mb-3" @click="continueSignup">
        Continue
      </button>

      <!-- Login Link -->
      <p class="text-center">
        Already have an account?
        <router-link to="/login" class="text-decoration-none"
          >Login</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";

export default {
  name: "CreateAccountBuyer",
  setup() {
    const signupStore = useAuthStore();
    const router = useRouter();

    const goBack = () => {
      // Navigate back
      router.go(-1);
    };

    const continueSignup = () => {
      signupStore.userType = "buyer";
      router.push("/create-buyer2");
    };

    return { signupStore, goBack, continueSignup };
  },
};
</script>

<style scoped>
.create-account {
  overflow: hidden;
}

.left-col {
  background-color: #06b17c;
  background-image: url("../../assets/smiley-woman.svg");
  background-size: cover;
  background-position: center;
}

.steps .step-circle {
  width: 30px;
  height: 30px;
  border: 2px solid #06b17c;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #06b17c;
  font-weight: bold;
}

.steps .step-circle.active {
  background-color: #06b17c;
  color: #fff;
}

.back {
  text-decoration: none;
}
</style>
