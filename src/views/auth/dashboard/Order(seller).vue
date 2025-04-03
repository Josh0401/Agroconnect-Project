<template>
  <div class="orders-page d-flex flex-wrap">
    <!-- Sidebar (Existing Component) -->
    <Sidebar class="sidebar" />

    <!-- Main Content -->
    <div class="orders-content flex-grow-1 p-4">
      <!-- Page Title & Tabs -->
      <div
        class="d-flex flex-wrap align-items-center justify-content-between mb-4"
      >
        <h2 class="fw-bold mb-2 mb-md-0">Orders</h2>
      </div>

      <!-- Status Tabs -->
      <ul class="nav nav-tabs border-0 mb-4">
        <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
          <button
            class="nav-link"
            :class="{ active: activeTab === tab }"
            @click="setActiveTab(tab)"
          >
            {{ tab }}
          </button>
        </li>
      </ul>

      <!-- Search & Filter Row -->
      <div class="row mb-4">
        <div class="col-md-8 mb-2 mb-md-0">
          <input
            type="text"
            class="form-control"
            placeholder="Search products by name or product ID"
            v-model="searchQuery"
            @input="filterOrders"
          />
        </div>
        <div class="col-md-4 d-flex justify-content-end">
          <select
            class="form-select w-auto"
            v-model="selectedFilter"
            @change="filterOrders"
          >
            <option value="">Filter by</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="paid">Paid</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <!-- Orders Table -->
      <div class="table-responsive">
        <table class="table table-borderless align-middle">
          <thead>
            <tr class="text-secondary">
              <th scope="col">Product ID</th>
              <th scope="col">Created</th>
              <th scope="col">Customer</th>
              <th scope="col">Total</th>
              <th scope="col">Profit</th>
              <th scope="col">Status</th>
              <!-- <th scope="col" class="text-end">Actions</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in filteredOrders" :key="index">
              <td>{{ order.productId }}</td>
              <td>{{ order.created }}</td>
              <td>{{ order.customer }}</td>
              <td>{{ order.total }}</td>
              <td>{{ order.profit }}</td>
              <td>
                <span :class="statusBadgeClass(order.status)">
                  {{ capitalize(order.status) }}
                </span>
              </td>
              <!-- <td class="text-end">
                <button class="btn btn-light btn-sm" @click="showMenu(index)">
                  <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
              </td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../../../components/DashboardSidebar.vue"; // Adjust path as needed

export default {
  name: "OrdersPage",
  components: {
    Sidebar,
  },
  data() {
    return {
      tabs: [
        "All Orders",
        "Confirmed",
        "Processing",
        "Paid",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      activeTab: "All Orders",
      searchQuery: "",
      selectedFilter: "",
      orders: [
        {
          productId: "#SLT145",
          created: "2 mins ago",
          customer: "Joshua Joseph",
          total: "Rs60",
          profit: "Rs10",
          status: "confirmed",
        },
        {
          productId: "#SLT146",
          created: "2 mins ago",
          customer: "Joshua Joseph",
          total: "Rs64",
          profit: "Rs14",
          status: "processing",
        },
        {
          productId: "#SLT147",
          created: "2 mins ago",
          customer: "Joshua Joseph",
          total: "Rs23",
          profit: "Rs10",
          status: "paid",
        },
        {
          productId: "#SLT148",
          created: "7 mins ago",
          customer: "Joshua Joseph",
          total: "Rs45",
          profit: "Rs11",
          status: "shipped",
        },
        {
          productId: "#SLT149",
          created: "9 mins ago",
          customer: "Joshua Joseph",
          total: "Rs90",
          profit: "Rs19",
          status: "delivered",
        },
        {
          productId: "#SLT150",
          created: "9 mins ago",
          customer: "Joshua Joseph",
          total: "Rs63",
          profit: "Rs36",
          status: "cancelled",
        },
        {
          productId: "#SLT151",
          created: "10 mins ago",
          customer: "Joshua Joseph",
          total: "Rs33",
          profit: "Rs12",
          status: "processing",
        },
        {
          productId: "#SLT152",
          created: "15 mins ago",
          customer: "Joshua Joseph",
          total: "Rs45",
          profit: "Rs34",
          status: "confirmed",
        },
      ],
    };
  },
  computed: {
    filteredOrders() {
      // 1) Filter by tab
      let result =
        this.activeTab === "All Orders"
          ? this.orders
          : this.orders.filter(
              (o) => o.status.toLowerCase() === this.activeTab.toLowerCase()
            );

      // 2) Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(
          (o) =>
            o.productId.toLowerCase().includes(query) ||
            o.customer.toLowerCase().includes(query)
        );
      }

      // 3) Filter by dropdown
      if (this.selectedFilter) {
        result = result.filter((o) => o.status === this.selectedFilter);
      }

      return result;
    },
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
      this.selectedFilter = "";
      this.searchQuery = "";
    },
    filterOrders() {
      // Triggered on search input or dropdown change to recompute filteredOrders
    },
    showMenu(index) {
      alert(`Action menu for order index: ${index}`);
    },
    statusBadgeClass(status) {
      switch (status) {
        case "confirmed":
          return "badge bg-success";
        case "processing":
          return "badge bg-warning text-dark";
        case "paid":
          return "badge bg-info text-dark";
        case "shipped":
          return "badge bg-primary";
        case "delivered":
          return "badge bg-success";
        case "cancelled":
          return "badge bg-danger";
        default:
          return "badge bg-secondary";
      }
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
};
</script>

<style scoped>
/* Container that holds sidebar and main content */
.orders-page {
  min-height: 100vh;
}

/* Sidebar styling (similar to your existing code) */
.sidebar {
  width: 250px;
  flex-shrink: 0;
  position: fixed;
  height: 100vh;
  background-color: #fff;
  /* ... any other existing styles ... */
}

/* Main content offset so it starts where the sidebar ends (on larger screens) */
.orders-content {
  margin-left: 250px; /* matches sidebar width */
  width: calc(100% - 250px);
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* Tabs styling */
.nav-tabs .nav-link {
  border: none;
  color: #6c757d;
  background: transparent;
  margin-right: 5px;
}
.nav-tabs .nav-link.active {
  color: #20b2aa;
  font-weight: 600;
  border-bottom: 2px solid #20b2aa;
}

/* Table header styling */
.table thead th {
  font-size: 0.9rem;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Table body styling */
.table tbody td {
  font-size: 0.95rem;
  color: #333;
}

/* Badge styling for statuses */
.badge {
  font-size: 0.85rem;
  border-radius: 12px;
  padding: 6px 10px;
}

/* Make it responsive on smaller screens */
@media (max-width: 768px) {
  /* Stack sidebar above main content */
  .orders-page {
    flex-direction: column;
  }
  .sidebar {
    position: static;
    width: 100%;
    height: auto;
  }
  .orders-content {
    margin-left: 0;
    width: 100%;
  }
}
</style>
