<template>
  <div class="profile-page d-flex flex-wrap">
    <!-- Sidebar -->
    <Sidebar class="sidebar" />

    <!-- Main Content -->
    <div class="flex-grow-1 p-4 profile-settings-content">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold mb-0">Profile Settings</h2>
      </div>

      <!-- Loading and Error States -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading profile data...</p>
      </div>

      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <!-- Profile Form -->
      <form v-else @submit.prevent="saveChanges">
        <!-- First Row -->
        <div class="row mb-3">
          <div class="col-md-6 mb-3 mb-md-0">
            <label for="businessName" class="form-label fw-semibold"
              >Business Name</label
            >
            <input
              type="text"
              id="businessName"
              v-model="profile.businessName"
              class="form-control"
              placeholder="Enter Business Name"
            />
          </div>
          <div class="col-md-6">
            <label for="productSold" class="form-label fw-semibold"
              >What Product Do You Sell</label
            >
            <input
              type="text"
              id="productSold"
              v-model="profile.productSold"
              class="form-control"
              placeholder="Enter Product Type"
            />
          </div>
        </div>

        <!-- Second Row -->
        <div class="row mb-3">
          <div class="col-md-6 mb-3 mb-md-0">
            <label for="regNumber" class="form-label fw-semibold"
              >Business Reg Number</label
            >
            <input
              type="text"
              id="regNumber"
              v-model="profile.regNumber"
              class="form-control"
              placeholder="Enter Registration Number"
            />
          </div>
          <div class="col-md-6">
            <label for="email" class="form-label fw-semibold"
              >Business Email Address</label
            >
            <input
              type="email"
              id="email"
              v-model="profile.email"
              class="form-control"
              placeholder="Enter Business Email"
            />
          </div>
        </div>

        <!-- Third Row -->
        <div class="row mb-3">
          <div class="col-md-6 mb-3 mb-md-0">
            <label for="phoneNumber" class="form-label fw-semibold"
              >Business Phone Number</label
            >
            <div class="input-group">
              <span class="input-group-text" id="basic-addon1">+</span>
              <input
                type="tel"
                id="phoneNumber"
                v-model="profile.phoneNumber"
                class="form-control"
                placeholder="Enter Phone Number"
              />
            </div>
          </div>
          <div class="col-md-6">
            <label for="country" class="form-label fw-semibold">Country</label>
            <input
              type="text"
              id="country"
              v-model="profile.country"
              class="form-control"
              placeholder="Enter Country"
            />
          </div>
        </div>

        <!-- Fourth Row -->
        <div class="row mb-3">
          <div class="col-md-6 mb-3 mb-md-0">
            <label for="address" class="form-label fw-semibold">Address</label>
            <input
              type="text"
              id="address"
              v-model="profile.address"
              class="form-control"
              placeholder="Enter Business Address"
            />
          </div>
          <div class="col-md-6 mb-3 mb-md-0">
            <label for="state" class="form-label fw-semibold">State/City</label>
            <input
              type="text"
              id="state"
              v-model="profile.state"
              class="form-control"
              placeholder="Enter State or City"
            />
          </div>
        </div>

        <!-- Save Button -->
        <div class="text-end">
          <button type="submit" class="btn btn-success px-4 py-2 rounded-pill">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Sidebar from "../../../components/DashboardSidebar.vue";
import { useAuthStore } from "../../../stores/auth"; // Update path if needed

export default {
  name: "ProfileSettings",
  components: { Sidebar },
  data() {
    return {
      profile: {
        businessName: "",
        productSold: "",
        regNumber: "",
        email: "",
        phoneNumber: "",
        country: "",
        address: "",
        state: "",
        zipCode: "",
      },
      originalUserData: null, // Add this to store the original user data
      loading: true,
      error: null,
    };
  },
  async created() {
    console.log("ProfileSettings created hook running");
    const token = localStorage.getItem("authToken");
    console.log("Token exists:", !!token);

    const accountType = localStorage.getItem("account_type");
    console.log("Account type from localStorage:", accountType);

    if (!token) {
      console.log("No token found, showing error and redirecting");
      this.error = "Please log in to view your profile";
      this.loading = false;

      // Redirect to login page after a short delay
      setTimeout(() => {
        this.$router.push("/login");
      }, 2000);

      return;
    }

    if (accountType !== "seller") {
      console.log("Not a seller account, redirecting");
      this.error = "This page is only available for seller accounts";
      this.loading = false;

      setTimeout(() => {
        this.$router.push("/dashboard");
      }, 2000);

      return;
    }

    console.log("Token found, attempting to fetch profile data");
    await this.fetchProfileData();
  },
  methods: {
    async fetchProfileData() {
      console.log("fetchProfileData method called");
      try {
        this.loading = true;
        const authStore = useAuthStore();

        try {
          console.log("Calling fetchSellerProfile");
          const response = await authStore.fetchSellerProfile();
          console.log("Profile data received:", response);

          // Get user data from the response
          const userData = response.user || {};
          console.log("User data:", userData);

          // Map user data to profile fields as a fallback
          // Since business-specific fields aren't available, use the user's personal info
          this.profile = {
            // Try to use business fields first, fall back to user fields
            businessName:
              userData.business_name ||
              userData.first_name + " " + userData.last_name ||
              "",
            productSold: userData.product_name || "Not specified",
            regNumber: userData.business_reg_no || "Not specified",
            email: userData.business_email || userData.email || "",
            phoneNumber: userData.business_phone_no || userData.phone_no || "",
            country: userData.business_country || userData.country || "",
            address: userData.business_address || userData.address || "",
            state: userData.business_city || userData.city || "",
            zipCode: userData.zip_code || userData.zip_code || "",
          };

          console.log("Profile data mapped:", this.profile);

          // Store the original user data for later comparison
          this.originalUserData = { ...userData };
        } catch (error) {
          console.error("Error in fetchSellerProfile:", error);
          if (error.isAuthError) {
            console.log("Auth error detected:", error.message);
            this.error = error.message;
            return;
          }
          throw error; // Re-throw if it's not an auth error
        }

        this.loading = false;
        console.log("Profile data loaded successfully");
      } catch (error) {
        console.error("Error fetching profile data:", error);
        this.error = "Failed to load profile data. Please try again later.";
        this.loading = false;
      }
    },

    async saveChanges() {
      console.log("saveChanges method called");
      try {
        const authStore = useAuthStore();

        // Get the original user data for comparison
        const userData = this.originalUserData || {};

        // Prepare the data to be sent to the server, including both business and user fields
        const updatedData = {
          // Business fields
          business_name: this.profile.businessName,
          product_name: this.profile.productSold,
          business_reg_no: this.profile.regNumber,
          business_email: this.profile.email,
          business_phone_no: this.profile.phoneNumber,
          business_country: this.profile.country,
          business_address: this.profile.address,
          business_city: this.profile.state,
          zip_code: this.profile.zipCode,

          // Also include user fields that might be needed
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          phone_no: userData.phone_no,
          address: this.profile.address, // Use the updated address
          country: this.profile.country, // Use the updated country
          city: this.profile.state, // Use the updated state/city
        };

        console.log("Sending update with data:", updatedData);
        await authStore.updateSellerProfile(updatedData);
        console.log("Profile updated successfully");
        alert("Profile updated successfully!");

        // Refresh the data to reflect changes
        await this.fetchProfileData();
      } catch (error) {
        console.error("Error saving profile changes:", error);

        if (error.isAuthError) {
          this.error = error.message;

          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);

          return;
        }

        alert("An error occurred while saving. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
/* Container that holds sidebar and main content */
.profile-page {
  min-height: 100vh;
}

/* Sidebar (fixed width on larger screens) */
.sidebar {
  width: 250px;
  flex-shrink: 0;
  position: fixed; /* If you want it fixed on large screens */
  height: 100vh; /* Match viewport height */
  background-color: #fff;
  /* ... any other existing sidebar styles ... */
}

/* Main Content offset so it starts where the sidebar ends (on larger screens) */
.profile-settings-content {
  margin-left: 250px; /* matches sidebar width */
  width: calc(100% - 250px);
  background-color: #fff;
  min-height: 100vh;
}

/* Responsive Styles */
@media (max-width: 768px) {
  /* Stack sidebar above main content */
  .profile-page {
    flex-direction: column;
  }

  /* Sidebar becomes full-width on mobile */
  .sidebar {
    position: static;
    width: 100%;
    height: auto;
  }

  /* Main content no longer offset */
  .profile-settings-content {
    margin-left: 0;
    width: 100%;
  }
}
</style>
