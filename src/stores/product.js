// product.js - Pinia Store
import { defineStore } from "pinia";
import axios from "axios";

// Make sure the export is properly defined
export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    loading: false,
    error: null,
    apiBaseUrl: "https://agroconnect.shop/api", // Fixed API base URL
  }),

  getters: {
    getProducts: (state) => state.products,
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error,
    getError: (state) => state.error,
  },

  actions: {
    // Get auth token from localStorage
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
        // Try to get the user ID from localStorage
        let userId = null;

        // Check if user data is stored in localStorage
        try {
          const userData = localStorage.getItem("user");
          if (userData) {
            const user = JSON.parse(userData);
            userId = user.id;
          } else {
            // If user object isn't available, try to get it from auth token
            const token = localStorage.getItem("authToken");
            if (token) {
              // Optionally fetch user profile if needed
              // This would require a separate API call to get user details
            }
          }
        } catch (e) {
          console.error("Error getting user data:", e);
        }

        // Add user_id as query parameter if available
        const url = userId
          ? `${this.apiBaseUrl}/products?user_id=${userId}`
          : `${this.apiBaseUrl}/products`;

        console.log("Fetching products with URL:", url);

        // Fixed URL to fetch products endpoint with auth headers
        const response = await axios.get(url, {
          headers: this.getAuthHeaders(),
        });

        // Check the structure of response.data
        console.log("API Response data:", response.data);

        // Handle different response structures
        let apiProducts = [];
        if (Array.isArray(response.data)) {
          // If response.data is already an array of products
          apiProducts = response.data.map((product) => ({
            id: product.id || `#API${Math.floor(Math.random() * 900) + 100}`,
            name: product.product_name,
            category: product.product_category,
            unitPrice: product.product_unit_price?.toString().startsWith("Rs")
              ? product.product_unit_price
              : `Rs ${product.product_unit_price}`,
            unit: product.product_unit,
            inStock: parseInt(product.product_qty) || 0,
            image: product.product_img
              ? `https://agroconnect.shop/storage/${product.product_img}`
              : "../src/assets/placeholder.png",
            apiProduct: true, // Flag to identify API products
            originalData: product, // Keep original data for updates
          }));
        } else if (response.data.data && Array.isArray(response.data.data)) {
          // If response.data has a nested data array (common API structure)
          apiProducts = response.data.data.map((product) => ({
            id: product.id || `#API${Math.floor(Math.random() * 900) + 100}`,
            name: product.product_name,
            category: product.product_category,
            unitPrice: product.product_unit_price?.toString().startsWith("Rs")
              ? product.product_unit_price
              : `Rs ${product.product_unit_price}`,
            unit: product.product_unit,
            inStock: parseInt(product.product_qty) || 0,
            image: product.product_img
              ? `https://agroconnect.shop/storage/${product.product_img}`
              : "../src/assets/placeholder.png",
            apiProduct: true, // Flag to identify API products
            originalData: product, // Keep original data for updates
          }));
        } else {
          // If it's not in an expected format, log it and use an empty array
          console.log("Unexpected API response format:", response.data);
        }

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

        // Log what we're sending to help debug
        console.log("Adding product with data:", productData);

        // Required fields
        formData.append("product_name", productData.name);
        formData.append("product_category", productData.category);

        // Handle price formatting - remove currency symbol if present
        const unitPrice = productData.unitPrice.replace("Rs ", "").trim();
        formData.append("product_unit_price", unitPrice);
        formData.append("product_price", unitPrice);

        formData.append("product_unit", productData.unit);
        formData.append("product_qty", productData.inStock.toString());

        // Add image if available - this should be a file, not a string
        if (productData.imageFile) {
          formData.append("product_img", productData.imageFile);
        }

        // For debugging - log FormData contents
        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        // Fixed URL for creating product
        const response = await axios.post(
          `${this.apiBaseUrl}/create-product`,
          formData,
          { headers: this.getFormDataHeaders() }
        );

        // Add the new product to the local array
        const apiProduct = response.data;
        const newProduct = {
          id: apiProduct.id || `#API${Math.floor(Math.random() * 900) + 100}`,
          name: apiProduct.product_name || productData.name,
          category: apiProduct.product_category || productData.category,
          unitPrice: apiProduct.product_unit_price?.toString().startsWith("Rs")
            ? apiProduct.product_unit_price
            : `Rs ${apiProduct.product_unit_price || productData.unitPrice}`,
          unit: apiProduct.product_unit || productData.unit,
          inStock: parseInt(apiProduct.product_qty) || productData.inStock,
          image: apiProduct.product_img
            ? `https://agroconnect.shop/storage/${apiProduct.product_img}`
            : productData.image,
          apiProduct: true,
          originalData: apiProduct,
        };

        this.products.unshift(newProduct);
        return { success: true, product: newProduct };
      } catch (error) {
        console.error("Error adding product:", error);
        // Log detailed validation errors if available
        if (error.response && error.response.data) {
          console.log("Validation errors:", error.response.data);
        }
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

          // Fixed URL for updating product
          const response = await axios.put(
            `${this.apiBaseUrl}/update-product/${productData.id}`,
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
            unitPrice: updatedApiProduct.product_unit_price
              ?.toString()
              .startsWith("Rs")
              ? updatedApiProduct.product_unit_price
              : `Rs ${
                  updatedApiProduct.product_unit_price ||
                  productData.unitPrice.replace("Rs ", "")
                }`,
            unit: updatedApiProduct.product_unit || productData.unit,
            inStock:
              parseInt(updatedApiProduct.product_qty) || productData.inStock,
            image: updatedApiProduct.product_img
              ? `https://agroconnect.shop/storage/${updatedApiProduct.product_img}`
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
          // Fixed URL for deleting product
          await axios.delete(`${this.apiBaseUrl}/delete-product/${productId}`, {
            headers: this.getAuthHeaders(),
          });
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
