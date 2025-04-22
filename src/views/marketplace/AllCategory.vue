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
          <!-- Logged Out UI Elements -->
          <div v-if="!isLoggedIn" class="d-flex align-items-center">
            <router-link to="/login" class="btn btn-outline-success me-2">
              Login
            </router-link>
            <router-link to="/signup" class="btn btn-success">
              Sign Up
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
                  <a class="dropdown-item" href="#" @click.prevent="handleLogout"
                    >Logout</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  
  
  
  <div class="w-100 mt-3">
    <img
      src="../../assets/hero-img-market.png"
      alt="Hero Image"
      class="img-fluid w-100 shadow-sm"
      style="border-radius: 0"
    />
  </div>
  <div class="categories py-5">
    <!-- Back to Marketplace Button -->
  <div class="container mt-3">
    <router-link to="/market" class="back-to-market">
      <span class="arrow-left">&#8592;</span> Back to Marketplace
    </router-link>
  </div>
    <section class="newproduct">
      <div class="container">
        <div class="categories-header">
          <p class="h1">Categories</p>
        </div>
        <div class="container my-5">
          <div
            class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4"
          >
            <!-- Card 1: Herbs and Spices -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Herbs and Spices' },
                }"
                class="card h-100"
              >
                <img
                  src="../../assets/herb.jpg"
                  class="card-img-top"
                  alt="Herbs and Spices"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Herbs and Spices</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 2: Fresh Fruits -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Fresh Fruits' },
                }"
                class="card h-100"
              >
                <img
                  src="../../assets/fresh-fruit.png"
                  class="card-img-top"
                  alt="Fresh Fruits"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Fresh Fruits</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 3: Grains -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Grains' },
                }"
                class="card h-100"
              >
                <img
                  src="../../assets/grains.png"
                  class="card-img-top"
                  alt="Grains"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Grains</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 4: Roots and Tubers -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Roots and Tubers' },
                }"
                class="card h-100"
              >
                <img
                  src="../../assets/root-tuber.jpg"
                  class="card-img-top"
                  alt="Roots and Tubers"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Roots and Tubers</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 5: Nuts and Seeds -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Nuts and Seeds' },
                }"
                class="card h-100"
              >
                <img
                  src="../../assets/nut-seeds.png"
                  class="card-img-top"
                  alt="Nuts and Seeds"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Nuts and Seeds</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 6: Cooking -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Cooking' },
                }"
                class="card h-100"
              >
                <img
                  src="../../assets/cooking.png"
                  class="card-img-top"
                  alt="Cooking"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Cooking</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 7: Dairy Products -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Dairy Products' },
                }"
                class="card h-100"
              >
                <img
                  src="../../assets/dairy.png"
                  class="card-img-top"
                  alt="Dairy Products"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Dairy Products</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 8: Processed Foods -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Processed Foods' },
                }"
                class="card h-100"
              >
                <img
                  src="../../assets/processed-food.png"
                  class="card-img-top"
                  alt="Processed Foods"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Processed Foods</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 9: Agro Chemicals -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Agro Chemicals' },
                }"
                class="card h-100"
              >
                <img
                  src="../../assets/agro-chem.png"
                  class="card-img-top"
                  alt="Agro Chemicals"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Agro Chemicals</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 10: Diabetics -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Diabetics' },
                }"
                class="card h-100"
              >
                <img
                  src="../../assets/diabetic.png"
                  class="card-img-top"
                  alt="Diabetics"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Diabetics</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 11: Proteins -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Proteins' },
                }"
                class="card h-100"
              >
                <img
                  src="../../assets/protein.png"
                  class="card-img-top"
                  alt="Proteins"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Proteins</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 12: Baking Ingredients -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Baking Ingredients' },
                }"
                class="card h-100"
              >
                <img
                  src="../../assets/baking.png"
                  class="card-img-top"
                  alt="Baking Ingredients"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Baking Ingredients</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 13: Snacks and Pastries -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Snacks and Pastries' },
                }"
                class="card h-100"
              >
                <img
                  src="../../assets/snack.png"
                  class="card-img-top"
                  alt="Snacks and Pastries"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Snacks and Pastries</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 14: Cereals and Beverages -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Cereals and Beverages' },
                }"
                class="card h-100"
              >
                <img
                  src="../../assets/cereal.png"
                  class="card-img-top"
                  alt="Cereals"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Cereals and Beverages</h5>
                </div>
              </router-link>
            </div>
            <!-- Card 15: Fresh Vegetables -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Fresh Vegetables' },
                }"
                class="card h-100"
              >
                <img
                  src="../../assets/fresh-veg.png"
                  class="card-img-top"
                  alt="Fresh Vegetables"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Fresh Vegetables</h5>
                </div>
              </router-link>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>

  <Footer />
</template>

<script>
import { useAuthStore } from "../../stores/auth"; // Import auth store
import Footer from "../../components/MarketFooter.vue";
import { computed, ref, onMounted } from "vue";

export default {
  name: "Categories",
  components: {
    Footer,
  },
  setup() {
    const authStore = useAuthStore();
    
    // Auth state
    const isLoggedIn = computed(() => !!authStore.token);
    
    // UI state
    const dropdownOpen = ref(false);
    let dropdownTimeout = null;
    const searchQuery = ref("");
    const cartItems = ref([]);
    const wishlistItemCount = ref(0);
    
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
      // Optionally add a success message or redirect
      location.reload(); // Refresh the page to reflect logged out state
    };
    
    const handleSearch = () => {
      const query = searchQuery.value.trim();
      if (query) {
        // Implement search navigation
      }
    };
    
    const goToCart = () => {
      // Check if user is logged in before navigating
      if (isLoggedIn.value) {
        window.location.href = "/cart";
      } else {
        window.location.href = "/login";
      }
    };
    
    const goToWishlist = () => {
      // Check if user is logged in before navigating
      if (isLoggedIn.value) {
        window.location.href = "/wishlist";
      } else {
        window.location.href = "/login";
      }
    };
    
    // Computed properties
    const cartItemCount = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.quantity, 0);
    });
    
    // Check authentication on component mount
    onMounted(() => {
      // Check if token exists in localStorage
      const token = localStorage.getItem("authToken");
      if (token && !authStore.token) {
        // Set the auth state if token exists but not set in store
        authStore.token = token;
        // Optionally fetch user data
      }
    });
    
    return {
      isLoggedIn,
      dropdownOpen,
      searchQuery,
      cartItems,
      wishlistItemCount,
      openDropdown,
      closeDropdown,
      handleLogout,
      handleSearch,
      goToCart,
      goToWishlist,
      cartItemCount,
      // Category data
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
    };
  }
};
</script>

<style>
.card .card-title {
  text-decoration: none !important;
}

/* Back to marketplace link styling */
.back-to-market {
  display: inline-flex;
  align-items: center;
  color: #198754;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.back-to-market:hover {
  color: #0f5132;
}

.arrow-left {
  margin-right: 8px;
  font-size: 1.1em;
}

/* Rest of the styles remain unchanged */
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

/* CSS */
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
  color: #f7fbf9;
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
.card-title {
  text-decoration: none !important;
}

a .card-title,
router-link .card-title,
.card-title {
  text-decoration: none !important;
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