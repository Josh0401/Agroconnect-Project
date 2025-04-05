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
              <th scope="col" class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in filteredProducts" :key="product.id">
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
              <!-- Actions Column -->
              <td class="text-end position-relative">
                <button
                  class="btn btn-success btn-sm border-0"
                  @click="toggleActionMenu(index)"
                  style="padding: 0.25rem 0.5rem"
                >
                  <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>

                <!-- Action Dropdown -->
                <div
                  v-if="activeActionIndex === index"
                  class="action-menu position-absolute bg-white border rounded shadow py-2"
                  style="right: 0; top: 100%; z-index: 1100; min-width: 120px"
                >
                  <button
                    class="dropdown-item w-100 text-start px-3 py-2"
                    @click="openEditProduct(product)"
                  >
                    Edit
                  </button>
                  <button
                    class="dropdown-item w-100 text-start px-3 py-2 text-danger"
                    @click="deleteProduct(product)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Product Modal (existing code) -->
    <div v-if="showAddProductModal">
      <div class="modal show" style="display: block" tabindex="-1">
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
                  <select
                    id="category"
                    class="form-select"
                    v-model="newProduct.category"
                  >
                    <option value="">Select a category</option>
                    <option
                      v-for="(cat, index) in categories"
                      :key="index"
                      :value="cat"
                    >
                      {{ cat }}
                    </option>
                  </select>
                  <small class="text-danger" v-if="errors.category">{{
                    errors.category
                  }}</small>
                </div>
                <div class="mb-3">
                  <label for="unitPrice" class="form-label">Unit Price</label>
                  <div class="input-group">
                    <span class="input-group-text">Rs</span>
                    <input
                      type="text"
                      id="unitPrice"
                      class="form-control"
                      v-model="newProduct.unitPrice"
                    />
                  </div>
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
      </div>
      <!-- Modal Backdrop -->
      <div class="modal-backdrop show"></div>
    </div>

    <!-- Edit Product Modal -->
    <div v-if="showEditProductModal">
      <div class="modal show" style="display: block" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Product</h5>
              <button
                type="button"
                class="btn-close"
                @click="closeEditModal"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="handleUpdateProduct">
                <div class="mb-3">
                  <label for="editProductName" class="form-label"
                    >Product Name</label
                  >
                  <input
                    type="text"
                    id="editProductName"
                    class="form-control"
                    v-model="editingProduct.name"
                  />
                </div>
                <div class="mb-3">
                  <label for="editCategory" class="form-label">Category</label>
                  <select
                    id="editCategory"
                    class="form-select"
                    v-model="editingProduct.category"
                  >
                    <option value="">Select a category</option>
                    <option
                      v-for="(cat, index) in categories"
                      :key="index"
                      :value="cat"
                    >
                      {{ cat }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="editUnitPrice" class="form-label"
                    >Unit Price</label
                  >
                  <div class="input-group">
                    <span class="input-group-text">Rs</span>
                    <input
                      type="text"
                      id="editUnitPrice"
                      class="form-control"
                      v-model="editingProduct.unitPrice"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="editUnit" class="form-label">Unit</label>
                  <input
                    type="text"
                    id="editUnit"
                    class="form-control"
                    v-model="editingProduct.unit"
                  />
                </div>
                <div class="mb-3">
                  <label for="editInStock" class="form-label">In Stock</label>
                  <input
                    type="number"
                    id="editInStock"
                    class="form-control"
                    v-model.number="editingProduct.inStock"
                  />
                </div>
                <div class="mb-3">
                  <label for="editImage" class="form-label"
                    >Product Image</label
                  >
                  <input
                    type="file"
                    id="editImage"
                    class="form-control"
                    @change="handleEditImageUpload"
                  />
                  <div v-if="editingProduct.image" class="mt-2">
                    <img
                      :src="editingProduct.image"
                      alt="Image Preview"
                      style="width: 100px; height: auto"
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="closeEditModal"
                  >
                    Cancel
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- Edit Modal Backdrop -->
      <div class="modal-backdrop show"></div>
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
      // State for add product modal
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
      // List of categories for select dropdowns
      categories: ["Rice", "Vegetables", "Fruits", "Others"],
      // For action menu on table rows
      activeActionIndex: null,
      // State for edit product modal
      showEditProductModal: false,
      editingProduct: {},
      editingProductIndex: null,
    };
  },
  computed: {
    filteredProducts() {
      let result = this.products;
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.id.toLowerCase().includes(query)
        );
      }
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
      // Handled reactively by computed property.
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
        if (!file.type.startsWith("image/")) {
          this.errors.image = "Please upload a valid image file.";
          return;
        }
        this.newProduct.image = URL.createObjectURL(file);
        this.errors.image = "";
      }
    },
    validateForm() {
      this.errors = {};
      if (!this.newProduct.name) this.errors.name = "Product name is required.";
      if (!this.newProduct.category)
        this.errors.category = "Category is required.";
      if (!this.newProduct.unitPrice)
        this.errors.unitPrice = "Unit Price is required.";
      if (!this.newProduct.unit) this.errors.unit = "Unit is required.";
      if (this.newProduct.inStock === null || this.newProduct.inStock === "")
        this.errors.inStock = "In Stock quantity is required.";
      if (!this.newProduct.image)
        this.errors.image = "Product image is required.";
      return Object.keys(this.errors).length === 0;
    },
    handleAddProduct() {
      if (this.validateForm()) {
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
        this.products.push(productToAdd);
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
      const fileInput = document.getElementById("image");
      if (fileInput) fileInput.value = "";
    },
    // Toggle the action menu for a product row
    toggleActionMenu(index) {
      this.activeActionIndex = this.activeActionIndex === index ? null : index;
    },
    // Delete product from the list after confirmation
    deleteProduct(product) {
      if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
        this.products = this.products.filter((p) => p.id !== product.id);
      }
      this.activeActionIndex = null;
    },
    // Open edit modal for the selected product
    openEditProduct(product) {
      // Find the product's index in the main products array
      const idx = this.products.findIndex((p) => p.id === product.id);
      if (idx > -1) {
        // Create a copy so as not to mutate immediately
        this.editingProduct = { ...this.products[idx] };
        this.editingProductIndex = idx;
        this.showEditProductModal = true;
      }
      this.activeActionIndex = null;
    },
    // Handle image upload in edit modal
    handleEditImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          alert("Please upload a valid image file.");
          return;
        }
        this.editingProduct.image = URL.createObjectURL(file);
      }
    },
    // Update the product details after editing
    handleUpdateProduct() {
      if (this.editingProductIndex !== null) {
        // Update the product in the main array
        this.products.splice(this.editingProductIndex, 1, this.editingProduct);
        this.closeEditModal();
      }
    },
    closeEditModal() {
      this.showEditProductModal = false;
      this.editingProduct = {};
      this.editingProductIndex = null;
    },
    showMenu(index) {
      alert(`Action menu for product at index: ${index}`);
    },
  },
};
</script>

<style scoped>
/* Container styles */
.products-page {
  min-height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 250px;
  flex-shrink: 0;
  position: fixed;
  height: 100vh;
  background-color: #fff;
}

/* Main content */
.products-content {
  margin-left: 250px;
  width: calc(100% - 250px);
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* Action menu styles */
.action-menu {
  min-width: 100px;
}
.action-menu button {
  display: block;
  width: 100%;
  border: none;
  background: none;
  padding: 8px 12px;
  text-align: left;
  cursor: pointer;
}
.action-menu button:hover {
  background-color: #f2f2f2;
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

/* Action menu styles */
.action-menu {
  min-width: 100px;
}
.action-menu button {
  display: block;
  width: 100%;
  border: none;
  background: none;
  padding: 8px 12px;
  text-align: left;
  cursor: pointer;
  opacity: 1;
}
.action-menu button:hover {
  background-color: #f2f2f2;
}

/* Table styling */
.table thead th {
  font-size: 0.9rem;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
}
.table tbody td {
  font-size: 0.95rem;
  color: #333;
}
.badge {
  font-size: 0.85rem;
  border-radius: 12px;
  padding: 6px 10px;
}

/* Responsive */
@media (max-width: 768px) {
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
