/* Modal animation */
@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
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
            placeholder="Search by name or product ID"
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
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(order, index) in paginatedOrders" 
              :key="index" 
              @click="openOrderModal(order)"
            >
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
            </tr>
            <tr v-if="paginatedOrders.length === 0">
              <td colspan="6" class="text-center py-4">
                No orders found matching your criteria
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Controls -->
      <div class="d-flex justify-content-between align-items-center mt-4">
        <div class="pagination-info">
          Showing {{ paginationInfo }} of {{ filteredOrders.length }} orders
        </div>
        <nav aria-label="Orders pagination">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            <li 
              v-for="page in paginationPages" 
              :key="page" 
              class="page-item"
              :class="{ active: currentPage === page }"
            >
              <button class="page-link" @click="goToPage(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
        <div class="items-per-page">
          <select class="form-select form-select-sm" v-model="itemsPerPage" @change="updateItemsPerPage">
            <option :value="5">5 per page</option>
            <option :value="8">8 per page</option>
            <option :value="10">10 per page</option>
            <option :value="20">20 per page</option>
            <option :value="50">50 per page</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Order Modal -->
    <div class="order-modal-container" v-if="showModal">
      <div class="order-modal">
        <!-- Modal Header -->
        <div class="modal-header border-0">
          <h5 class="modal-title">Orders</h5>
          <button type="button" class="close-btn" @click="closeModal">&times;</button>
        </div>
        
        <!-- Modal Body -->
        <div class="modal-body" v-if="selectedOrder">
          <!-- Customer Info -->
          <div class="d-flex justify-content-between align-items-start mb-4">
            <div>
              <h5 class="mb-1">{{ selectedOrder.customer }}</h5>
              <p class="text-muted mb-0">{{ selectedOrder.address }}</p>
            </div>
            <div class="text-end">
              <p class="text-muted mb-0">Ordered</p>
              <p class="mb-0 fw-bold">{{ selectedOrder.orderDate }}</p>
            </div>
          </div>

          <!-- Status Selection -->
          <div class="mb-4">
            <p class="text-muted mb-2 d-flex align-items-center">
              Status 
              <i class="fa-solid fa-circle-info ms-2 small text-muted"></i>
            </p>
            <select class="form-select" v-model="selectedOrder.status">
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="paid">Paid</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <!-- Order Details -->
          <h5 class="mb-3">Orders</h5>
          <div class="bg-light p-3 mb-3">
            <div class="row text-muted mb-2">
              <div class="col-4">Product</div>
              <div class="col-4 text-center">Quantity</div>
              <div class="col-4 text-end">Price</div>
            </div>

            <div class="order-items">
              <div class="row mb-3" v-for="(item, index) in selectedOrder.items" :key="index">
                <div class="col-4">{{ item.name }}</div>
                <div class="col-4 text-center">{{ item.quantity }}</div>
                <div class="col-4 text-end">{{ item.price }}</div>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="order-summary">
            <div class="d-flex justify-content-between mb-2">
              <span>Delivery</span>
              <span>{{ selectedOrder.delivery }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>{{ selectedOrder.subtotal }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>VAT (5%)</span>
              <span>{{ selectedOrder.vat }}</span>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span>Discount (%)</span>
              <span>{{ selectedOrder.discount }}</span>
            </div>
            <div class="d-flex justify-content-between total-row py-3">
              <span class="fw-bold">Total</span>
              <span class="fw-bold">{{ selectedOrder.totalAmount }}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="d-flex gap-3 mt-4">
            <button class="btn btn-outline-primary flex-grow-1" @click="closeModal">Go Back</button>
            <button class="btn btn-primary flex-grow-1" @click="updateOrder">Update</button>
          </div>
        </div>
      </div>
      
      <!-- Modal Overlay -->
      <div class="modal-overlay" @click="closeModal"></div>
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
      showModal: false,
      selectedOrder: null,
      originalStatus: null,
      currentPage: 1,
      itemsPerPage: 8,
      // Replace the existing orders array in your data() function with this updated one
orders: [
  {
    productId: "#SLT145",
    created: "2 mins ago",
    customer: "Amara Singh",
    total: "Rs 6,450.00",
    profit: "Rs 2,890.00",
    status: "confirmed",
    orderDate: "6 Apr, 2025",
    address: "Flic en Flac, Mauritius",
    items: [
      {
        name: "Mama's Choice Rice",
        quantity: "2 Bags",
        price: "Rs 5,200.00"
      },
      {
        name: "Fresh Tomatoes",
        quantity: "5 kg",
        price: "Rs 1,250.00"
      }
    ],
    delivery: "Rs 250.00",
    subtotal: "Rs 6,450.00",
    vat: "Rs 322.50",
    discount: "Rs 0.00",
    totalAmount: "Rs 6,772.50"
  },
  {
    productId: "#SLT146",
    created: "15 mins ago",
    customer: "Ravi Patel",
    total: "Rs 12,780.00",
    profit: "Rs 4,230.00",
    status: "processing",
    orderDate: "6 Apr, 2025",
    address: "Port Louis, Mauritius",
    items: [
      {
        name: "Premium Basmati Rice",
        quantity: "3 Bags",
        price: "Rs 9,600.00"
      },
      {
        name: "Organic Spice Mix",
        quantity: "2 boxes",
        price: "Rs 3,180.00"
      }
    ],
    delivery: "Rs 350.00",
    subtotal: "Rs 12,780.00",
    vat: "Rs 639.00",
    discount: "Rs 500.00",
    totalAmount: "Rs 12,919.00"
  },
  {
    productId: "#SLT147",
    created: "37 mins ago",
    customer: "Elena Cortez",
    total: "Rs 23,450.00",
    profit: "Rs 7,890.00",
    status: "paid",
    orderDate: "5 Apr, 2025",
    address: "Curepipe, Mauritius",
    items: [
      {
        name: "Jasmine Rice",
        quantity: "5 Bags",
        price: "Rs 17,500.00"
      },
      {
        name: "Assorted Vegetables",
        quantity: "10 kg",
        price: "Rs 5,950.00"
      }
    ],
    delivery: "Rs 0.00",
    subtotal: "Rs 23,450.00",
    vat: "Rs 1,172.50",
    discount: "Rs 1,000.00",
    totalAmount: "Rs 23,622.50"
  },
  {
    productId: "#SLT148",
    created: "1 hour ago",
    customer: "Marcus Johnson",
    total: "Rs 8,920.00",
    profit: "Rs 3,250.00",
    status: "shipped",
    orderDate: "5 Apr, 2025",
    address: "Grand Baie, Mauritius",
    items: [
      {
        name: "Organic Brown Rice",
        quantity: "2 Bags",
        price: "Rs 6,400.00"
      },
      {
        name: "Fresh Herbs Bundle",
        quantity: "3 bundles",
        price: "Rs 2,520.00"
      }
    ],
    delivery: "Rs 450.00",
    subtotal: "Rs 8,920.00",
    vat: "Rs 446.00",
    discount: "Rs 300.00",
    totalAmount: "Rs 9,066.00"
  },
  {
    productId: "#SLT149",
    created: "3 hours ago",
    customer: "Sophie Wong",
    total: "Rs 32,675.00",
    profit: "Rs 11,450.00",
    status: "delivered",
    orderDate: "4 Apr, 2025",
    address: "Quatre Bornes, Mauritius",
    items: [
      {
        name: "Premium Jasmine Rice",
        quantity: "6 Bags",
        price: "Rs 24,000.00"
      },
      {
        name: "Exotic Fruit Collection",
        quantity: "1 box",
        price: "Rs 8,675.00"
      }
    ],
    delivery: "Rs 0.00",
    subtotal: "Rs 32,675.00",
    vat: "Rs 1,633.75",
    discount: "Rs 2,000.00",
    totalAmount: "Rs 32,308.75"
  },
  {
    productId: "#SLT150",
    created: "4 hours ago",
    customer: "Ibrahim Ndiaye",
    total: "Rs 4,850.00",
    profit: "Rs 1,630.00",
    status: "cancelled",
    orderDate: "4 Apr, 2025",
    address: "Rose Hill, Mauritius",
    items: [
      {
        name: "White Rice",
        quantity: "1 Bag",
        price: "Rs 3,200.00"
      },
      {
        name: "Fresh Onions",
        quantity: "5 kg",
        price: "Rs 1,650.00"
      }
    ],
    delivery: "Rs 250.00",
    subtotal: "Rs 4,850.00",
    vat: "Rs 242.50",
    discount: "Rs 0.00",
    totalAmount: "Rs 5,092.50"
  },
  {
    productId: "#SLT151",
    created: "6 hours ago",
    customer: "Leila Ahmed",
    total: "Rs 18,920.00",
    profit: "Rs 6,540.00",
    status: "processing",
    orderDate: "3 Apr, 2025",
    address: "Vacoas, Mauritius",
    items: [
      {
        name: "Wild Rice",
        quantity: "3 Bags",
        price: "Rs 15,600.00"
      },
      {
        name: "Premium Spice Bundle",
        quantity: "2 sets",
        price: "Rs 3,320.00"
      }
    ],
    delivery: "Rs 350.00",
    subtotal: "Rs 18,920.00",
    vat: "Rs 946.00",
    discount: "Rs 750.00",
    totalAmount: "Rs 19,116.00"
  },
  {
    productId: "#SLT152",
    created: "7 hours ago",
    customer: "Olivia Rosario",
    total: "Rs 27,450.00",
    profit: "Rs 9,230.00",
    status: "confirmed",
    orderDate: "3 Apr, 2025",
    address: "Moka, Mauritius",
    items: [
      {
        name: "Black Rice",
        quantity: "4 Bags",
        price: "Rs 22,000.00"
      },
      {
        name: "Gourmet Sauce Collection",
        quantity: "3 bottles",
        price: "Rs 5,450.00"
      }
    ],
    delivery: "Rs 0.00",
    subtotal: "Rs 27,450.00",
    vat: "Rs 1,372.50",
    discount: "Rs 1,500.00",
    totalAmount: "Rs 27,322.50"
  },
  {
    productId: "#SLT153",
    created: "10 hours ago",
    customer: "Zhang Wei",
    total: "Rs 14,250.00",
    profit: "Rs 4,950.00",
    status: "confirmed",
    orderDate: "2 Apr, 2025",
    address: "Beau Bassin, Mauritius",
    items: [
      {
        name: "Red Rice",
        quantity: "3 Bags",
        price: "Rs 11,700.00"
      },
      {
        name: "Organic Herbs",
        quantity: "4 bundles",
        price: "Rs 2,550.00"
      }
    ],
    delivery: "Rs 300.00",
    subtotal: "Rs 14,250.00",
    vat: "Rs 712.50",
    discount: "Rs 600.00",
    totalAmount: "Rs 14,362.50"
  },
  {
    productId: "#SLT154",
    created: "12 hours ago",
    customer: "Fatima Osei",
    total: "Rs 9,875.00",
    profit: "Rs 3,425.00",
    status: "processing",
    orderDate: "2 Apr, 2025",
    address: "Phoenix, Mauritius",
    items: [
      {
        name: "Long Grain Rice",
        quantity: "2 Bags",
        price: "Rs 7,600.00"
      },
      {
        name: "Fresh Garlic",
        quantity: "3 kg",
        price: "Rs 2,275.00"
      }
    ],
    delivery: "Rs 250.00",
    subtotal: "Rs 9,875.00",
    vat: "Rs 493.75",
    discount: "Rs 400.00",
    totalAmount: "Rs 9,968.75"
  },
  {
    productId: "#SLT155",
    created: "1 day ago",
    customer: "Carlos Mendoza",
    total: "Rs 41,250.00",
    profit: "Rs 15,750.00",
    status: "paid",
    orderDate: "1 Apr, 2025",
    address: "Tamarin, Mauritius",
    items: [
      {
        name: "Premium Rice Selection",
        quantity: "1 Package",
        price: "Rs 35,000.00"
      },
      {
        name: "Gourmet Ingredients Set",
        quantity: "1 set",
        price: "Rs 6,250.00"
      }
    ],
    delivery: "Rs 0.00",
    subtotal: "Rs 41,250.00",
    vat: "Rs 2,062.50",
    discount: "Rs 2,500.00",
    totalAmount: "Rs 40,812.50"
  },
  {
    productId: "#SLT156",
    created: "1 day ago",
    customer: "Priya Sharma",
    total: "Rs 7,650.00",
    profit: "Rs 2,340.00",
    status: "shipped",
    orderDate: "1 Apr, 2025",
    address: "Black River, Mauritius",
    items: [
      {
        name: "Basmati Rice",
        quantity: "2 Bags",
        price: "Rs 6,400.00"
      },
      {
        name: "Fresh Ginger",
        quantity: "2 kg",
        price: "Rs 1,250.00"
      }
    ],
    delivery: "Rs 300.00",
    subtotal: "Rs 7,650.00",
    vat: "Rs 382.50",
    discount: "Rs 0.00",
    totalAmount: "Rs 8,032.50"
  },
  {
    productId: "#SLT157",
    created: "2 days ago",
    customer: "Malik Johnson",
    total: "Rs 16,750.00",
    profit: "Rs 5,890.00",
    status: "delivered",
    orderDate: "31 Mar, 2025",
    address: "Pamplemousses, Mauritius",
    items: [
      {
        name: "Sushi Rice",
        quantity: "4 Bags",
        price: "Rs 13,600.00"
      },
      {
        name: "Premium Seasoning Set",
        quantity: "1 box",
        price: "Rs 3,150.00"
      }
    ],
    delivery: "Rs 0.00",
    subtotal: "Rs 16,750.00",
    vat: "Rs 837.50",
    discount: "Rs 750.00",
    totalAmount: "Rs 16,837.50"
  },
  {
    productId: "#SLT158",
    created: "2 days ago",
    customer: "Anisha Patel",
    total: "Rs 5,950.00",
    profit: "Rs 1,980.00",
    status: "cancelled",
    orderDate: "31 Mar, 2025",
    address: "Mahebourg, Mauritius",
    items: [
      {
        name: "Brown Rice",
        quantity: "1 Bag",
        price: "Rs 4,500.00"
      },
      {
        name: "Fresh Chili",
        quantity: "3 kg",
        price: "Rs 1,450.00"
      }
    ],
    delivery: "Rs 250.00",
    subtotal: "Rs 5,950.00",
    vat: "Rs 297.50",
    discount: "Rs 0.00",
    totalAmount: "Rs 6,247.50"
  },
  {
    productId: "#SLT159",
    created: "3 days ago",
    customer: "Thomas Müller",
    total: "Rs 22,350.00",
    profit: "Rs 7,450.00",
    status: "confirmed",
    orderDate: "30 Mar, 2025",
    address: "Souillac, Mauritius",
    items: [
      {
        name: "Glutinous Rice",
        quantity: "5 Bags",
        price: "Rs 18,500.00"
      },
      {
        name: "Premium Cooking Oil",
        quantity: "2 bottles",
        price: "Rs 3,850.00"
      }
    ],
    delivery: "Rs 0.00",
    subtotal: "Rs 22,350.00",
    vat: "Rs 1,117.50",
    discount: "Rs 1,000.00",
    totalAmount: "Rs 22,467.50"
  },
  {
    productId: "#SLT160",
    created: "3 days ago",
    customer: "Layla Hassan",
    total: "Rs 11,250.00",
    profit: "Rs 3,750.00",
    status: "processing",
    orderDate: "30 Mar, 2025",
    address: "Triolet, Mauritius",
    items: [
      {
        name: "Fragrant Rice",
        quantity: "3 Bags",
        price: "Rs 9,900.00"
      },
      {
        name: "Fresh Turmeric",
        quantity: "2 kg",
        price: "Rs 1,350.00"
      }
    ],
    delivery: "Rs 350.00",
    subtotal: "Rs 11,250.00",
    vat: "Rs 562.50",
    discount: "Rs 500.00",
    totalAmount: "Rs 11,312.50"
  },
  {
    productId: "#SLT161",
    created: "4 days ago",
    customer: "Samuel Okafor",
    total: "Rs 19,850.00",
    profit: "Rs 6,950.00",
    status: "paid",
    orderDate: "29 Mar, 2025",
    address: "Flacq, Mauritius",
    items: [
      {
        name: "Arborio Rice",
        quantity: "4 Bags",
        price: "Rs 16,400.00"
      },
      {
        name: "Organic Vegetables Mix",
        quantity: "7 kg",
        price: "Rs 3,450.00"
      }
    ],
    delivery: "Rs 0.00",
    subtotal: "Rs 19,850.00",
    vat: "Rs 992.50",
    discount: "Rs 850.00",
    totalAmount: "Rs 19,992.50"
  },
  {
    productId: "#SLT162",
    created: "4 days ago",
    customer: "Mei Lin",
    total: "Rs 8,350.00",
    profit: "Rs 2,800.00",
    status: "shipped",
    orderDate: "29 Mar, 2025",
    address: "Goodlands, Mauritius",
    items: [
      {
        name: "Thai Jasmine Rice",
        quantity: "2 Bags",
        price: "Rs 7,200.00"
      },
      {
        name: "Exotic Spices Set",
        quantity: "1 box",
        price: "Rs 1,150.00"
      }
    ],
    delivery: "Rs 300.00",
    subtotal: "Rs 8,350.00",
    vat: "Rs 417.50",
    discount: "Rs 200.00",
    totalAmount: "Rs 8,567.50"
  },
  {
    productId: "#SLT163",
    created: "5 days ago",
    customer: "Clara Dupont",
    total: "Rs 34,750.00",
    profit: "Rs 11,950.00",
    status: "delivered",
    orderDate: "28 Mar, 2025",
    address: "Bel Ombre, Mauritius",
    items: [
      {
        name: "Premium Rice Package",
        quantity: "1 Package",
        price: "Rs 28,500.00"
      },
      {
        name: "Chef's Selection Ingredients",
        quantity: "1 set",
        price: "Rs 6,250.00"
      }
    ],
    delivery: "Rs 0.00",
    subtotal: "Rs 34,750.00",
    vat: "Rs 1,737.50",
    discount: "Rs 2,000.00",
    totalAmount: "Rs 34,487.50"
  },
  {
    productId: "#SLT164",
    created: "5 days ago",
    customer: "Raj Malhotra",
    total: "Rs 6,250.00",
    profit: "Rs 2,150.00",
    status: "cancelled",
    orderDate: "28 Mar, 2025",
    address: "Grand Port, Mauritius",
    items: [
      {
        name: "White Basmati Rice",
        quantity: "1 Bag",
        price: "Rs 4,800.00"
      },
      {
        name: "Fresh Coriander",
        quantity: "4 bundles",
        price: "Rs 1,450.00"
      }
    ],
    delivery: "Rs 250.00",
    subtotal: "Rs 6,250.00",
    vat: "Rs 312.50",
    discount: "Rs 0.00",
    totalAmount: "Rs 6,562.50"
  }
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
    
    // Calculate total pages based on filtered orders and items per page
    totalPages() {
      return Math.ceil(this.filteredOrders.length / this.itemsPerPage);
    },
    
    // Get the orders for the current page
    paginatedOrders() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredOrders.slice(startIndex, endIndex);
    },
    
    // Generate array of page numbers to display
    paginationPages() {
      // For simplicity, show up to 5 pages
      const maxPagesToShow = 5;
      const pages = [];
      
      if (this.totalPages <= maxPagesToShow) {
        // If total pages are less than max to show, display all pages
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Calculate range to show centered around current page
        let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = startPage + maxPagesToShow - 1;
        
        // Adjust if end exceeds total
        if (endPage > this.totalPages) {
          endPage = this.totalPages;
          startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
      }
      
      return pages;
    },
    
    // Get pagination info text (e.g., "1-5 of 20")
    paginationInfo() {
      if (this.filteredOrders.length === 0) {
        return "0-0"; 
      }
      
      const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
      const endItem = Math.min(startItem + this.itemsPerPage - 1, this.filteredOrders.length);
      return `${startItem}-${endItem}`;
    }
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
      this.selectedFilter = "";
      this.searchQuery = "";
      this.resetPagination();
    },
    
    filterOrders() {
      // When filters change, reset to first page
      this.resetPagination();
    },
    
    // Pagination methods
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    
    resetPagination() {
      this.currentPage = 1;
    },
    
    updateItemsPerPage() {
      // When items per page changes, reset to first page
      this.resetPagination();
    },
    
    openOrderModal(order) {
      this.selectedOrder = JSON.parse(JSON.stringify(order)); // Create a deep copy
      this.originalStatus = order.status;
      this.showModal = true;
      document.body.classList.add('modal-open');
    },
    
    closeModal() {
      this.showModal = false;
      document.body.classList.remove('modal-open');
      this.selectedOrder = null;
    },
    
    updateOrder() {
      // Find the original order and update its status
      const orderIndex = this.orders.findIndex(
        o => o.productId === this.selectedOrder.productId
      );
      
      if (orderIndex !== -1) {
        // Update the status
        this.orders[orderIndex].status = this.selectedOrder.status;
        
        // Show success message or notification here if needed
        // this.$toast.success('Order status updated successfully');
      }
      
      this.closeModal();
    },
    
    statusBadgeClass(status) {
      switch (status) {
        case "pending":
          return "badge bg-secondary";
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

/* Table row hover effect */
.table tbody tr {
  cursor: pointer;
  transition: background-color 0.2s;
}

.table tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

/* Pagination styling */
.pagination {
  margin-bottom: 0;
}

.pagination .page-link {
  color: #20b2aa;
  background-color: #fff;
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
  pointer-events: none;
}

.pagination-info {
  color: #6c757d;
  font-size: 0.9rem;
}

.items-per-page .form-select {
  width: auto;
}

/* Custom Modal styling */
.order-modal-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  padding: 0 15px;
}

.order-modal {
  background: white;
  width: 100%;
  max-width: 550px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 1060;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalFadeIn 0.3s ease-out;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  z-index: 1040;
}

.modal-header {
  padding: 20px 24px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6c757d;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #343a40;
}

.modal-body {
  padding: 0 24px 24px;
}

.order-items {
  font-size: 0.95rem;
}

.bg-light {
  background-color: #f8f9fa !important;
  border-radius: 8px;
}

.order-summary {
  padding: 0 12px;
}

.total-row {
  border-top: 1px solid #dee2e6;
}

/* Button styling */
.btn-primary {
  background-color: #20b2aa;
  border-color: #20b2aa;
}

.btn-outline-primary {
  color: #20b2aa;
  border-color: #20b2aa;
}

.btn-outline-primary:hover {
  background-color: #20b2aa;
  color: white;
}

/* Form controls in modal */
.order-modal .form-select,
.order-modal .form-control {
  pointer-events: auto;
  z-index: 1070;
  position: relative;
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
  .modal-dialog {
    margin: 10px;
  }
  
  /* Adjust pagination for mobile */
  .d-flex.justify-content-between.align-items-center.mt-4 {
    flex-direction: column;
    gap: 1rem;
  }
  
  .pagination-info, .items-per-page {
    text-align: center;
  }
}
</style>