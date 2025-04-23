<template>
    <div class="container-fluid h-100">
      <div class="row h-100">
        <!-- Sidebar - similar to other account pages -->
        <div class="col-md-3 col-lg-2 bg-light sidebar py-3">
          <div class="d-flex align-items-center pb-3 mb-3 border-bottom">
            <router-link to="/market" class="text-decoration-none">
              <img
                src="../../assets/Agroconnect.png"
                alt="AgroEase Logo"
                height="40"
                class="me-2"
              />
            </router-link>
          </div>
          
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link to="/market" class="nav-link text-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart me-2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {{ t.backToMarketplace || 'Back to Marketplace' }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/account/profile" class="nav-link text-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user me-2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                {{ t.profile || 'Profile' }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/account/orders" class="nav-link text-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag me-2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {{ t.orders || 'Orders' }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/account/transactions" class="nav-link text-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-credit-card me-2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                {{ t.transactions || 'Transactions' }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/account/groups-communities" class="nav-link text-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users me-2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                {{ t.groupsCommunities || 'Groups' }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/notifications" class="nav-link active bg-success text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell me-2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                {{ t.notifications || 'Notifications' }}
              </router-link>
            </li>
            <li class="nav-item mt-4">
              <a href="/login" class="nav-link text-dark" @click.prevent="logout">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out me-2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                {{ t.logout || 'Logout' }}
              </a>
            </li>
          </ul>
        </div>
  
        <!-- Main Content -->
        <div class="col-md-9 col-lg-10 p-4">
          <div class="container">
            <h2 class="mb-4">{{ t.notifications || 'Notifications' }}</h2>
            
            <!-- Notification filters -->
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div class="btn-group" role="group">
                <button type="button" class="btn" :class="{'btn-success': activeFilter === 'all', 'btn-outline-success': activeFilter !== 'all'}" @click="activeFilter = 'all'">
                  {{ t.all || 'All' }}
                </button>
                <button type="button" class="btn" :class="{'btn-success': activeFilter === 'unread', 'btn-outline-success': activeFilter !== 'unread'}" @click="activeFilter = 'unread'">
                  {{ t.unread || 'Unread' }}
                </button>
              </div>
              <button class="btn btn-outline-success" @click="markAllAsRead">
                {{ t.markAllAsRead || 'Mark all as read' }}
              </button>
            </div>
            
            <!-- Notifications list -->
            <div class="card shadow-sm mb-4">
              <div class="list-group list-group-flush">
                <div v-for="(notification, index) in filteredNotifications" :key="index" 
                     class="list-group-item list-group-item-action d-flex gap-3 py-3"
                     :class="{'bg-light': !notification.read}">
                  <div class="flex-shrink-0">
                    <!-- Different icons based on notification type -->
                    <div v-if="notification.type === 'order'" class="bg-success text-white rounded-circle p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                    </div>
                    <div v-else-if="notification.type === 'group'" class="bg-primary text-white rounded-circle p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div v-else-if="notification.type === 'system'" class="bg-warning text-white rounded-circle p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    </div>
                  </div>
                  <div class="d-flex flex-column w-100">
                    <div class="d-flex justify-content-between">
                      <h6 class="mb-0">{{ notification.title }}</h6>
                      <small class="text-muted">{{ notification.time }}</small>
                    </div>
                    <p class="mb-0">{{ notification.message }}</p>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                      <a v-if="notification.actionUrl" :href="notification.actionUrl" class="btn btn-sm btn-outline-success">{{ notification.actionText }}</a>
                      <button class="btn btn-sm text-muted" @click="toggleReadStatus(index)">
                        {{ notification.read ? (t.markAsUnread || 'Mark as unread') : (t.markAsRead || 'Mark as read') }}
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Empty state if no notifications -->
                <div v-if="filteredNotifications.length === 0" class="list-group-item text-center py-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell-off mb-3 text-muted">
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    <path d="M18.63 13A17.89 17.89 0 0 1 18 8"></path>
                    <path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"></path>
                    <path d="M18 8a6 6 0 0 0-9.33-5"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                  <h5>{{ activeFilter === 'all' ? (t.noNotifications || 'No notifications yet') : (t.noUnreadNotifications || 'No unread notifications') }}</h5>
                  <p class="text-muted">{{ t.checkBackLater || 'Check back later for updates on your orders, groups, and more.' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'NotificationsPage',
    setup() {
      // Router for navigation
      const router = useRouter();
      
      // Filter state
      const activeFilter = ref('all');
      
      // Translation fallback
      const t = ref({});
      
      // Mock notifications data
      const notifications = ref([
        {
          id: 1,
          type: 'order',
          title: 'Order Confirmed',
          message: 'Your order #12345 has been confirmed and is being processed.',
          time: '2 hours ago',
          read: false,
          actionUrl: '/account/orders',
          actionText: 'View Order'
        },
        {
          id: 2,
          type: 'group',
          title: 'New Message in Urban Farmers Network',
          message: 'Jane Smith: "Has anyone tried the new organic fertilizer from GreenLife?"',
          time: '5 hours ago',
          read: false,
          actionUrl: '/account/groups-communities',
          actionText: 'View Group'
        },
        {
          id: 3,
          type: 'system',
          title: 'Special Offer',
          message: 'Get 15% off on all seedlings this week! Use code SPRING15 at checkout.',
          time: 'Yesterday',
          read: true,
          actionUrl: '/allproduct',
          actionText: 'Shop Now'
        },
        {
          id: 4,
          type: 'order',
          title: 'Order Shipped',
          message: 'Your order #12240 has been shipped. Expected delivery in 3-5 days.',
          time: '2 days ago',
          read: true,
          actionUrl: '/account/orders',
          actionText: 'Track Order'
        },
        {
          id: 5,
          type: 'group',
          title: 'New Message in Sustainable Agriculture Forum',
          message: 'Discussion on sustainable farming practices and eco-friendly agricultural technologies has new updates.',
          time: '3 days ago',
          read: true,
          actionUrl: '/account/groups-communities',
          actionText: 'View Group'
        }
      ]);
      
      // Try to load translations, but don't fail if they're unavailable
      onMounted(() => {
        try {
          const translations = require("../../translations");
          if (translations && translations.en) {
            t.value = translations.en;
          }
        } catch (error) {
          console.log("Translations not available, using fallbacks");
        }
      });
      
      // Filtered notifications based on active filter
      const filteredNotifications = computed(() => {
        if (activeFilter.value === 'unread') {
          return notifications.value.filter(notification => !notification.read);
        }
        return notifications.value;
      });
      
      // Count of unread notifications
      const unreadCount = computed(() => {
        return notifications.value.filter(notification => !notification.read).length;
      });
      
      // Methods
      const toggleReadStatus = (index) => {
        notifications.value[index].read = !notifications.value[index].read;
        // In a real app, you would also update this status on the server
      };
      
      const markAllAsRead = () => {
        notifications.value.forEach(notification => {
          notification.read = true;
        });
        // In a real app, you would also update this status on the server
      };
      
      const logout = () => {
        // Implement logout functionality
        localStorage.removeItem('authToken');
        router.push('/login');
      };
      
      return {
        t,
        activeFilter,
        notifications,
        filteredNotifications,
        unreadCount,
        toggleReadStatus,
        markAllAsRead,
        logout
      };
    }
  };
  </script>
  
  <style scoped>
  .sidebar {
    min-height: 100vh;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 0.25rem;
    color: #198754 !important;
  }
  
  .nav-link:hover {
    background-color: #f8f9fa;
  }
  
  .nav-link.active {
    font-weight: bold;
    color: #fff !important;
  }
  
  .feather {
    width: 16px;
    height: 16px;
  }
  
  /* Responsive adjustments for mobile */
  @media (max-width: 768px) {
    .sidebar {
      min-height: auto;
    }
  }
  </style>