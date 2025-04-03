<template>
  <div class="transactions-page d-flex flex-wrap">
    <!-- Sidebar (Existing Component) -->
    <Sidebar class="sidebar" />

    <!-- Main Content -->
    <div class="transactions-content flex-grow-1 p-4">
      <!-- Page Title -->
      <div
        class="d-flex justify-content-between align-items-center mb-4 flex-wrap"
      >
        <h2 class="fw-bold mb-2 mb-md-0">Transactions</h2>
      </div>

      <!-- Single Tab (All Orders) -->
      <ul class="nav nav-tabs border-0 mb-4">
        <li class="nav-item">
          <button class="nav-link active">All Orders</button>
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
            @input="filterTransactions"
          />
        </div>
        <div class="col-md-4 d-flex justify-content-end">
          <select
            class="form-select w-auto"
            v-model="selectedFilter"
            @change="filterTransactions"
          >
            <option value="">Filter by</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <!-- Transactions Table -->
      <div class="table-responsive">
        <table class="table table-borderless align-middle">
          <thead>
            <tr class="text-secondary">
              <th scope="col">Product ID</th>
              <th scope="col">Customer</th>
              <th scope="col">Date</th>
              <th scope="col">Total</th>
              <th scope="col">Method</th>
              <th scope="col">Status</th>
              <!-- <th scope="col" class="text-end">Actions</th> -->
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(transaction, index) in filteredTransactions"
              :key="index"
            >
              <td>{{ transaction.id }}</td>
              <td>{{ transaction.customer }}</td>
              <td>{{ transaction.date }}</td>
              <td>{{ transaction.total }}</td>
              <td>{{ transaction.method }}</td>
              <td>
                <span :class="statusBadgeClass(transaction.status)">
                  {{ capitalize(transaction.status) }}
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
import Sidebar from "../../../components/DashboardSidebar.vue";

export default {
  name: "TransactionsPage",
  components: {
    Sidebar,
  },
  data() {
    return {
      searchQuery: "",
      selectedFilter: "",
      transactions: [
        {
          id: "#SLT145",
          customer: "Joshua Joseph",
          date: "11th Feb, 2025",
          total: "Rs100",
          method: "Cash",
          status: "confirmed",
        },
        {
          id: "#SLT146",
          customer: "Joshua Joseph",
          date: "12th Feb, 2025",
          total: "Rs60",
          method: "Transfer",
          status: "pending",
        },
        {
          id: "#SLT147",
          customer: "Joshua Joseph",
          date: "12th Feb, 2025",
          total: "Rs10",
          method: "Transfer",
          status: "cancelled",
        },
        {
          id: "#SLT148",
          customer: "Joshua Joseph",
          date: "14th Feb, 2025",
          total: "Rs77",
          method: "Cash",
          status: "cancelled",
        },
        {
          id: "#SLT149",
          customer: "Joshua Joseph",
          date: "15th Feb, 2025",
          total: "Rs45",
          method: "Transfer",
          status: "pending",
        },
        {
          id: "#SLT150",
          customer: "Joshua Joseph",
          date: "20th Feb, 2025",
          total: "Rs34",
          method: "Card",
          status: "cancelled",
        },
        {
          id: "#SLT151",
          customer: "Joshua Joseph",
          date: "21st Feb, 2025",
          total: "Rs20",
          method: "Cash",
          status: "confirmed",
        },
        {
          id: "#SLT152",
          customer: "Joshua Joseph",
          date: "24th Feb, 2025",
          total: "Rs40",
          method: "Transfer",
          status: "pending",
        },
      ],
    };
  },
  computed: {
    filteredTransactions() {
      // Start with all transactions
      let result = this.transactions;

      // Filter by search
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(
          (t) =>
            t.id.toLowerCase().includes(query) ||
            t.customer.toLowerCase().includes(query)
        );
      }

      // Filter by dropdown
      if (this.selectedFilter) {
        result = result.filter((t) => t.status === this.selectedFilter);
      }

      return result;
    },
  },
  methods: {
    filterTransactions() {
      // Called on search input or dropdown change
    },
    showMenu(index) {
      alert(`Action menu for transaction at index: ${index}`);
    },
    statusBadgeClass(status) {
      // Returns a CSS class for the status badge
      switch (status) {
        case "confirmed":
          return "badge bg-success";
        case "pending":
          return "badge bg-warning text-dark";
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
.transactions-page {
  min-height: 100vh;
}

/* Sidebar (similar to your existing code) */
.sidebar {
  width: 250px;
  flex-shrink: 0;
  position: fixed;
  height: 100vh;
  background-color: #fff;
  /* ...any other existing styles... */
}

/* Main content offset so it starts where the sidebar ends (on larger screens) */
.transactions-content {
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

/* Responsive: stack sidebar on mobile */
@media (max-width: 768px) {
  /* Stack sidebar above main content */
  .transactions-page {
    flex-direction: column;
  }
  .sidebar {
    position: static;
    width: 100%;
    height: auto;
  }
  .transactions-content {
    margin-left: 0;
    width: 100%;
  }
}
</style>
