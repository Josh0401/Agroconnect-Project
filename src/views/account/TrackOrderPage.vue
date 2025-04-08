<template>
  <div class="track-order-page">
    <!-- Navbar component - reusing the same structure from OrdersPage -->
    <nav class="navbar navbar-expand-lg sticky-top bg-white shadow-sm py-3">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="/market">
          <img
            src="../../assets/Agroconnect.png"
            alt="AgroConnect Logo"
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
              <!-- Search Icon -->
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
            <!-- Account Text and Icon -->
            <span class="me-2">Account</span>
            <div class="dropdown">
              <button
                class="btn dropdown-toggle"
                type="button"
                id="accountDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-chevron-down"></i>
              </button>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="accountDropdown"
              >
                <li>
                  <router-link class="dropdown-item" to="/orders"
                    >Orders</router-link
                  >
                </li>
                <li>
                  <router-link class="dropdown-item" to="/transactions"
                    >Transactions</router-link
                  >
                </li>
                <li>
                  <router-link class="dropdown-item" to="/account/profile"
                    >Profile</router-link
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#" @click.prevent="logout"
                    >Logout</a
                  >
                </li>
              </ul>
            </div>

            <!-- Heart Icon -->
            <button class="btn ms-3">
              <i class="bi bi-heart"></i>
            </button>

            <!-- Shopping Cart Icon -->
            <div class="position-relative ms-3">
              <button class="btn position-relative">
                <i class="bi bi-cart3"></i>
                <span
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                >
                  2
                </span>
              </button>
              <span class="ms-2">Rs 5,000</span>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Banner with breadcrumb -->
    <div
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
            <li class="breadcrumb-item active text-white" aria-current="page">
              Track Order
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Main content -->
    <div class="container my-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="page-title mb-0">Track Order</h1>
        <router-link to="/account/orders" class="btn btn-outline-primary">
          <i class="bi bi-arrow-left me-2"></i> Back to Orders
        </router-link>
      </div>

      <!-- Order tracking Card -->
      <div class="card mb-5 border rounded">
        <div class="card-body p-4">
          <!-- Order header with basic info -->
          <div class="row mb-4">
            <div class="col-md-6">
              <h2 class="h5 mb-3">Order #{{ orderInfo.id }}</h2>
              <p class="mb-2">
                <strong>Order Date:</strong> {{ orderInfo.date }}
              </p>
              <p class="mb-2">
                <strong>Total Amount:</strong> Rs
                {{ orderInfo.total.toLocaleString() }}
              </p>
              <p class="mb-0">
                <strong>Status:</strong>
                <span
                  class="badge rounded-pill ms-2"
                  :class="getStatusClass(orderInfo.status)"
                >
                  {{ orderInfo.status }}
                </span>
              </p>
            </div>
            <div class="col-md-6">
              <div
                class="d-md-flex justify-content-md-end h-100 align-items-md-center"
              >
                <div
                  class="estimated-delivery p-3 bg-light rounded text-center"
                >
                  <p class="small text-muted mb-1">Estimated Delivery</p>
                  <h3 class="mb-0">{{ orderInfo.estimatedDelivery }}</h3>
                </div>
              </div>
            </div>
          </div>

          <!-- Tracking timeline -->
          <div class="tracking-timeline my-5">
            <div class="timeline-header d-flex justify-content-between mb-4">
              <div class="timeline-start">
                <p class="mb-0 small text-muted">Order Placed</p>
                <p class="mb-0 small">{{ orderInfo.date }}</p>
              </div>
              <div class="timeline-end text-end">
                <p class="mb-0 small text-muted">Estimated Delivery</p>
                <p class="mb-0 small">{{ orderInfo.estimatedDelivery }}</p>
              </div>
            </div>

            <!-- Timeline progress -->
            <br />
            <div class="position-relative mb-5">
              <!-- Progress bar and steps -->
              <div class="progress" style="height: 5px">
                <div
                  class="progress-bar bg-success"
                  :style="{ width: getProgressWidth() }"
                ></div>
              </div>

              <!-- Timeline points -->
              <div
                class="timeline-points d-flex justify-content-between position-absolute w-100"
                style="transform: translateY(4%)"
              >
                <div
                  v-for="(step, index) in trackingSteps"
                  :key="index"
                  class="timeline-point d-flex flex-column align-items-center"
                >
                  <div class="point-label mb-3 text-center">
                    <p class="small mb-0">{{ step.label }}</p>
                    <p class="small text-muted mb-0">
                      {{ step.date || "---" }}
                    </p>
                  </div>
                  <div
                    class="point-circle rounded-circle"
                    :class="{
                      active: isStepActive(index),
                      completed: isStepCompleted(index),
                    }"
                  >
                    <i v-if="isStepCompleted(index)" class="bi bi-check"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Current status card -->
            <br /><br /><br />
            <div class="current-status p-4 border rounded mb-4">
              <div class="d-flex align-items-center">
                <div
                  class="status-icon me-3 rounded-circle bg-light d-flex align-items-center justify-content-center"
                >
                  <i :class="getCurrentStatusIcon()"></i>
                </div>
                <div>
                  <h4 class="h6 mb-1">{{ getCurrentStatusText() }}</h4>
                  <p class="mb-0 text-muted">
                    {{ getCurrentStatusDescription() }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Tracking history -->
            <div class="tracking-history">
              <h3 class="h6 mb-3">Tracking History</h3>
              <div class="tracking-events">
                <div
                  v-for="(event, index) in getTrackingHistory()"
                  :key="index"
                  class="tracking-event pb-3 mb-3 border-bottom"
                >
                  <div class="d-flex">
                    <div class="event-icon me-3">
                      <i :class="event.icon" class="text-success"></i>
                    </div>
                    <div>
                      <h5 class="h6 mb-1">{{ event.title }}</h5>
                      <p class="mb-1">{{ event.description }}</p>
                      <p class="small text-muted mb-0">
                        {{ event.date }} {{ event.time }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Delivery details -->
          <div class="row mt-5">
            <div class="col-md-4 mb-4 mb-md-0">
              <h3 class="h6 mb-3">Shipping Address</h3>
              <p class="mb-1">
                <strong>{{ orderInfo.shipping.name }}</strong>
              </p>
              <p class="mb-1">{{ orderInfo.shipping.address }}</p>
              <p class="mb-1">
                {{ orderInfo.shipping.city }}, {{ orderInfo.shipping.state }}
                {{ orderInfo.shipping.zip }}
              </p>
              <p class="mb-0">{{ orderInfo.shipping.phone }}</p>
            </div>

            <div class="col-md-4 mb-4 mb-md-0">
              <h3 class="h6 mb-3">Shipping Method</h3>
              <p class="mb-0">{{ orderInfo.shipping.method }}</p>
              <p v-if="orderInfo.shipping.carrier" class="mb-0">
                <strong>Carrier:</strong> {{ orderInfo.shipping.carrier }}
              </p>
              <p v-if="orderInfo.shipping.trackingNumber" class="mb-0">
                <strong>Tracking #:</strong>
                {{ orderInfo.shipping.trackingNumber }}
              </p>
            </div>

            <div class="col-md-4">
              <h3 class="h6 mb-3">Support</h3>
              <p class="mb-3">Having issues with your delivery?</p>
              <button class="btn btn-success">Contact Support</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Order items summary -->
      <div class="card mb-5 border rounded">
        <div class="card-header bg-light">
          <h3 class="h5 mb-0">Order Items</h3>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table mb-0">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th class="text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in orderInfo.items" :key="index">
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        :src="item.image"
                        :alt="item.name"
                        class="product-thumbnail me-3"
                        width="60"
                        height="60"
                      />
                      <span>{{ item.name }}</span>
                    </div>
                  </td>
                  <td>Rs {{ item.price.toLocaleString() }}</td>
                  <td>{{ item.quantity }}</td>
                  <td class="text-end">
                    Rs {{ (item.price * item.quantity).toLocaleString() }}
                  </td>
                </tr>
              </tbody>
              <tfoot class="table-light">
                <tr>
                  <td colspan="3" class="text-end">
                    <strong>Subtotal</strong>
                  </td>
                  <td class="text-end">
                    Rs {{ orderInfo.subtotal.toLocaleString() }}
                  </td>
                </tr>
                <tr>
                  <td colspan="3" class="text-end">
                    <strong>Shipping</strong>
                  </td>
                  <td class="text-end">{{ orderInfo.shipping.cost }}</td>
                </tr>
                <tr v-if="orderInfo.discount > 0">
                  <td colspan="3" class="text-end">
                    <strong>Discount</strong>
                  </td>
                  <td class="text-end">{{ orderInfo.discount }}%</td>
                </tr>
                <tr>
                  <td colspan="3" class="text-end"><strong>Total</strong></td>
                  <td class="text-end">
                    <strong>Rs {{ orderInfo.total.toLocaleString() }}</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer - reusing the same structure from OrdersPage -->
    <!-- <footer class="bg-light py-4 mt-5">

        <div class="container">
          <div class="row">
            <div class="col-md-3 mb-4 mb-md-0">
              <a class="d-inline-block mb-3" href="/market">
                <img src="../../assets/Agroconnect.png" alt="AgroConnect Logo" height="40" />
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
import Footer from "../../components/MarketFooter.vue";
export default {
  name: "TrackOrderPage",
  components: {
    Footer,
  },
  data() {
    return {
      searchQuery: "",
      currentStep: 3, // Default to "Shipped" status

      // Tracking steps
      trackingSteps: [
        { label: "Order Placed", date: "Nov 24, 2023" },
        { label: "Confirmed", date: "Nov 24, 2023" },
        { label: "Processing", date: "Nov 24, 2023" },
        { label: "Shipped", date: "Nov 24, 2023" },
        { label: "Out for Delivery", date: "" },
        { label: "Delivered", date: "" },
      ],

      // Sample order data
      orderInfo: {
        id: "SKU5756",
        date: "November 24, 2023",
        estimatedDelivery: "December 1, 2023",
        status: "Shipped",
        subtotal: 170000,
        discount: 0,
        total: 170000,

        shipping: {
          name: "Joshua Joseph",
          address: "6140 Parker Rd",
          city: "Allentown, Asaba",
          state: "Delta State",
          zip: "20033",
          phone: "+234 803 4444 666",
          method: "Door Delivery",
          cost: "Free",
          carrier: "AgroConnect Delivery",
          trackingNumber: "AGR23895623",
        },

        items: [
          {
            name: "Red Capsicum",
            image: "https://i.imgur.com/wCSu7bR.jpg",
            price: 10000,
            quantity: 5,
          },
          {
            name: "Green Capsicum",
            image: "https://i.imgur.com/opK3mXt.jpg",
            price: 10000,
            quantity: 2,
          },
          {
            name: "Green Chili",
            image: "https://i.imgur.com/2UXj8Uz.jpg",
            price: 10000,
            quantity: 10,
          },
        ],
      },
    };
  },

  mounted() {
    // Add Bootstrap icons CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css";
    document.head.appendChild(link);

    // In a real implementation, you would fetch the order details based on the route param
    // const orderId = this.$route.params.id;
    // this.fetchOrderDetails(orderId);
  },

  methods: {
    handleSearch() {
      const query = this.searchQuery.trim();
      if (query) {
        console.log("Searching for:", query);
      }
    },

    logout() {
      console.log("Logging out...");
      // this.$router.push('/login');
    },

    getStatusClass(status) {
      const statusClasses = {
        "Order Placed": "bg-secondary",
        Confirmed: "bg-success",
        Processing: "bg-primary",
        Shipped: "bg-primary",
        "Out for Delivery": "bg-primary",
        Delivered: "bg-info",
        Cancelled: "bg-danger",
      };

      return statusClasses[status] || "bg-secondary";
    },

    getProgressWidth() {
      // Calculate width based on current step
      const totalSteps = this.trackingSteps.length - 1; // -1 because we start from 0
      const completedPercentage = (this.currentStep / totalSteps) * 100;
      return `${completedPercentage}%`;
    },

    isStepActive(index) {
      return index === this.currentStep;
    },

    isStepCompleted(index) {
      return index <= this.currentStep;
    },

    getCurrentStatusIcon() {
      const statusIcons = {
        "Order Placed": "bi bi-cart-check",
        Confirmed: "bi bi-check-circle",
        Processing: "bi bi-box-seam",
        Shipped: "bi bi-truck",
        "Out for Delivery": "bi bi-geo-alt",
        Delivered: "bi bi-house-check",
        Cancelled: "bi bi-x-circle",
      };

      return statusIcons[this.orderInfo.status] || "bi bi-question-circle";
    },

    getCurrentStatusText() {
      const stepLabel = this.trackingSteps[this.currentStep]?.label;
      return `Your order is ${stepLabel}`;
    },

    getCurrentStatusDescription() {
      const statusDescriptions = {
        "Order Placed": "We've received your order and are processing it.",
        Confirmed:
          "Your order has been confirmed and payment has been received.",
        Processing: "Your order is being prepared for shipping.",
        Shipped: "Your order has left our warehouse and is on its way to you.",
        "Out for Delivery": "Your order is out for delivery today.",
        Delivered: "Your order has been delivered successfully.",
        Cancelled: "Your order has been cancelled.",
      };

      return statusDescriptions[this.orderInfo.status] || "";
    },

    getTrackingHistory() {
      // Create tracking history based on completed steps
      const history = [];

      for (let i = this.currentStep; i >= 0; i--) {
        const step = this.trackingSteps[i];

        // Skip steps without dates (not completed yet)
        if (!step.date) continue;

        const statusIcons = {
          "Order Placed": "bi bi-cart-check",
          Confirmed: "bi bi-check-circle",
          Processing: "bi bi-box-seam",
          Shipped: "bi bi-truck",
          "Out for Delivery": "bi bi-geo-alt",
          Delivered: "bi bi-house-check",
        };

        const descriptions = {
          "Order Placed": "Your order has been received.",
          Confirmed: "Your order has been confirmed and is being prepared.",
          Processing: "Your order is being packed at our warehouse.",
          Shipped: "Your order has been shipped and is on its way.",
          "Out for Delivery": "Your order is out for delivery.",
          Delivered: "Your order has been delivered successfully.",
        };

        history.push({
          title: step.label,
          description: descriptions[step.label] || "",
          date: step.date,
          time: "12:30 PM", // Sample time, would come from backend
          icon: statusIcons[step.label] || "bi bi-circle",
        });
      }

      return history;
    },
  },
};
</script>

<style scoped>
/* Common styles (reused from OrdersPage) */
body {
  font-family: "Inter", sans-serif;
}

.btn-success,
.text-success {
  background-color: #14b8a6;
  border-color: #14b8a6;
  color: #fff !important;
}

.btn-outline-primary {
  color: #6a5acd;
  border-color: #6a5acd;
}

.btn-outline-primary:hover {
  background-color: #6a5acd;
  border-color: #6a5acd;
  color: white;
}

/* Navbar and banner styles (reused from OrdersPage) */
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
  background-color: #14b8a6;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
}

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

/* TrackOrder page specific styles */
.card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  border-color: #e0e0e0;
}

.estimated-delivery {
  background-color: #f8f9fa;
  border-radius: 8px;
}

.point-circle {
  width: 25px;
  height: 25px;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
}

.point-circle.completed {
  background-color: #14b8a6;
}

.point-circle.active {
  background-color: #6a5acd;
  border: 2px solid #fff;
  box-shadow: 0 0 0 2px #6a5acd;
}

.point-label {
  max-width: 100px;
}

.status-icon {
  width: 50px;
  height: 50px;
  font-size: 20px;
}

.tracking-event:last-child {
  border-bottom: none !important;
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}

.product-thumbnail {
  object-fit: cover;
  border-radius: 4px;
}

/* Responsive styles */
@media (max-width: 992px) {
  .search-container input,
  .search-container button {
    display: none !important;
  }

  .timeline-points {
    overflow-x: auto;
    justify-content: flex-start !important;
  }

  .timeline-point {
    min-width: 100px;
    margin-right: 10px;
  }
}

@media (max-width: 768px) {
  .status-icon {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
}
</style>
