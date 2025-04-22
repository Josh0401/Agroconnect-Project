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
      <div class="container my-5">
        <div
          class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4"
        >
          <!-- Card 1 -->
          <div class="col">
            <router-link
              :to="{ path: '/product/hybrid-coconut-seedlings' }"
              class="text-decoration-none"
            >
              <div class="card h-100">
                <img
                  src="../../assets/hybrid-coconut.jpg"
                  class="card-img-top"
                  :alt="$t('hybridCoconutSeedlings')"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">
                    {{ $t("hybridCoconutSeedlings") }}
                  </h5>
                  <p class="card-text">{{ $t("currency") }}10</p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Card 2 -->
          <div class="col">
            <router-link
              :to="{ path: '/product/hybrid-tenera-oil-palm-seedlings' }"
              class="text-decoration-none"
            >
              <div class="card h-100">
                <img
                  src="../../assets/hybrid_tenera_oil_palm.jpg"
                  class="card-img-top"
                  :alt="$t('hybridTeneraOilPalmSeedlings')"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">
                    {{ $t("hybridTeneraOilPalmSeedlings") }}
                  </h5>
                  <p class="card-text">{{ $t("currency") }}15</p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Card 3 -->
          <div class="col">
            <router-link
              :to="{ path: '/product/tenera-oil-palm-sprouted-seeds' }"
              class="text-decoration-none"
            >
              <div class="card h-100">
                <img
                  src="../../assets/tenera_oil_palm_sprouted_seeds.jpg"
                  class="card-img-top"
                  :alt="$t('teneraOilPalmSproutedSeeds')"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">
                    {{ $t("teneraOilPalmSproutedSeeds") }}
                  </h5>
                  <p class="card-text">{{ $t("currency") }}20</p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Card 4 -->
          <div class="col">
            <router-link
              :to="{ path: '/product/black-eyed-pea-cowpea' }"
              class="text-decoration-none"
            >
              <div class="card h-100">
                <img
                  src="../../assets/cowpea.jpg"
                  class="card-img-top"
                  :alt="$t('blackEyedPeaCowpea')"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">{{ $t("blackEyedPeaCowpea") }}</h5>
                  <p class="card-text">{{ $t("currency") }}25</p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Card 5 -->
          <div class="col">
            <router-link
              :to="{ path: '/product/white-maize' }"
              class="text-decoration-none"
            >
              <div class="card h-100">
                <img
                  src="../../assets/white-maize.jpg"
                  class="card-img-top"
                  :alt="$t('whiteMaize')"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">{{ $t("whiteMaize") }}</h5>
                  <p class="card-text">{{ $t("currency") }}30</p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Card 6 -->
          <div class="col">
            <router-link
              :to="{ path: '/product/white-beans' }"
              class="text-decoration-none"
            >
              <div class="card h-100">
                <img
                  src="../../assets/white-beans.jpg"
                  class="card-img-top"
                  :alt="$t('whiteBeans')"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">{{ $t("whiteBeans") }}</h5>
                  <p class="card-text">{{ $t("currency") }}35</p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Card 7 -->
          <div class="col">
            <router-link
              :to="{ path: '/product/cassava' }"
              class="text-decoration-none"
            >
              <div class="card h-100">
                <img
                  src="../../assets/cassava.jpeg"
                  class="card-img-top"
                  :alt="$t('cassava')"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">{{ $t("cassava") }}</h5>
                  <p class="card-text">{{ $t("currency") }}40</p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Card 8 -->
          <div class="col">
            <router-link
              :to="{ path: '/product/mung-beans' }"
              class="text-decoration-none"
            >
              <div class="card h-100">
                <img
                  src="../../assets/mung-beans.jpg"
                  class="card-img-top"
                  :alt="$t('mungBeans')"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">{{ $t("mungBeans") }}</h5>
                  <p class="card-text">{{ $t("currency") }}45</p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Card 9 -->
          <div class="col">
            <router-link
              :to="{ path: '/product/red-kidney-beans' }"
              class="text-decoration-none"
            >
              <div class="card h-100">
                <img
                  src="../../assets/red-kidney-beans.jpg"
                  class="card-img-top"
                  :alt="$t('redKidneyBeans')"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">{{ $t("redKidneyBeans") }}</h5>
                  <p class="card-text">{{ $t("currency") }}50</p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Card 10 -->
          <div class="col">
            <router-link
              :to="{ path: '/product/soursop-tea' }"
              class="text-decoration-none"
            >
              <div class="card h-100">
                <img
                  src="../../assets/soursop-tea.jpg"
                  class="card-img-top"
                  :alt="$t('soursopTea')"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">{{ $t("soursopTea") }}</h5>
                  <p class="card-text">{{ $t("currency") }}55</p>
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
      </div>
      <div class="container my-5">
        <div
          class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4"
        >
          <!-- Card 1 -->
          <div class="col">
            <router-link
              :to="{ path: '/product/hybrid-coconut-seedlings' }"
              class="text-decoration-none"
            >
              <div class="card h-100">
                <img
                  src="../../assets/hybrid-coconut.jpg"
                  class="card-img-top"
                  :alt="$t('hybridCoconutSeedlings')"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">
                    {{ $t("hybridCoconutSeedlings") }}
                  </h5>
                  <p class="card-text">{{ $t("currency") }}10</p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Card 2 -->
          <div class="col">
            <router-link
              :to="{ path: '/product/hybrid-tenera-oil-palm-seedlings' }"
              class="text-decoration-none"
            >
              <div class="card h-100">
                <img
                  src="../../assets/hybrid_tenera_oil_palm.jpg"
                  class="card-img-top"
                  :alt="$t('hybridTeneraOilPalmSeedlings')"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">
                    {{ $t("hybridTeneraOilPalmSeedlings") }}
                  </h5>
                  <p class="card-text">{{ $t("currency") }}15</p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Card 3 -->
          <div class="col">
            <router-link
              :to="{ path: '/product/tenera-oil-palm-sprouted-seeds' }"
              class="text-decoration-none"
            >
              <div class="card h-100">
                <img
                  src="../../assets/tenera_oil_palm_sprouted_seeds.jpg"
                  class="card-img-top"
                  :alt="$t('teneraOilPalmSproutedSeeds')"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">
                    {{ $t("teneraOilPalmSproutedSeeds") }}
                  </h5>
                  <p class="card-text">{{ $t("currency") }}20</p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Card 4 -->
          <div class="col">
            <router-link
              :to="{ path: '/product/black-eyed-pea-cowpea' }"
              class="text-decoration-none"
            >
              <div class="card h-100">
                <img
                  src="../../assets/cowpea.jpg"
                  class="card-img-top"
                  :alt="$t('blackEyedPeaCowpea')"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">{{ $t("blackEyedPeaCowpea") }}</h5>
                  <p class="card-text">{{ $t("currency") }}25</p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Card 5 -->
          <div class="col">
            <router-link
              :to="{ path: '/product/white-maize' }"
              class="text-decoration-none"
            >
              <div class="card h-100">
                <img
                  src="../../assets/white-maize.jpg"
                  class="card-img-top"
                  :alt="$t('whiteMaize')"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">{{ $t("whiteMaize") }}</h5>
                  <p class="card-text">{{ $t("currency") }}30</p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Card 6 -->
          <div class="col">
            <router-link
              :to="{ path: '/product/white-beans' }"
              class="text-decoration-none"
            >
              <div class="card h-100">
                <img
                  src="../../assets/white-beans.jpg"
                  class="card-img-top"
                  :alt="$t('whiteBeans')"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">{{ $t("whiteBeans") }}</h5>
                  <p class="card-text">{{ $t("currency") }}35</p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Card 7 -->
          <div class="col">
            <router-link
              :to="{ path: '/product/cassava' }"
              class="text-decoration-none"
            >
              <div class="card h-100">
                <img
                  src="../../assets/cassava.jpeg"
                  class="card-img-top"
                  :alt="$t('cassava')"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">{{ $t("cassava") }}</h5>
                  <p class="card-text">{{ $t("currency") }}40</p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Card 8 -->
          <div class="col">
            <router-link
              :to="{ path: '/product/mung-beans' }"
              class="text-decoration-none"
            >
              <div class="card h-100">
                <img
                  src="../../assets/mung-beans.jpg"
                  class="card-img-top"
                  :alt="$t('mungBeans')"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">{{ $t("mungBeans") }}</h5>
                  <p class="card-text">{{ $t("currency") }}45</p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Card 9 -->
          <div class="col">
            <router-link
              :to="{ path: '/product/red-kidney-beans' }"
              class="text-decoration-none"
            >
              <div class="card h-100">
                <img
                  src="../../assets/red-kidney-beans.jpg"
                  class="card-img-top"
                  :alt="$t('redKidneyBeans')"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">{{ $t("redKidneyBeans") }}</h5>
                  <p class="card-text">{{ $t("currency") }}50</p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Card 10 -->
          <div class="col">
            <router-link
              :to="{ path: '/product/soursop-tea' }"
              class="text-decoration-none"
            >
              <div class="card h-100">
                <img
                  src="../../assets/soursop-tea.jpg"
                  class="card-img-top"
                  :alt="$t('soursopTea')"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">{{ $t("soursopTea") }}</h5>
                  <p class="card-text">{{ $t("currency") }}55</p>
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
import { useAuthStore } from "../../stores/auth"; // Import auth store
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
    
    // Auth state
    const isLoggedIn = computed(() => !!authStore.token);
    
    // Dropdown state
    const dropdownOpen = ref(false);
    let dropdownTimeout = null;
    
    // Search, cart and wishlist state
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
      t,
      isLoggedIn,
      dropdownOpen,
      cartItems,
      wishlistItemCount,
      openDropdown,
      closeDropdown,
      handleLogout,
      goToCart,
      goToWishlist,
      cartItemCount
    };
  }
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