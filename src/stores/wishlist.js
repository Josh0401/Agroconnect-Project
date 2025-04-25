// simplified-wishlist.js - Pinia Store with product_id only
import { defineStore } from "pinia";
import axios from "axios";

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    wishlistItems: [],
    loading: false,
    error: null,
    apiBaseUrl: "https://agroconnect.shop/api",
  }),

  getters: {
    getWishlistItems: (state) => state.wishlistItems,
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error,
    getError: (state) => state.error,
    getWishlistCount: (state) => state.wishlistItems.length,
    isProductInWishlist: (state) => (productId) => {
      return state.wishlistItems.some(
        (item) =>
          item.product_id === productId ||
          item.product_id?.toString() === productId?.toString()
      );
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

    // Fetch wishlist items from the API
    async fetchWishlistItems() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(`${this.apiBaseUrl}/wishlist`, {
          headers: this.getAuthHeaders(),
        });

        console.log("Wishlist API Response:", response.data);

        // Process the wishlist items based on API response format
        if (Array.isArray(response.data)) {
          this.wishlistItems = response.data.map((item) =>
            this.formatWishlistItem(item)
          );
        } else if (response.data.data && Array.isArray(response.data.data)) {
          this.wishlistItems = response.data.data.map((item) =>
            this.formatWishlistItem(item)
          );
        } else {
          console.log("Unexpected wishlist API response format", response.data);
          this.wishlistItems = [];
        }

        return true;
      } catch (error) {
        console.error("Error fetching wishlist items:", error);

        // Better error handling
        if (error.response && error.response.status === 401) {
          // Only handle 401 unauthorized by clearing items
          this.wishlistItems = [];
          this.error = "Authentication error. Please log in again.";
        } else {
          // For other errors, just show the error and keep previous state
          this.error = "Failed to load wishlist items. Please try again.";
        }

        return false;
      } finally {
        this.loading = false;
      }
    },

    // Format wishlist item from API response
    formatWishlistItem(apiItem) {
      return {
        id: apiItem.id,
        product_id: apiItem.product_id,
        name:
          apiItem.product?.product_name ||
          apiItem.product_name ||
          "Unknown Product",
        price: apiItem.product?.product_unit_price || apiItem.price || 0,
        stockStatus:
          parseInt(apiItem.product?.product_qty || 0) > 0
            ? "In Stock"
            : "Out of Stock",
        image: apiItem.product?.product_img
          ? `https://agroconnect.shop/public/storage/${apiItem.product.product_img}`
          : "../src/assets/placeholder.png",
        originalData: apiItem,
      };
    },

    // Add an item to the wishlist - SIMPLIFIED VERSION WITH PRODUCT_ID ONLY
    async addToWishlist(productId) {
      this.loading = true;
      this.error = null;

      try {
        // ONLY include product_id as per backend developer's instruction
        const payload = {
          product_id: productId,
        };

        console.log("Adding to wishlist with product_id only:", payload);

        // Make the request
        const response = await axios.post(
          `${this.apiBaseUrl}/wishlist/create`,
          payload,
          {
            headers: this.getAuthHeaders(),
          }
        );

        console.log("Add to wishlist API response:", response.data);

        // Refresh wishlist items after adding
        await this.fetchWishlistItems();

        return {
          success: true,
          message: "Item added to wishlist successfully",
        };
      } catch (error) {
        console.error("Error adding item to wishlist:", error);

        // Log more details about the error
        if (error.response) {
          console.log("Error response data:", error.response.data);
          console.log("Error response status:", error.response.status);
          console.log("Error response headers:", error.response.headers);
        }

        // Improved error handling with more detailed messages
        let errorMessage = "Failed to add item to wishlist.";
        let errorDetails = null;

        if (error.response) {
          if (error.response.status === 401) {
            errorMessage = "Authentication error. Please log in.";
            return { success: false, message: errorMessage, authError: true };
          } else if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }

          if (error.response.data && error.response.data.error) {
            errorDetails = error.response.data.error;
          }
        }

        this.error = errorMessage;
        return {
          success: false,
          message: errorMessage,
          error: errorDetails,
        };
      } finally {
        this.loading = false;
      }
    },

    // Remove item from wishlist
    async removeFromWishlist(wishlistItemId) {
      this.loading = true;
      this.error = null;

      try {
        await axios.delete(
          `${this.apiBaseUrl}/wishlist/create/${wishlistItemId}`,
          {
            headers: this.getAuthHeaders(),
          }
        );

        // Update local state
        this.wishlistItems = this.wishlistItems.filter(
          (item) => item.id !== wishlistItemId
        );

        return { success: true };
      } catch (error) {
        console.error("Error removing wishlist item:", error);

        // Improved error handling
        if (error.response && error.response.status === 401) {
          this.error = "Authentication error. Please log in.";
          return { success: false, message: this.error, authError: true };
        } else {
          this.error = "Failed to remove item from wishlist.";
          return { success: false, message: this.error };
        }
      } finally {
        this.loading = false;
      }
    },

    // Toggle the wishlist status of a product
    async toggleWishlist(productId) {
      // Check if the product is already in the wishlist
      const isInWishlist = this.isProductInWishlist(productId);

      if (isInWishlist) {
        // Find the wishlist item to remove
        const wishlistItem = this.wishlistItems.find(
          (item) =>
            item.product_id === productId ||
            item.product_id?.toString() === productId?.toString()
        );

        if (wishlistItem) {
          return await this.removeFromWishlist(wishlistItem.id);
        }
        return { success: false, message: "Item not found in wishlist" };
      } else {
        return await this.addToWishlist(productId);
      }
    },

    // Clear the wishlist
    clearWishlist() {
      this.wishlistItems = [];
    },
  },
});
