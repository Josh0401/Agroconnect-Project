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
        <span class="step-circle">2</span>
        <span class="mx-2">—</span>
        <span class="step-circle active">3</span>
      </div>

      <form @submit.prevent="submitForm" class="mb-4">
        <!-- Country Dropdown -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Select Your Country</label>
          <select
            id="country"
            v-model="selectedCountry"
            class="form-select form-select-lg"
            required
          >
            <option
              v-for="country in countries"
              :key="country"
              :value="country"
            >
              {{ country }}
            </option>
          </select>
        </div>

        <!-- City Dropdown -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Select a City</label>
          <select
            id="city"
            v-model="selectedCity"
            class="form-select form-select-lg"
            required
          >
            <option v-for="city in filteredCities" :key="city" :value="city">
              {{ city }}
            </option>
          </select>
        </div>

        <!-- Password -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Password</label>
          <input
            type="password"
            class="form-control form-control-lg"
            placeholder="Enter a Password"
            v-model="password"
            required
          />
        </div>
        <!-- Confirm Password -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Confirm Password</label>
          <input
            type="password"
            class="form-control form-control-lg"
            placeholder="Confirm Password"
            v-model="confirmPassword"
            required
          />
          <p v-if="passwordError" class="text-danger">{{ passwordError }}</p>
        </div>
      </form>

      <!-- Navigation Buttons -->
      <div class="d-flex">
        <button
          class="btn btn-success w-100 py-2 px-2 mx-2 mb-3"
          @click="previousSignup"
        >
          Previous
        </button>
        <button
          class="btn btn-success w-100 py-2 px-2 mx-2 mb-3"
          @click="submitForm"
        >
          Submit
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
      // These fields might also be saved from previous steps.
      firstName: "",
      lastName: "",
      email: "",
      // Current step fields
      password: "",
      confirmPassword: "",
      passwordError: "",
      countries: ["Nigeria", "Mauritius"],
      cities: {
        Nigeria: [
          "Lagos",
          "Abuja",
          "Kano",
          "Port Harcourt",
          "Ibadan",
          "Benin City",
          "Kaduna",
          "Jos",
          "Enugu",
          "Owerri",
        ],
        Mauritius: [
          "Port Louis",
          "Curepipe",
          "Quatre Bornes",
          "Vacoas",
          "Beau Bassin",
          "Rose Hill",
          "Mahebourg",
          "Goodlands",
          "Triolet",
          "Souillac",
        ],
      },
      selectedCountry: "",
      selectedCity: "",
    };
  },
  computed: {
    filteredCities() {
      return this.selectedCountry ? this.cities[this.selectedCountry] : [];
    },
  },
  created() {
    // Load saved form data when component is created
    this.loadFormData();
  },
  watch: {
    // Validate password when confirmPassword changes
    confirmPassword() {
      this.validatePassword();
    },
  },
  methods: {
    goBack() {
      // Save data before navigating back
      this.saveFormData();
      if (this.$router) {
        this.$router.go(-1);
      } else {
        window.history.back();
      }
    },
    previousSignup() {
      // Save data and navigate to the previous step
      this.saveFormData();
      this.$router.push("/create-buyer2");
    },
    continueSignup() {
      // This method is not used in submission here.
      // It could be used for moving to an intermediate step.
      alert(
        `Account creation step 1 for: ${this.firstName} ${this.lastName}, email: ${this.email}`
      );
      // e.g., this.$router.push('/next-step');
    },
    validatePassword() {
      if (this.confirmPassword && this.password !== this.confirmPassword) {
        this.passwordError = "Passwords do not match";
      } else {
        this.passwordError = "";
      }
    },
    saveFormData() {
      // Save all relevant fields into localStorage
      const formData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        selectedCountry: this.selectedCountry,
        selectedCity: this.selectedCity,
      };
      localStorage.setItem("accountFormData", JSON.stringify(formData));
    },
    loadFormData() {
      // Retrieve the saved data from localStorage, if any
      const savedData = localStorage.getItem("accountFormData");
      if (savedData) {
        const data = JSON.parse(savedData);
        this.firstName = data.firstName || "";
        this.lastName = data.lastName || "";
        this.email = data.email || "";
        this.password = data.password || "";
        this.confirmPassword = data.confirmPassword || "";
        this.selectedCountry = data.selectedCountry || "";
        this.selectedCity = data.selectedCity || "";
      }
    },
    submitForm() {
      // Validate the password fields first
      if (!this.password || !this.confirmPassword) {
        alert("Please fill in both password fields.");
        return;
      }
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      // Optionally, log selected country and city for debugging
      // console.log("Country:", this.selectedCountry);
      // console.log("City:", this.selectedCity);
      // alert(`Selected: ${this.selectedCountry}, ${this.selectedCity}`);

      // // Proceed with submission (for demo, we use an alert)
      // alert("Form submitted successfully!");

      // Clear the saved form data from localStorage after submission
      localStorage.removeItem("accountFormData");

      this.$router.push("/dashboard-seller");
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
