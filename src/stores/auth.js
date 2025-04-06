import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    user: null,
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    address: "",
    selectedCountry: "",
    selectedCity: "",
    password: "",
    confirmPassword: "",
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
    }) {
      try {
        const response = await axios.post(
          "https://agroconnect.shop/api/register",
          {
            first_name: firstName,
            last_name: lastName,
            email,
            phone_no: phone_number,
            address,
            country: selectedCountry,
            city: selectedCity,
            password,
          }
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
        // Assuming API returns { token, user } on success
        const { token, user } = response.data;
        this.token = token;
        this.user = user;
        if (token) {
          localStorage.setItem("authToken", token);
        }
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("authToken");
    },
    setAuth({ token, user }) {
      this.token = token;
      this.user = user;
      if (token) {
        localStorage.setItem("authToken", token);
      }
    },
  },
});
