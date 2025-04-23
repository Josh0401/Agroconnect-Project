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
          <!-- Add "All Products" option at the top -->
          <ul class="list-group list-group-flush">
            <li
              class="list-group-item list-group-item-action"
              :class="{ active: selectedCategory === 'All' }"
              @click="selectCategory('All')"
              style="cursor: pointer"
            >
              All Products
            </li>
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
          <h4>
            {{ selectedCategory === "All" ? "All Products" : selectedCategory }}
          </h4>
          <small class="text-muted"
            >{{ filteredProducts.length }} Results Found</small
          >
        </div>

        <!-- Loading indicator -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2">Loading products...</p>
        </div>

        <!-- No results message -->
        <div v-else-if="filteredProducts.length === 0" class="text-center py-5">
          <p>No products found in this category.</p>
        </div>

        <!-- Products grid -->
        <div v-else class="row">
          <div
            class="col-sm-6 col-lg-4 mb-4"
            v-for="product in filteredProducts"
            :key="product.id"
          >
            <router-link
              :to="{ path: `/product/${product.id}` }"
              class="text-decoration-none"
            >
              <div class="card h-100">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="card-img-top"
                />
                <div class="card-body">
                  <h5 class="card-title">{{ product.name }}</h5>
                  <p class="card-text text-success">{{ product.unitPrice }}</p>
                  <p v-if="product.inStock <= 0" class="text-danger">
                    Out of Stock
                  </p>
                  <p v-else class="text-success">
                    In Stock: {{ product.inStock }}
                  </p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
  <Footer />
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "../../stores/product"; // Import product store
import { ref, computed, onMounted, watch } from "vue";
import Footer from "../../components/MarketFooter.vue";
import LanguageDropdown from "../../components/LanguageDropdown.vue";
import { translations } from "../../translations";

export default {
  components: {
    Footer,
    LanguageDropdown,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const productStore = useProductStore();

    // State
    const isLoggedIn = ref(false);
    const currentLanguage = ref("en");
    const t = ref(translations.en);
    const loading = ref(true);
    const selectedCategory = ref("All");
    const searchQuery = ref("");
    const dropdownOpen = ref(false);
    const wishlistItemCount = ref(0);
    const cartItems = ref([]);
    let dropdownTimeout = null;

    // Category list - includes all possible product categories
    const categories = [
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
    ];

    // Category mapping for API standardization
    const categoryMapping = {
      "herbs and spices": "Herbs and Spices",
      "fresh fruits": "Fresh Fruits",
      grains: "Grains",
      "roots and tubers": "Roots and Tubers",
      "nuts and seeds": "Nuts and Seeds",
      cooking: "Cooking",
      "dairy products": "Dairy Products",
      "processed foods": "Processed Foods",
      "agro chemicals": "Agro Chemicals",
      diabetics: "Diabetics",
    };

    // Get category from product using mapping
    const getProductCategory = (product) => {
      const productCategory = product.category.toLowerCase();
      return categoryMapping[productCategory] || product.category;
    };

    // Computed: Filtered products based on selected category
    const filteredProducts = computed(() => {
      if (selectedCategory.value === "All") {
        return productStore.getProducts;
      }

      return productStore.getProducts.filter((product) => {
        const productCategory = getProductCategory(product);
        return productCategory === selectedCategory.value;
      });
    });

    // Computed: Cart item count
    const cartItemCount = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.quantity, 0);
    });

    // Watch for route changes to update category
    watch(
      () => route.query.category,
      (newCategory) => {
        if (newCategory) {
          selectedCategory.value = newCategory;
        } else {
          selectedCategory.value = "All";
        }
      },
      { immediate: true }
    );

    // Methods
    const selectCategory = (category) => {
      selectedCategory.value = category;
      // Update URL query parameter
      router.push({
        query: { category: category === "All" ? undefined : category },
      });
    };

    const checkLoginStatus = () => {
      const token = localStorage.getItem("authToken");
      isLoggedIn.value = !!token;
    };

    const openDropdown = () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
        dropdownTimeout = null;
      }
      dropdownOpen.value = true;
    };

    const closeDropdown = () => {
      dropdownTimeout = setTimeout(() => {
        dropdownOpen.value = false;
      }, 300);
    };

    const logout = () => {
      localStorage.removeItem("authToken");
      isLoggedIn.value = false;
      router.push("/login");
    };

    const handleSearch = () => {
      const query = searchQuery.value.trim();
      if (query) {
        router.push({
          name: "SearchResults",
          query: { q: query },
        });
      }
    };

    const handleLanguageChange = (langCode) => {
      if (translations[langCode]) {
        currentLanguage.value = langCode;
        t.value = translations[langCode];
        localStorage.setItem("preferredLanguage", langCode);
      }
    };

    const goToCart = () => {
      if (isLoggedIn.value) {
        router.push("/cart");
      } else {
        router.push({
          path: "/login",
          query: { redirect: "/cart" },
        });
      }
    };

    const goToWishlist = () => {
      if (isLoggedIn.value) {
        router.push("/wishlist");
      } else {
        router.push({
          path: "/login",
          query: { redirect: "/wishlist" },
        });
      }
    };

    // Lifecycle hooks
    onMounted(async () => {
      // Check login status
      checkLoginStatus();

      // Load saved language preference
      const savedLang = localStorage.getItem("preferredLanguage");
      if (savedLang && translations[savedLang]) {
        currentLanguage.value = savedLang;
        t.value = translations[savedLang];
      }

      // Set category from URL query parameter
      if (route.query.category) {
        selectedCategory.value = route.query.category;
      }

      // Fetch products if not already loaded
      loading.value = true;
      if (productStore.getProducts.length === 0) {
        await productStore.fetchProducts();
      }
      loading.value = false;
    });

    return {
      isLoggedIn,
      currentLanguage,
      t,
      loading,
      categories,
      selectedCategory,
      searchQuery,
      dropdownOpen,
      wishlistItemCount,
      cartItems,
      filteredProducts,
      cartItemCount,
      selectCategory,
      openDropdown,
      closeDropdown,
      logout,
      handleSearch,
      handleLanguageChange,
      goToCart,
      goToWishlist,
    };
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

/* Back to marketplace link styling */
.back-to-market {
  display: inline-flex;
  align-items: center;
  color: #198754;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
  margin-bottom: 20px;
}

.back-to-market:hover {
  color: #0f5132;
}

.arrow-left {
  margin-right: 8px;
  font-size: 1.1em;
}

@media (max-width: 992px) {
  .search-container input,
  .search-container button {
    display: none !important;
  }
}
</style>
