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
        // Use the correct API endpoint for all products
        const url = `${this.apiBaseUrl}/all-products`;

        console.log("Fetching products with URL:", url);

        // Make the API call - headers might still be needed for authentication
        // even if we're not filtering by user
        const response = await axios.get(url, {
          headers: this.getAuthHeaders(),
        });

        // Check the structure of response.data
        console.log("API Response data:", response.data);

        // Process products
        let apiProducts = [];
        if (Array.isArray(response.data)) {
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
              ? `https://agroconnect.shop/public/storage/${product.product_img}`
              : "../src/assets/placeholder.png",
            apiProduct: true, // Flag to identify API products
            originalData: product, // Keep original data for updates
          }));
        } else if (response.data.data && Array.isArray(response.data.data)) {
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
              ? `https://agroconnect.shop/public/storage/${product.product_img}`
              : "../src/assets/placeholder.png",
            apiProduct: true, // Flag to identify API products
            originalData: product, // Keep original data for updates
          }));
        } else {
          // If it's not in an expected format, log it and use an empty array
          console.log("Unexpected API response format:", response.data);
        }

        // Store all products from the API in state
        this.products = apiProducts;
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

        // Debug the API response
        console.log("Add product API response:", response.data);
        console.log("Image path from API:", response.data.product_img);

        // Add the new product to the local array
        const apiProduct = response.data;

        // Try different approaches to get the correct image URL
        let imageUrl;

        // Check if the API response includes a complete URL
        if (
          apiProduct.product_img &&
          apiProduct.product_img.startsWith("http")
        ) {
          // If it's already a full URL, use it directly
          imageUrl = apiProduct.product_img;
        } else if (apiProduct.product_img) {
          // If it's a path, try different combinations
          // Option 1: Standard pattern
          imageUrl = `https://agroconnect.shop/public/storage/${apiProduct.product_img}`;
          console.log("Constructed image URL:", imageUrl);
        } else {
          // Fallback to the image in the form
          imageUrl = productData.image;
        }

        const newProduct = {
          id: apiProduct.id || `#API${Math.floor(Math.random() * 900) + 100}`,
          name: apiProduct.product_name || productData.name,
          category: apiProduct.product_category || productData.category,
          unitPrice: apiProduct.product_unit_price?.toString().startsWith("Rs")
            ? apiProduct.product_unit_price
            : `Rs ${apiProduct.product_unit_price || productData.unitPrice}`,
          unit: apiProduct.product_unit || productData.unit,
          inStock: parseInt(apiProduct.product_qty) || productData.inStock,
          image: imageUrl,
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
    // Update an existing product
    async updateProduct(productData) {
      this.loading = true;
      this.error = null;

      try {
        console.log("Updating product with data:", productData);

        // If this is an API product, update via API
        if (productData.apiProduct || !productData.isDummy) {
          const formData = new FormData();

          // Required fields
          formData.append("product_name", productData.name);
          formData.append("product_category", productData.category);

          // Handle price formatting - remove currency symbol if present
          const unitPrice = productData.unitPrice.replace(/^Rs\s+/, "").trim();
          formData.append("product_unit_price", unitPrice);
          formData.append("product_price", unitPrice);

          formData.append("product_unit", productData.unit);
          formData.append("product_qty", productData.inStock.toString());

          // Do NOT append ID to formData
          // formData.append("id", productData.id); // Remove this line

          // Only add image if a new one was uploaded
          if (productData.imageFile) {
            formData.append("product_img", productData.imageFile);
          }

          // For debugging - log FormData contents
          for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
          }

          // Get the actual numeric ID (without any prefix like #SLT14)
          const rawId = productData.id
            .toString()
            .replace(/^#SLT14/, "")
            .replace(/^#API/, "");
          console.log("Using raw ID for API call:", rawId);

          // Make the API call with the correct ID in the URL
          const response = await axios.put(
            `${this.apiBaseUrl}/update-product/${rawId}`,
            formData,
            { headers: this.getFormDataHeaders() }
          );

          // Debug the API response
          console.log("Update product API response:", response.data);
          console.log(
            "Updated image path from API:",
            response.data.product_img
          );

          // Create updated product object
          const updatedApiProduct = response.data;

          // Try different approaches to get the correct image URL
          let imageUrl;

          // Check if the API response includes a complete URL
          if (
            updatedApiProduct.product_img &&
            updatedApiProduct.product_img.startsWith("http")
          ) {
            // If it's already a full URL, use it directly
            imageUrl = updatedApiProduct.product_img;
          } else if (updatedApiProduct.product_img) {
            // If it's a path, try the standard pattern
            imageUrl = `https://agroconnect.shop/public/storage/${updatedApiProduct.product_img}`;
            console.log("Constructed updated image URL:", imageUrl);
          } else {
            // Fallback to the existing image
            imageUrl = productData.image;
          }

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
            image: imageUrl,
            apiProduct: true,
            originalData: updatedApiProduct,
          };

          // Update the product in the local array
          const index = this.products.findIndex(
            (p) => p.id.toString() === productData.id.toString()
          );
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
        if (error.response) {
          console.log("API error response:", error.response.data);
          this.error = `Failed to update product: ${
            error.response.data.message || error.message
          }`;
        } else {
          this.error = "Failed to update product on the server.";
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
