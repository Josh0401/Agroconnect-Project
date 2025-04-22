<template>
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
              :placeholder="t.search || 'Search'"
              @keydown.enter="handleSearch"
              v-model="searchQuery"
              class="d-none d-lg-block form-control me-2"
            />
            <button
              type="button"
              @click="handleSearch"
              class="d-none d-lg-block btn btn-outline-secondary"
            >
              {{ t.search || "Search" }}
            </button>
          </div>
        </ul>
        <div class="d-flex align-items-center py-1">
          <!-- Language Selector Dropdown - New Component -->
          <LanguageDropdown
            class="me-3"
            @language-changed="handleLanguageChange"
          />

          <!-- Logged out state -->
          <div v-if="!isLoggedIn" class="d-flex align-items-center">
            <router-link to="/login" class="btn btn-outline-success me-2">
              {{ t.login || "Login" }}
            </router-link>
            <router-link to="/register" class="btn btn-success">
              {{ t.register || "Register" }}
            </router-link>
          </div>

          <!-- Logged in state -->
          <div v-else class="d-flex align-items-center">
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
                  <router-link class="dropdown-item" to="/account/profile">
                    {{ t.profile || "Profile" }}
                  </router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" to="/account/orders">
                    {{ t.orders || "Orders" }}
                  </router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" to="/account/transactions">
                    {{ t.transactions || "Transactions" }}
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to="/account/groups-communities"
                  >
                    {{ t.groupsCommunities || "Groups" }}
                  </router-link>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="/login"
                    @click.prevent="logout()"
                  >
                    {{ t.logout || "Logout" }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div class="container py-4">
    <div class="container mt-3">
    <router-link to="/market" class="back-to-market">
      <span class="arrow-left">&#8592;</span> Back to Marketplace
    </router-link>
  </div>
    <div class="row">
      <!-- Sidebar: Categories -->
      <aside class="col-md-3 mb-4">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Categories</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li
              v-for="category in categories"
              :key="category"
              class="list-group-item list-group-item-action"
              :class="{ active: category === selectedCategory }"
              @click="selectCategory(category)"
              style="cursor: pointer"
            >
              {{ category }}
            </li>
          </ul>
        </div>
      </aside>

      <!-- Products Section -->
      <section class="col-md-9">
        <div class="mb-3">
          <h4>{{ selectedCategory }}</h4>
          <small class="text-muted"
            >{{ filteredProducts.length }} Results Found</small
          >
        </div>
        <div class="row">
          <div
            class="col-sm-6 col-lg-4 mb-4"
            v-for="product in filteredProducts"
            :key="product.id"
          >
            <div class="card h-100">
              <img
                v-if="product.imageUrl"
                :src="product.imageUrl"
                :alt="product.title"
                class="card-img-top"
              />
              <div class="card-body">
                <h5 class="card-title">{{ product.title }}</h5>
                <p class="card-text text-success">\${{ product.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  <Footer />
</template>

<script>
import { useRoute } from "vue-router";
import img from "../../assets/cowpea.jpg"; // Example image
import Footer from "../../components/MarketFooter.vue";
import LanguageDropdown from "../../components/LanguageDropdown.vue";
import { translations } from "../../translations";

export default {
  components: {
    Footer,
    LanguageDropdown,
  },

  data() {
    return {
      // Authentication state
      isLoggedIn: false,
      // Language properties
      currentLanguage: "en",
      t: translations.en, // Default to English
      // Sample list of categories
      categories: [
        "Herbs and Spices",
        "Fresh Fruits",
        "Grains",
        "Roots and Tubers",
        "Nuts and Seeds",
        "Cooking",
        "Dairy Products",
        "Processed Foods",
        "Agro Chemicals",
        "Diabetics",
        "Proteins",
        "Baking Ingredients",
        "Snacks and Pastries",
        "Cereals and Beverages",
        "Fresh Vegetables",
      ],

      // Sample products data
      products: [
        {
          id: 1,
          category: "Herbs and Spices",
          title: "Capsicum",
          price: 2.9,
          imageUrl: img,
        },
        {
          id: 2,
          category: "Herbs and Spices",
          title: "Soursop Tea with Ginger",
          price: 11.99,
          imageUrl: img,
        },
        {
          id: 3,
          category: "Fresh Fruits",
          title: "Apples",
          price: 0.99,
          imageUrl: img,
        },
        // ... more products
      ],

      selectedCategory: null,
      searchQuery: "",
      dropdownOpen: false,
      wishlistItemCount: 0,
      cartItemCount: 0,
      cartItems: [],
    };
  },

  computed: {
    filteredProducts() {
      return this.products.filter(
        (product) => product.category === this.selectedCategory
      );
    },
    cartItemCount() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
  },

  watch: {
    "$route.query.category": {
      handler(newCategory) {
        if (newCategory && this.categories.includes(newCategory)) {
          this.selectedCategory = newCategory;
        }
      },
      immediate: true,
    },
  },

  created() {
    const route = useRoute();
    // Set the default selected category from the URL query if valid,
    // otherwise default to the first category in the list.
    this.selectedCategory =
      route.query.category && this.categories.includes(route.query.category)
        ? route.query.category
        : this.categories[0];
        
    // Check if user is logged in
    this.checkLoginStatus();
  },

  methods: {
    // Check login status
    checkLoginStatus() {
      // In a real application, you would check with your authentication service
      // For now, we'll use localStorage as a simple example
      const token = localStorage.getItem('authToken');
      this.isLoggedIn = !!token;
    },
    
    // Login method (for development purposes)
    login() {
      localStorage.setItem('authToken', 'sample-token');
      this.isLoggedIn = true;
    },
    
    selectCategory(category) {
      this.selectedCategory = category;
      // Optionally, you could update the URL query parameter here as well.
    },

    openDropdown() {
      if (this.dropdownTimeout) {
        clearTimeout(this.dropdownTimeout);
        this.dropdownTimeout = null;
      }
      this.dropdownOpen = true;
    },
    closeDropdown() {
      this.dropdownTimeout = setTimeout(() => {
        this.dropdownOpen = false;
      }, 300);
    },

    logout() {
      console.log("Logging out...");
      // Remove auth token
      localStorage.removeItem('authToken');
      this.isLoggedIn = false;
      this.$router.push("/login");
    },
    handleSearch() {
      const query = this.searchQuery.trim();
      if (query) {
        this.$router.push({
          name: "SearchResults",
          query: { q: query },
        });
      }
    },

    handleLanguageChange(langCode) {
      if (translations[langCode]) {
        this.currentLanguage = langCode;
        this.t = translations[langCode];
        // Save to localStorage for persistence
        localStorage.setItem("preferredLanguage", langCode);
      }
    },

    goToCart() {
      if (this.isLoggedIn) {
        this.$router.push("/cart");
      } else {
        // Redirect to login with return URL
        this.$router.push({
          path: "/login",
          query: { redirect: "/cart" }
        });
      }
    },
    goToWishlist() {
      if (this.isLoggedIn) {
        this.$router.push("/wishlist");
      } else {
        // Redirect to login with return URL
        this.$router.push({
          path: "/login",
          query: { redirect: "/wishlist" }
        });
      }
    },
  },
  mounted() {
    // Load saved language preference if available
    const savedLang = localStorage.getItem("preferredLanguage");
    if (savedLang && translations[savedLang]) {
      this.currentLanguage = savedLang;
      this.t = translations[savedLang];
    }
  },
};
</script>

<style scoped>
/* Optional: Additional styling for active list group items */
.list-group-item.active {
  background-color: rgb(25, 135, 84);
  border-color: rgb(25, 135, 84);
  color: #fff;
}

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
a {
  text-decoration: none;
}
body {
  width: 200% !important;
}
.green {
  background-color: rgb(25, 135, 84);
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
.account-dropdown .dropdown-menu {
  margin-top: 0.5rem;
}
/* Search icon styling */
.search-icon {
  width: 16px;
  height: 16px;
  margin-left: 12px;
  margin-right: 8px; /* optional spacing between icon & input */
  color: #aaa;
}

/* Search input styling */
.search-container input {
  flex: 1; /* expands to fill remaining space */
  border: none; /* remove default border */
  outline: none; /* remove focus outline */
  padding: 8px 0; /* vertical padding; no horizontal since .search-container has it */
  color: #555;
  font-size: 14px;
}

/* Search button styling */
.search-container button {
  background-color: rgb(25, 135, 84); /* green */
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
}

/* Hover state for the button */
.search-container button:hover {
  background-color: #007f68;
  color: #fff;
}
.card {
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.btn:hover {
  /* background-color: #fff; */
  color: #e5ece9;
}
.categories-header {
  display: flex;
  align-items: center;
  justify-content: space-between; /* pushes "View All →" to the right */
  margin-bottom: 1rem; /* optional spacing */
}

.categories-header h2 {
  margin: 0;
  font-size: 1.25rem; /* adjust as needed */
}

.view-all {
  color: #009879; /* green color */
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.view-all:hover {
  color: #007f68; /* darker green on hover */
}

.arrow {
  margin-left: 4px; /* small spacing before arrow */
}
.card {
  position: relative;
  overflow: hidden; /* ensures the zoomed image doesn't exceed the card bounds */
  transition: transform 0.3s ease;
}

.card-img-top {
  transition: transform 0.3s ease;
}

.card:hover .card-img-top {
  transform: scale(1.05); /* zoom in the image */
}

.card:hover .card-title {
  color: rgb(25, 135, 84); /* change text color on hover */
}
.card:hover {
  cursor: pointer;
}
@media (max-width: 992px) {
  .search-container input,
  .search-container button {
    display: none !important;
  }
}
</style>