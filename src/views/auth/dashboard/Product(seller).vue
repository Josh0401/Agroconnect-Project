<template>
  <div class="products-page d-flex flex-wrap">
    <!-- Sidebar -->
    <Sidebar class="sidebar" />

    <!-- Main Content -->
    <div class="products-content flex-grow-1 p-4">
      <!-- Page Header -->
      <div
        class="d-flex justify-content-between align-items-center mb-4 flex-wrap"
      >
        <h2 class="fw-bold mb-2 mb-md-0">Products</h2>
        <button class="btn btn-success rounded-pill px-3 mt-2 mt-md-0">
          <i class="fa-solid fa-plus me-2"></i>
          Add New Product
        </button>
      </div>

      <!-- Search & Filter Row -->
      <div class="row mb-4">
        <div class="col-md-8 mb-2 mb-md-0">
          <input
            type="text"
            class="form-control"
            placeholder="Search products by name or product ID"
            v-model="searchQuery"
            @input="filterProducts"
          />
        </div>
        <div class="col-md-4 d-flex justify-content-end">
          <select
            class="form-select w-auto"
            v-model="selectedFilter"
            @change="filterProducts"
          >
            <option value="">Filter by</option>
            <option value="inStock">In Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
        </div>
      </div>

      <!-- Products Table -->
      <div class="table-responsive">
        <table class="table table-borderless align-middle">
          <thead>
            <tr class="text-secondary">
              <th scope="col">Product ID</th>
              <th scope="col">Product Name</th>
              <th scope="col">Category</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Unit</th>
              <th scope="col">In Stock</th>
              <!-- <th scope="col" class="text-end">Actions</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in filteredProducts" :key="index">
              <td>{{ product.id }}</td>
              <td class="d-flex align-items-center">
                <img
                  :src="product.image"
                  alt="Product"
                  class="rounded-circle me-2"
                  style="width: 40px; height: 40px; object-fit: cover"
                />
                {{ product.name }}
              </td>
              <td>{{ product.category }}</td>
              <td>{{ product.unitPrice }}</td>
              <td>{{ product.unit }}</td>
              <td>
                <span
                  :class="[
                    'badge',
                    product.inStock > 0 ? 'bg-success' : 'bg-danger',
                  ]"
                >
                  {{ product.inStock > 0 ? product.inStock : "Out of Stock" }}
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
  name: "ProductsPage",
  components: {
    Sidebar,
  },
  data() {
    return {
      searchQuery: "",
      selectedFilter: "",
      products: [
        {
          id: "#SLT145",
          name: "Mama's Choice Rice",
          category: "Rice",
          unitPrice: "Rs90",
          unit: "Bag",
          inStock: 5,
          image: "../src/assets/rice.png",
        },
        {
          id: "#SLT146",
          name: "Cap Rice",
          category: "Rice",
          unitPrice: "Rs25",
          unit: "Bag",
          inStock: 0,
          image: "../src/assets/rice2.png",
        },
        {
          id: "#SLT147",
          name: "Ugu Leaf",
          category: "Vegetables",
          unitPrice: "Rs15",
          unit: "Bundle",
          inStock: 10,
          image: "../src/assets/ugwu.png",
        },
        {
          id: "#SLT148",
          name: "Ewedu Leaf",
          category: "Vegetables",
          unitPrice: "Rs50",
          unit: "Bundle",
          inStock: 0,
          image: "../src/assets/ugwu.png",
        },
        {
          id: "#SLT149",
          name: "Table Rice",
          category: "Rice",
          unitPrice: "Rs90",
          unit: "Bundle",
          inStock: 12,
          image: "../src/assets/rice.png",
        },
        {
          id: "#SLT150",
          name: "Ewedu Leaf",
          category: "Vegetables",
          unitPrice: "Rs60",
          unit: "Bundle",
          inStock: 0,
          image: "../src/assets/ugwu.png",
        },
        {
          id: "#SLT151",
          name: "Capp Rice",
          category: "Rice",
          unitPrice: "Rs80",
          unit: "Bundle",
          inStock: 0,
          image: "../src/assets/rice2.png",
        },
        {
          id: "#SLT152",
          name: "Vegetable Leaf",
          category: "Vegetables",
          unitPrice: "Rs80",
          unit: "Bundle",
          inStock: 8,
          image: "../src/assets/ugwu.png",
        },
      ],
    };
  },
  computed: {
    filteredProducts() {
      let result = this.products;

      // Filter by search
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.id.toLowerCase().includes(query)
        );
      }

      // Filter by stock
      if (this.selectedFilter === "inStock") {
        result = result.filter((p) => p.inStock > 0);
      } else if (this.selectedFilter === "outOfStock") {
        result = result.filter((p) => p.inStock === 0);
      }

      return result;
    },
  },
  methods: {
    filterProducts() {
      // Called on search input or filter change
    },
    showMenu(index) {
      alert(`Action menu for product at index: ${index}`);
    },
  },
};
</script>

<style scoped>
/* Container that holds sidebar and main content */
.products-page {
  min-height: 100vh;
}

/* Sidebar styling (re-uses .sidebar from your existing code) */
.sidebar {
  width: 250px;
  flex-shrink: 0;
  position: fixed;
  height: 100vh;
  background-color: #fff;
  /* ...any other existing styles... */
}

/* Main content offset so it starts where the sidebar ends (on larger screens) */
.products-content {
  margin-left: 250px; /* matches sidebar width */
  width: calc(100% - 250px);
  min-height: 100vh;
  background-color: #f8f9fa;
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

.badge {
  font-size: 0.85rem;
  border-radius: 12px;
  padding: 6px 10px;
}

/* Make it responsive on smaller screens */
@media (max-width: 768px) {
  /* Stack sidebar above main content */
  .products-page {
    flex-direction: column;
  }

  .sidebar {
    position: static;
    width: 100%;
    height: auto;
  }

  .products-content {
    margin-left: 0;
    width: 100%;
  }
}
</style>
