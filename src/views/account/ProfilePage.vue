<template>
  <div class="profile-page">
    <!-- Navbar component - reusing the one we established -->
    <!-- <nav class="navbar navbar-expand-lg sticky-top bg-white shadow-sm py-3">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="/market">
          <img
            src="../../assets/Agroconnect.png"
            alt="AgroEase Logo"
            height="40"
            class="me-2"
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
         
            <div class="search-container d-flex align-items-center">
         
              <svg
                class="search-icon me-2"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85.708-.708-3.85-3.85zm-5.242.656
                     a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"
                />
              </svg>
         
              <input
                id="searchInput"
                type="text"
                placeholder="Search"
                @keydown.enter="handleSearch"
                v-model="searchQuery"
                class="d-none d-lg-block form-control me-2"
              />
              <button
                type="button"
                @click="handleSearch"
                class="d-none d-lg-block btn btn-outline-secondary"
              >
                Search
              </button>
            </div>
          </ul>
          <div class="d-flex align-items-center py-1">
         
            <span class="me-2">Account</span>
            <button class="btn dropdown-toggle" type="button">
              <i class="bi bi-chevron-down"></i>
            </button>

         
            <button class="btn ms-3">
              <i class="bi bi-heart"></i>
            </button>

         
            <div class="position-relative ms-3">
              <button class="btn position-relative">
                <i class="bi bi-cart3"></i>
                <span
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                >
                  2
                </span>
              </button>
              <span class="ms-2">Rs 5,000</span>
            </div>
          </div>
        </div>
      </div>
    </nav> -->

    <nav class="navbar navbar-expand-lg sticky-top bg-white shadow-sm py-3">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="/market">
          <img
            src="../../assets/Agroconnect.png"
            alt="AgroEase Logo"
            height="40"
            class="me-2"
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <!-- Search container -->
            <div class="search-container d-flex align-items-center">
              <!-- Search Icon (always visible) -->
              <svg
                class="search-icon me-2"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85.708-.708-3.85-3.85zm-5.242.656
                   a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"
                />
              </svg>
              <!-- Search input & button visible only on larger screens -->
              <input
                id="searchInput"
                type="text"
                placeholder="Search"
                @keydown.enter="handleSearch"
                v-model="searchQuery"
                class="d-none d-lg-block form-control me-2"
              />
              <button
                type="button"
                @click="handleSearch"
                class="d-none d-lg-block btn btn-outline-secondary"
              >
                Search
              </button>
            </div>
          </ul>
          <div class="d-flex align-items-center py-1">
            <!-- Wishlist Icon -->
            <button class="btn position-relative me-3" @click="goToWishlist">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 2.748c-1.1-1.176-2.785-1.103-3.95.285-1.168 1.395-.593 3.247 1.12 4.722C6.2 9.8 8 11.4 8 11.4s1.8-1.6 3.78-4.095c1.714-1.475 2.288-3.327 1.12-4.722C10.785 1.645 9.1 1.572 8 2.748z"
                />
              </svg>
              <!-- Optional badge for wishlist count -->
              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                v-if="wishlistItemCount > 0"
              >
                {{ wishlistItemCount }}
              </span>
            </button>

            <!-- Shopping Cart Icon -->
            <button class="btn position-relative me-3" @click="goToCart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 
                   .485.379L2.89 5H14.5a.5.5 0 0 1 
                   .49.598l-1.5 7A.5.5 0 0 1 
                   13 13H4a.5.5 0 0 1-.491-.408L1.01 2H.5a.5.5 0 0 1-.5-.5zM3.102 6l1.313 6h7.17l1.313-6H3.102zM5 12a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                />
              </svg>
              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                v-if="cartItemCount > 0"
              >
                {{ cartItemCount }}
              </span>
            </button>

            <!-- Account Icon with Dropdown -->
            <div
              class="dropdown account-dropdown me-3"
              @mouseenter="openDropdown"
              @mouseleave="closeDropdown"
            >
              <button
                class="btn dropdown-toggle p-0"
                type="button"
                id="accountDropdown"
                aria-expanded="dropdownOpen"
              >
                <!-- Account SVG Icon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path
                    fill-rule="evenodd"
                    d="M8 9a5 5 0 0 0-4.546 2.916.5.5 0 0 0 .832.554A4 4 0 0 1 8 10a4 4 0 0 1 3.714 2.37.5.5 0 0 0 .832-.554A5 5 0 0 0 8 9z"
                  />
                </svg>
              </button>
              <ul
                class="dropdown-menu"
                :class="{ show: dropdownOpen }"
                aria-labelledby="accountDropdown"
              >
                <li>
                  <router-link class="dropdown-item" to="/account/profile"
                    >Profile</router-link
                  >
                </li>
                <li>
                  <router-link class="dropdown-item" to="/account/orders"
                    >Orders</router-link
                  >
                </li>
                <li>
                  <router-link class="dropdown-item" to="/account/transactions"
                    >Transactions</router-link
                  >
                </li>
                <li>
                  <router-link class="dropdown-item" to="/account/groups-communities"
                    >Groups</router-link
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="/login"
                    @click.prevent="logout()"
                    >Logout</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="banner-section w-100 position-relative">
      <img
        src="../../assets/hero-img-market.png"
        alt="Hero Image"
        class="img-fluid w-100 shadow-sm"
        style="border-radius: 0"
      />
      <!-- Added breadcrumb navigation with home icon on the banner -->
      <div class="breadcrumb-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center">
        <div class="container">
          <div class="d-flex align-items-center">
            <router-link to="/market" class="text-white me-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146Z"/>
              </svg>
            </router-link>
            <span class="text-white mx-2">&gt;</span>
            <span class="text-white fw-bold">Profile</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Banner with breadcrumb -->

    <!-- <div class="banner bg-dark text-white py-4" style="background-image: url('../../assets/profile-banner.jpg'); background-size: cover; background-position: center;">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <router-link to="/market" class="text-white">
                <i class="bi bi-house-door"></i>
              </router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/account/profile" class="text-white">Profile</router-link>
            </li>
          </ol>
        </nav>
      </div>
    </div> -->

    <!-- Main content -->
    <div class="container my-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="profile-title mb-0">Profile</h1>
      </div>

      <!-- Account Settings Section -->
      <div class="card mb-5 border rounded">
        <div class="card-body p-4">
          <h2 class="card-title mb-4">Account Settings</h2>

          <div class="row">
            <div class="col-md-8">
              <form @submit.prevent="saveAccountSettings">
                <div class="mb-3">
                  <label for="firstName" class="form-label">First name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="firstName"
                    v-model="user.firstName"
                    placeholder="Joshua"
                  />
                </div>

                <div class="mb-3">
                  <label for="lastName" class="form-label">Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lastName"
                    v-model="user.lastName"
                    placeholder="Joseph"
                  />
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="user.email"
                    placeholder="JoshuaJoseph@gmail.com"
                  />
                </div>

                <div class="mb-3">
                  <label for="phoneNumber" class="form-label"
                    >Phone Number</label
                  >
                  <input
                    type="tel"
                    class="form-control"
                    id="phoneNumber"
                    v-model="user.phoneNumber"
                    placeholder="+234 804 5555 7789"
                  />
                </div>

                <button type="submit" class="btn btn-success px-4 mt-2">
                  Save Changes
                </button>
              </form>
            </div>

            <div class="col-md-4 text-center">
              <div class="profile-image-container">
                <img
                  :src="user.profileImage"
                  alt="Profile Image"
                  class="rounded-circle profile-image img-fluid"
                />

                <div class="mt-3">
                  <button
                    @click="chooseImage"
                    class="btn btn-outline-success rounded-pill px-3"
                  >
                    Choose Image
                  </button>
                  <input
                    type="file"
                    ref="fileInput"
                    class="d-none"
                    accept="image/*"
                    @change="handleImageUpload"
                  />
                </div>
                <button
                  @click="deleteImage"
                  class="btn btn-link text-muted small mt-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Billing Address Section -->
      <div class="card mb-5 border rounded">
        <div class="card-body p-4">
          <h2 class="card-title mb-4">Billing Address</h2>

          <form @submit.prevent="saveBillingAddress">
            <div class="row">
              <div class="col-md-4 mb-3">
                <label for="billingFirstName" class="form-label"
                  >First name</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="billingFirstName"
                  v-model="billing.firstName"
                  placeholder="Joshua"
                />
              </div>

              <div class="col-md-4 mb-3">
                <label for="billingLastName" class="form-label"
                  >Last name</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="billingLastName"
                  v-model="billing.lastName"
                  placeholder="Joseph"
                />
              </div>

              <div class="col-md-4 mb-3">
                <label for="companyName" class="form-label"
                  >Company Name
                  <span class="text-muted">(optional)</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="companyName"
                  v-model="billing.companyName"
                  placeholder="Zakisoft"
                />
              </div>
            </div>

            <div class="mb-3">
              <label for="streetAddress" class="form-label"
                >Street Address</label
              >
              <input
                type="text"
                class="form-control"
                id="streetAddress"
                v-model="billing.streetAddress"
                placeholder="6140 Pari"
              />
            </div>

            <div class="row">
              <div class="col-md-4 mb-3">
                <label for="country" class="form-label">Country / Region</label>
                <div class="position-relative">
                  <select
                    class="form-select"
                    id="country"
                    v-model="billing.country"
                  >
                    <option value="United States">United States</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                  <span
                    class="position-absolute end-0 top-50 translate-middle-y pe-2"
                  >
                    <i class="bi bi-chevron-down"></i>
                  </span>
                </div>
              </div>

              <div class="col-md-4 mb-3">
                <label for="state" class="form-label">States</label>
                <div class="position-relative">
                  <select
                    class="form-select"
                    id="state"
                    v-model="billing.state"
                  >
                    <option value="Washington DC">Washington DC</option>
                    <option value="New York">New York</option>
                    <option value="California">California</option>
                    <option value="Texas">Texas</option>
                  </select>
                  <span
                    class="position-absolute end-0 top-50 translate-middle-y pe-2"
                  >
                    <i class="bi bi-chevron-down"></i>
                  </span>
                </div>
              </div>

              <div class="col-md-4 mb-3">
                <label for="zipCode" class="form-label">Zip Code</label>
                <input
                  type="text"
                  class="form-control"
                  id="zipCode"
                  v-model="billing.zipCode"
                  placeholder="20033"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="billingEmail" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="billingEmail"
                  v-model="billing.email"
                  placeholder="JoshuaJoseph@gmail.com"
                />
              </div>

              <div class="col-md-6 mb-3">
                <label for="billingPhone" class="form-label">Phone</label>
                <input
                  type="tel"
                  class="form-control"
                  id="billingPhone"
                  v-model="billing.phone"
                  placeholder="+234 804 5555 7789"
                />
              </div>
            </div>

            <button type="submit" class="btn btn-success px-4 mt-2">
              Save Changes
            </button>
          </form>
        </div>
      </div>

      <!-- Change Password Section -->
      <div class="card mb-5 border rounded">
        <div class="card-body p-4">
          <h2 class="card-title mb-4">Change Password</h2>

          <form @submit.prevent="changePassword">
            <div class="mb-3">
              <label for="currentPassword" class="form-label"
                >Current Password</label
              >
              <div class="position-relative">
                <input
                  :type="showCurrentPassword ? 'text' : 'password'"
                  class="form-control"
                  id="currentPassword"
                  v-model="passwords.current"
                  placeholder="Enter Current Password"
                />
                <button
                  class="btn position-absolute end-0 top-50 translate-middle-y"
                  type="button"
                  @click="showCurrentPassword = !showCurrentPassword"
                >
                  <i
                    class="bi"
                    :class="showCurrentPassword ? 'bi-eye-slash' : 'bi-eye'"
                  ></i>
                </button>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="newPassword" class="form-label">New Password</label>
                <div class="position-relative">
                  <input
                    :type="showNewPassword ? 'text' : 'password'"
                    class="form-control"
                    id="newPassword"
                    v-model="passwords.new"
                    placeholder="Enter New Password"
                  />
                  <button
                    class="btn position-absolute end-0 top-50 translate-middle-y"
                    type="button"
                    @click="showNewPassword = !showNewPassword"
                  >
                    <i
                      class="bi"
                      :class="showNewPassword ? 'bi-eye-slash' : 'bi-eye'"
                    ></i>
                  </button>
                </div>
              </div>

              <div class="col-md-6 mb-3">
                <label for="confirmPassword" class="form-label"
                  >Confirm Password</label
                >
                <div class="position-relative">
                  <input
                    :type="showConfirmPassword ? 'text' : 'password'"
                    class="form-control"
                    id="confirmPassword"
                    v-model="passwords.confirm"
                    placeholder="Confirm Password"
                  />
                  <button
                    class="btn position-absolute end-0 top-50 translate-middle-y"
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <i
                      class="bi"
                      :class="showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'"
                    ></i>
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-success px-4 mt-2">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Using the Footer component from Market.vue instead of the inline footer -->
    <Footer />
  </div>
</template>

<script>
import Footer from "../../components/MarketFooter.vue";

export default {
  name: "ProfilePage",
  components: {
    Footer,
  },
  data() {
    return {
      // For navbar
      searchQuery: "",

      // User account data
      user: {
        firstName: "Joshua",
        lastName: "Joseph",
        email: "JoshuaJoseph@gmail.com",
        phoneNumber: "+234 804 5555 7789",
        profileImage: "https://i.imgur.com/aq39RMA.jpg", // Using a placeholder image
      },

      // Billing address data
      billing: {
        firstName: "Joshua",
        lastName: "Joseph",
        companyName: "Zakisoft",
        streetAddress: "6140 Pari",
        country: "United States",
        state: "Washington DC",
        zipCode: "20033",
        email: "JoshuaJoseph@gmail.com",
        phone: "+234 804 5555 7789",
      },

      // Password change data
      passwords: {
        current: "",
        new: "",
        confirm: "",
      },

      // Toggle password visibility
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,

      dropdownOpen: false,
      dropdownTimeout: null,
      searchQuery: "",
      cartItemCount: 0, // This should be updated based on your cart data
      wishlistItemCount: 0, // This should be updated based on your wishlist data
      dropdownOpen: false,
      cartItems: [
        // { name: "Product 1", quantity: 2 },
        // { name: "Product 2", quantity: 1 },
      ],
    };
  },

  mounted() {
    // Add Bootstrap icons CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css";
    document.head.appendChild(link);
  },

  methods: {
    // Navbar methods
    handleSearch() {
      const query = this.searchQuery.trim();
      if (query) {
        // Handle search
        console.log("Searching for:", query);
      }
    },

    openDropdown() {
      if (this.dropdownTimeout) {
        clearTimeout(this.dropdownTimeout);
        this.dropdownTimeout = null;
      }
      this.dropdownOpen = true;
    },
    closeDropdown() {
      // Delay closing the dropdown to allow the user to move the mouse to the menu
      this.dropdownTimeout = setTimeout(() => {
        this.dropdownOpen = false;
      }, 300); // Adjust delay (in ms) as needed
    },
    goToCart() {
      // Navigate to the cart page
      this.$router.push("/cart");
    },
    goToWishlist() {
      // Redirect to the wishlist page
      this.$router.push("/wishlist");
    },
    logout() {
      console.log("Logging out...");

      this.$router.push("/login");
    },

    // Profile methods
    saveAccountSettings() {
      console.log("Saving account settings:", this.user);
      alert("Account settings saved successfully!");
    },

    chooseImage() {
      this.$refs.fileInput.click();
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.user.profileImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

    deleteImage() {
      this.user.profileImage = "https://i.imgur.com/aq39RMA.jpg"; // Reset to default avatar
    },

    saveBillingAddress() {
      console.log("Saving billing address:", this.billing);
      alert("Billing address saved successfully!");
    },

    changePassword() {
      if (this.passwords.new !== this.passwords.confirm) {
        alert("Passwords do not match!");
        return;
      }

      if (!this.passwords.current) {
        alert("Please enter your current password!");
        return;
      }

      console.log("Changing password...");
      // Reset password fields after successful change
      this.passwords.current = "";
      this.passwords.new = "";
      this.passwords.confirm = "";

      alert("Password changed successfully!");
    },
  },
  computed: {
    cartItemCount() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
  },
};
</script>

<style scoped>
/* Common styles */
body {
  font-family: "Inter", sans-serif;
}

.btn-success {
  background-color: rgb(25, 135, 84);
  border-color: rgb(25, 135, 84);
}

.btn-success:hover {
  background-color: #0e9888;
  border-color: #0e9888;
}

.btn-outline-success {
  color: rgb(25, 135, 84);
  border-color: rgb(25, 135, 84);
}

.btn-outline-success:hover {
  background-color: #14b8a6;
  color: white;
}

.text-success {
  color: #14b8a6 !important;
}

/* Navbar styles */
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-container {
  display: inline-flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 9999px;
  overflow: hidden;
  background-color: #fff;
  max-width: 400px;
}

.search-icon {
  width: 16px;
  height: 16px;
  margin-left: 12px;
  margin-right: 8px;
  color: #aaa;
}

.search-container input {
  flex: 1;
  border: none;
  outline: none;
  padding: 8px 0;
  color: #555;
  font-size: 14px;
}

.search-container button {
  background-color: rgb(25, 135, 84);
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
}

/* Profile page specific styles */
.banner {
  position: relative;
  background-color: #f8f9fa;
}

.banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.banner .container {
  position: relative;
  z-index: 2;
}

.profile-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.breadcrumb-item + .breadcrumb-item::before {
  color: rgba(255, 255, 255, 0.7);
}

.card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  border-color: #e0e0e0;
}

.card-title {
  color: #333;
  font-weight: 600;
  font-size: 1.25rem;
}

.form-label {
  font-weight: 500;
  color: #555;
  font-size: 0.9rem;
}

.form-control {
  padding: 0.6rem 0.75rem;
  border-color: #e0e0e0;
}

.form-control:focus {
  border-color: rgb(25, 135, 84);
  box-shadow: 0 0 0 0.25rem rgba(20, 184, 166, 0.25);
}

.form-select {
  padding: 0.6rem 0.75rem;
  border-color: #e0e0e0;
  background-image: none;
}

.form-select:focus {
  border-color: rgb(25, 135, 84);
  box-shadow: 0 0 0 0.25rem rgba(20, 184, 166, 0.25);
}

@media (max-width: 992px) {
  .search-container input,
  .search-container button {
    display: none !important;
  }

  .profile-image {
    width: 120px;
    height: 120px;
  }
}
</style>
