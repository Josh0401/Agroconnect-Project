import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    userType: "",
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
      try {
        // Simple direct request without authentication headers
        const response = await axios.get(
          "https://agroconnect.shop/api/seller-register"
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching seller profile:", error);
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
          userType,
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
      try {
        const response = await axios.post(
          "https://agroconnect.shop/api/login",
          {
            email,
            password,
          }
        );

        const { token, user } = response.data;

        this.token = token;
        this.user = user;
        this.userType = user?.userType || ""; // Save userType

        if (token) {
          localStorage.setItem("authToken", token);
          localStorage.setItem("userType", this.userType); // Optional: Persist userType
        }

        return response.data;
      } catch (error) {
        throw error;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      this.userType = "";
      localStorage.removeItem("authToken");
      localStorage.removeItem("userType");
    },

    setAuth({ token, user }) {
      this.token = token;
      this.user = user;
      this.userType = user?.userType || "";

      if (token) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userType", this.userType);
      }
    },
  },
});
