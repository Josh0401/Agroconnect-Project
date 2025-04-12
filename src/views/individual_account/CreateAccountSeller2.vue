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
        <!-- Phone Number -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Phone Number</label>
          <input
            type="tel"
            class="form-control form-control-lg"
            placeholder="Enter Your Phone Number"
            v-model="authStore.phone_number"
            required
          />
          <small class="text-muted"
            >Will also be used as your business phone number</small
          >
        </div>

        <!-- Business Name -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Business Name</label>
          <input
            type="text"
            class="form-control form-control-lg"
            placeholder="Enter Your Business Name"
            v-model="authStore.businessName"
            required
          />
        </div>

        <!-- Business Registration Number -->
        <div class="mb-3">
          <label class="form-label fw-semibold"
            >Business Registration Number</label
          >
          <input
            type="text"
            class="form-control form-control-lg"
            placeholder="Enter Business Registration Number"
            v-model="authStore.businessRegistrationNumber"
            required
          />
        </div>

        <!-- Product Name -->
        <div class="mb-3">
          <label class="form-label fw-semibold">
            What Product Do You Sell?
          </label>
          <input
            type="text"
            class="form-control form-control-lg"
            placeholder="Enter Product"
            v-model="authStore.productName"
            required
          />
        </div>

        <!-- Product Category -->
        <div class="mb-3">
          <label class="form-label fw-semibold">
            What is the Product Category
          </label>
          <select
            id="item"
            v-model="authStore.productCategory"
            class="form-select form-select-lg"
            required
          >
            <option value="Herbs and Spice">Herbs and Spice</option>
            <option value="Fresh Fruits">Fresh Fruits</option>
            <option value="Grains">Grains</option>
            <option value="Roots and Tubers">Roots and Tubers</option>
            <option value="Nuts and Seeds">Nuts and Seeds</option>
            <option value="Cooking">Cooking</option>
            <option value="Dairy Products">Dairy Products</option>
            <option value="Processed Foods">Processed Foods</option>
            <option value="Agro Chemicals">Agro Chemicals</option>
            <option value="Diabetics">Diabetics</option>
            <option value="Proteins">Proteins</option>
            <option value="Baking Ingredients">Baking Ingredients</option>
            <option value="Snacks and Pastries">Snacks and Pastries</option>
            <option value="Cereals and Beverages">Cereals and Beverages</option>
            <option value="Fresh Vegetables">Fresh Vegetables</option>
          </select>
        </div>

        <!-- Address -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Address</label>
          <input
            required
            type="text"
            class="form-control form-control-lg"
            placeholder="Enter Your Address"
            v-model="authStore.address"
          />
          <small class="text-muted"
            >Will also be used as your business address</small
          >
        </div>

        <!-- Business Logo -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Business Logo (Optional)</label>
          <input
            type="file"
            class="form-control form-control-lg"
            accept="image/*"
            @change="handleLogoUpload"
          />
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
          @click="continueSignup"
        >
          Continue
        </button>
      </div>

      <!-- Login Link -->
      <p class="text-center">
        Already have an account?
        <router-link to="/login" class="text-decoration-none">
          Login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";

export default {
  name: "CreateAccountSeller2",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const goBack = () => {
      router.go(-1);
    };

    const previousSignup = () => {
      router.push("/create-account-seller");
    };

    const handleLogoUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        authStore.businessLogo = file;
      }
    };

    const continueSignup = () => {
      // Here, the form fields are already bound to the store
      // Optionally, you could add validation before moving on.
      router.push("/create-seller3");
    };

    return {
      authStore,
      goBack,
      previousSignup,
      continueSignup,
      handleLogoUpload,
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
