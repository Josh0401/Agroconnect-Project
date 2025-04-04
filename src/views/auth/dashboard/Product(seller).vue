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
        <button
          class="btn btn-success rounded-pill px-3 mt-2 mt-md-0"
          @click="openModal"
        >
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

    <!-- Optional: Modal for adding new product -->
    <div v-if="showAddProductModal">
      <div class="modal fade show" style="display: block" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add New Product</h5>
              <button
                type="button"
                class="btn-close"
                @click="closeModal"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="handleAddProduct">
                <div class="mb-3">
                  <label for="productName" class="form-label"
                    >Product Name</label
                  >
                  <input
                    type="text"
                    id="productName"
                    class="form-control"
                    v-model="newProduct.name"
                  />
                  <small class="text-danger" v-if="errors.name">{{
                    errors.name
                  }}</small>
                </div>
                <div class="mb-3">
                  <label for="category" class="form-label">Category</label>
                  <input
                    type="text"
                    id="category"
                    class="form-control"
                    v-model="newProduct.category"
                  />
                  <small class="text-danger" v-if="errors.category">{{
                    errors.category
                  }}</small>
                </div>
                <div class="mb-3">
                  <label for="unitPrice" class="form-label">Unit Price</label>
                  <input
                    type="text"
                    id="unitPrice"
                    class="form-control"
                    v-model="newProduct.unitPrice"
                  />
                  <small class="text-danger" v-if="errors.unitPrice">{{
                    errors.unitPrice
                  }}</small>
                </div>
                <div class="mb-3">
                  <label for="unit" class="form-label">Unit</label>
                  <input
                    type="text"
                    id="unit"
                    class="form-control"
                    v-model="newProduct.unit"
                  />
                  <small class="text-danger" v-if="errors.unit">{{
                    errors.unit
                  }}</small>
                </div>
                <div class="mb-3">
                  <label for="inStock" class="form-label">In Stock</label>
                  <input
                    type="number"
                    id="inStock"
                    class="form-control"
                    v-model.number="newProduct.inStock"
                  />
                  <small class="text-danger" v-if="errors.inStock">{{
                    errors.inStock
                  }}</small>
                </div>
                <div class="mb-3">
                  <label for="image" class="form-label">Product Image</label>
                  <input
                    type="file"
                    id="image"
                    class="form-control"
                    @change="handleImageUpload"
                  />
                  <small class="text-danger" v-if="errors.image">{{
                    errors.image
                  }}</small>
                  <div v-if="newProduct.image" class="mt-2">
                    <img
                      :src="newProduct.image"
                      alt="Image Preview"
                      style="width: 100px; height: auto"
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="closeModal"
                  >
                    Cancel
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- Modal Backdrop -->
        <div class="modal-backdrop fade show"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../../../components/DashboardSidebar.vue";

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
      showAddProductModal: false,
      newProduct: {
        name: "",
        category: "",
        unitPrice: "",
        unit: "",
        inStock: null,
        image: "",
      },
      errors: {},
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
    openModal() {
      this.showAddProductModal = true;
    },
    closeModal() {
      this.showAddProductModal = false;
      this.resetForm();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // Check if the file is an image
        if (!file.type.startsWith("image/")) {
          this.errors.image = "Please upload a valid image file.";
          return;
        }
        // Create a temporary URL for preview
        this.newProduct.image = URL.createObjectURL(file);
        this.errors.image = "";
      }
    },
    validateForm() {
      this.errors = {};
      if (!this.newProduct.name) {
        this.errors.name = "Product name is required.";
      }
      if (!this.newProduct.category) {
        this.errors.category = "Category is required.";
      }
      if (!this.newProduct.unitPrice) {
        this.errors.unitPrice = "Unit Price is required.";
      }
      if (!this.newProduct.unit) {
        this.errors.unit = "Unit is required.";
      }
      if (this.newProduct.inStock === null || this.newProduct.inStock === "") {
        this.errors.inStock = "In Stock quantity is required.";
      }
      if (!this.newProduct.image) {
        this.errors.image = "Product image is required.";
      }
      return Object.keys(this.errors).length === 0;
    },
    handleAddProduct() {
      if (this.validateForm()) {
        // Generate a new product ID (for demo purposes)
        const newId = "#SLT" + (Math.floor(Math.random() * 900) + 100);
        const productToAdd = {
          id: newId,
          name: this.newProduct.name,
          category: this.newProduct.category,
          unitPrice: this.newProduct.unitPrice,
          unit: this.newProduct.unit,
          inStock: this.newProduct.inStock,
          image: this.newProduct.image,
        };
        // Add the new product to the products array
        this.products.push(productToAdd);
        // Close the modal and reset the form
        this.closeModal();
      }
    },

    resetForm() {
      this.newProduct = {
        name: "",
        category: "",
        unitPrice: "",
        unit: "",
        inStock: null,
        image: "",
      };
      this.errors = {};
      // Reset file input value if needed
      const fileInput = document.getElementById("image");
      if (fileInput) {
        fileInput.value = "";
      }
    },
    // Optional: Function to show action menu (if needed)

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

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
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
