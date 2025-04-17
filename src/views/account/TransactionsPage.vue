<template>
  <div class="orders-page">
    <!-- Navbar component - reusing the same structure from ProfilePage -->
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
    <!-- Banner with breadcrumb -->

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
            <span class="text-white fw-bold">Transactions</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="container my-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="profile-title mb-0">Transactions History</h1>
      </div>

      <!-- Updated Transactions Table Section to match the provided design -->
      <div class="transactions-table-container bg-light rounded-3 p-3">
        <table class="table transactions-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in paginatedTransactions" :key="transaction.id">
              <td class="transaction-id">#{{ transaction.id }}</td>
              <td>{{ formatSimpleDate(transaction.date) }}</td>
              <td class="fw-medium">Rs {{ formatAmount(transaction.amount) }}</td>
              <td>{{ capitalizeFirstLetter(transaction.method) }}</td>
              <td>
                <span 
                  class="status-badge" 
                  :class="{
                    'confirmed': transaction.status === 'success',
                    'failed': transaction.status === 'failed'
                  }"
                >
                  {{ getStatusDisplay(transaction.status) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="d-flex justify-content-center mt-4">
        <nav aria-label="Transactions pagination">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(currentPage - 1)">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li 
              v-for="page in displayedPages" 
              :key="page" 
              class="page-item" 
              :class="{ active: currentPage === page }"
            >
              <template v-if="page === '...'">
                <span class="page-link">{{ page }}</span>
              </template>
              <template v-else>
                <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
              </template>
            </li>
            <li class="page-item" v-if="showEllipsis">
              <span class="page-link">...</span>
            </li>
            <li class="page-item" v-if="totalPages > 5 && !displayedPages.includes(totalPages)">
              <a class="page-link" href="#" @click.prevent="changePage(totalPages)">{{ totalPages }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(currentPage + 1)">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Footer -->
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
      // For pagination
      currentPage: 1,
      totalPages: 21,
      itemsPerPage: 8,

      // Sample transaction data with 24 entries to test pagination
      transactions: [
        {
          id: "SKU5756",
          date: "2023-11-15T14:04:00",
          amount: 60000,
          method: "Juice",
          status: "success",
        },
        {
          id: "SKU5756",
          date: "2023-11-15T14:04:00",
          amount: 60000,
          method: "Juice",
          status: "failed",
        },
        {
          id: "SKU5756",
          date: "2023-11-15T19:46:00",
          amount: 60000,
          method: "Juice",
          status: "failed",
        },
        {
          id: "SKU5756",
          date: "2023-11-15T03:23:00",
          amount: 60000,
          method: "Stripe",
          status: "failed",
        },
        {
          id: "SKU5756",
          date: "2023-11-15T11:22:00",
          amount: 60000,
          method: "PayPal",
          status: "failed",
        },
        {
          id: "SKU5756",
          date: "2023-11-15T20:03:00",
          amount: 60000,
          method: "PayPal",
          status: "failed",
        },
        {
          id: "SKU5756",
          date: "2023-11-15T20:03:00",
          amount: 60000,
          method: "transfer",
          status: "success",
        },
        {
          id: "SKU5756",
          date: "2023-11-15T20:03:00",
          amount: 60000,
          method: "transfer",
          status: "success",
        },
        // Additional transactions for pagination testing
        {
          id: "SKU5757",
          date: "2023-11-16T10:30:00",
          amount: 45000,
          method: "transfer",
          status: "success",
        },
        {
          id: "SKU5758",
          date: "2023-11-16T12:15:00",
          amount: 32000,
          method: "transfer",
          status: "failed",
        },
        {
          id: "SKU5759",
          date: "2023-11-17T09:22:00",
          amount: 78000,
          method: "PayPal",
          status: "success",
        },
        {
          id: "SKU5760",
          date: "2023-11-17T14:45:00",
          amount: 56000,
          method: "PayPal",
          status: "success",
        },
        {
          id: "SKU5761",
          date: "2023-11-18T08:10:00",
          amount: 92000,
          method: "Stripe",
          status: "failed",
        },
        {
          id: "SKU5762",
          date: "2023-11-18T16:30:00",
          amount: 41000,
          method: "Stripe",
          status: "success",
        },
        {
          id: "SKU5763",
          date: "2023-11-19T11:05:00",
          amount: 63000,
          method: "transfer",
          status: "success",
        },
        {
          id: "SKU5764",
          date: "2023-11-19T17:20:00",
          amount: 27000,
          method: "Juice",
          status: "failed",
        },
      ],
    };
  },

  computed: {
    cartItemCount() {
      return this.cartItems ? this.cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
    },
    
    // Pagination computed properties
    paginatedTransactions() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.transactions.slice(start, end);
    },
    
    displayedPages() {
      if (this.totalPages <= 5) {
        return Array.from({ length: this.totalPages }, (_, i) => i + 1);
      }

      if (this.currentPage <= 3) {
        return [1, 2, 3, 4, 5];
      }

      if (this.currentPage >= this.totalPages - 2) {
        return Array.from({ length: 5 }, (_, i) => this.totalPages - 4 + i);
      }

      return [
        this.currentPage - 2,
        this.currentPage - 1,
        this.currentPage,
        this.currentPage + 1,
        this.currentPage + 2,
      ];
    },
    
    // Determine if we should show ellipsis in pagination
    showEllipsis() {
      return this.totalPages > 5 && this.currentPage < this.totalPages - 2;
    }
  },

  methods: {
    // Updated date formatter to match the design (just date without time)
    formatSimpleDate(dateStr) {
      const options = {
        day: "numeric",
        month: "short",
        year: "numeric"
      };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
    
    // Keep the original date formatter for other uses
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
      return amount.toLocaleString();
    },
    
    // Helper to capitalize first letter
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    
    // Convert status to display format
    getStatusDisplay(status) {
      switch(status) {
        case 'success':
          return 'Confirmed';
        case 'failed':
          return 'Failed';
        default:
          return status.charAt(0).toUpperCase() + status.slice(1);
      }
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
    
    // Pagination method
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        // Scroll to top of table
        this.$nextTick(() => {
          const tableTop = document.querySelector('.transactions-table-container');
          if (tableTop) {
            tableTop.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    },
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

/* Global cursor styles for all clickable elements */
button, 
a, 
.btn, 
[role="button"],
select,
input[type="submit"],
input[type="reset"],
input[type="button"] {
  cursor: pointer;
}

input[disabled], 
button[disabled],
.btn.disabled,
a.disabled,
.page-item.disabled .page-link {
  cursor: not-allowed;
}

.pagination .page-item.page-ellipsis .page-link {
  cursor: default;
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

/* Banner styles with overlay for breadcrumb */
.banner-section {
  position: relative;
}

.breadcrumb-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

/* Transaction table styles to match the design */
.transactions-table-container {
  border-radius: 8px;
  background-color: #f8f9fa;
}

.transactions-table {
  margin-bottom: 0;
  border-collapse: separate;
  border-spacing: 0;
}

.transactions-table thead th {
  font-weight: 600;
  color: #555;
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f8f9fa;
}

.transactions-table tbody td {
  padding: 15px;
  vertical-align: middle;
  border-bottom: 1px solid #e0e0e0;
  background-color: white;
}

.transaction-id {
  font-weight: 500;
  color: #555;
}

/* Status badge styles */
.status-badge {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  display: inline-block;
  cursor: default;
}

.status-badge.confirmed {
  background-color: rgba(25, 135, 84, 0.1);
  color: rgb(25, 135, 84);
}

.status-badge.failed {
  background-color: rgba(220, 53, 69, 0.1);
  color: #dc3545;
}

/* Pagination styles to match OrdersPage */
.pagination {
  gap: 5px;
}

.pagination .page-item.disabled .page-link {
  color: #aaa;
}

.pagination .page-item.active .page-link {
  background-color: #6a5acd;
  border-color: #6a5acd;
  color: white;
}

.pagination .page-item.page-ellipsis .page-link {
  background: transparent;
}

.pagination .page-item .page-link:hover:not(.active):not(.disabled) {
  background-color: #f0f0f0;
}

.pagination .page-item .page-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #333;
  margin: 0 3px;
  border: 1px solid #dee2e6;
  background-color: #fff;
  font-weight: 500;
}

/* Responsive styles */
@media (max-width: 992px) {
  .search-container input,
  .search-container button {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .transactions-table {
    min-width: 700px;
  }

  th,
  td {
    font-size: 0.85rem;
  }
}
</style>