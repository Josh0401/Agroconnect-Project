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
            v-model="authStore.selectedCountry"
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
            v-model="authStore.selectedCity"
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
            v-model="authStore.password"
            @input="validatePassword"
            required
          />
          <p
            v-if="
              authStore.password.length > 0 && authStore.password.length < 8
            "
            class="text-danger"
          >
            Password must be at least 8 characters long.
          </p>
        </div>
        <!-- Confirm Password -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Confirm Password</label>
          <input
            type="password"
            class="form-control form-control-lg"
            placeholder="Confirm Password"
            v-model="authStore.confirmPassword"
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
import { computed, ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";

export default {
  name: "CreateAccountSeller3",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
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
      return authStore.selectedCountry ? cities[authStore.selectedCountry] : [];
    });

    const validatePassword = () => {
      if (
        authStore.confirmPassword &&
        authStore.password !== authStore.confirmPassword
      ) {
        passwordError.value = "Passwords do not match";
      } else if (authStore.password && authStore.password.length < 8) {
        passwordError.value = "Password must be at least 8 characters long";
      } else {
        passwordError.value = "";
      }
    };

    const goBack = () => {
      router.push("/create-seller2");
    };

    const previousSignup = () => {
      router.push("/create-seller2");
    };

    const submitForm = async () => {
      // Validate that password fields are not empty
      if (!authStore.password || !authStore.confirmPassword) {
        alert("Please fill in both password fields.");
        return;
      }

      // Validate password

      // Build the payload from the store's state
      const payload = {
        firstName: authStore.firstName,
        lastName: authStore.lastName,
        email: authStore.email,
        phone_number: authStore.phone_number,
        address: authStore.address,
        selectedCountry: authStore.selectedCountry,
        selectedCity: authStore.selectedCity,
        password: authStore.password,
        userType: authStore.userType, // should be "seller"
        productName: authStore.productName,
        productCategory: authStore.productCategory,
      };

      try {
        const result = await authStore.submitSignup(payload);
        console.log("Signup successful:", result);
        alert("Signup successful!");
        router.push("/login");
      } catch (error) {
        console.error("Signup error:", error);

        alert(
          "There was an error submitting your signup. Please check your details and try again."
        );
      }
    };

    return {
      authStore,
      countries,
      filteredCities,
      passwordError,
      goBack,
      previousSignup,
      submitForm,
      validatePassword,
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
