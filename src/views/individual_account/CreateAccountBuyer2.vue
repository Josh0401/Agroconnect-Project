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
        <span class="step-circle">1</span>
        <span class="mx-2">—</span>
        <span class="step-circle active">2</span>
        <span class="mx-2">—</span>
        <span class="step-circle">3</span>
      </div>

      <form @submit.prevent="continueSignup" class="mb-4">
        <div class="mb-3">
          <label class="form-label fw-semibold">Phone Number</label>
          <input
            type="number"
            class="form-control form-control-lg"
            placeholder="Enter Your Phone Number"
            v-model="phone_number"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Address (optional)</label>
          <input
            type="text"
            class="form-control form-control-lg"
            placeholder="Enter Your Address"
            v-model="address"
          />
        </div>
      </form>

      <!-- Continue & Previous Buttons -->
      <div class="d-flex">
        <button
          class="btn btn-success w-100 py-2 px-2 mx-2 mb-3"
          @click="previousSignup"
        >
          Previous</button
        ><button
          class="btn btn-success w-100 py-2 px-2 mx-2 mb-3"
          @click="continueSignup"
        >
          Continue
        </button>
      </div>

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
export default {
  name: "CreateAccountIndividual",
  data() {
    return {
      phone_number: "",
      address: "",
    };
  },
  created() {
    // Restore data from localStorage when component is created
    this.loadFormData();
  },
  methods: {
    goBack() {
      if (this.$router) {
        this.$router.go(-1);
      } else {
        window.history.back();
      }
    },
    continueSignup() {
      // Save form data to localStorage
      this.saveFormData();

      // Navigate to the next step
      this.$router.push("/create-buyer3");
    },
    previousSignup() {
      // Save form data before going back
      this.saveFormData();

      // Navigate to the previous step
      this.$router.push("/create-account-buyer");
    },
    saveFormData() {
      const formData = {
        phone_number: this.phone_number,
        address: this.address,
      };
      localStorage.setItem("formData", JSON.stringify(formData));
    },
    loadFormData() {
      const savedData = localStorage.getItem("formData");
      if (savedData) {
        const { phone_number, address } = JSON.parse(savedData);
        this.phone_number = phone_number || "";
        this.address = address || "";
      }
    },
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
