// Fixed cart.js - Handling the nested API response structure
import { defineStore } from "pinia";
import axios from "axios";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [],
    loading: false,
    error: null,
    apiBaseUrl: "https://agroconnect.shop/api",
  }),

  getters: {
    getCartItems: (state) => state.cartItems,
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error,
    getError: (state) => state.error,
    getTotalItems: (state) => {
      return state.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    getTotalPrice: (state) => {
      return state.cartItems.reduce((total, item) => {
        const price =
          typeof item.price === "string" && item.price.startsWith("Rs")
            ? parseFloat(item.price.replace("Rs", "").trim())
            : parseFloat(item.price);

        return total + price * item.quantity;
      }, 0);
    },
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

    // Fetch cart items from the API
    async fetchCartItems() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(`${this.apiBaseUrl}/cart`, {
          headers: this.getAuthHeaders(),
        });

        console.log("Cart API Response:", response.data);

        // Process the cart items based on the actual API response structure
        let cartItemsData = [];

        // Handle the nested structure where cartItems are in data.cartItems
        if (
          response.data.success &&
          response.data.data &&
          response.data.data.cartItems
        ) {
          console.log("Found cartItems in data.cartItems structure");
          cartItemsData = response.data.data.cartItems;
        }
        // Handle array response directly
        else if (Array.isArray(response.data)) {
          console.log("Found cartItems in direct array");
          cartItemsData = response.data;
        }
        // Handle nested data array
        else if (response.data.data && Array.isArray(response.data.data)) {
          console.log("Found cartItems in data array");
          cartItemsData = response.data.data;
        }
        // Empty cart case - API returns success but no items
        else if (response.data.success) {
          console.log("API returned success but no items found");
          cartItemsData = [];
        } else {
          console.log("Unexpected cart API response format", response.data);
          cartItemsData = [];
        }

        console.log("Extracted cart items:", cartItemsData);

        // Map the items to our standard format
        this.cartItems = cartItemsData.map((item) => this.formatCartItem(item));
        console.log("Formatted cart items:", this.cartItems);

        return true;
      } catch (error) {
        console.error("Error fetching cart items:", error);

        // Improved error handling
        if (error.response && error.response.status === 401) {
          // Only handle 401 unauthorized by clearing items
          this.cartItems = [];
          this.error = "Authentication error. Please log in again.";
        } else {
          // For other errors, just show the error and keep previous state
          this.error = "Failed to load cart items. Please try again.";
        }

        return false;
      } finally {
        this.loading = false;
      }
    },

    // Format cart item from API response
    formatCartItem(apiItem) {
      // Handle the nested product info in response
      const product = apiItem.product || {};

      return {
        id: apiItem.id,
        product_id: apiItem.product_id,
        name: product.product_name || "Unknown Product",
        price: product.product_unit_price || 0,
        quantity: parseInt(apiItem.quantity) || 1,
        image: product.product_img
          ? `https://agroconnect.shop/public/storage/${product.product_img}`
          : "../src/assets/placeholder.png",
        originalData: apiItem,
      };
    },

    // Add an item to the cart
    async addToCart(productId, quantity = 1) {
      this.loading = true;
      this.error = null;

      try {
        const payload = {
          product_id: productId,
          quantity: quantity,
        };

        console.log("Adding to cart:", payload);

        const response = await axios.post(
          `${this.apiBaseUrl}/add-to-cart`,
          payload,
          {
            headers: this.getAuthHeaders(),
          }
        );

        console.log("Add to cart API response:", response.data);

        // Refresh cart items after adding
        await this.fetchCartItems();

        return { success: true, message: "Item added to cart successfully" };
      } catch (error) {
        console.error("Error adding item to cart:", error);

        // Improved error handling
        if (error.response) {
          if (error.response.status === 401) {
            // Authentication error
            this.error = "Authentication error. Please log in.";
            return { success: false, message: this.error, authError: true };
          } else if (error.response.data && error.response.data.message) {
            // Server provided error message
            this.error = error.response.data.message;
            return { success: false, message: this.error };
          }
        }

        // Generic error
        this.error = "Failed to add item to cart.";
        return { success: false, message: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Update cart item quantity
    async updateCartItem(cartItemId, quantityChange) {
      this.loading = true;
      this.error = null;

      try {
        // If quantity is increasing, use increase endpoint
        if (quantityChange > 0) {
          await axios.get(
            `${this.apiBaseUrl}/cart-increase-item/${cartItemId}`,
            {
              headers: this.getAuthHeaders(),
            }
          );
        }
        // If quantity is decreasing, use decrease endpoint
        else if (quantityChange < 0) {
          await axios.get(
            `${this.apiBaseUrl}/cart-decrease-item/${cartItemId}`,
            {
              headers: this.getAuthHeaders(),
            }
          );
        }

        // Refresh cart items after update
        await this.fetchCartItems();

        return { success: true };
      } catch (error) {
        console.error("Error updating cart item:", error);

        // Improved error handling
        if (error.response && error.response.status === 401) {
          this.error = "Authentication error. Please log in.";
          return { success: false, message: this.error, authError: true };
        } else {
          this.error = "Failed to update cart item.";
          return { success: false, message: this.error };
        }
      } finally {
        this.loading = false;
      }
    },

    // Remove item from cart
    async removeCartItem(cartItemId) {
      this.loading = true;
      this.error = null;

      try {
        await axios.delete(`${this.apiBaseUrl}/cart-delete/${cartItemId}`, {
          headers: this.getAuthHeaders(),
        });

        // Update local state
        this.cartItems = this.cartItems.filter(
          (item) => item.id !== cartItemId
        );

        return { success: true };
      } catch (error) {
        console.error("Error removing cart item:", error);

        // Improved error handling
        if (error.response && error.response.status === 401) {
          this.error = "Authentication error. Please log in.";
          return { success: false, message: this.error, authError: true };
        } else {
          this.error = "Failed to remove item from cart.";
          return { success: false, message: this.error };
        }
      } finally {
        this.loading = false;
      }
    },

    // Proceed to checkout
    async checkout() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(`${this.apiBaseUrl}/confirm`, {
          headers: this.getAuthHeaders(),
        });

        console.log("Checkout response:", response.data);

        return { success: true, data: response.data };
      } catch (error) {
        console.error("Error during checkout:", error);

        // Improved error handling
        if (error.response && error.response.status === 401) {
          this.error = "Authentication error. Please log in.";
          return { success: false, message: this.error, authError: true };
        } else {
          this.error = "Failed to process checkout.";
          return { success: false, message: this.error };
        }
      } finally {
        this.loading = false;
      }
    },

    // Clear the cart
    clearCart() {
      this.cartItems = [];
    },
  },
});
