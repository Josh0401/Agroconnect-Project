// product.js - Pinia Store
import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    loading: false,
    error: null,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "",
  }),

  getters: {
    getProducts: (state) => state.products,
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error,
    getError: (state) => state.error,
  },

  actions: {
    // Get auth token from localStorage - FIXED to match auth.js store
    getAuthHeaders() {
      const token = localStorage.getItem("authToken");
      return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    },

    getFormDataHeaders() {
      const token = localStorage.getItem("authToken");
      return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
    },

    // Fetch all products from API
    async fetchProducts() {
      this.loading = true;
      this.error = null;

      try {
        // FIXED: URL construction - removed concatenation with apiBaseUrl
        const response = await axios.get(
          "https://agroconnect.shop/api/products",
          { headers: this.getAuthHeaders() }  // Added headers for authorization
        );

        // Transform API data to match our product structure
        const apiProducts = response.data.map((product) => ({
          id: product.id || `#API${Math.floor(Math.random() * 900) + 100}`,
          name: product.product_name,
          category: product.product_category,
          unitPrice: product.product_unit_price?.startsWith("Rs")
            ? product.product_unit_price
            : `Rs ${product.product_unit_price}`,
          unit: product.product_unit,
          inStock: parseInt(product.product_qty) || 0,
          image: product.product_img
            ? `https://agroconnect.shop/${product.product_img}` // Fixed URL path
            : "../src/assets/placeholder.png",
          apiProduct: true, // Flag to identify API products
          originalData: product, // Keep original data for updates
        }));

        // Add dummy products for development/testing
        const dummyProducts = [
          {
            id: "#SLT145",
            name: "Mama's Choice Rice",
            category: "Rice",
            unitPrice: "Rs 90",
            unit: "Bag",
            inStock: 5,
            image: "../src/assets/rice.png",
            isDummy: true,
          },
          {
            id: "#SLT146",
            name: "Cap Rice",
            category: "Rice",
            unitPrice: "Rs 25",
            unit: "Bag",
            inStock: 0,
            image: "../src/assets/rice2.png",
            isDummy: true,
          },
          {
            id: "#SLT147",
            name: "Ugu Leaf",
            category: "Vegetables",
            unitPrice: "Rs 15",
            unit: "Bundle",
            inStock: 10,
            image: "../src/assets/ugwu.png",
            isDummy: true,
          },
        ];

        // Combine API and dummy products
        this.products = [...apiProducts, ...dummyProducts];
        return true;
      } catch (error) {
        console.error("Error fetching products:", error);
        this.error = "Failed to load products. Using fallback data.";

        // Fallback to dummy products if API fails
        this.products = [
          {
            id: "#SLT145",
            name: "Mama's Choice Rice",
            category: "Rice",
            unitPrice: "Rs 90",
            unit: "Bag",
            inStock: 5,
            image: "../src/assets/rice.png",
            isDummy: true,
          },
          {
            id: "#SLT146",
            name: "Cap Rice",
            category: "Rice",
            unitPrice: "Rs 25",
            unit: "Bag",
            inStock: 0,
            image: "../src/assets/rice2.png",
            isDummy: true,
          },
          {
            id: "#SLT147",
            name: "Ugu Leaf",
            category: "Vegetables",
            unitPrice: "Rs 15",
            unit: "Bundle",
            inStock: 10,
            image: "../src/assets/ugwu.png",
            isDummy: true,
          },
        ];
        return false;
      } finally {
        this.loading = false;
      }
    },

    // Add a new product
    async addProduct(productData) {
      this.loading = true;
      this.error = null;

      try {
        // Create form data for the API
        const formData = new FormData();
        formData.append("product_name", productData.name);
        formData.append("product_category", productData.category);
        formData.append(
          "product_unit_price",
          productData.unitPrice.replace("Rs ", "")
        );
        formData.append(
          "product_price",
          productData.unitPrice.replace("Rs ", "")
        );
        formData.append("product_unit", productData.unit);
        formData.append("product_qty", productData.inStock.toString());

        if (productData.imageFile) {
          formData.append("product_img", productData.imageFile);
        }

        // FIXED: URL and headers
        const response = await axios.post(
          "https://agroconnect.shop/api/create-product",
          formData,
          { headers: this.getFormDataHeaders() }
        );

        // Add the new product to the local array
        const apiProduct = response.data;
        const newProduct = {
          id: apiProduct.id || `#API${Math.floor(Math.random() * 900) + 100}`,
          name: apiProduct.product_name || productData.name,
          category: apiProduct.product_category || productData.category,
          unitPrice: apiProduct.product_unit_price?.startsWith("Rs")
            ? apiProduct.product_unit_price
            : `Rs ${apiProduct.product_unit_price || productData.unitPrice}`,
          unit: apiProduct.product_unit || productData.unit,
          inStock: parseInt(apiProduct.product_qty) || productData.inStock,
          image: apiProduct.product_img
            ? `https://agroconnect.shop/${apiProduct.product_img}`
            : productData.image,
          apiProduct: true,
          originalData: apiProduct,
        };

        this.products.unshift(newProduct);
        return { success: true, product: newProduct };
      } catch (error) {
        console.error("Error adding product:", error);
        this.error = "Failed to add product to the API.";

        // Fallback: Add as dummy product if API fails
        const newId = "#SLT" + (Math.floor(Math.random() * 900) + 100);
        const productToAdd = {
          id: newId,
          name: productData.name,
          category: productData.category,
          unitPrice: productData.unitPrice.startsWith("Rs")
            ? productData.unitPrice
            : `Rs ${productData.unitPrice}`,
          unit: productData.unit,
          inStock: productData.inStock,
          image: productData.image,
          isDummy: true,
        };

        this.products.unshift(productToAdd);
        return { success: false, product: productToAdd, error: error.message };
      } finally {
        this.loading = false;
      }
    },

    // Update an existing product
    async updateProduct(productData) {
      this.loading = true;
      this.error = null;

      try {
        // If this is an API product, update via API
        if (productData.apiProduct) {
          const formData = new FormData();
          formData.append("product_name", productData.name);
          formData.append("product_category", productData.category);
          formData.append(
            "product_unit_price",
            productData.unitPrice.replace("Rs ", "")
          );
          formData.append(
            "product_price",
            productData.unitPrice.replace("Rs ", "")
          );
          formData.append("product_unit", productData.unit);
          formData.append("product_qty", productData.inStock.toString());
          formData.append("id", productData.id);

          if (productData.imageFile) {
            formData.append("product_img", productData.imageFile);
          }

          // FIXED: URL and headers
          const response = await axios.post(
            "https://agroconnect.shop/api/update-product",
            formData,
            { headers: this.getFormDataHeaders() }
          );

          // Create updated product object
          const updatedApiProduct = response.data;
          const updatedProduct = {
            id: updatedApiProduct.id || productData.id,
            name: updatedApiProduct.product_name || productData.name,
            category:
              updatedApiProduct.product_category || productData.category,
            unitPrice: updatedApiProduct.product_unit_price?.startsWith("Rs")
              ? updatedApiProduct.product_unit_price
              : `Rs ${
                  updatedApiProduct.product_unit_price ||
                  productData.unitPrice.replace("Rs ", "")
                }`,
            unit: updatedApiProduct.product_unit || productData.unit,
            inStock:
              parseInt(updatedApiProduct.product_qty) || productData.inStock,
            image: updatedApiProduct.product_img
              ? `https://agroconnect.shop/${updatedApiProduct.product_img}`
              : productData.image,
            apiProduct: true,
            originalData: updatedApiProduct,
          };

          // Update the product in the local array
          const index = this.products.findIndex((p) => p.id === productData.id);
          if (index !== -1) {
            this.products[index] = updatedProduct;
          }

          return { success: true, product: updatedProduct };
        } else {
          // For dummy products, just update locally
          const index = this.products.findIndex((p) => p.id === productData.id);
          if (index !== -1) {
            this.products[index] = productData;
          }
          return { success: true, product: productData };
        }
      } catch (error) {
        console.error("Error updating product:", error);
        this.error = "Failed to update product on the server.";

        // Update local product even if API fails
        const index = this.products.findIndex((p) => p.id === productData.id);
        if (index !== -1) {
          this.products[index] = productData;
        }

        return { success: false, product: productData, error: error.message };
      } finally {
        this.loading = false;
      }
    },

    // Delete a product
    async deleteProduct(productId) {
      this.loading = true;
      this.error = null;

      try {
        // Find the product first
        const product = this.products.find((p) => p.id === productId);
        if (!product) {
          throw new Error("Product not found");
        }

        // If it's an API product, make the API call
        if (product.apiProduct) {
          // FIXED: URL and headers
          await axios.delete(
            `https://agroconnect.shop/api/delete-product/${productId}`,
            { headers: this.getAuthHeaders() }
          );
        }

        // Remove the product from local array
        this.products = this.products.filter((p) => p.id !== productId);
        return { success: true };
      } catch (error) {
        console.error("Error deleting product:", error);
        this.error = "Failed to delete product from API.";

        // Remove from local array even if API call fails
        this.products = this.products.filter((p) => p.id !== productId);

        return { success: false, error: error.message };
      } finally {
        this.loading = false;
      }
    },
  },
});