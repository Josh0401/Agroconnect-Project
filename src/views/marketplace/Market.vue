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
          <SearchBar
            :current-language="$i18n.locale"
            :custom-placeholder="$t('search')"
            :custom-button-text="$t('search')"
          />
        </ul>
        <div class="d-flex align-items-center py-1">
          <!-- Language Selector Dropdown - Always Visible -->
          <LanguageDropdown class="me-3" />

          <!-- Logged Out UI Elements -->
          <div v-if="!isLoggedIn" class="d-flex align-items-center">
            <router-link to="/login" class="btn btn-outline-success me-2">
              {{ $t("login") }}
            </router-link>
            <router-link to="/signup" class="btn btn-success">
              {{ $t("signup") }}
            </router-link>
          </div>

          <!-- Logged In UI Elements -->
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

            <!-- Notification Bell Icon -->
            <button
              class="btn position-relative me-3"
              @click="goToNotifications"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-bell"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"
                />
              </svg>
              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                v-if="notificationCount > 0"
              >
                {{ notificationCount }}
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
                    {{ $t("profile") }}
                  </router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" to="/account/orders">
                    {{ $t("orders") }}
                  </router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" to="/account/transactions">
                    {{ $t("transactions") }}
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to="/account/groups-communities"
                  >
                    {{ $t("groupsCommunities", "Groups") }}
                  </router-link>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    @click.prevent="handleLogout"
                  >
                    {{ $t("logout") }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Rest of the page content remains the same -->
  <section class="container my-4">
    <div class="row">
      <!-- Large image on the left wrapped in a router-link -->
      <div class="col-md-8 mb-3 mb-md-0">
        <router-link to="/allproduct" class="d-block">
          <img
            src="../../assets/mkt-banner.png"
            alt=""
            class="img-fluid w-100"
          />
        </router-link>
      </div>

      <!-- Two stacked images on the right -->
      <div class="col-md-4">
        <div class="mb-3">
          <router-link to="/allproduct" class="d-block">
            <img
              src="../../assets/mkt-banner2.png"
              alt=""
              class="img-fluid w-100"
            />
          </router-link>
        </div>
        <div>
          <router-link to="/allproduct" class="d-block">
            <img
              src="../../assets/mkt-banner3.png"
              alt=""
              class="img-fluid w-100"
            />
          </router-link>
        </div>
      </div>
    </div>
  </section>

  <!-- Categories Section -->
  <Categories />

  <!-- Products Section with Clickable Cards -->
  <div class="products">
    <section class="newproduct">
      <div class="container">
        <div class="categories-header">
          <p class="h1">{{ $t("products") }}</p>
          <router-link to="/allproduct" class="view-all">
            {{ $t("viewAll") }} <span class="arrow">&rarr;</span>
          </router-link>
        </div>

        <!-- Loading Indicator -->
        <div v-if="productStore.isLoading" class="text-center my-5">
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2">{{ $t("loadingProducts") }}</p>
        </div>

        <!-- Error Message -->
        <div
          v-else-if="productStore.hasError"
          class="alert alert-danger"
          role="alert"
        >
          {{ productStore.getError }}
        </div>

        <!-- Products Grid -->
        <div v-else class="container my-5">
          <div
            class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4"
          >
            <!-- Dynamically display first 15 products -->
            <div
              v-for="product in limitedProducts"
              :key="product.id"
              class="col"
            >
              <router-link
                :to="{ path: `/product/${product.id}` }"
                class="text-decoration-none"
              >
                <div class="card h-100">
                  <img
                    :src="product.image"
                    class="card-img-top"
                    :alt="product.name"
                  />
                  <div class="card-body text-center">
                    <h5 class="card-title">{{ product.name }}</h5>
                    <p class="card-text">{{ product.unitPrice }}</p>
                    <p v-if="product.inStock <= 0" class="text-danger">
                      {{ $t("outOfStock") }}
                    </p>
                    <p v-else class="text-success">
                      {{ $t("inStock") }}: {{ product.inStock }}
                    </p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- New Products Section -->
  <div class="new-products">
    <section class="newproduct">
      <div class="container">
        <div class="categories-header">
          <p class="h1">{{ $t("newProducts") }}</p>
          <router-link to="/allproduct" class="view-all">
            {{ $t("viewAll") }} <span class="arrow">&rarr;</span>
          </router-link>
        </div>

        <!-- Loading Indicator -->
        <div v-if="productStore.isLoading" class="text-center my-5">
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2">{{ $t("loadingProducts") }}</p>
        </div>

        <!-- Error Message -->
        <div
          v-else-if="productStore.hasError"
          class="alert alert-danger"
          role="alert"
        >
          {{ productStore.getError }}
        </div>

        <!-- Products Grid -->
        <div v-else class="container my-5">
          <div
            class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4"
          >
            <!-- Dynamically display newest 15 products (we'll reverse the array to show newest first) -->
            <div
              v-for="product in newestProducts"
              :key="product.id"
              class="col"
            >
              <router-link
                :to="{ path: `/product/${product.id}` }"
                class="text-decoration-none"
              >
                <div class="card h-100">
                  <img
                    :src="product.image"
                    class="card-img-top"
                    :alt="product.name"
                  />
                  <div class="card-body text-center">
                    <h5 class="card-title">{{ product.name }}</h5>
                    <p class="card-text">{{ product.unitPrice }}</p>
                    <p v-if="product.inStock <= 0" class="text-danger">
                      {{ $t("outOfStock") }}
                    </p>
                    <p v-else class="text-success">
                      {{ $t("inStock") }}: {{ product.inStock }}
                    </p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <ChatBot />
  <Footer />
</template>

<script>
import { useI18n } from "vue-i18n";
import { useAuthStore } from "../../stores/auth";
import { useProductStore } from "../../stores/product";
import { useCartStore } from "../../stores/cart"; // Import cart store
import { useWishlistStore } from "../../stores/wishlist"; // Import wishlist store
import { useRouter } from "vue-router";
import Footer from "../../components/MarketFooter.vue";
import Categories from "../../components/Categories.vue";
import LanguageDropdown from "../../components/LanguageDropdown.vue";
import ChatBot from "../../components/ChatBot.vue";
import { computed, ref, onMounted } from "vue";
import SearchBar from "../../components/SearchBar.vue";

export default {
  name: "HomePage",
  components: {
    Footer,
    Categories,
    LanguageDropdown,
    ChatBot,
    SearchBar,
  },
  setup() {
    const { t } = useI18n();
    const authStore = useAuthStore();
    const productStore = useProductStore();
    const cartStore = useCartStore(); // Add cart store
    const wishlistStore = useWishlistStore(); // Add wishlist store
    const router = useRouter();

    // Auth state
    const isLoggedIn = computed(() => !!authStore.token);

    // Dropdown state
    const dropdownOpen = ref(false);
    let dropdownTimeout = null;

    // Get notification state
    const notificationCount = ref(3); // Example count, in reality would be fetched from an API

    // Computed properties for limited products
    const limitedProducts = computed(() => {
      return productStore.getProducts.slice(0, 15);
    });

    // For the "New Products" section, we'll show the latest 15 products (in reverse order)
    const newestProducts = computed(() => {
      // Create a copy of the array to avoid mutating the original
      const reversedProducts = [...productStore.getProducts];
      return reversedProducts.reverse().slice(0, 15);
    });

    // Computed properties for cart and wishlist counts - use the store getters
    const cartItemCount = computed(() => cartStore.getTotalItems);
    const wishlistItemCount = computed(() => wishlistStore.getWishlistCount);

    // Methods
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

    const handleLogout = () => {
      authStore.logout();
      // Clear cart and wishlist data on logout
      cartStore.clearCart();
      wishlistStore.clearWishlist();
      // Optionally add a success message or redirect
      location.reload(); // Refresh the page to reflect logged out state
    };

    const goToCart = () => {
      // Check if user is logged in before navigating
      if (isLoggedIn.value) {
        router.push("/cart");
      } else {
        router.push("/login");
      }
    };

    const goToWishlist = () => {
      // Check if user is logged in before navigating
      if (isLoggedIn.value) {
        router.push("/wishlist");
      } else {
        router.push("/login");
      }
    };

    const goToNotifications = () => {
      // Check if user is logged in before navigating
      if (isLoggedIn.value) {
        router.push("/notifications");
      } else {
        router.push("/login");
      }
    };

    // Check authentication and fetch products, cart, and wishlist on component mount
    onMounted(async () => {
      // Check if token exists in localStorage
      const token = localStorage.getItem("authToken");
      if (token && !authStore.token) {
        // Set the auth state if token exists but not set in store
        authStore.token = token;
        // Fetch user data including cart and wishlist if user is logged in
        if (isLoggedIn.value) {
          try {
            // Use Promise.allSettled to prevent one error from blocking the others
            await Promise.allSettled([
              cartStore.fetchCartItems(),
              wishlistStore.fetchWishlistItems(),
              fetchNotifications(),
            ]);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      }

      // Fetch products if they haven't been loaded yet
      if (productStore.getProducts.length === 0) {
        await productStore.fetchProducts();
      }
    });

    // Mock function to fetch notifications
    const fetchNotifications = () => {
      // In a real application, this would be an API call
      // For demo purposes, we're just setting a static value
      notificationCount.value = 3;
      return Promise.resolve(); // Return a resolved promise for consistent async handling
    };

    return {
      t,
      isLoggedIn,
      productStore,
      cartStore, // Export cart store for template
      wishlistStore, // Export wishlist store for template
      limitedProducts,
      newestProducts,
      dropdownOpen,
      wishlistItemCount,
      notificationCount,
      openDropdown,
      closeDropdown,
      handleLogout,
      goToCart,
      goToWishlist,
      goToNotifications,
      cartItemCount,
    };
  },
};
</script>

<style scoped>
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
  color: #f0f1f1;
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
