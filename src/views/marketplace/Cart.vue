<template>
  <div>
    <!-- Navbar -->
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
    <!-- Shopping Cart Section -->
    <div class="container py-5">
      <h2 class="mb-4 text-center">My Shopping Cart</h2>
      <div class="row">
        <!-- Cart Table -->
        <div class="col-12 col-md-8">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>SUBTOTAL</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in cartItems" :key="index">
                  <td class="d-flex align-items-center align-middle">
                    <img
                      :src="item.image"
                      alt=""
                      width="60"
                      class="me-3"
                      style="object-fit: cover"
                    />
                    <div>{{ item.name }}</div>
                  </td>
                  <td class="align-middle">{{ formatCurrency(item.price) }}</td>
                  <td class="align-middle">
                    <div class="d-flex align-items-center">
                      <button
                        class="btn btn-outline-secondary"
                        @click="decrementQty(index)"
                      >
                        -
                      </button>
                      <span class="mx-3">{{ item.quantity }}</span>
                      <button
                        class="btn btn-outline-secondary"
                        @click="incrementQty(index)"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td class="align-middle">
                    {{ formatCurrency(item.price * item.quantity) }}
                  </td>
                  <td class="align-middle">
                    <button
                      class="btn btn-outline-danger"
                      @click="removeItem(index)"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Cart Summary -->
        <div class="col-12 col-md-4 mt-4 mt-md-0">
          <div class="card p-4 shadow-sm">
            <h5>Cart Total</h5>
            <p class="fs-5 fw-bold">Total: {{ formatCurrency(totalPrice) }}</p>
            <router-link
              to="/checkout"
              class="btn btn-success w-100 rounded-pill py-2 mt-3"
            >
              Proceed to Checkout
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "../../components/MarketFooter.vue";

export default {
  name: "HomePage",
  components: {
    Footer,
  },
  data() {
    return {
      searchQuery: "",
      cartItems: [
        {
          name: "GOLDEN PENNY FLOUR",
          price: 62000,
          quantity: 7,
          image: "https://via.placeholder.com/60x60.png?text=Flour",
        },
        {
          name: "Green Apple",
          price: 500,
          quantity: 1,
          image: "https://via.placeholder.com/60x60.png?text=Apple",
        },
        {
          name: "Fresh Orange",
          price: 300,
          quantity: 2,
          image: "https://via.placeholder.com/60x60.png?text=Orange",
        },
        {
          name: "Fresh Banana",
          price: 200,
          quantity: 3,
          image: "https://via.placeholder.com/60x60.png?text=Banana",
        },
      ],
      wishlistItemCount: 0,
      cartItemCount: 0,
      dropdownOpen: false,
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
  },
  methods: {
    handleSearch() {
      console.log("Searching for:", this.searchQuery);
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("en-MU", {
        style: "currency",
        currency: "MUR",
      }).format(value);
    },
    goToWishlist() {
      this.$router.push("/wishlist");
    },
    goToCart() {
      this.$router.push("/cart");
    },
    incrementQty(index) {
      this.cartItems[index].quantity++;
    },
    decrementQty(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      }
    },
    removeItem(index) {
      this.cartItems.splice(index, 1);
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
    logout() {
      // Logout logic here
      this.$router.push("/login");
    },
  },
  mounted() {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      this.cartItems = storedCartItems;
    }
    this.cartItemCount = this.cartItems.length;
  },
};
</script>

<style>
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

.green {
  background-color: rgb(25, 135, 84);
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