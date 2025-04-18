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
            <span class="text-white fw-bold">Order History</span>
          </div>
        </div>
      </div>
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
        <h1 class="profile-title mb-0">Order History</h1>
      </div>

      <!-- Orders Table Section -->
      <div class="card mb-5 border rounded">
        <div class="card-body p-4">
          <!-- Filters Row -->
          <div class="row mb-4">
            <div class="col-md-6">
              <div class="input-group">
                <span class="input-group-text bg-light border-end-0">
                  <i class="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  class="form-control border-start-0"
                  placeholder="Search orders..."
                  v-model="filterText"
                  @input="applyFilters"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="d-flex justify-content-md-end">
                <select
                  class="form-select w-auto me-2"
                  v-model="statusFilter"
                  @change="applyFilters"
                >
                  <option value="">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <select
                  class="form-select w-auto"
                  v-model="dateFilter"
                  @change="applyFilters"
                >
                  <option value="">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Product ID</th>
                  <th scope="col">Date</th>
                  <th scope="col">Product</th>
                  <th scope="col">Total</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Status</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody v-if="paginatedOrders.length > 0">
                <tr v-for="order in paginatedOrders" :key="order.id">
                  <td class="text-muted">{{ order.productId }}</td>
                  <td>{{ formatDate(order.date) }}</td>
                  <td>{{ order.product }}</td>
                  <td>Rs {{ order.total.toLocaleString() }}</td>
                  <td>{{ order.quantity }}</td>
                  <td>
                    <span
                      class="badge rounded-pill px-3 py-2"
                      :class="getStatusClass(order.status)"
                    >
                      {{ order.status }}
                    </span>
                  </td>
                  <td>
                    <!-- Use the OrderDetails component -->
                    <OrderDetails
                      :order="order"
                      :delivery-info="deliveryInfo"
                      :payment-info="{
                        method: 'Credit Card',
                        transactionId: `#TXN${order.id + 5000}`,
                      }"
                      @track-order="trackOrder"
                      @reorder="reorderItem"
                    />
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="7" class="text-center py-5">
                    <div class="d-flex flex-column align-items-center">
                      <i
                        class="bi bi-inbox text-muted"
                        style="font-size: 2.5rem"
                      ></i>
                      <h5 class="mt-3 mb-1">No Orders Found</h5>
                      <p class="text-muted">
                        No orders match your current filters
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <nav
            aria-label="Order history pagination"
            v-if="filteredOrders.length > 0"
          >
            <ul class="pagination justify-content-center mt-4">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a
                  class="page-link"
                  href="#"
                  aria-label="Previous"
                  @click.prevent="changePage(currentPage - 1)"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li
                v-for="page in displayedPages"
                :key="page"
                class="page-item"
                :class="{ active: currentPage === page }"
              >
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="changePage(page)"
                  >{{ page }}</a
                >
              </li>
              <li class="page-item d-none d-md-block" v-if="showEllipsis">
                <span class="page-link">...</span>
              </li>
              <li
                class="page-item d-none d-md-block"
                v-if="totalPages > 5 && !displayedPages.includes(totalPages)"
              >
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="changePage(totalPages)"
                  >{{ totalPages }}</a
                >
              </li>
              <li
                class="page-item"
                :class="{
                  disabled: currentPage === totalPages || totalPages === 0,
                }"
              >
                <a
                  class="page-link"
                  href="#"
                  aria-label="Next"
                  @click.prevent="changePage(currentPage + 1)"
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <!-- Footer - reusing the same structure from ProfilePage -->
    <Footeer />
    <!-- <footer class="bg-light py-4 mt-5">
        <div class="container">
          <div class="row">
            <div class="col-md-3 mb-4 mb-md-0">
              <a class="d-inline-block mb-3" href="/market">
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
  name: "OrdersPage",
  components: {
    OrderDetails,
    Footer,
  },
  data() {
    return {
      // For navbar
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

      // For filtering and pagination
      currentPage: 1,
      itemsPerPage: 5,
      filterText: "",
      statusFilter: "",
      dateFilter: "",

      // Common user delivery info for all orders
      deliveryInfo: {
        name: "Joshua Joseph",
        address: "6140 Pari, Washington DC",
        country: "United States",
        zipCode: "20033",
        phone: "+234 804 5555 7789",
      },

      // Computed copy of orders after applying filters
      filteredOrders: [],

      // Orders data - expanded with more samples and varied statuses for pagination demo
      allOrders: [
        {
          id: 1,
          productId: "#SKU5756",
          date: "2025-04-05",
          product: "Bag of Rice",
          total: 60000,
          quantity: 5,
          status: "Confirmed",
        },
        {
          id: 2,
          productId: "#SKU5757",
          date: "2025-04-04",
          product: "Bag of Rice",
          total: 60000,
          quantity: 7,
          status: "Pending",
        },
        {
          id: 3,
          productId: "#SKU5758",
          date: "2025-04-03",
          product: "Bag of Rice",
          total: 60000,
          quantity: 3,
          status: "Pending",
        },
        {
          id: 4,
          productId: "#SKU5759",
          date: "2025-04-03",
          product: "Bag of Rice",
          total: 60000,
          quantity: 8,
          status: "Pending",
        },
        {
          id: 5,
          productId: "#SKU5760",
          date: "2025-04-02",
          product: "Bag of Rice",
          total: 60000,
          quantity: 4,
          status: "Pending",
        },
        {
          id: 6,
          productId: "#SKU5761",
          date: "2025-04-01",
          product: "Bag of Beans",
          total: 45000,
          quantity: 6,
          status: "Shipped",
        },
        {
          id: 7,
          productId: "#SKU5762",
          date: "2025-03-30",
          product: "Bag of Maize",
          total: 35000,
          quantity: 8,
          status: "Delivered",
        },
        {
          id: 8,
          productId: "#SKU5763",
          date: "2025-03-25",
          product: "Bag of Rice",
          total: 60000,
          quantity: 10,
          status: "Delivered",
        },
        {
          id: 9,
          productId: "#SKU5764",
          date: "2025-03-20",
          product: "Bag of Millet",
          total: 40000,
          quantity: 3,
          status: "Cancelled",
        },
        {
          id: 10,
          productId: "#SKU5765",
          date: "2025-03-15",
          product: "Bag of Sorghum",
          total: 42000,
          quantity: 2,
          status: "Delivered",
        },
        {
          id: 11,
          productId: "#SKU5766",
          date: "2025-03-10",
          product: "Bag of Wheat",
          total: 65000,
          quantity: 5,
          status: "Delivered",
        },
        {
          id: 12,
          productId: "#SKU5767",
          date: "2025-03-05",
          product: "Bag of Cassava",
          total: 30000,
          quantity: 4,
          status: "Delivered",
        },
        {
          id: 13,
          productId: "#SKU5768",
          date: "2025-03-01",
          product: "Bag of Groundnut",
          total: 55000,
          quantity: 3,
          status: "Delivered",
        },
        {
          id: 14,
          productId: "#SKU5769",
          date: "2025-02-25",
          product: "Palm Oil (20L)",
          total: 25000,
          quantity: 2,
          status: "Delivered",
        },
        {
          id: 15,
          productId: "#SKU5770",
          date: "2025-02-20",
          product: "Yam Tubers (Large)",
          total: 32000,
          quantity: 15,
          status: "Delivered",
        },
        {
          id: 16,
          productId: "#SKU5771",
          date: "2025-02-15",
          product: "Irish Potatoes",
          total: 18000,
          quantity: 10,
          status: "Delivered",
        },
        {
          id: 17,
          productId: "#SKU5772",
          date: "2025-02-10",
          product: "Sweet Potatoes",
          total: 15000,
          quantity: 12,
          status: "Delivered",
        },
        {
          id: 18,
          productId: "#SKU5773",
          date: "2025-02-05",
          product: "Fresh Tomatoes",
          total: 22000,
          quantity: 5,
          status: "Delivered",
        },
        {
          id: 19,
          productId: "#SKU5774",
          date: "2025-02-01",
          product: "Fresh Pepper",
          total: 18000,
          quantity: 3,
          status: "Delivered",
        },
        {
          id: 20,
          productId: "#SKU5775",
          date: "2025-01-25",
          product: "Onions",
          total: 12000,
          quantity: 6,
          status: "Delivered",
        },
      ],
    };
  },

  computed: {
    // Calculate the total number of pages based on filtered orders and items per page
    totalPages() {
      return Math.ceil(this.filteredOrders.length / this.itemsPerPage);
    },

    // Get the current page of orders to display
    paginatedOrders() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredOrders.slice(startIndex, endIndex);
    },

    // Calculate which page numbers to display in pagination
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
    },
    cartItemCount() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
  },

  mounted() {
    // Add Bootstrap icons CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css";
    document.head.appendChild(link);

    // Initialize filtered orders on component mount
    this.applyFilters();
  },

  methods: {
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
    formatDate(dateString) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString("en-US", options);
    },

    // Get CSS class for status badge
    getStatusClass(status) {
      const statusClasses = {
        Confirmed: "bg-success",
        Pending: "bg-secondary",
        Shipped: "bg-primary",
        Delivered: "bg-info",
        Cancelled: "bg-danger",
      };

      return statusClasses[status] || "bg-secondary";
    },

    // Filtering methods
    applyFilters() {
      let result = [...this.allOrders];

      // Apply text filter
      if (this.filterText) {
        const searchText = this.filterText.toLowerCase();
        result = result.filter(
          (order) =>
            order.productId.toLowerCase().includes(searchText) ||
            order.product.toLowerCase().includes(searchText)
        );
      }

      // Apply status filter
      if (this.statusFilter) {
        result = result.filter((order) => order.status === this.statusFilter);
      }

      // Apply date filter
      if (this.dateFilter) {
        const today = new Date();
        const todayStart = new Date(today);
        todayStart.setHours(0, 0, 0, 0);

        switch (this.dateFilter) {
          case "today":
            result = result.filter((order) => {
              const orderDate = new Date(order.date);
              return orderDate >= todayStart && orderDate <= today;
            });
            break;

          case "week":
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay());
            weekStart.setHours(0, 0, 0, 0);
            result = result.filter((order) => {
              const orderDate = new Date(order.date);
              return orderDate >= weekStart && orderDate <= today;
            });
            break;

          case "month":
            const monthStart = new Date(
              today.getFullYear(),
              today.getMonth(),
              1
            );
            result = result.filter((order) => {
              const orderDate = new Date(order.date);
              return orderDate >= monthStart && orderDate <= today;
            });
            break;

          case "year":
            const yearStart = new Date(today.getFullYear(), 0, 1);
            result = result.filter((order) => {
              const orderDate = new Date(order.date);
              return orderDate >= yearStart && orderDate <= today;
            });
            break;
        }
      }

      // Update filtered orders and reset to first page
      this.filteredOrders = result;
      this.currentPage = 1;
    },

    // Pagination methods
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        // Scroll to top of the table for better user experience
        this.$nextTick(() => {
          const tableTop = document.querySelector(".table-responsive");
          if (tableTop) {
            tableTop.scrollIntoView({ behavior: "smooth" });
          }
        });
      }
    },

    // Auth methods

    // Order action methods
    trackOrder(order) {
      console.log(`Tracking order ${order.productId}`);
      // Implement order tracking functionality
      this.$router.push(`/orders/track/${order.id}`);
    },

    reorderItem(order) {
      console.log(`Reordering ${order.product}, quantity: ${order.quantity}`);
      // Add the same product to cart
      this.$router.push("/cart");
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

/* Pagination styles */
.page-link {
  color: #333;
  border-radius: 50%;
  margin: 0 3px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-item.active .page-link {
  background-color: #6a5acd;
  border-color: #6a5acd;
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
}
</style>
