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
              placeholder="Sellermart"
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
              placeholder="Rice"
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
              placeholder="3546482-LLC"
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
              placeholder="AgroConnect@gmail.com"
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
              <span class="input-group-text" id="basic-addon1">+230</span>
              <input
                type="tel"
                id="phoneNumber"
                v-model="profile.phoneNumber"
                class="form-control"
                placeholder="123 4567"
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
              placeholder="Mauritius"
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
              placeholder="15, Aketiba Street"
            />
          </div>
          <div class="col-md-6 mb-3 mb-md-0">
            <label for="state" class="form-label fw-semibold">State</label>
            <input
              type="text"
              id="state"
              v-model="profile.state"
              class="form-control"
              placeholder="Port Louis"
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
      loading: true,
      error: null,
    };
  },
  async created() {
    await this.fetchProfileData();
  },
  methods: {
    // In Profile(seller).vue fetchProfileData method
    async fetchProfileData() {
      try {
        this.loading = true;
        const authStore = useAuthStore();

        try {
          const response = await authStore.fetchSellerProfile();

          this.profile = {
            businessName: response.business_name || "",
            // ... rest of your mapping
          };
        } catch (error) {
          if (error.isAuthError) {
            this.error = error.message;

            // Optional: Redirect to login
            // setTimeout(() => {
            //   this.$router.push("/login"); // Adjust path as needed
            // }, 2000);

            return;
          }
          throw error; // Re-throw if it's not an auth error
        }

        this.loading = false;
      } catch (error) {
        console.error("Error fetching profile data:", error);
        this.error = "Failed to load profile data. Please try again later.";
        this.loading = false;
      }
    },

    // In Profile(seller).vue saveChanges method
    async saveChanges() {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error(
            "No authentication token found. Please log in again."
          );
        }

        const updatedData = {
          // ... your data here
        };

        await axios.put(
          "https://agroconnect.shop/api/update-seller-profile",
          updatedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error saving profile changes:", error);
        alert("An error occurred while saving. Please try again.");
      }
    },
    async created() {
      const token = localStorage.getItem("authToken");
      if (!token) {
        this.error = "Please log in to view your profile";
        this.loading = false;

        // Optional: Redirect to login page after a short delay
        setTimeout(() => {
          this.$router.push("/login"); // Adjust the path as needed
        }, 2000);

        return;
      }

      await this.fetchProfileData();
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
