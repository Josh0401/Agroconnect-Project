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
          <small class="text-muted"
            >Will also be used as your business country</small
          >
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
          <small class="text-muted"
            >Will also be used as your business city</small
          >
        </div>
        <!-- Profile Image -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Profile Image (Optional)</label>
          <input
            type="file"
            class="form-control form-control-lg"
            accept="image/*"
            @change="handleProfileUpload"
          />
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
          :disabled="passwordError !== '' || isSubmitting"
        >
          {{ isSubmitting ? "Submitting..." : "Submit" }}
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
import { useToast } from "vue-toastification";

export default {
  name: "CreateAccountSeller3",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const toast = useToast();
    const passwordError = ref("");
    const isSubmitting = ref(false);

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

    const handleProfileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        authStore.profile = file;
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
        toast.error("Please fill in both password fields.");
        return;
      }

      // Validate password
      if (passwordError.value) {
        toast.error(passwordError.value);
        return;
      }

      // Set submitting state
      isSubmitting.value = true;

      // Create a FormData object for the submission
      const formData = new FormData();

      // Add all text fields
      formData.append("first_name", authStore.firstName);
      formData.append("last_name", authStore.lastName);
      formData.append("email", authStore.email);
      formData.append("phone_no", authStore.phone_number.toString());
      formData.append("address", authStore.address);
      formData.append("country", authStore.selectedCountry);
      formData.append("city", authStore.selectedCity);
      formData.append("password", authStore.password);
      formData.append("account_type", "seller");
      formData.append("business_name", authStore.businessName);
      formData.append("business_email", authStore.email);
      formData.append("business_reg_no", authStore.businessRegistrationNumber);
      formData.append("business_phone_no", authStore.phone_number.toString());
      formData.append("business_address", authStore.address);
      formData.append("product_name", authStore.productName);
      formData.append("product_category", authStore.productCategory);
      formData.append("business_country", authStore.selectedCountry);
      formData.append("business_city", authStore.selectedCity);

      // Add file fields (if they exist)
      if (authStore.profile) {
        formData.append("profile", authStore.profile);
      }

      if (authStore.businessLogo) {
        formData.append("business_logo", authStore.businessLogo);
      }

      try {
        // Use the modified store method to submit the form data
        const result = await authStore.submitSellerSignup(formData);
        console.log("Seller signup successful:", result);

        // Show success toast
        toast.success("Account created successfully! Redirecting to login...", {
          timeout: 3000,
        });

        // Small delay before redirecting to allow user to see the message
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (error) {
        console.error("Signup error:", error);

        // Handle various error types
        if (error.response && error.response.data) {
          // If there are validation errors from the server
          if (
            typeof error.response.data === "object" &&
            error.response.data.errors
          ) {
            const errorMessages = Object.values(error.response.data.errors)
              .flat()
              .join("\n");
            toast.error(errorMessages);
          } else if (error.response.data.message) {
            // If the server sends a message
            toast.error(error.response.data.message);
          } else {
            // Generic error
            toast.error("Failed to create account. Please try again.");
          }
        } else {
          toast.error("Network or server error. Please try again later.");
        }
      } finally {
        // Reset submitting state
        isSubmitting.value = false;
      }
    };

    return {
      authStore,
      countries,
      filteredCities,
      passwordError,
      isSubmitting,
      goBack,
      previousSignup,
      submitForm,
      validatePassword,
      handleProfileUpload,
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
