<!-- src/views/marketplace/SearchResults.vue -->
<template>
    <nav class="navbar navbar-expand-lg sticky-top bg-white shadow-sm py-3">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="/market">
          <img
            src="../../assets/Agroconnect.png"
            alt="AgroEase Logo"
            height="40"
            class="me-2"
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <!-- Search Bar Component -->
            <SearchBar 
              :current-language="currentLanguage"
              :custom-placeholder="t.search || 'Search'"
              :custom-button-text="t.search || 'Search'"
            />
          </ul>
          <div class="d-flex align-items-center py-1">
            <!-- Language Selector Dropdown -->
            <LanguageDropdown
              class="me-3"
              @language-changed="handleLanguageChange"
            />
  
            <!-- Logged Out UI Elements -->
            <div v-if="!isLoggedIn" class="d-flex align-items-center">
              <router-link to="/login" class="btn btn-outline-success me-2">
                {{ t.login || "Login" }}
              </router-link>
              <router-link to="/signup" class="btn btn-success">
                {{ t.signup || "Sign Up" }}
              </router-link>
            </div>
  
            <!-- Logged In UI Elements -->
            <div v-else class="d-flex align-items-center">
              <!-- Wishlist Icon -->
              <button class="btn position-relative me-3" @click="goToWishlist">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 2.748c-1.1-1.176-2.785-1.103-3.95.285-1.168 1.395-.593 3.247 1.12 4.722C6.2 9.8 8 11.4 8 11.4s1.8-1.6 3.78-4.095c1.714-1.475 2.288-3.327 1.12-4.722C10.785 1.645 9.1 1.572 8 2.748z"
                  />
                </svg>
                <!-- Optional badge for wishlist count -->
                <span
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  v-if="wishlistItemCount > 0"
                >
                  {{ wishlistItemCount }}
                </span>
              </button>
  
              <!-- Shopping Cart Icon -->
              <button class="btn position-relative me-3" @click="goToCart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-cart"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 
                     .485.379L2.89 5H14.5a.5.5 0 0 1 
                     .49.598l-1.5 7A.5.5 0 0 1 
                     13 13H4a.5.5 0 0 1-.491-.408L1.01 2H.5a.5.5 0 0 1-.5-.5zM3.102 6l1.313 6h7.17l1.313-6H3.102zM5 12a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                  />
                </svg>
                <span
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  v-if="cartItemCount > 0"
                >
                  {{ cartItemCount }}
                </span>
              </button>
  
              <!-- Account Icon with Dropdown -->
              <div
                class="dropdown account-dropdown me-3"
                @mouseenter="openDropdown"
                @mouseleave="closeDropdown"
              >
                <button
                  class="btn dropdown-toggle p-0"
                  type="button"
                  id="accountDropdown"
                  aria-expanded="dropdownOpen"
                >
                  <!-- Account SVG Icon -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    <path
                      fill-rule="evenodd"
                      d="M8 9a5 5 0 0 0-4.546 2.916.5.5 0 0 0 .832.554A4 4 0 0 1 8 10a4 4 0 0 1 3.714 2.37.5.5 0 0 0 .832-.554A5 5 0 0 0 8 9z"
                    />
                  </svg>
                </button>
                <ul
                  class="dropdown-menu"
                  :class="{ show: dropdownOpen }"
                  aria-labelledby="accountDropdown"
                >
                  <li>
                    <router-link class="dropdown-item" to="/account/profile">
                      {{ t.profile || "Profile" }}
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="/account/orders">
                      {{ t.orders || "Orders" }}
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="/account/transactions">
                      {{ t.transactions || "Transactions" }}
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      class="dropdown-item"
                      to="/account/groups-communities"
                    >
                      {{ t.groupsCommunities || "Groups" }}
                    </router-link>
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="handleLogout"
                    >
                      {{ t.logout || "Logout" }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  
    <!-- Back to Marketplace Button -->
    <div class="container mt-3">
      <router-link to="/market" class="back-to-market">
        <span class="arrow-left">&#8592;</span> {{ t.backToMarketplace || "Back to Marketplace" }}
      </router-link>
    </div>
  
    <!-- Search Results Section -->
    <div class="container my-4">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else>
        <h2 class="mb-4">{{ t.searchResults || "Search Results" }}: "{{ searchQuery }}"</h2>
        
        <div v-if="filteredProducts.length === 0" class="text-center py-5">
          <p>{{ t.noResultsFound || "No results found for your search." }}</p>
          <p>{{ t.tryDifferentKeywords || "Please try different keywords or browse our categories." }}</p>
          <router-link to="/allcategory" class="btn btn-success mt-3">
            {{ t.browseCategories || "Browse Categories" }}
          </router-link>
        </div>
        
        <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          <div class="col" v-for="(product, index) in filteredProducts" :key="index">
            <router-link :to="'/product/' + product.id" class="text-decoration-none">
              <div class="card h-100">
                <img :src="product.imageUrl" class="card-img-top" :alt="getLocalizedProductName(product)">
                <div class="card-body text-center">
                  <h5 class="card-title">{{ getLocalizedProductName(product) }}</h5>
                  <p class="card-text text-success">{{ t.currency || "Rs" }}{{ product.price }}</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  
    <Footer />
  </template>
  
  <script>
  import { ref, computed, onMounted, watch, onUnmounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useAuthStore } from "../../stores/auth";
  import { translations } from "../../translations";
  import Footer from "../../components/MarketFooter.vue";
  import LanguageDropdown from "../../components/LanguageDropdown.vue";
  import SearchBar from "../../components/SearchBar.vue";
  import { useSearch } from "../../services/searchService";
  
  export default {
    name: 'SearchResults',
    components: {
      Footer,
      LanguageDropdown,
      SearchBar
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const authStore = useAuthStore();
      const { searchQuery } = useSearch();
      
      // State
      const loading = ref(true);
      const currentLanguage = ref('en');
      const t = ref(translations.en); // Default to English
      const filteredProducts = ref([]);
      const allProducts = ref([]);
      const dropdownOpen = ref(false);
      let dropdownTimeout = null;
      const wishlistItemCount = ref(0);
      const cartItems = ref([]);
      
      // Auth state
      const isLoggedIn = computed(() => !!authStore.token);
      
      // Computed properties
      const cartItemCount = computed(() => {
        return cartItems.value.reduce((total, item) => total + item.quantity, 0);
      });
      
      // Get localized product name based on current language
      const getLocalizedProductName = (product) => {
        const lang = currentLanguage.value;
        const key = getProductTranslationKey(product.id);
        
        // If there's a translation key and it exists in the current language's translations
        if (key && t.value[key]) {
          return t.value[key];
        }
        
        // Fallback to language-specific hardcoded values for cases where translations might be missing
        if (lang === 'fr') {
          switch (product.id) {
            case 'hybrid-coconut-seedlings':
              return 'Plants de Cocotier Hybride';
            case 'hybrid-tenera-oil-palm-seedlings':
              return 'Plants de Palmier à Huile Tenera Hybride';
            case 'tenera-oil-palm-sprouted-seeds':
              return 'Graines Germées de Palmier à Huile Tenera';
            case 'black-eyed-pea-cowpea':
              return 'Haricot à Œil Noir (Niébé)';
            case 'white-maize':
              return 'Maïs Blanc';
            case 'white-beans':
              return 'Haricots Blancs';
            case 'cassava':
              return 'Manioc';
            case 'mung-beans':
              return 'Haricots Mungo';
            case 'red-kidney-beans':
              return 'Haricots Rouges';
            case 'soursop-tea':
              return 'Thé de Corossol au Gingembre';
            default:
              return product.name;
          }
        } else if (lang === 'es') {
          switch (product.id) {
            case 'hybrid-coconut-seedlings':
              return 'Plántulas de Coco Híbrido';
            case 'hybrid-tenera-oil-palm-seedlings':
              return 'Plántulas de Palma Aceitera Tenera Híbrida';
            case 'tenera-oil-palm-sprouted-seeds':
              return 'Semillas Germinadas de Palma Aceitera Tenera';
            case 'black-eyed-pea-cowpea':
              return 'Frijol de Ojo Negro (Caupí)';
            case 'white-maize':
              return 'Maíz Blanco';
            case 'white-beans':
              return 'Frijoles Blancos';
            case 'cassava':
              return 'Yuca';
            case 'mung-beans':
              return 'Frijoles Mungo';
            case 'red-kidney-beans':
              return 'Frijoles Rojos';
            case 'soursop-tea':
              return 'Té de Guanábana con Jengibre';
            default:
              return product.name;
          }
        } else if (lang === 'km') {
          switch (product.id) {
            case 'hybrid-coconut-seedlings':
              return 'Plan Koko Ibrid';
            case 'hybrid-tenera-oil-palm-seedlings':
              return 'Plan Palmye Lwil Tenera Ibrid';
            case 'tenera-oil-palm-sprouted-seeds':
              return 'Grenn Tenera Palmye Lwil ki Jerme';
            case 'black-eyed-pea-cowpea':
              return 'Pwa Je Nwar (Pwa Kongo)';
            case 'white-maize':
              return 'Mayi Blan';
            case 'white-beans':
              return 'Pwa Blan';
            case 'cassava':
              return 'Manyok';
            case 'mung-beans':
              return 'Pwa Moung';
            case 'red-kidney-beans':
              return 'Pwa Rouj';
            case 'soursop-tea':
              return 'Dite Korosol ak Jenjanm';
            default:
              return product.name;
          }
        }
        
        // Default to English product name
        return product.name;
      };
      
      // Helper function to get translation key for product name
      const getProductTranslationKey = (productId) => {
        const keyMap = {
          'hybrid-coconut-seedlings': 'hybridCoconutSeedlings',
          'hybrid-tenera-oil-palm-seedlings': 'hybridTeneraOilPalmSeedlings',
          'tenera-oil-palm-sprouted-seeds': 'teneraOilPalmSproutedSeeds',
          'black-eyed-pea-cowpea': 'blackEyedPeaCowpea',
          'white-maize': 'whiteMaize',
          'white-beans': 'whiteBeans',
          'cassava': 'cassava',
          'mung-beans': 'mungBeans',
          'red-kidney-beans': 'redKidneyBeans',
          'soursop-tea': 'soursopTea'
        };
        
        return keyMap[productId];
      };
      
      // Get language-specific search term mapping
      const getLanguageSearchMapping = (lang) => {
        if (lang === 'km') {
          // Creole to English mapping
          return {
            'koko': 'coconut',
            'ibrid': 'hybrid',
            'plan': 'seedling',
            'palmye': 'palm',
            'lwil': 'oil',
            'grenn': 'seed',
            'pwa': 'bean',
            'pwa je nwar': 'black-eyed pea',
            'pwa kongo': 'cowpea',
            'mayi': 'maize',
            'blan': 'white',
            'manyok': 'cassava',
            'moung': 'mung',
            'rouj': 'red',
            'korosol': 'soursop',
            'dite': 'tea',
            'jenjanm': 'ginger'
          };
        } else if (lang === 'fr') {
          // French to English mapping
          return {
            'cocotier': 'coconut',
            'hybride': 'hybrid',
            'plants': 'seedling',
            'palmier': 'palm',
            'huile': 'oil',
            'graines': 'seed',
            'haricot': 'bean',
            'niébé': 'cowpea',
            'œil noir': 'black-eyed',
            'maïs': 'maize',
            'blanc': 'white',
            'manioc': 'cassava',
            'mungo': 'mung',
            'rouge': 'red',
            'corossol': 'soursop',
            'thé': 'tea',
            'gingembre': 'ginger'
          };
        } else if (lang === 'es') {
          // Spanish to English mapping
          return {
            'coco': 'coconut',
            'híbrido': 'hybrid',
            'plántulas': 'seedling',
            'palma': 'palm',
            'aceitera': 'oil',
            'semillas': 'seed',
            'frijol': 'bean',
            'caupí': 'cowpea',
            'ojo negro': 'black-eyed',
            'maíz': 'maize',
            'blanco': 'white',
            'yuca': 'cassava',
            'mungo': 'mung',
            'rojo': 'red',
            'guanábana': 'soursop',
            'té': 'tea',
            'jengibre': 'ginger'
          };
        }
        
        // For English or any other language, return empty object (no mapping needed)
        return {};
      };
      
      // Methods
      const fetchProducts = () => {
        // This would be an API call in a real application
        loading.value = true;
        
        try {
          // Simulate API delay
          setTimeout(() => {
            allProducts.value = [
              {
                id: "hybrid-coconut-seedlings",
                name: "Hybrid Coconut Seedlings",
                price: "10",
                imageUrl: "../../assets/hybrid-coconut.jpg", 
                category: "Seedlings",
                keywords: ["hybrid", "coconut", "seedlings", "plant"]
              },
              {
                id: "hybrid-tenera-oil-palm-seedlings",
                name: "Hybrid Tenera Oil Palm Seedlings",
                price: "15",
                imageUrl: "../../assets/hybrid_tenera_oil_palm.jpg",
                category: "Seedlings",
                keywords: ["hybrid", "tenera", "oil", "palm", "seedlings"]
              },
              {
                id: "tenera-oil-palm-sprouted-seeds",
                name: "Tenera Oil Palm Sprouted Seeds",
                price: "20",
                imageUrl: "../../assets/tenera_oil_palm_sprouted_seeds.jpg",
                category: "Seeds",
                keywords: ["tenera", "oil", "palm", "sprouted", "seeds"]
              },
              {
                id: "black-eyed-pea-cowpea",
                name: "Black-Eyed Pea (Cowpea)",
                price: "25",
                imageUrl: "../../assets/cowpea.jpg",
                category: "Grains",
                keywords: ["black-eyed", "pea", "cowpea", "bean"]
              },
              {
                id: "white-maize",
                name: "White Maize",
                price: "30",
                imageUrl: "../../assets/white-maize.jpg",
                category: "Grains",
                keywords: ["white", "maize", "corn"]
              },
              {
                id: "white-beans",
                name: "White Beans",
                price: "35",
                imageUrl: "../../assets/white-beans.jpg",
                category: "Grains",
                keywords: ["white", "beans", "legumes"]
              },
              {
                id: "cassava",
                name: "Cassava",
                price: "40",
                imageUrl: "../../assets/cassava.jpeg",
                category: "Roots and Tubers",
                keywords: ["cassava", "root", "tuber"]
              },
              {
                id: "mung-beans",
                name: "Mung Beans",
                price: "45",
                imageUrl: "../../assets/mung-beans.jpg",
                category: "Grains",
                keywords: ["mung", "beans", "legumes"]
              },
              {
                id: "red-kidney-beans",
                name: "Red Kidney Beans",
                price: "50",
                imageUrl: "../../assets/red-kidney-beans.jpg",
                category: "Grains",
                keywords: ["red", "kidney", "beans", "legumes"]
              },
              {
                id: "soursop-tea",
                name: "Soursop Tea with Ginger",
                price: "55",
                imageUrl: "../../assets/soursop-tea.jpg",
                category: "Beverages",
                keywords: ["soursop", "tea", "ginger", "beverage"]
              }
            ];
            
            performSearch();
            loading.value = false;
          }, 500);
        } catch (error) {
          console.error("Error fetching products:", error);
          loading.value = false;
        }
      };
      
      const performSearch = () => {
        try {
          const query = route.query.q;
          if (!query) {
            filteredProducts.value = [];
            loading.value = false;
            return;
          }
          
          // Update the search query in the form
          searchQuery.value = query;
          
          // Get the current language from route query or current state
          const lang = route.query.lang || currentLanguage.value;
          
          // Get the language-specific term mapping
          const languageMapping = getLanguageSearchMapping(lang);
          
          // Filter products based on the search query
          const searchTerms = query.toLowerCase().split(' ');
          
          // Handle non-English languages with term mapping
          if (Object.keys(languageMapping).length > 0) {
            // Expand search terms to include English equivalents
            const expandedSearchTerms = [...searchTerms];
            
            // Add English equivalents to the search terms
            searchTerms.forEach(term => {
              // Look for direct matches
              if (languageMapping[term]) {
                expandedSearchTerms.push(languageMapping[term]);
              }
              
              // Look for partial matches (prefixes)
              Object.keys(languageMapping).forEach(foreignTerm => {
                if (foreignTerm.startsWith(term) || term.startsWith(foreignTerm)) {
                  expandedSearchTerms.push(languageMapping[foreignTerm]);
                }
              });
            });
            
            // Use expanded search terms for non-English searches
            filteredProducts.value = allProducts.value.filter(product => {
              const name = product.name.toLowerCase();
              const category = product.category.toLowerCase();
              
              // Check product keywords against expanded search terms
              const keywordsMatch = product.keywords.some(keyword => 
                expandedSearchTerms.some(term => keyword.toLowerCase().includes(term))
              );
              
              // Check name and category against expanded search terms
              return expandedSearchTerms.some(term => 
                name.includes(term) || category.includes(term) || keywordsMatch
              );
            });
          } else {
            // Standard search for English
            filteredProducts.value = allProducts.value.filter(product => {
              const name = product.name.toLowerCase();
              const category = product.category.toLowerCase();
              const keywordsMatch = product.keywords.some(keyword => 
                searchTerms.some(term => keyword.toLowerCase().includes(term))
              );
              
              return searchTerms.some(term => 
                name.includes(term) || category.includes(term) || keywordsMatch
              );
            });
          }
          
          // If we still have no results, try a more lenient search
          if (filteredProducts.value.length === 0) {
            filteredProducts.value = allProducts.value.filter(product => {
              const name = product.name.toLowerCase();
              const category = product.category.toLowerCase();
              
              // More lenient search - check if any search term is a substring of product name or category
              return searchTerms.some(term => 
                name.indexOf(term) >= 0 || 
                category.indexOf(term) >= 0 ||
                product.keywords.some(keyword => keyword.toLowerCase().indexOf(term) >= 0)
              );
            });
          }
          
          console.log(`Search results for "${query}" (${lang}):`, filteredProducts.value);
        } catch (error) {
          console.error("Error performing search:", error);
          filteredProducts.value = [];
        }
      };
      
      const handleLanguageChange = (langCode) => {
        if (translations[langCode]) {
          currentLanguage.value = langCode;
          t.value = translations[langCode];
          // Save to localStorage for persistence
          localStorage.setItem("preferredLanguage", langCode);
          
          // If we're on the search page, update the search with the new language
          if (route.name === 'SearchResults' && route.query.q) {
            // Re-perform the search with the new language
            performSearch();
          }
        }
      };
      
      const openDropdown = () => {
        if (dropdownTimeout) {
          clearTimeout(dropdownTimeout);
          dropdownTimeout = null;
        }
        dropdownOpen.value = true;
      };
      
      const closeDropdown = () => {
        dropdownTimeout = setTimeout(() => {
          dropdownOpen.value = false;
        }, 300);
      };
      
      const handleLogout = () => {
        authStore.logout();
        router.push('/login');
      };
      
      const goToCart = () => {
        if (isLoggedIn.value) {
          router.push("/cart");
        } else {
          router.push("/login");
        }
      };
      
      const goToWishlist = () => {
        if (isLoggedIn.value) {
          router.push("/wishlist");
        } else {
          router.push("/login");
        }
      };
      
      // Lifecycle hooks
      onMounted(() => {
        try {
          const savedLang = localStorage.getItem("preferredLanguage");
          if (savedLang && translations[savedLang]) {
            currentLanguage.value = savedLang;
            t.value = translations[savedLang];
          }
          
          // Check if there's a language parameter in the URL
          const urlLang = route.query.lang;
          if (urlLang && translations[urlLang]) {
            currentLanguage.value = urlLang;
            t.value = translations[urlLang];
          }
          
          // Check if user is logged in
          const token = localStorage.getItem("authToken");
          if (token && !authStore.token) {
            authStore.token = token;
          }
          
          // Fetch products
          fetchProducts();
        } catch (error) {
          console.error("Error during component mount:", error);
          loading.value = false;
        }
      });
      
      onUnmounted(() => {
        // Clean up any timers or subscriptions
        if (dropdownTimeout) {
          clearTimeout(dropdownTimeout);
        }
        loading.value = false;
      });
      
      // Watch for route changes to update the search results
      watch(() => route.query.q, (newQuery) => {
        try {
          if (newQuery) {
            searchQuery.value = newQuery;
            if (allProducts.value.length > 0) {
              performSearch();
            } else {
              fetchProducts();
            }
          }
        } catch (error) {
          console.error("Error in route query watcher:", error);
          loading.value = false;
        }
      });
      
      // Watch for language changes to update product display
      watch(() => currentLanguage.value, () => {
        // If we're on the search page, update the displayed results when language changes
        if (route.name === 'SearchResults' && filteredProducts.value.length > 0) {
          // No need to re-filter, the display will update through the template binding
        }
      });
      
      return {
        loading,
        currentLanguage,
        t,
        filteredProducts,
        dropdownOpen,
        isLoggedIn,
        searchQuery,
        cartItems,
        wishlistItemCount,
        cartItemCount,
        openDropdown,
        closeDropdown,
        handleLogout,
        handleLanguageChange,
        goToCart,
        goToWishlist,
        getLocalizedProductName,
        getProductTranslationKey
      };
    }
  }
  </script>
  
  <style scoped>
  .card-img-top {
    object-fit: cover;
    height: 200px;
  }
  
  .card {
    border: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  
  .card:hover .card-title {
    color: rgb(25, 135, 84);
  }
  
  .card-img-top {
    transition: transform 0.3s ease;
  }
  
  .card:hover .card-img-top {
    transform: scale(1.05);
  }
  
  /* Back to marketplace link styling */
  .back-to-market {
    display: inline-flex;
    align-items: center;
    color: #198754;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s ease;
    margin-bottom: 20px;
  }
  
  .back-to-market:hover {
    color: #0f5132;
  }
  
  .arrow-left {
    margin-right: 8px;
    font-size: 1.1em;
  }
  
  .card {
    border: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .btn:hover {
    color: #eaf0ed;
  }
  </style>