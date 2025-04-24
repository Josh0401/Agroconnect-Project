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
            <!-- Wishlist badge -->
            <span
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              v-if="wishlistStore.getWishlistCount > 0"
            >
              {{ wishlistStore.getWishlistCount }}
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
              v-if="cartStore.getTotalItems > 0"
            >
              {{ cartStore.getTotalItems }}
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
                <router-link
                  class="dropdown-item"
                  to="/account/groups-communities"
                  >Groups</router-link
                >
              </li>
              <li>
                <a class="dropdown-item" href="#" @click.prevent="logout"
                  >Logout</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <div class="w-100">
    <img
      src="../../assets/hero-img-market.png"
      alt="Hero Image"
      class="img-fluid w-100 shadow-sm"
      style="border-radius: 0"
    />
  </div>

  <div class="container my-5">
    <h2 class="text-center mb-4">My Wishlist</h2>

    <!-- Loading state -->
    <div v-if="wishlistStore.isLoading" class="text-center py-5">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3">Loading your wishlist...</p>
    </div>

    <!-- Error state -->
    <div
      v-else-if="wishlistStore.hasError"
      class="alert alert-danger"
      role="alert"
    >
      {{ wishlistStore.getError }}
    </div>

    <!-- Wishlist content -->
    <div
      class="table-responsive"
      v-else-if="wishlistStore.getWishlistItems.length > 0"
    >
      <table class="table align-middle table-bordered">
        <thead class="bg-light">
          <tr>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>STOCK STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in wishlistStore.getWishlistItems" :key="item.id">
            <!-- Product name + image -->
            <td class="d-flex align-items-center">
              <img
                :src="item.image"
                :alt="item.name"
                class="me-3"
                style="width: 60px; height: 60px; object-fit: cover"
              />
              {{ item.name }}
            </td>

            <!-- Price (formatted) -->
            <td>{{ formatPrice(item.price) }}</td>

            <!-- Stock status -->
            <td>
              <span
                :class="
                  item.stockStatus === 'In Stock'
                    ? 'text-success'
                    : 'text-danger'
                "
              >
                {{ item.stockStatus }}
              </span>
            </td>

            <!-- Actions -->
            <td>
              <button
                class="btn btn-success me-2"
                :disabled="
                  item.stockStatus === 'Out of Stock' || wishlistStore.isLoading
                "
                @click="moveToCart(item.id)"
              >
                Move to cart
              </button>
              <button
                class="btn btn-danger"
                @click="removeFromWishlist(item.id)"
                :disabled="wishlistStore.isLoading"
              >
                <i class="fas fa-times"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty wishlist state -->
    <div class="text-center py-5" v-else>
      <div class="mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          fill="currentColor"
          class="bi bi-heart text-muted"
          viewBox="0 0 16 16"
        >
          <path
            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
          />
        </svg>
      </div>
      <h3>Your wishlist is empty</h3>
      <p class="text-muted mb-4">Start exploring and save items you like!</p>
      <router-link to="/market" class="btn btn-success"
        >Continue Shopping</router-link
      >
    </div>
  </div>

  <!-- Toast notification -->
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div
      :class="['toast', 'align-items-center', { show: showToast }]"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">
          <i :class="toastIcon"></i>
          {{ toastMessage }}
        </div>
        <button
          type="button"
          class="btn-close me-2 m-auto"
          @click="showToast = false"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../../stores/cart";
import { useWishlistStore } from "../../stores/wishlist";
import { useAuthStore } from "../../stores/auth";
import Footer from "../../components/MarketFooter.vue";

export default {
  name: "Wishlist",
  components: {
    Footer,
  },
  setup() {
    const wishlistStore = useWishlistStore();
    const cartStore = useCartStore();
    const authStore = useAuthStore();
    const router = useRouter();

    const searchQuery = ref("");
    const dropdownOpen = ref(false);
    let dropdownTimeout = null;

    // Toast notification state
    const showToast = ref(false);
    const toastMessage = ref("");
    const toastIcon = ref("bi bi-check-circle-fill text-success me-2");

    const showToastNotification = (message, type = "success") => {
      toastMessage.value = message;
      toastIcon.value =
        type === "success"
          ? "bi bi-check-circle-fill text-success me-2"
          : "bi bi-exclamation-circle-fill text-danger me-2";
      showToast.value = true;

      // Auto-hide toast after 3 seconds
      setTimeout(() => {
        showToast.value = false;
      }, 3000);
    };

    const handleSearch = () => {
      if (searchQuery.value) {
        router.push({ path: "/search", query: { q: searchQuery.value } });
      }
    };

    const goToWishlist = () => {
      router.push("/wishlist");
    };

    const goToCart = () => {
      router.push("/cart");
    };

    const moveToCart = async (wishlistItemId) => {
      try {
        const result = await wishlistStore.moveToCart(wishlistItemId);
        if (result.success) {
          showToastNotification("Item moved to cart", "success");
        } else {
          showToastNotification("Failed to move item to cart", "error");
        }
      } catch (error) {
        console.error("Error moving item to cart:", error);
        showToastNotification("An error occurred", "error");
      }
    };

    const removeFromWishlist = async (wishlistItemId) => {
      try {
        const result = await wishlistStore.removeFromWishlist(wishlistItemId);
        if (result.success) {
          showToastNotification("Item removed from wishlist", "success");
        } else {
          showToastNotification("Failed to remove item", "error");
        }
      } catch (error) {
        console.error("Error removing item from wishlist:", error);
        showToastNotification("An error occurred", "error");
      }
    };

    const formatPrice = (value) => {
      // Handle string values with "Rs" prefix
      if (typeof value === "string" && value.startsWith("Rs")) {
        value = value.replace("Rs", "").trim();
      }

      // Format with Rs prefix and thousand separators
      return `Rs ${parseFloat(value).toLocaleString()}`;
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
      authStore.logout();
      router.push("/login");
    };

    // Fetch wishlist data when component mounts
    onMounted(async () => {
      if (authStore.token) {
        await wishlistStore.fetchWishlistItems();
        await cartStore.fetchCartItems();
      } else {
        router.push("/login");
      }
    });

    return {
      wishlistStore,
      cartStore,
      searchQuery,
      dropdownOpen,
      showToast,
      toastMessage,
      toastIcon,
      handleSearch,
      goToWishlist,
      goToCart,
      moveToCart,
      removeFromWishlist,
      formatPrice,
      openDropdown,
      closeDropdown,
      logout,
    };
  },
};
</script>

<style>
.table thead th {
  background-color: #f8f9fa; /* Light gray background for header */
}

.table td,
.table th {
  vertical-align: middle; /* Center vertically */
}

.table td img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}
.btn-teal {
  background-color: #179e90;
  color: white;
  font-size: 1rem;
  font-weight: 500;
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
.table-responsive {
  min-height: 300px; /* adjust the value as needed */
}

.green {
  background-color: rgb(25, 135, 84);
}

/* Toast styling */
.toast {
  transition: opacity 0.3s ease;
  opacity: 0;
  background-color: rgba(255, 255, 255, 0.95);
  border-left: 4px solid #198754;
}

.toast.show {
  opacity: 1;
}

/* CSS */
.search-container {
  display: inline-flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 9999px;
  overflow: hidden;
  background-color: #fff;
  max-width: 400px;
  flex-wrap: wrap;
}
.account-dropdown .dropdown-menu {
  margin-top: 0.5rem;
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
.search-container button:hover {
  background-color: #007f68;
  color: #fff;
}

/* Vertical alignment for table cells */
.table td,
.table th {
  vertical-align: middle;
}

/* Responsive adjustments (if needed) */
@media (max-width: 576px) {
  .navbar-brand img {
    height: 30px;
  }
  .search-container {
    max-width: 100%;
  }
  .table-responsive {
    font-size: 0.9rem;
  }
}
</style>
