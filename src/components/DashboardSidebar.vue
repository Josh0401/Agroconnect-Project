<template>
  <div class="sidebar">
    <!-- Logo -->
    <div class="logo-container">
      <router-link to="/">
        <img src="../assets/Agroconnect.png" alt="AgroEase Logo" class="logo" />
      </router-link>
    </div>

    <!-- Navigation Links -->
    <div class="nav-section">
      <p class="section-title">GENERAL</p>
      <ul class="nav-links">
        <router-link
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.route"
          class="nav-item"
          :class="{ active: isActive(item.route) }"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </router-link>
      </ul>
    </div>

    <!-- User Info -->
    <div class="user-profile">
      <router-link to="/profile">
        <img :src="userAvatar" alt="User Avatar" class="avatar" />
      </router-link>
      <div class="user-info">
        <p class="user-name">{{ user.name || "Loading..." }}</p>
        <p class="user-role">SELLER</p>
      </div>
      <i class="fa-solid fa-chevron-down"></i>
    </div>

    <!-- Logout Button -->
    <div class="logout" @click="logout">
      <i class="fa-solid fa-sign-out-alt"></i>
      <span>Logout</span>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/auth"; // Update the path if needed

export default {
  name: "Sidebar",
  data() {
    return {
      menuItems: [
        {
          label: "Dashboard",
          icon: "fa-solid fa-house",
          route: "/dashboard-seller",
        },
        {
          label: "Products",
          icon: "fa-solid fa-box-open",
          route: "/product-seller",
        },
        {
          label: "Orders",
          icon: "fa-solid fa-clipboard-list",
          route: "/order-seller",
        },
        {
          label: "Transactions",
          icon: "fa-solid fa-chart-bar",
          route: "/transaction-seller",
        },
        { label: "Profile", icon: "fa-solid fa-user", route: "/profile" },
      ],
      user: {
        name: "Loading...",
        profileImage: null,
      },
      defaultAvatar: "https://i.imgur.com/aq39RMA.jpg", // Default avatar path
      isLoading: true,
    };
  },
  computed: {
    userAvatar() {
      return this.user.profileImage || this.defaultAvatar;
    },
  },
  methods: {
    isActive(route) {
      return this.$route.path === route;
    },
    logout() {
      // Get auth store and call its logout method
      const authStore = useAuthStore();
      authStore.logout();

      // Navigate to login page
      this.$router.push("/login");
    },
    async fetchUserProfile() {
      try {
        this.isLoading = true;
        const authStore = useAuthStore();
        const profileData = await authStore.fetchSellerProfile();

        if (profileData && profileData.user) {
          // Set user name from API response
          this.user.name = `${profileData.user.first_name || ""} ${
            profileData.user.last_name || ""
          }`.trim();

          // Set profile image if available
          if (profileData.user.profile_image_url) {
            this.user.profileImage = profileData.user.profile_image_url;
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Handle authentication errors
        if (error.isAuthError) {
          this.$router.push("/login");
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    // Fetch user profile when component is mounted
    this.fetchUserProfile();
  },
};
</script>

<style scoped>
/* Sidebar Container */
.sidebar {
  width: 280px;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  position: fixed;
}

/* Logo and Close Button */
.logo-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.logo {
  width: 120px;
}

/* Navigation Links */
.nav-section {
  flex-grow: 1;
}

.section-title {
  color: #a0a0a0;
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.nav-links {
  list-style: none;
  padding: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 10px;
  border-radius: 8px;
  color: #6c757d;
  cursor: pointer;
  transition: background 0.3s;
  text-decoration: none;
}

.nav-item i {
  font-size: 18px;
}

.nav-item.active {
  background: #d1f5f2;
  color: #20b2aa;
}

/* User Profile */
.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  flex-grow: 1;
}

.user-name {
  font-weight: bold;
  margin: 0;
}

.user-role {
  color: #a0a0a0;
  font-size: 12px;
  margin: 0;
}

/* Chevron Icon */
.fa-chevron-down {
  color: #6c757d;
  cursor: pointer;
}

/* Logout Button */
.logout {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 10px;
  border-radius: 8px;
  color: #6c757d;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 20px;
}

.logout:hover {
  background: #f2f2f2;
}

.logout i {
  font-size: 18px;
}
</style>
