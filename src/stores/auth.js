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
  }),

  actions: {
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
