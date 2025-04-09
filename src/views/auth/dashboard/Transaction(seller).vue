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
          <button class="nav-link active">All Transactions</button>
        </li>
      </ul>

      <!-- Search & Filter Row -->
      <div class="row mb-4">
        <div class="col-md-8 mb-2 mb-md-0">
          <input
            type="text"
            class="form-control"
            placeholder="Search by name or product ID"
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
              v-for="(transaction, index) in paginatedTransactions"
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
      
      <!-- Pagination -->
      <div class="d-flex justify-content-between align-items-center mt-4">
        <div class="pagination-info">
          Showing {{ startIndex + 1 }}-{{ endIndex }} of {{ filteredTransactions.length }} transactions
        </div>
        <nav aria-label="Transactions pagination">
          <ul class="pagination mb-0">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
                <i class="fa-solid fa-chevron-left"></i>
              </button>
            </li>
            <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
              <button class="page-link" @click="changePage(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
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
      currentPage: 1,
      itemsPerPage: 8,
      transactions: [
        {
          id: "#SLT145",
          customer: "Joshua Joseph",
          date: "11th Feb, 2025",
          total: "Rs 100",
          method: "Cash",
          status: "confirmed",
        },
        {
          id: "#SLT146",
          customer: "Priya Sharma",
          date: "12th Feb, 2025",
          total: "Rs 60",
          method: "Juice",
          status: "pending",
        },
        {
          id: "#SLT147",
          customer: "Michael Chen",
          date: "12th Feb, 2025",
          total: "Rs 10",
          method: "Juice",
          status: "cancelled",
        },
        {
          id: "#SLT148",
          customer: "Emma Wilson",
          date: "14th Feb, 2025",
          total: "Rs 77",
          method: "Cash",
          status: "cancelled",
        },
        {
          id: "#SLT149",
          customer: "Rajiv Patel",
          date: "15th Feb, 2025",
          total: "Rs 45",
          method: "Juice",
          status: "pending",
        },
        {
          id: "#SLT150",
          customer: "Sophia Martinez",
          date: "20th Feb, 2025",
          total: "Rs 34",
          method: "Card",
          status: "cancelled",
        },
        {
          id: "#SLT151",
          customer: "David Kim",
          date: "21st Feb, 2025",
          total: "Rs 20",
          method: "Cash",
          status: "confirmed",
        },
        {
          id: "#SLT152",
          customer: "Aisha Malik",
          date: "24th Feb, 2025",
          total: "Rs 40",
          method: "Juice",
          status: "pending",
        },
        {
          id: "#SLT153",
          customer: "James Brown",
          date: "25th Feb, 2025",
          total: "Rs 125",
          method: "Card",
          status: "confirmed",
        },
        {
          id: "#SLT154",
          customer: "Lakshmi Anand",
          date: "26th Feb, 2025",
          total: "Rs 55",
          method: "Juice",
          status: "confirmed",
        },
        {
          id: "#SLT155",
          customer: "Oliver Thompson",
          date: "27th Feb, 2025",
          total: "Rs 85",
          method: "Cash",
          status: "pending",
        },
        {
          id: "#SLT156",
          customer: "Fatima Ahmed",
          date: "28th Feb, 2025",
          total: "Rs 33",
          method: "Juice",
          status: "cancelled",
        },
        {
          id: "#SLT157",
          customer: "Robert Davis",
          date: "1st Mar, 2025",
          total: "Rs 67",
          method: "Card",
          status: "confirmed",
        },
        {
          id: "#SLT158",
          customer: "Ananya Desai",
          date: "2nd Mar, 2025",
          total: "Rs 92",
          method: "Juice",
          status: "pending",
        },
        {
          id: "#SLT159",
          customer: "Thomas Wilson",
          date: "3rd Mar, 2025",
          total: "Rs 28",
          method: "Cash",
          status: "confirmed",
        },
        {
          id: "#SLT160",
          customer: "Mei Lin",
          date: "4th Mar, 2025",
          total: "Rs 115",
          method: "Card",
          status: "pending",
        },
        {
          id: "#SLT161",
          customer: "Carlos Rodriguez",
          date: "5th Mar, 2025",
          total: "Rs 42",
          method: "Juice",
          status: "cancelled",
        },
        {
          id: "#SLT162",
          customer: "Sarah Johnson",
          date: "6th Mar, 2025",
          total: "Rs 74",
          method: "Cash",
          status: "confirmed",
        },
        {
          id: "#SLT163",
          customer: "Vikram Singh",
          date: "7th Mar, 2025",
          total: "Rs 90",
          method: "Juice",
          status: "pending",
        },
        {
          id: "#SLT164",
          customer: "Grace Lee",
          date: "8th Mar, 2025",
          total: "Rs 51",
          method: "Card",
          status: "confirmed",
        },
        {
          id: "#SLT165",
          customer: "Noah Adams",
          date: "9th Mar, 2025",
          total: "Rs 38",
          method: "Cash",
          status: "cancelled",
        },
        {
          id: "#SLT166",
          customer: "Leila Karim",
          date: "10th Mar, 2025",
          total: "Rs 65",
          method: "Juice",
          status: "confirmed",
        },
        {
          id: "#SLT167",
          customer: "William Taylor",
          date: "11th Mar, 2025",
          total: "Rs 82",
          method: "Card",
          status: "pending",
        },
        {
          id: "#SLT168",
          customer: "Zara Khan",
          date: "12th Mar, 2025",
          total: "Rs 47",
          method: "Juice",
          status: "confirmed",
        },
        {
          id: "#SLT169",
          customer: "Daniel Park",
          date: "13th Mar, 2025",
          total: "Rs 110",
          method: "Cash",
          status: "cancelled",
        },
        {
          id: "#SLT170",
          customer: "Isabella Garcia",
          date: "14th Mar, 2025",
          total: "Rs 58",
          method: "Card",
          status: "pending",
        },
        {
          id: "#SLT171",
          customer: "Amit Kumar",
          date: "15th Mar, 2025",
          total: "Rs 79",
          method: "Juice",
          status: "confirmed",
        },
        {
          id: "#SLT172",
          customer: "Emily White",
          date: "16th Mar, 2025",
          total: "Rs 32",
          method: "Cash",
          status: "pending",
        },
        {
          id: "#SLT173",
          customer: "Hassan Ali",
          date: "17th Mar, 2025",
          total: "Rs 95",
          method: "Juice",
          status: "cancelled",
        },
        {
          id: "#SLT174",
          customer: "Olivia Martin",
          date: "18th Mar, 2025",
          total: "Rs 63",
          method: "Card",
          status: "confirmed",
        },
        {
          id: "#SLT175",
          customer: "Ravi Gupta",
          date: "19th Mar, 2025",
          total: "Rs 87",
          method: "Juice",
          status: "pending",
        },
        {
          id: "#SLT176",
          customer: "Lucas Anderson",
          date: "20th Mar, 2025",
          total: "Rs 43",
          method: "Cash",
          status: "confirmed",
        },
        {
          id: "#SLT177",
          customer: "Naomi Tanaka",
          date: "21st Mar, 2025",
          total: "Rs 105",
          method: "Card",
          status: "cancelled",
        },
        {
          id: "#SLT178",
          customer: "Samuel Wright",
          date: "22nd Mar, 2025",
          total: "Rs 52",
          method: "Juice",
          status: "pending",
        },
        {
          id: "#SLT179",
          customer: "Divya Chandra",
          date: "23rd Mar, 2025",
          total: "Rs 71",
          method: "Cash",
          status: "confirmed",
        },
        {
          id: "#SLT180",
          customer: "Benjamin Hall",
          date: "24th Mar, 2025",
          total: "Rs 36",
          method: "Card",
          status: "cancelled",
        },
        {
          id: "#SLT181",
          customer: "Elena Romano",
          date: "25th Mar, 2025",
          total: "Rs 98",
          method: "Juice",
          status: "pending",
        },
        {
          id: "#SLT182",
          customer: "Kai Wong",
          date: "26th Mar, 2025",
          total: "Rs 49",
          method: "Cash",
          status: "confirmed",
        },
        {
          id: "#SLT183",
          customer: "Mia Scott",
          date: "27th Mar, 2025",
          total: "Rs 117",
          method: "Card",
          status: "pending",
        },
        {
          id: "#SLT184",
          customer: "Arjun Mehta",
          date: "28th Mar, 2025",
          total: "Rs 68",
          method: "Juice",
          status: "cancelled",
        },
        {
          id: "#SLT185",
          customer: "Sophie Clark",
          date: "29th Mar, 2025",
          total: "Rs 83",
          method: "Cash",
          status: "confirmed",
        },
        {
          id: "#SLT186",
          customer: "Jamal Nasser",
          date: "30th Mar, 2025",
          total: "Rs 44",
          method: "Juice",
          status: "pending",
        },
        {
          id: "#SLT187",
          customer: "Charlotte Turner",
          date: "31st Mar, 2025",
          total: "Rs 102",
          method: "Card",
          status: "confirmed",
        },
        {
          id: "#SLT188",
          customer: "Rahul Verma",
          date: "1st Apr, 2025",
          total: "Rs 59",
          method: "Cash",
          status: "cancelled",
        },
        {
          id: "#SLT189",
          customer: "Liam Parker",
          date: "2nd Apr, 2025",
          total: "Rs 76",
          method: "Juice",
          status: "confirmed",
        },
        {
          id: "#SLT190",
          customer: "Jasmine Tan",
          date: "3rd Apr, 2025",
          total: "Rs 35",
          method: "Card",
          status: "pending",
        },
        {
          id: "#SLT191",
          customer: "Alex Green",
          date: "4th Apr, 2025",
          total: "Rs 89",
          method: "Cash",
          status: "confirmed",
        },
        {
          id: "#SLT192",
          customer: "Neha Rao",
          date: "5th Apr, 2025",
          total: "Rs 53",
          method: "Juice",
          status: "cancelled",
        },
        {
          id: "#SLT193",
          customer: "Mason Collins",
          date: "6th Apr, 2025",
          total: "Rs 120",
          method: "Card",
          status: "pending",
        },
        {
          id: "#SLT194",
          customer: "Yuki Sato",
          date: "7th Apr, 2025",
          total: "Rs 66",
          method: "Cash",
          status: "confirmed",
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
    
    // Calculate total pages for pagination
    totalPages() {
      return Math.ceil(this.filteredTransactions.length / this.itemsPerPage);
    },
    
    // Get the current page of transactions
    paginatedTransactions() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredTransactions.slice(start, end);
    },
    
    // Calculate start and end indices for display
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },
    
    endIndex() {
      const end = this.startIndex + this.itemsPerPage;
      return end > this.filteredTransactions.length ? this.filteredTransactions.length : end;
    }
  },
  methods: {
    filterTransactions() {
      // Reset to first page when filters change
      this.currentPage = 1;
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
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

/* Pagination styling */
.pagination .page-link {
  color: #20b2aa;
  border-color: #dee2e6;
  padding: 0.375rem 0.75rem;
}

.pagination .page-item.active .page-link {
  background-color: #20b2aa;
  border-color: #20b2aa;
  color: white;
}

.pagination .page-item.disabled .page-link {
  color: #6c757d;
}

.pagination-info {
  color: #6c757d;
  font-size: 0.9rem;
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
  
  /* Responsive pagination */
  .pagination-info {
    display: none;
  }
}
</style>