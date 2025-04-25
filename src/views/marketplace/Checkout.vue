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
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85-.708-.708-3.85-3.85zm-5.242.656
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
    <!-- Loading indicator -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3">Processing your order...</p>
    </div>

    <!-- Order placed success -->
    <div v-else-if="orderPlaced" class="text-center py-5">
      <div class="mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          fill="currentColor"
          class="bi bi-check-circle-fill text-success"
          viewBox="0 0 16 16"
        >
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
          />
        </svg>
      </div>
      <h3>Order Placed Successfully!</h3>
      <p class="text-muted mb-4">
        Thank you for your order. You will be redirected to your orders page.
      </p>
    </div>

    <!-- Error message -->
    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <!-- Checkout form -->
    <div v-else class="row">
      <!-- Shipping Information Section -->
      <div class="col-12 col-md-7 mb-5 mb-md-0">
        <h4 class="mb-4">Shipping Information</h4>
        <form @submit.prevent="placeOrder">
          <!-- First & Last Name -->
          <div class="row mb-3">
            <div class="col-12 col-sm-6">
              <label for="firstName" class="form-label">First Name</label>
              <input
                type="text"
                id="firstName"
                v-model="firstName"
                class="form-control"
                placeholder="Enter first name"
                required
              />
            </div>
            <div class="col-12 col-sm-6 mt-3 mt-sm-0">
              <label for="lastName" class="form-label">Last Name</label>
              <input
                type="text"
                id="lastName"
                v-model="lastName"
                class="form-control"
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          <!-- Shipping Address -->
          <div class="mb-3">
            <label for="shippingAddress" class="form-label"
              >Shipping Address</label
            >
            <input
              type="text"
              id="shippingAddress"
              v-model="shippingAddress"
              class="form-control"
              placeholder="Enter your address"
              required
            />
          </div>

          <!-- State & City -->
          <div class="row mb-3">
            <div class="col-12 col-sm-6">
              <label for="state" class="form-label">State</label>
              <input
                type="text"
                id="state"
                v-model="state"
                class="form-control"
                placeholder="State"
                required
              />
            </div>
            <div class="col-12 col-sm-6 mt-3 mt-sm-0">
              <label for="city" class="form-label">City</label>
              <input
                type="text"
                id="city"
                v-model="city"
                class="form-control"
                placeholder="City"
                required
              />
            </div>
          </div>

          <!-- Email & Phone -->
          <div class="row mb-3">
            <div class="col-12 col-sm-6">
              <label for="email" class="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                v-model="email"
                class="form-control"
                placeholder="example@email.com"
                required
              />
            </div>
            <div class="col-12 col-sm-6 mt-3 mt-sm-0">
              <label for="phone" class="form-label">Phone Number</label>
              <input
                type="text"
                id="phone"
                v-model="phone"
                class="form-control"
                placeholder="e.g. 09012345678"
                required
              />
            </div>
          </div>

          <!-- Additional Info -->
          <div class="mb-3">
            <label for="orderNotes" class="form-label"
              >Additional Info (Optional)</label
            >
            <textarea
              id="orderNotes"
              v-model="orderNotes"
              class="form-control"
              rows="3"
              placeholder="Notes about your order, e.g. special notes for delivery"
            ></textarea>
          </div>
        </form>
      </div>

      <!-- Order Summary & Payment Method -->
      <div class="col-12 col-md-5">
        <!-- Order Summary -->
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title mb-3">Order Summary</h5>

            <!-- No items message -->
            <div
              v-if="cartStore.getCartItems.length === 0"
              class="text-center py-3"
            >
              <p class="text-muted">Your cart is empty.</p>
            </div>

            <!-- Items in the summary -->
            <div
              v-for="item in cartStore.getCartItems"
              :key="item.id"
              class="d-flex justify-content-between align-items-center mb-2"
            >
              <div>
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="rounded"
                  style="
                    width: 50px;
                    height: 50px;
                    object-fit: cover;
                    margin-right: 10px;
                  "
                />
                <span class="ms-2">{{ item.name }} x {{ item.quantity }}</span>
              </div>
              <div>Rs {{ formatPrice(item.price * item.quantity) }}</div>
            </div>

            <hr />

            <!-- Subtotal & Shipping -->
            <div class="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <strong>Rs {{ formatPrice(subtotal) }}</strong>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>Shipping:</span>
              <strong
                >Rs {{ formatPrice(shippingCost) }} ({{
                  shippingMethod
                }})</strong
              >
            </div>

            <hr />

            <!-- Total -->
            <div class="d-flex justify-content-between mb-3">
              <span>Total:</span>
              <strong>Rs {{ formatPrice(totalCost) }}</strong>
            </div>
          </div>
        </div>

        <!-- Choose Payment Method -->
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title mb-3">Choose a Payment Method</h5>

            <div class="form-check mb-2">
              <input
                class="form-check-input"
                type="radio"
                name="paymentMethod"
                id="stripeOption"
                value="stripe"
                v-model="paymentMethod"
              />
              <label class="form-check-label" for="stripeOption">
                Stripe
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="paymentMethod"
                id="paystackOption"
                value="paystack"
                v-model="paymentMethod"
              />
              <label class="form-check-label" for="paystackOption">
                Paystack
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="paymentMethod"
                id="cashOnDeliveryOption"
                value="cash_on_delivery"
                v-model="paymentMethod"
              />
              <label class="form-check-label" for="cashOnDeliveryOption">
                Cash on Delivery
              </label>
            </div>
          </div>
        </div>

        <!-- Place Order Button -->
        <button
          class="btn btn-success w-100"
          :disabled="
            !paymentMethod || cartStore.getCartItems.length === 0 || loading
          "
          @click="placeOrder"
        >
          Place Order
        </button>
      </div>
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
import Footer from "../../components/MarketFooter.vue";
import { useAuthStore } from "../../stores/auth";
import { useCartStore } from "../../stores/cart";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "Checkout",
  components: {
    Footer,
  },
  setup() {
    const authStore = useAuthStore();
    const cartStore = useCartStore();
    const router = useRouter();

    // Form fields
    const firstName = ref("");
    const lastName = ref("");
    const shippingAddress = ref("");
    const state = ref("");
    const city = ref("");
    const email = ref("");
    const phone = ref("");
    const orderNotes = ref("");
    const paymentMethod = ref(null);

    // UI state
    const searchQuery = ref("");
    const dropdownOpen = ref(false);
    let dropdownTimeout = null;
    const loading = ref(false);
    const error = ref(null);
    const orderPlaced = ref(false);

    // Toast notification state
    const showToast = ref(false);
    const toastMessage = ref("");
    const toastIcon = ref("bi bi-check-circle-fill text-success me-2");

    // Shipping details
    const shippingMethod = ref("Standard Shipping");
    const shippingCost = ref(10);

    // Computed properties
    const subtotal = computed(() => {
      return cartStore.getTotalPrice;
    });

    const totalCost = computed(() => {
      return subtotal.value + shippingCost.value;
    });

    // Format price with comma separator
    const formatPrice = (value) => {
      return value.toLocaleString();
    };

    // Initialize form with user data
    const initializeUserData = () => {
      const user = authStore.user;

      if (user) {
        firstName.value = user.first_name || "";
        lastName.value = user.last_name || "";
        email.value = user.email || "";
        phone.value = user.phone_no || "";

        // Address might be in different formats depending on your API
        if (user.address) {
          shippingAddress.value = user.address;
        }

        if (user.city) {
          city.value = user.city;
        }

        if (user.country) {
          state.value = user.country;
        }
      }
    };

    // Handle search
    const handleSearch = () => {
      if (searchQuery.value) {
        router.push({ path: "/search", query: { q: searchQuery.value } });
      }
    };

    // Navigation methods
    const goToWishlist = () => {
      router.push("/wishlist");
    };

    const goToCart = () => {
      router.push("/cart");
    };

    // Dropdown methods
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

    // Format items for order submission
    // Format items for order submission
    const formatOrderItems = () => {
      return cartStore.getCartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price, // Add the price field
      }));
    };

    // Place order
    // This is the updated placeOrder function for your checkout component
    // Replace your existing placeOrder function with this one

    // Place order function - updated with all required fields
    // Place order function - updated based on actual database schema
    // Place order function - updated to match database schema requirements
    // const placeOrder = async () => {
    //   if (!paymentMethod.value) {
    //     showToastNotification("Please select a payment method", "error");
    //     return;
    //   }

    //   loading.value = true;
    //   error.value = null;

    //   try {
    //     // Get user ID from auth store
    //     const userId = authStore.user?.id;

    //     if (!userId) {
    //       throw new Error("User ID not found. Please log in again.");
    //     }

    //     // Generate a random order number
    //     const orderNumber = Math.random()
    //       .toString(36)
    //       .substring(2, 12)
    //       .toUpperCase();

    //     // Format order payload based on the database structure in the validation error
    //     const orderPayload = {
    //       user_id: userId,
    //       order_number: orderNumber,
    //       first_name: firstName.value,
    //       last_name: lastName.value,
    //       email: email.value,
    //       phone_number: phone.value,
    //       state: state.value,
    //       city: city.value,
    //       shipping_address: shippingAddress.value,
    //       payment_method: paymentMethod.value,
    //       payment_status: "pending",
    //       status: "Pending",
    //       total_amount: totalCost.value,
    //       additional_info: orderNotes.value || null,
    //       items: formatOrderItems(),
    //     };

    //     console.log("Placing order with updated payload:", orderPayload);

    //     // Get auth token
    //     const token = localStorage.getItem("authToken");

    //     // Make API request to place order
    //     const response = await axios.post(
    //       "https://agroconnect.shop/api/place-order",
    //       orderPayload,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );

    //     console.log("Order placed successfully:", response.data);

    //     // Show success message
    //     showToastNotification("Order placed successfully!");
    //     orderPlaced.value = true;

    //     // Store order information to pass to success page
    //     const orderInfo = {
    //       orderNumber:
    //         response.data.order_id || response.data.id || orderNumber,
    //       orderDate: new Date().toISOString(),
    //       orderTotal: totalCost.value,
    //       paymentMethod: paymentMethod.value,
    //     };

    //     // Clear cart
    //     cartStore.clearCart();

    //     // Redirect to success page with order information
    //     router.push({
    //       path: "/order-success",
    //       query: orderInfo,
    //     });
    //   } catch (err) {
    //     console.error("Error placing order:", err);

    //     if (err.response?.data?.message) {
    //       error.value = err.response.data.message;
    //     } else {
    //       error.value =
    //         err.message || "Failed to place order. Please try again.";
    //     }

    //     showToastNotification(error.value, "error");
    //   } finally {
    //     loading.value = false;
    //   }
    // };

    // Client-side only place order function - no API calls
    // Enhanced client-side place order function with better payment method display
    // Final placeOrder function with proper cart clearing via API
    const placeOrder = async () => {
      if (!paymentMethod.value) {
        showToastNotification("Please select a payment method", "error");
        return;
      }

      loading.value = true;

      try {
        // Generate a random order number
        const orderNumber = `ORD-${Math.random()
          .toString(36)
          .substring(2, 10)
          .toUpperCase()}`;

        // Format payment method for display
        let displayPaymentMethod;
        switch (paymentMethod.value) {
          case "stripe":
            displayPaymentMethod = "Stripe";
            break;
          case "paystack":
            displayPaymentMethod = "Paystack";
            break;
          case "cash_on_delivery":
            displayPaymentMethod = "Cash on Delivery";
            break;
          default:
            displayPaymentMethod = paymentMethod.value;
        }

        // Prepare order information to pass to success page
        const orderInfo = {
          orderNumber: orderNumber,
          orderDate: new Date().toISOString(),
          orderTotal: totalCost.value,
          paymentMethod: displayPaymentMethod,
          customerName: `${firstName.value} ${lastName.value}`,
          customerEmail: email.value,
        };

        // Clear cart items from API one by one
        console.log("Clearing cart via API...");
        const token = localStorage.getItem("authToken");
        const cartItems = [...cartStore.getCartItems]; // Create a copy to iterate

        for (const item of cartItems) {
          try {
            // Make API call to remove each item
            await axios.delete(
              `https://agroconnect.shop/api/cart-delete/${item.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            console.log(`Removed item ${item.id} from cart`);
          } catch (error) {
            console.error(`Failed to remove item ${item.id} from cart:`, error);
          }
        }

        // Also clear the local cart store
        cartStore.clearCart();
        console.log(
          "Cart cleared locally, items count:",
          cartStore.getCartItems.length
        );

        // Show success message
        showToastNotification("Order placed successfully!");

        // Small delay to show the success notification before redirect
        setTimeout(() => {
          // Redirect to success page with order information
          router.push({
            path: "/order-success",
            query: orderInfo,
          });
        }, 1500);
      } catch (err) {
        console.error("Error processing order:", err);
        showToastNotification(
          "Error processing your order. Please try again.",
          "error"
        );
      } finally {
        loading.value = false;
      }
    };

    onMounted(async () => {
      // Check if user is logged in
      const token = authStore.token || localStorage.getItem("authToken");

      if (!token) {
        router.push("/login");
        return;
      }

      // Fetch cart items if not already loaded
      if (cartStore.getCartItems.length === 0) {
        await cartStore.fetchCartItems();
      }

      // If cart is empty after fetching, redirect to cart page
      if (cartStore.getCartItems.length === 0) {
        showToastNotification(
          "Your cart is empty. Please add items before checkout.",
          "error"
        );
        setTimeout(() => {
          router.push("/cart");
        }, 2000);
        return;
      }

      // Initialize form with user data
      initializeUserData();
    });

    return {
      // Form fields
      firstName,
      lastName,
      shippingAddress,
      state,
      city,
      email,
      phone,
      orderNotes,
      paymentMethod,

      // Computed properties
      subtotal,
      totalCost,

      // Methods
      formatPrice,
      placeOrder,
      handleSearch,
      goToWishlist,
      goToCart,
      openDropdown,
      closeDropdown,
      logout,

      // UI state
      searchQuery,
      dropdownOpen,
      loading,
      error,
      showToast,
      toastMessage,
      toastIcon,

      // Cart and shipping
      shippingMethod,
      shippingCost,
      cartStore,

      // Auth store for user info
      authStore,
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

.card img {
  vertical-align: middle;
}

/* Make sure the form labels have consistent spacing */
.form-label {
  font-weight: 500;
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
  .row .col-sm-6 {
    margin-top: 0 !important;
  }
}
</style>
