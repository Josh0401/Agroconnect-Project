<template>
  <div class="dashboard-page d-flex flex-wrap">
    <!-- Sidebar -->
    <Sidebar class="sidebar" />

    <!-- Main Content -->
    <div class="dashboard-content flex-grow-1 p-4">
      <div
        class="d-flex flex-wrap align-items-center justify-content-between mb-4"
      >
        <h2 class="fw-bold mb-2 mb-md-0">Dashboard</h2>
      </div>
      <!-- Key Metrics Cards -->
      <div class="row g-3">
        <div
          class="col-md-3 col-sm-6"
          v-for="(card, index) in keyMetrics"
          :key="index"
        >
          <div class="card dashboard-card p-3" :class="card.color">
            <h6 class="text-muted">{{ card.title }}</h6>
            <h3 class="fw-bold">{{ card.value }}</h3>
          </div>
        </div>
      </div>

      <!-- Additional Metrics -->
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="card dashboard-card p-3">
            <h6>Total Orders (Last 7 days)</h6>
            <h4>{{ ordersLast7days }}</h4>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card dashboard-card p-3">
            <h6>Total Profit (Last 7 days)</h6>
            <h4>{{ profitLast7days }}</h4>
          </div>
        </div>
      </div>

      <!-- Sales & Top Product -->
      <div class="row mt-4">
        <div class="col-md-8">
          <div class="card dashboard-card p-3">
            <h6>Recent Sales</h6>
            <table class="table table-borderless align-middle mb-0">
              <thead>
                <tr>
                  <th>Sales ID</th>
                  <th>Product</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="sale in recentSales" :key="sale.id">
                  <td>{{ sale.id }}</td>
                  <td>{{ sale.product }}</td>
                  <td>{{ sale.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card dashboard-card p-3">
            <h6>Top Selling Product</h6>
            <table class="table table-borderless align-middle mb-0">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="prod in topSellingProducts" :key="prod.id">
                  <td>{{ prod.name }}</td>
                  <td>{{ prod.quantity }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../../../components/DashboardSidebar.vue";

export default {
  name: "DashboardPage",
  components: { Sidebar },
  data() {
    return {
      keyMetrics: [
        {
          title: "Total Sales",
          value: "Rs 4,000,000",
          color: "card-total-sales",
        },
        {
          title: "Total Products",
          value: "16",
          color: "card-total-products",
        },
        {
          title: "Pending Sales",
          value: "0",
          color: "card-pending-sales",
        },
        {
          title: "Completed Sales",
          value: "71",
          color: "card-completed-sales",
        },
      ],
      ordersLast7days: 25,
      profitLast7days: "Rs 50,000",
      recentSales: [
        { id: "#SKU5755", product: "Rice", date: "12th Feb, 2025 9:00 AM" },
        { id: "#SKU5756", product: "Beans", date: "13th Feb, 2025 10:30 AM" },
        { id: "#SKU5757", product: "Corn", date: "14th Feb, 2025 11:00 AM" },
        { id: "#SKU5758", product: "Maize", date: "15th Feb, 2025 11:30 AM" },
        { id: "#SKU5759", product: "Rice", date: "16th Feb, 2025 12:00 PM" },
        { id: "#SKU5760", product: "Beans", date: "17th Feb, 2025 1:30 PM" },
      ],
      topSellingProducts: [
        { id: "#SKU5755", name: "Rice", quantity: 12 },
        { id: "#SKU5756", name: "Beans", quantity: 8 },
        { id: "#SKU5757", name: "Corn", quantity: 10 },
        { id: "#SKU5758", name: "Maize", quantity: 11 },
        { id: "#SKU5759", name: "Rice", quantity: 4 },
        { id: "#SKU5760", name: "Beans", quantity: 9 },
      ],
    };
  },
};
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  flex-shrink: 0;
}

/* Main content offset for desktop */
.dashboard-content {
  margin-left: 250px;
  width: calc(100% - 250px);
  background-color: #f4f7fa;
  min-height: 100vh;
  padding: 2rem;
}

/* Dashboard Card Styling */
.dashboard-card {
  min-height: 200px;
  border-radius: 12px;
  border: none;
  padding: 1.5rem;
  color: #333;
  /* default box shadow can be overridden by individual classes if needed */
  box-shadow: 5px 5px 10px #bebebe, -5px -5px 10px #ffffff;
}

/* Custom card colors */
.card-total-sales {
  background: linear-gradient(
    145deg,
    #e0f2f1,
    #b2dfdb
  ); /* teal light gradient */
}

.card-total-products {
  background: linear-gradient(145deg, #ede7f6, #d1c4e9); /* lavender gradient */
}

.card-pending-sales {
  background: linear-gradient(
    145deg,
    #fff8e1,
    #ffecb3
  ); /* light yellow gradient */
}

.card-completed-sales {
  background: linear-gradient(
    145deg,
    #e3f2fd,
    #bbdefb
  ); /* light blue gradient */
}

/* Table styling adjustments */
.table th,
.table td {
  vertical-align: middle;
  font-size: 0.9rem;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .dashboard-page {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    position: static;
    height: auto;
  }
  .dashboard-content {
    margin-left: 0;
    width: 100%;
  }
  .dashboard-card {
    margin-bottom: 1rem;
  }
}
</style>
