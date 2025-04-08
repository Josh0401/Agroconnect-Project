<template>
  <div class="orders-page">
    <!-- Navbar component - reusing the same structure from ProfilePage -->
    <nav class="navbar navbar-expand-lg sticky-top bg-white shadow-sm py-3">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="/">
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
    <!-- Banner with breadcrumb -->

    <div class="w-100">
      <img
        src="../../assets/hero-img-market.png"
        alt="Hero Image"
        class="img-fluid w-100 shadow-sm"
        style="border-radius: 0"
      />
    </div>
    <!-- <div
        class="banner bg-dark text-white py-4"
        style="
          background-image: url('../../assets/profile-banner.jpg');
          background-size: cover;
          background-position: center;
        "
      >
        <div class="container">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <router-link to="/market" class="text-white">
                  <i class="bi bi-house-door"></i>
                </router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/account/orders" class="text-white"
                  >Order History</router-link
                >
              </li>
            </ol>
          </nav>
        </div>
      </div> -->

    <!-- Main content -->
    <div class="container my-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="profile-title mb-0">Transaction History</h1>
      </div>

      <!-- Orders Table Section -->
      <div class="table-responsive">
        <table class="table table-bordered table-hover text-center">
          <thead class="table-light">
            <tr>
              <th>TRANSACTION ID</th>
              <th>DATE</th>
              <th>AMOUNT</th>
              <th>PAYMENT METHOD</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td>{{ transaction.id }}</td>
              <td>{{ formatDate(transaction.date) }}</td>
              <td>
                Rs{{
                  transaction.amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })
                }}
              </td>
              <td>{{ transaction.method }}</td>
              <td>{{ transaction.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Footer - reusing the same structure from ProfilePage -->
    <Footeer />
    <!-- <footer class="bg-light py-4 mt-5">
          <div class="container">
            <div class="row">
              <div class="col-md-3 mb-4 mb-md-0">
                <a class="d-inline-block mb-3" href="/">
                  <img src="../../assets/Agroconnect.png" alt="AgroEase Logo" height="40" />
                </a>
                <p class="small text-muted">© 2023. All rights reserved</p>
              </div>
              
              <div class="col-md-9">
                <div class="row">
                  <div class="col-md-8">
                    <div class="d-flex flex-wrap gap-4">
                      <a href="/home" class="text-decoration-none text-dark">Home</a>
                      <a href="/about-us" class="text-decoration-none text-dark">About Us</a>
                      <a href="/services" class="text-decoration-none text-dark">Services</a>
                      <a href="/faqs" class="text-decoration-none text-dark">FAQs</a>
                      <a href="/contact" class="text-decoration-none text-dark">Contact</a>
                    </div>
                    
                    <div class="d-flex flex-wrap gap-4 mt-3">
                      <a href="/privacy-policy" class="text-decoration-none text-muted small">Privacy Policy</a>
                      <a href="/terms" class="text-decoration-none text-muted small">Terms of Conditions</a>
                      <a href="/legal" class="text-decoration-none text-muted small">Legal</a>
                      <a href="/help" class="text-decoration-none text-muted small">Help</a>
                    </div>
                  </div>
                  
                  <div class="col-md-4">
                    <div class="d-flex gap-3 mb-3 justify-content-md-end">
                      <a href="#" class="text-dark"><i class="bi bi-facebook fs-5"></i></a>
                      <a href="#" class="text-dark"><i class="bi bi-instagram fs-5"></i></a>
                      <a href="#" class="text-dark"><i class="bi bi-linkedin fs-5"></i></a>
                      <a href="#" class="text-dark"><i class="bi bi-whatsapp fs-5"></i></a>
                    </div>
                    
                    <div class="d-flex gap-2 justify-content-md-end">
                      <a href="#" class="text-decoration-none">
                        <img src="../../assets/google-play.png" alt="Google Play" height="40">
                      </a>
                      <a href="#" class="text-decoration-none">
                        <img src="../../assets/app-store.png" alt="App Store" height="40">
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer> -->
    <Footer />
  </div>
</template>

<script>
// Import the OrderDetails component
import OrderDetails from "./OrderDetails.vue";
import Footer from "../../components/MarketFooter.vue";

export default {
  name: "TransactionHistory",
  components: {
    OrderDetails,
    Footer,
  },
  data() {
    return {
      // For navbar
      dropdownTimeout: null,
      searchQuery: "",
      cartItemCount: 0, // This should be updated based on your cart data
      wishlistItemCount: 0, // This should be updated based on your wishlist data
      dropdownOpen: false,
      cartItems: [
        // { name: "Product 1", quantity: 2 },
        // { name: "Product 2", quantity: 1 },
      ],

      transactions: [
        {
          id: "3919842299",
          date: "2024-06-26T14:04:00",
          amount: 100,
          method: "paystack",
          status: "success",
        },
        {
          id: "3919842299",
          date: "2024-06-26T14:04:00",
          amount: 90,
          method: "flutterwave",
          status: "success",
        },
        {
          id: "3913938086",
          date: "2024-06-24T19:46:00",
          amount: 600,
          method: "paystack",
          status: "success",
        },
        {
          id: "3904938855",
          date: "2024-06-22T03:23:00",
          amount: 90,
          method: "paystack",
          status: "success",
        },
        {
          id: "3892399118",
          date: "2024-06-18T11:22:00",
          amount: 100,
          method: "paystack",
          status: "success",
        },
        {
          id: "3891023190",
          date: "2024-06-17T20:03:00",
          amount: 150,
          method: "paystack",
          status: "success",
        },
        {
          id: "3891023190",
          date: "2024-06-17T20:03:00",
          amount: 51.12,
          method: "flutterwave",
          status: "success",
        },
        {
          id: "3891023190",
          date: "2024-06-17T20:03:00",
          amount: 90.3,
          method: "flutterwave",
          status: "success",
        },
      ],
    };
  },

  computed: {
    cartItemCount() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
  },

  methods: {
    formatDate(dateStr) {
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      return new Date(dateStr).toLocaleString(undefined, options);
    },
    formatAmount(amount) {
      return amount.toLocaleString(undefined, { minimumFractionDigits: 2 });
    },
    // Navbar methods

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
    logout() {
      console.log("Logging out...");

      this.$router.push("/login");
    },

    handleSearch() {
      const query = this.searchQuery.trim();
      if (query) {
        // Example: route to a "SearchResults" page, passing the query
        this.$router.push({
          name: "SearchResults",
          query: { q: query },
        });
      }
    },

    goToCart() {
      // Navigate to the cart page
      this.$router.push("/cart");
    },
    goToWishlist() {
      // Redirect to the wishlist page
      this.$router.push("/wishlist");
    },

    // Date formatting helper
  },
};
</script>

<style scoped>
/* Common styles */
.nav-item.dropdown:hover .dropdown-menu {
  display: block;
  margin-top: 0;
}
.card-img-top {
  object-fit: cover;
  height: 200px;
}
.card {
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.navbar-nav .nav-link {
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
}
.navbar-nav .nav-link:hover,
.navbar-nav .nav-link.active {
  color: black;
}
body {
  font-family: "Inter", sans-serif;
}
.account-dropdown .dropdown-menu {
  margin-top: 0.5rem;
}
.btn-success {
  background-color: rgb(25, 135, 84);
  border-color: rgb(25, 135, 84);
}

.btn-success:hover {
  background-color: rgb(25, 135, 84);
  border-color: #0e9888;
}

.btn-outline-success {
  color: rgb(25, 135, 84);
  border-color: #14b8a6;
}

.btn-outline-success:hover {
  background-color: #14b8a6;
  color: white;
}
.search-container input {
  flex: 1; /* expands to fill remaining space */
  border: none; /* remove default border */
  outline: none; /* remove focus outline */
  padding: 8px 0; /* vertical padding; no horizontal since .search-container has it */
  color: #555;
  font-size: 14px;
}
.text-success {
  color: rgb(25, 135, 84) !important;
}

/* Navbar styles */
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-container {
  display: inline-flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 9999px; /* makes it fully rounded */
  overflow: hidden; /* ensures children respect the rounded border */
  background-color: #fff;
  max-width: 400px; /* optional: control the max width */
  flex-wrap: wrap;
}
.search-container button:hover {
  background-color: #007f68;
  color: #fff;
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

/* Banner styles */
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

.breadcrumb-item + .breadcrumb-item::before {
  color: rgba(255, 255, 255, 0.7);
}

/* Order page specific styles */
.card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  border-color: #e0e0e0;
}

.table {
  margin-bottom: 0;
}

.table th {
  font-weight: 600;
  color: #555;
  border-top: none;
  padding: 15px 10px;
}

.table td {
  padding: 15px 10px;
  vertical-align: middle;
}

.badge {
  font-weight: 500;
}

.btn:hover {
  /* background-color: #fff; */
  color: #198754;
}

.page-link:focus {
  box-shadow: 0 0 0 0.25rem rgba(106, 90, 205, 0.25);
}

/* Responsive styles */
@media (max-width: 992px) {
  .search-container input,
  .search-container button {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .table {
    min-width: 700px;
  }

  th,
  td {
    font-size: 0.85rem;
  }
}
</style>
