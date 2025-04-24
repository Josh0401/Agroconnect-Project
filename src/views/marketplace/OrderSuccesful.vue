<template>
  <div>
    <!-- Navbar (can be a shared component) -->
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
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/market" class="nav-link">
                Continue Shopping
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/account/orders" class="nav-link">
                View Orders
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Success Content -->
    <div class="container success-container">
      <div class="success-card">
        <div class="checkmark-container mb-4">
          <svg
            class="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              class="checkmark-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              class="checkmark-check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        <h1 class="text-center">Order Placed Successfully!</h1>
        <p class="text-center lead">
          Thank you for your order. Your order has been received and is being
          processed.
        </p>

        <div class="order-info">
          <div class="order-detail">
            <span class="label">Order Number:</span>
            <span class="value">{{ orderNumber }}</span>
          </div>

          <div class="order-detail">
            <span class="label">Date:</span>
            <span class="value">{{ formatDate(orderDate) }}</span>
          </div>

          <div class="order-detail">
            <span class="label">Total Amount:</span>
            <span class="value">Rs {{ formatPrice(orderTotal) }}</span>
          </div>

          <div class="order-detail">
            <span class="label">Payment Method:</span>
            <span class="value">{{ paymentMethod }}</span>
          </div>
        </div>

        <p class="text-center mt-4">
          A confirmation email has been sent to your registered email address.
        </p>

        <div class="d-flex justify-content-center mt-4 button-group">
          <router-link to="/market" class="btn btn-outline-success me-3">
            Continue Shopping
          </router-link>
          <router-link to="/account/orders" class="btn btn-success">
            View Your Orders
          </router-link>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Footer from "../../components/MarketFooter.vue";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

export default {
  name: "OrderSuccess",
  components: {
    Footer,
  },
  setup() {
    const route = useRoute();

    // Order data (will be populated from route query parameters or can be hardcoded for demo)
    const orderNumber = ref("Unknown");
    const orderDate = ref(new Date());
    const orderTotal = ref(0);
    const paymentMethod = ref("Unknown");

    onMounted(() => {
      // Get order details from route query parameters
      if (route.query.orderNumber) {
        orderNumber.value = route.query.orderNumber;
      }

      if (route.query.orderDate) {
        orderDate.value = new Date(route.query.orderDate);
      }

      if (route.query.orderTotal) {
        orderTotal.value = parseFloat(route.query.orderTotal);
      }

      if (route.query.paymentMethod) {
        paymentMethod.value = route.query.paymentMethod;
      }
    });

    // Format helpers
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const formatPrice = (price) => {
      return price.toLocaleString();
    };

    return {
      orderNumber,
      orderDate,
      orderTotal,
      paymentMethod,
      formatDate,
      formatPrice,
    };
  },
};
</script>

<style scoped>
.success-container {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.success-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  max-width: 700px;
  width: 100%;
}

.checkmark-container {
  display: flex;
  justify-content: center;
}

.checkmark {
  width: 80px;
  height: 80px;
}

.checkmark-circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #28a745;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark-check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  stroke-width: 3;
  stroke: #28a745;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

.order-info {
  margin-top: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
}

.order-detail {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.order-detail:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.label {
  font-weight: bold;
  color: #555;
}

.value {
  color: #333;
}

.button-group {
  flex-wrap: wrap;
  gap: 10px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .success-card {
    padding: 2rem;
  }

  .order-detail {
    flex-direction: column;
  }

  .value {
    margin-top: 0.25rem;
  }
}
</style>
