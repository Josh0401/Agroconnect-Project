import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    account_type: "", // Changed from userType to account_type
    user: null, // Store complete user data
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    address: "",
    selectedCountry: "",
    selectedCity: "",
    password: "",
    confirmPassword: "",
    // Seller-specific fields:
    productName: "",
    productCategory: "",
    businessName: "",
    businessRegistrationNumber: "",
    businessLogo: null, // For file upload
    profile: null, // For user profile image
  }),

  actions: {
    async fetchSellerProfile() {
      console.log("[Auth Store] fetchSellerProfile called");
      try {
        const token = this.token || localStorage.getItem("authToken");
        console.log("[Auth Store] Token exists:", !!token);

        if (!token) {
          console.log("[Auth Store] No token found, rejecting");
          return Promise.reject({
            isAuthError: true,
            message: "No authentication token found. Please log in again.",
          });
        }

        console.log(
          "[Auth Store] Calling API:",
          "https://agroconnect.shop/api/fetch-profile"
        );

        const response = await axios.get(
          "https://agroconnect.shop/api/fetch-profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("[Auth Store] API response received:", response.data);
        return response.data;
      } catch (error) {
        console.error("[Auth Store] Error fetching seller profile:", error);

        if (error.response) {
          console.log("[Auth Store] API error status:", error.response.status);
          console.log("[Auth Store] API error data:", error.response.data);

          if (error.response.status === 401 || error.response.status === 403) {
            return Promise.reject({
              isAuthError: true,
              message: "Your session has expired. Please log in again.",
            });
          }
        }

        throw error;
      }
    },

    async updateSellerProfile(profileData) {
      console.log(
        "[Auth Store] updateSellerProfile called with data:",
        profileData
      );
      try {
        const token = this.token || localStorage.getItem("authToken");
        console.log("[Auth Store] Token exists:", !!token);

        if (!token) {
          console.log("[Auth Store] No token found, rejecting");
          return Promise.reject({
            isAuthError: true,
            message: "No authentication token found. Please log in again.",
          });
        }

        console.log("[Auth Store] Sending update to API");
        const response = await axios.post(
          "https://agroconnect.shop/api/update-seller-profile",
          profileData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("[Auth Store] Update successful:", response.data);
        return response.data;
      } catch (error) {
        console.error("[Auth Store] Error updating seller profile:", error);

        if (error.response) {
          console.log("[Auth Store] API error status:", error.response.status);
          console.log("[Auth Store] API error data:", error.response.data);
        }

        throw error;
      }
    },

    async submitSellerSignup(formData) {
      try {
        // If formData is already a FormData object, use it directly
        if (formData instanceof FormData) {
          const response = await axios.post(
            "https://agroconnect.shop/api/seller-register",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          return response.data;
        } else {
          // For backward compatibility, create FormData from payload object
          const formDataObj = new FormData();

          // Add all text fields
          formDataObj.append("first_name", formData.firstName);
          formDataObj.append("last_name", formData.lastName);
          formDataObj.append("email", formData.email);
          formDataObj.append("phone_no", formData.phone_number.toString());
          formDataObj.append("address", formData.address);
          formDataObj.append("country", formData.selectedCountry);
          formDataObj.append("city", formData.selectedCity);
          formDataObj.append("password", formData.password);
          formDataObj.append("account_type", "seller");
          formDataObj.append("business_name", formData.businessName);
          formDataObj.append("business_email", formData.email);
          formDataObj.append(
            "business_reg_no",
            formData.businessRegistrationNumber
          );
          formDataObj.append(
            "business_phone_no",
            formData.phone_number.toString()
          );
          formDataObj.append("business_address", formData.address);
          formDataObj.append("product_name", formData.productName);
          formDataObj.append("product_category", formData.productCategory);
          formDataObj.append("business_country", formData.selectedCountry);
          formDataObj.append("business_city", formData.selectedCity);

          // Add file fields (if they exist)
          if (formData.profile) {
            formDataObj.append("profile", formData.profile);
          }

          if (formData.businessLogo) {
            formDataObj.append("business_logo", formData.businessLogo);
          }

          const response = await axios.post(
            "https://agroconnect.shop/api/seller-register",
            formDataObj,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    },

    async submitSignup({
      firstName,
      lastName,
      email,
      phone_number,
      address,
      selectedCountry,
      selectedCity,
      password,
      userType,
      productName,
      productCategory,
    }) {
      try {
        const payload = {
          first_name: firstName,
          last_name: lastName,
          email,
          phone_no: phone_number.toString(),
          address,
          country: selectedCountry,
          city: selectedCity,
          password,
          account_type: userType, // Changed to account_type
          ...(userType === "seller" && {
            productName,
            productCategory,
          }),
        };

        const response = await axios.post(
          "https://agroconnect.shop/api/register",
          payload
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    async login({ email, password }) {
      console.log("[Auth Store] Login attempted for:", email);
      try {
        const response = await axios.post(
          "https://agroconnect.shop/api/login",
          {
            email,
            password,
          }
        );

        console.log("[Auth Store] Login response:", response.data);

        // IMPORTANT FIX: Get access_token instead of token
        const token = response.data.access_token;
        const user = response.data.user;

        console.log("[Auth Store] Login successful, token received:", !!token);
        console.log("[Auth Store] User data:", user);

        this.token = token;
        this.user = user;

        // Updated to use account_type
        this.account_type = user?.account_type || "";
        console.log("[Auth Store] Account type set to:", this.account_type);

        if (token) {
          localStorage.setItem("authToken", token);
          localStorage.setItem("account_type", this.account_type);
          console.log(
            "[Auth Store] Token and account_type saved to localStorage"
          );
        }

        return response.data;
      } catch (error) {
        console.error("[Auth Store] Login error:", error);
        throw error;
      }
    },

    logout() {
      console.log("[Auth Store] Logout called");
      this.token = null;
      this.user = null;
      this.account_type = "";
      localStorage.removeItem("authToken");
      localStorage.removeItem("account_type");
      console.log("[Auth Store] Auth data cleared");
    },

    setAuth({ token, user }) {
      console.log("[Auth Store] setAuth called");

      // For backwards compatibility, check if we're receiving access_token
      // instead of token (in case the method is called with response.data)
      const authToken = token?.access_token || token;

      this.token = authToken;
      this.user = user;

      // Updated to use account_type
      this.account_type = user?.account_type || "";
      console.log(
        "[Auth Store] Auth state set, account type:",
        this.account_type
      );

      if (authToken) {
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("account_type", this.account_type);
        console.log("[Auth Store] Auth data saved to localStorage");
      }
    },
  },
});
