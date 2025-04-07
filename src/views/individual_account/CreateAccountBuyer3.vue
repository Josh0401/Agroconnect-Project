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
            v-model="signupStore.selectedCountry"
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
            v-model="signupStore.selectedCity"
            class="form-select form-select-lg"
            required
          >
            <option v-for="city in filteredCities" :key="city" :value="city">
              {{ city }}
            </option>
          </select>
        </div>

        <!-- Password Field -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Password</label>
          <input
            type="password"
            class="form-control form-control-lg"
            placeholder="Enter a Password"
            v-model="signupStore.password"
            @input="validatePassword"
            required
          />
          <p
            v-if="
              signupStore.password.length > 0 && signupStore.password.length < 8
            "
            class="text-danger"
          >
            Password must be at least 8 characters long.
          </p>
        </div>

        <!-- Confirm Password Field -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Confirm Password</label>
          <input
            type="password"
            class="form-control form-control-lg"
            placeholder="Confirm Password"
            v-model="signupStore.confirmPassword"
            @input="validatePassword"
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

export default {
  name: "CreateAccountBuyer3",
  setup() {
    const router = useRouter();
    const signupStore = useAuthStore();
    const passwordError = ref("");

    const countries = ["Nigeria", "Mauritius"];
    const cities = {
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
    };

    const filteredCities = computed(() => {
      return signupStore.selectedCountry
        ? cities[signupStore.selectedCountry]
        : [];
    });

    const validatePassword = () => {
      if (
        signupStore.confirmPassword &&
        signupStore.password !== signupStore.confirmPassword
      ) {
        passwordError.value = "Passwords do not match";
      } else {
        passwordError.value = "";
      }
    };

    const goBack = () => {
      // Simply navigate back to the previous step (e.g., Step 2)
      router.push("/create-buyer2");
    };

    const previousSignup = () => {
      router.push("/create-buyer2");
    };

    const submitForm = async () => {
      // Validate password fields
      if (!signupStore.password || !signupStore.confirmPassword) {
        alert("Please fill in both password fields.");
        return;
      }
      if (signupStore.password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
      }
      if (signupStore.password !== signupStore.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // Call the store's submitSignup action to make the API call
      try {
        const result = await signupStore.submitSignup({
          firstName: signupStore.firstName,
          lastName: signupStore.lastName,
          email: signupStore.email,
          phone_number: signupStore.phone_number,
          address: signupStore.address,
          selectedCountry: signupStore.selectedCountry,
          selectedCity: signupStore.selectedCity,
          password: signupStore.password,
          userType: signupStore.userType, // should be "buyer"
        });

        console.log("Signup successful:", result);
        alert("Form submitted successfully!");
        router.push("/login");
      } catch (error) {
        alert("There was an error submitting your form.");
      }
    };

    return {
      signupStore,
      countries,
      filteredCities,
      passwordError,
      validatePassword,
      goBack,
      previousSignup,
      submitForm,
    };
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
