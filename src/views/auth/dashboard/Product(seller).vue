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

      <!-- Loading State -->
      <div v-if="productStore.isLoading" class="text-center py-5">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading products...</p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="productStore.hasError"
        class="alert alert-danger"
        role="alert"
      >
        <i class="fa-solid fa-exclamation-triangle me-2"></i>
        {{ productStore.getError }}
        <button
          class="btn btn-outline-danger btn-sm ms-3"
          @click="fetchProducts"
        >
          Try Again
        </button>
      </div>

      <!-- Products Table -->
      <div v-else-if="filteredProducts.length > 0" class="table-responsive">
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
                  @error="handleImageError($event, product)"
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
                  id="bin"
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
                    @click="deleteProduct(product.id)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- No Products State -->
      <div v-else class="text-center py-5">
        <i class="fa-solid fa-box-open fa-3x text-muted mb-3"></i>
        <p class="lead">No products found</p>
        <p class="text-muted">
          Try changing your search or filter criteria, or add a new product.
        </p>
      </div>
    </div>

    <!-- Add Product Modal -->
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
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="productStore.isLoading"
                  >
                    <span
                      v-if="productStore.isLoading"
                      class="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {{ productStore.isLoading ? "Adding..." : "Add Product" }}
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
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="productStore.isLoading"
                  >
                    <span
                      v-if="productStore.isLoading"
                      class="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {{
                      productStore.isLoading ? "Updating..." : "Update Product"
                    }}
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
import { useProductStore } from "../../../stores/product"; // Adjust path as needed
import { ref, computed, onMounted } from "vue";

export default {
  name: "ProductsPage",
  components: {
    Sidebar,
  },
  setup() {
    const productStore = useProductStore();

    const searchQuery = ref("");
    const selectedFilter = ref("");
    const activeActionIndex = ref(null);

    // Modals
    const showAddProductModal = ref(false);
    const showEditProductModal = ref(false);

    // Product data
    const newProduct = ref({
      name: "",
      category: "",
      unitPrice: "",
      unit: "",
      inStock: null,
      image: "",
      imageFile: null,
    });

    const editingProduct = ref({});
    const errors = ref({});

    // Categories list
    const categories = ref([
      // "Rice",
      // "Vegetables",
      "Fruits",
      "Others",
      "Fresh Fruits",
      "Grains",
      "Roots and Tubers",
      "Fresh Vegetables",
      "Nuts and Seeds",
      "Cooking",
      "Dairy Products",
      "Agro Chemicals",
      "Diabetics",
      "Proteins",
      "Cereals and Beverages",
      "Snacks and Pastries",
      "Baking Ingredients",
      "Processed Foods",
    ]);

    // Computed property for filtered products
    const filteredProducts = computed(() => {
      let result = productStore.getProducts;

      // Print debug info
      console.log("Products count:", result.length);

      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.id.toLowerCase().includes(query)
        );
      }

      if (selectedFilter.value === "inStock") {
        result = result.filter((p) => p.inStock > 0);
      } else if (selectedFilter.value === "outOfStock") {
        result = result.filter((p) => p.inStock === 0);
      }

      return result;
    });

    // Fetch products on component mount
    onMounted(() => {
      console.log("Component mounted, fetching products");
      fetchProducts();
    });

    // Methods
    const fetchProducts = async () => {
      console.log("Fetching products...");
      try {
        await productStore.fetchProducts();
        console.log("Products fetched:", productStore.getProducts.length);
      } catch (error) {
        console.error("Error in component while fetching products:", error);
      }
    };

    const handleImageError = (event, product) => {
      // Replace with a default image if the image fails to load
      event.target.src = "../src/assets/placeholder.png";
      console.log(
        `Image failed to load for product ${product.id}, using fallback`
      );
    };

    const openModal = () => {
      showAddProductModal.value = true;
      resetForm();
    };

    const closeModal = () => {
      showAddProductModal.value = false;
      resetForm();
    };

    const resetForm = () => {
      newProduct.value = {
        name: "",
        category: "",
        unitPrice: "",
        unit: "",
        inStock: null,
        image: "",
        imageFile: null,
      };
      errors.value = {};
      const fileInput = document.getElementById("image");
      if (fileInput) fileInput.value = "";
    };

    const validateForm = () => {
      errors.value = {};
      if (!newProduct.value.name)
        errors.value.name = "Product name is required.";
      if (!newProduct.value.category)
        errors.value.category = "Category is required.";
      if (!newProduct.value.unitPrice)
        errors.value.unitPrice = "Unit Price is required.";
      if (!newProduct.value.unit) errors.value.unit = "Unit is required.";
      if (newProduct.value.inStock === null || newProduct.value.inStock === "")
        errors.value.inStock = "In Stock quantity is required.";
      if (!newProduct.value.image)
        errors.value.image = "Product image is required.";
      return Object.keys(errors.value).length === 0;
    };

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          errors.value.image = "Please upload a valid image file.";
          return;
        }
        newProduct.value.image = URL.createObjectURL(file);
        errors.value.image = "";
        newProduct.value.imageFile = file;
      }
    };

    const handleAddProduct = async () => {
      if (validateForm()) {
        try {
          await productStore.addProduct(newProduct.value);
          closeModal();
        } catch (error) {
          console.error("Error adding product:", error);
          errors.value.general = "Failed to add product. Please try again.";
        }
      }
    };

    const toggleActionMenu = (index) => {
      activeActionIndex.value =
        activeActionIndex.value === index ? null : index;
    };

    const openEditProduct = (product) => {
      editingProduct.value = { ...product };
      showEditProductModal.value = true;
      activeActionIndex.value = null;
    };

    const closeEditModal = () => {
      showEditProductModal.value = false;
      editingProduct.value = {};
    };

    const handleEditImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          alert("Please upload a valid image file.");
          return;
        }
        editingProduct.value.image = URL.createObjectURL(file);
        editingProduct.value.imageFile = file;
      }
    };

    const handleUpdateProduct = async () => {
      try {
        await productStore.updateProduct(editingProduct.value);
        closeEditModal();
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Failed to update product. Please try again.");
      }
    };

    const deleteProduct = async (productId) => {
      if (confirm(`Are you sure you want to delete this product?`)) {
        try {
          await productStore.deleteProduct(productId);
          activeActionIndex.value = null;
        } catch (error) {
          console.error("Error deleting product:", error);
          alert("Failed to delete product. Please try again.");
        }
      }
    };

    const filterProducts = () => {
      // This is handled by the computed property
      console.log("Filtering products with query:", searchQuery.value);
    };

    return {
      productStore,
      searchQuery,
      selectedFilter,
      activeActionIndex,
      showAddProductModal,
      showEditProductModal,
      newProduct,
      editingProduct,
      errors,
      categories,
      filteredProducts,
      fetchProducts,
      openModal,
      closeModal,
      resetForm,
      handleImageUpload,
      handleAddProduct,
      toggleActionMenu,
      openEditProduct,
      closeEditModal,
      handleEditImageUpload,
      handleUpdateProduct,
      deleteProduct,
      filterProducts,
      handleImageError,
    };
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
#bin {
  background-color: white !important;
  color: black;
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
