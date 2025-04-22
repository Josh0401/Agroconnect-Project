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
        <!-- Total Sales Card with Graph -->
        <div class="col-md-3 col-sm-6">
          <div class="card dashboard-card p-3 card-total-sales">
            <h6 class="text-muted">Total Sales</h6>
            <h3 class="fw-bold">Rs 4,000,000</h3>
            <div class="chart-container mt-2">
              <!-- Simple SVG Line Chart -->
              <svg width="100%" height="60" viewBox="0 0 100 30" preserveAspectRatio="none">
                <polyline
                  fill="rgba(0, 77, 64, 0.1)"
                  stroke="#004d40"
                  stroke-width="1"
                  points="0,25 20,20 40,22 60,10 80,15 100,5"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Total Products Card with Bar Chart -->
        <div class="col-md-3 col-sm-6">
          <div class="card dashboard-card p-3 card-total-products">
            <h6 class="text-muted">Total Products</h6>
            <h3 class="fw-bold">16</h3>
            <div class="chart-container mt-2">
              <!-- Simple SVG Bar Chart -->
              <svg width="100%" height="60" viewBox="0 0 100 30" preserveAspectRatio="none">
                <rect x="10" y="5" width="10" height="25" fill="rgba(121, 85, 155, 0.5)" />
                <rect x="30" y="15" width="10" height="15" fill="rgba(149, 117, 178, 0.5)" />
                <rect x="50" y="10" width="10" height="20" fill="rgba(177, 149, 201, 0.5)" />
                <rect x="70" y="12" width="10" height="18" fill="rgba(209, 196, 233, 0.5)" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Redesigned Pending Sales Card -->
        <div class="col-md-3 col-sm-6">
          <div class="card dashboard-card p-3 card-pending-sales">
            <div class="pending-sales-content">
              <div class="pending-icon-container mb-2">
                <i class="fas fa-hourglass-half"></i>
              </div>
              <h6 class="text-muted">Pending Sales</h6>
              <h3 class="fw-bold">0</h3>
              <div class="progress mt-2" style="height: 8px">
                <div
                  class="progress-bar bg-warning"
                  role="progressbar"
                  style="width: 0%"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Completed Sales Card with Graph -->
        <div class="col-md-3 col-sm-6">
          <div class="card dashboard-card p-3 card-completed-sales">
            <h6 class="text-muted">Completed Sales</h6>
            <h3 class="fw-bold">71</h3>
            <div class="chart-container mt-2">
              <!-- Simple SVG Line Chart -->
              <svg width="100%" height="60" viewBox="0 0 100 30" preserveAspectRatio="none">
                <polyline
                  fill="rgba(2, 119, 189, 0.1)"
                  stroke="#0277bd"
                  stroke-width="1"
                  points="0,20 20,15 40,10 60,18 80,8 100,12"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Metrics -->
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="card dashboard-card p-3 larger-card">
            <h6>Total Orders (Last 7 days)</h6>
            <h4>{{ ordersLast7days }}</h4>
            <div class="chart-container-large mt-3">
              <!-- SVG Bar Chart for Orders -->
              <svg width="100%" height="180" viewBox="0 0 100 50" preserveAspectRatio="none">
                <g class="grid-lines">
                  <line x1="0" y1="0" x2="100" y2="0" stroke="#e0e0e0" stroke-width="0.5" />
                  <line x1="0" y1="12.5" x2="100" y2="12.5" stroke="#e0e0e0" stroke-width="0.5" />
                  <line x1="0" y1="25" x2="100" y2="25" stroke="#e0e0e0" stroke-width="0.5" />
                  <line x1="0" y1="37.5" x2="100" y2="37.5" stroke="#e0e0e0" stroke-width="0.5" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#e0e0e0" stroke-width="0.5" />
                </g>
                <rect x="2" y="30" width="8" height="20" fill="rgba(75, 192, 192, 0.5)" />
                <rect x="16" y="20" width="8" height="30" fill="rgba(75, 192, 192, 0.5)" />
                <rect x="30" y="35" width="8" height="15" fill="rgba(75, 192, 192, 0.5)" />
                <rect x="44" y="15" width="8" height="35" fill="rgba(75, 192, 192, 0.5)" />
                <rect x="58" y="25" width="8" height="25" fill="rgba(75, 192, 192, 0.5)" />
                <rect x="72" y="30" width="8" height="20" fill="rgba(75, 192, 192, 0.5)" />
                <rect x="86" y="27" width="8" height="23" fill="rgba(75, 192, 192, 0.5)" />
              </svg>
            </div>
            <!-- Simple days row -->
            <div class="simple-days-row">
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card dashboard-card p-3 larger-card">
            <h6>Total Profit (Last 7 days)</h6>
            <h4>{{ profitLast7days }}</h4>
            <div class="chart-container-large mt-3">
              <!-- SVG Bar Chart for Profit -->
              <svg width="100%" height="180" viewBox="0 0 100 50" preserveAspectRatio="none">
                <g class="grid-lines">
                  <line x1="0" y1="0" x2="100" y2="0" stroke="#e0e0e0" stroke-width="0.5" />
                  <line x1="0" y1="12.5" x2="100" y2="12.5" stroke="#e0e0e0" stroke-width="0.5" />
                  <line x1="0" y1="25" x2="100" y2="25" stroke="#e0e0e0" stroke-width="0.5" />
                  <line x1="0" y1="37.5" x2="100" y2="37.5" stroke="#e0e0e0" stroke-width="0.5" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#e0e0e0" stroke-width="0.5" />
                </g>
                <rect x="2" y="15" width="8" height="35" fill="rgba(255, 159, 64, 0.5)" />
                <rect x="16" y="10" width="8" height="40" fill="rgba(255, 159, 64, 0.5)" />
                <rect x="30" y="25" width="8" height="25" fill="rgba(255, 159, 64, 0.5)" />
                <rect x="44" y="13" width="8" height="37" fill="rgba(255, 159, 64, 0.5)" />
                <rect x="58" y="17" width="8" height="33" fill="rgba(255, 159, 64, 0.5)" />
                <rect x="72" y="22" width="8" height="28" fill="rgba(255, 159, 64, 0.5)" />
                <rect x="86" y="18" width="8" height="32" fill="rgba(255, 159, 64, 0.5)" />
              </svg>
            </div>
            <!-- Simple days row -->
            <div class="simple-days-row">
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>
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
  components: { 
    Sidebar
  },
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
      ]
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
  box-shadow: 5px 5px 10px #bebebe, -5px -5px 10px #ffffff;
  position: relative;
  overflow: hidden;
}

/* Chart container */
.chart-container {
  height: 60px;
  margin-top: 15px;
  position: relative;
}

.chart-container-large {
  height: 200px;
  margin-top: 15px;
  position: relative;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 0.8rem;
  color: #666;
  padding: 0 5px;
  width: 100%;
}

.simple-days-row {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding: 0 5px;
  font-size: 0.8rem;
  color: #666;
  text-align: center;
}

.simple-days-row div {
  flex: 1;
  text-align: center;
  font-weight: 500;
  padding: 5px 0;
}

.larger-card {
  min-height: 300px;
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
  position: relative;
}

.pending-sales-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.pending-icon-container {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 193, 7, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.pending-icon-container i {
  font-size: 24px;
  color: #ff9800;
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