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
            <!-- Search container -->
            <div class="search-container d-flex align-items-center">
              <!-- Search Icon (always visible) -->
              <svg
                class="search-icon me-2"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85.708-.708-3.85-3.85zm-5.242.656
                     a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"
                />
              </svg>
              <!-- Search input & button visible only on larger screens -->
              <input
                id="searchInput"
                type="text"
                placeholder="Search"
                @keydown.enter="handleSearch"
                v-model="searchQuery"
                class="d-none d-lg-block form-control me-2"
              />
              <button
                type="button"
                @click="handleSearch"
                class="d-none d-lg-block btn btn-outline-secondary"
              >
                Search
              </button>
            </div>
          </ul>
          <div class="d-flex align-items-center py-1">
            <!-- Language Selector Dropdown - New Implementation -->
            <div class="language-dropdown me-3 position-relative">
              <button
                class="btn d-flex align-items-center"
                type="button"
                @click.stop="toggleLanguageDropdown"
              >
                <!-- Globe Icon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-globe me-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                </svg>
                <span class="ms-1">{{ currentLanguage }}</span>
                <!-- Custom dropdown arrow -->
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  fill="currentColor" 
                  class="bi bi-chevron-down ms-1" 
                  viewBox="0 0 16 16"
                >
                  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
              <div 
                class="language-menu" 
                v-if="languageDropdownOpen"
              >
                <a 
                  href="#" 
                  class="dropdown-item" 
                  @click.prevent="changeLanguage('English')"
                >
                  <span class="flag-icon me-2">🇬🇧</span>English
                </a>
                <a 
                  href="#" 
                  class="dropdown-item" 
                  @click.prevent="changeLanguage('Français')"
                >
                  <span class="flag-icon me-2">🇫🇷</span>Français
                </a>
                <a 
                  href="#" 
                  class="dropdown-item" 
                  @click.prevent="changeLanguage('Español')"
                >
                  <span class="flag-icon me-2">🇪🇸</span>Español
                </a>
                <a 
                  href="#" 
                  class="dropdown-item" 
                  @click.prevent="changeLanguage('Kreol Morisien')"
                >
                  <span class="flag-icon me-2">🇲🇺</span>Kreol Morisien
                </a>
              </div>
            </div>
  
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
                  <router-link class="dropdown-item" to="/account/profile"
                    >Profile</router-link
                  >
                </li>
                <li>
                  <router-link class="dropdown-item" to="/account/orders"
                    >Orders</router-link
                  >
                </li>
                <li>
                  <router-link class="dropdown-item" to="/account/transactions"
                    >Transactions</router-link
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="/login" @click.prevent="logout()"
                    >Logout</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <section class="container my-4">
      <div class="row">
        <!-- Large image on the left wrapped in a router-link -->
        <div class="col-md-8 mb-3 mb-md-0">
          <router-link to="/allproduct" class="d-block">
            <img
              src="../../assets/mkt-banner.png"
              alt=""
              class="img-fluid w-100"
            />
          </router-link>
        </div>
  
        <!-- Two stacked images on the right -->
        <div class="col-md-4">
          <div class="mb-3">
            <router-link to="/allproduct" class="d-block">
              <img
                src="../../assets/mkt-banner2.png"
                alt=""
                class="img-fluid w-100"
              />
            </router-link>
          </div>
          <div>
            <router-link to="/allproduct" class="d-block">
              <img
                src="../../assets/mkt-banner3.png"
                alt=""
                class="img-fluid w-100"
              />
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <!-- Categories Section -->
    <Categories />
    <!-- Products Section with Clickable Cards -->
    <div class="products">
      <section class="newproduct">
        <div class="container">
          <div class="categories-header">
            <p class="h1">Products</p>
            <router-link to="/allproduct" class="view-all">
              View All <span class="arrow">&rarr;</span>
            </router-link>
          </div>
          <div class="container my-5">
            <div
              class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4"
            >
              <!-- Card 1 -->
              <div class="col">
                <router-link
                  :to="{ path: '/product/hybrid-coconut-seedlings' }"
                  class="text-decoration-none"
                >
                  <div class="card h-100">
                    <img
                      src="../../assets/hybrid-coconut.jpg"
                      class="card-img-top"
                      alt="Hybrid Coconut Seedlings"
                    />
                    <div class="card-body text-center">
                      <h5 class="card-title">Hybrid Coconut Seedlings</h5>
                      <p class="card-text">Rs10</p>
                    </div>
                  </div>
                </router-link>
              </div>
  
              <!-- Card 2 -->
              <div class="col">
                <router-link
                  :to="{ path: '/product/hybrid-tenera-oil-palm-seedlings' }"
                  class="text-decoration-none"
                >
                  <div class="card h-100">
                    <img
                      src="../../assets/hybrid_tenera_oil_palm.jpg"
                      class="card-img-top"
                      alt="Tenera Oil Palm Seedlings"
                    />
                    <div class="card-body text-center">
                      <h5 class="card-title">Hybrid Tenera Oil Palm Seedlings</h5>
                      <p class="card-text">Rs15</p>
                    </div>
                  </div>
                </router-link>
              </div>
  
              <!-- Card 3 -->
              <div class="col">
                <router-link
                  :to="{ path: '/product/tenera-oil-palm-sprouted-seeds' }"
                  class="text-decoration-none"
                >
                  <div class="card h-100">
                    <img
                      src="../../assets/tenera_oil_palm_sprouted_seeds.jpg"
                      class="card-img-top"
                      alt="Tenera Oil Palm Sprouted Seeds"
                    />
                    <div class="card-body text-center">
                      <h5 class="card-title">Tenera Oil Palm Sprouted Seeds</h5>
                      <p class="card-text">Rs20</p>
                    </div>
                  </div>
                </router-link>
              </div>
  
              <!-- Card 4 -->
              <div class="col">
                <router-link
                  :to="{ path: '/product/black-eyed-pea-cowpea' }"
                  class="text-decoration-none"
                >
                  <div class="card h-100">
                    <img
                      src="../../assets/cowpea.jpg"
                      class="card-img-top"
                      alt="Black-Eyed Pea (Cowpea)"
                    />
                    <div class="card-body text-center">
                      <h5 class="card-title">Black-Eyed Pea (Cowpea)</h5>
                      <p class="card-text">Rs25</p>
                    </div>
                  </div>
                </router-link>
              </div>
  
              <!-- Card 5 -->
              <div class="col">
                <router-link
                  :to="{ path: '/product/white-maize' }"
                  class="text-decoration-none"
                >
                  <div class="card h-100">
                    <img
                      src="../../assets/white-maize.jpg"
                      class="card-img-top"
                      alt="White Maize"
                    />
                    <div class="card-body text-center">
                      <h5 class="card-title">White Maize</h5>
                      <p class="card-text">Rs30</p>
                    </div>
                  </div>
                </router-link>
              </div>
  
              <!-- Card 6 -->
              <div class="col">
                <router-link
                  :to="{ path: '/product/white-beans' }"
                  class="text-decoration-none"
                >
                  <div class="card h-100">
                    <img
                      src="../../assets/white-beans.jpg"
                      class="card-img-top"
                      alt="White Beans"
                    />
                    <div class="card-body text-center">
                      <h5 class="card-title">White Beans</h5>
                      <p class="card-text">Rs35</p>
                    </div>
                  </div>
                </router-link>
              </div>
  
              <!-- Card 7 -->
              <div class="col">
                <router-link
                  :to="{ path: '/product/cassava' }"
                  class="text-decoration-none"
                >
                  <div class="card h-100">
                    <img
                      src="../../assets/cassava.jpeg"
                      class="card-img-top"
                      alt="Cassava"
                    />
                    <div class="card-body text-center">
                      <h5 class="card-title">Cassava</h5>
                      <p class="card-text">Rs40</p>
                    </div>
                  </div>
                </router-link>
              </div>
  
              <!-- Card 8 -->
              <div class="col">
                <router-link
                  :to="{ path: '/product/mung-beans' }"
                  class="text-decoration-none"
                >
                  <div class="card h-100">
                    <img
                      src="../../assets/mung-beans.jpg"
                      class="card-img-top"
                      alt="Mung Beans"
                    />
                    <div class="card-body text-center">
                      <h5 class="card-title">Mung Beans</h5>
                      <p class="card-text">Rs45</p>
                    </div>
                  </div>
                </router-link>
              </div>
  
              <!-- Card 9 -->
              <div class="col">
                <router-link
                  :to="{ path: '/product/red-kidney-beans' }"
                  class="text-decoration-none"
                >
                  <div class="card h-100">
                    <img
                      src="../../assets/red-kidney-beans.jpg"
                      class="card-img-top"
                      alt="Red kidney Beans"
                    />
                    <div class="card-body text-center">
                      <h5 class="card-title">Red kidney Beans</h5>
                      <p class="card-text">Rs50</p>
                    </div>
                  </div>
                </router-link>
              </div>
  
              <!-- Card 10 -->
              <div class="col">
                <router-link
                  :to="{ path: '/product/soursop-tea' }"
                  class="text-decoration-none"
                >
                  <div class="card h-100">
                    <img
                      src="../../assets/soursop-tea.jpg"
                      class="card-img-top"
                      alt="Soursop Tea with Ginger"
                    />
                    <div class="card-body text-center">
                      <h5 class="card-title">Soursop Tea with Ginger</h5>
                      <p class="card-text">Rs55</p>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- New Products Section with Clickable Cards -->
    <div class="new-products">
      <section class="newproduct">
        <div class="container">
          <div class="categories-header">
            <p class="h1">New Products</p>
          </div>
          <div class="container my-5">
            <div
              class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4"
            >
              <!-- Card 1 -->
              <div class="col">
                <router-link
                  :to="{ path: '/product/hybrid-coconut-seedlings' }"
                  class="text-decoration-none"
                >
                  <div class="card h-100">
                    <img
                      src="../../assets/hybrid-coconut.jpg"
                      class="card-img-top"
                      alt="Hybrid Coconut Seedlings"
                    />
                    <div class="card-body text-center">
                      <h5 class="card-title">Hybrid Coconut Seedlings</h5>
                      <p class="card-text">Rs10</p>
                    </div>
                  </div>
                </router-link>
              </div>
  
              <!-- Card 2 -->
              <div class="col">
                <router-link
                  :to="{ path: '/product/hybrid-tenera-oil-palm-seedlings' }"
                  class="text-decoration-none"
                >
                  <div class="card h-100">
                    <img
                      src="../../assets/hybrid_tenera_oil_palm.jpg"
                      class="card-img-top"
                      alt="Tenera Oil Palm Seedlings"
                    />
                    <div class="card-body text-center">
                      <h5 class="card-title">Hybrid Tenera Oil Palm Seedlings</h5>
                      <p class="card-text">Rs15</p>
                    </div>
                  </div>
                </router-link>
              </div>
  
              <!-- Card 3 -->
              <div class="col">
                <router-link
                  :to="{ path: '/product/tenera-oil-palm-sprouted-seeds' }"
                  class="text-decoration-none"
                >
                  <div class="card h-100">
                    <img
                      src="../../assets/tenera_oil_palm_sprouted_seeds.jpg"
                      class="card-img-top"
                      alt="Tenera Oil Palm Sprouted Seeds"
                    />
                    <div class="card-body text-center">
                      <h5 class="card-title">Tenera Oil Palm Sprouted Seeds</h5>
                      <p class="card-text">Rs20</p>
                    </div>
                  </div>
                </router-link>
              </div>
  
              <!-- Card 4 -->
              <div class="col">
                <router-link
                  :to="{ path: '/product/black-eyed-pea-cowpea' }"
                  class="text-decoration-none"
                >
                  <div class="card h-100">
                    <img
                      src="../../assets/cowpea.jpg"
                      class="card-img-top"
                      alt="Black-Eyed Pea (Cowpea)"
                    />
                    <div class="card-body text-center">
                      <h5 class="card-title">Black-Eyed Pea (Cowpea)</h5>
                      <p class="card-text">Rs25</p>
                    </div>
                  </div>
                </router-link>
              </div>
  
              <!-- Card 5 -->
              <div class="col">
                <router-link
                  :to="{ path: '/product/white-maize' }"
                  class="text-decoration-none"
                >
                  <div class="card h-100">
                    <img
                      src="../../assets/white-maize.jpg"
                      class="card-img-top"
                      alt="White Maize"
                    />
                    <div class="card-body text-center">
                      <h5 class="card-title">White Maize</h5>
                      <p class="card-text">Rs30</p>
                    </div>
                  </div>
                </router-link>
              </div>
  
              <!-- Card 6 -->
              <div class="col">
                <router-link
                  :to="{ path: '/product/white-beans' }"
                  class="text-decoration-none"
                >
                  <div class="card h-100">
                    <img
                      src="../../assets/white-beans.jpg"
                      class="card-img-top"
                      alt="White Beans"
                    />
                    <div class="card-body text-center">
                      <h5 class="card-title">White Beans</h5>
                      <p class="card-text">Rs35</p>
                    </div>
                  </div>
                </router-link>
              </div>
  
              <!-- Card 7 -->
              <div class="col">
                <router-link
                  :to="{ path: '/product/cassava' }"
                  class="text-decoration-none"
                >
                  <div class="card h-100">
                    <img
                      src="../../assets/cassava.jpeg"
                      class="card-img-top"
                      alt="Cassava"
                    />
                    <div class="card-body text-center">
                      <h5 class="card-title">Cassava</h5>
                      <p class="card-text">Rs40</p>
                    </div>
                  </div>
                </router-link>
              </div>
  
              <!-- Card 8 -->
              <div class="col">
                <router-link
                  :to="{ path: '/product/mung-beans' }"
                  class="text-decoration-none"
                >
                  <div class="card h-100">
                    <img
                      src="../../assets/mung-beans.jpg"
                      class="card-img-top"
                      alt="Mung Beans"
                    />
                    <div class="card-body text-center">
                      <h5 class="card-title">Mung Beans</h5>
                      <p class="card-text">Rs45</p>
                    </div>
                  </div>
                </router-link>
              </div>
  
              <!-- Card 9 -->
              <div class="col">
                <router-link
                  :to="{ path: '/product/red-kidney-beans' }"
                  class="text-decoration-none"
                >
                  <div class="card h-100">
                    <img
                      src="../../assets/red-kidney-beans.jpg"
                      class="card-img-top"
                      alt="Red kidney Beans"
                    />
                    <div class="card-body text-center">
                      <h5 class="card-title">Red kidney Beans</h5>
                      <p class="card-text">Rs50</p>
                    </div>
                  </div>
                </router-link>
              </div>
  
              <!-- Card 10 -->
              <div class="col">
                <router-link
                  :to="{ path: '/product/soursop-tea' }"
                  class="text-decoration-none"
                >
                  <div class="card h-100">
                    <img
                      src="../../assets/soursop-tea.jpg"
                      class="card-img-top"
                      alt="Soursop Tea with Ginger"
                    />
                    <div class="card-body text-center">
                      <h5 class="card-title">Soursop Tea with Ginger</h5>
                      <p class="card-text">Rs55</p>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
  </template>
  
  <script>
  import Footer from "../../components/MarketFooter.vue";
  import Categories from "../../components/Categories.vue";
  export default {
    name: "HomePage",
    components: {
      Footer,
      Categories,
    },
    data() {
      return {
        // Account dropdown properties
        dropdownOpen: false,
        dropdownTimeout: null,
        
        // Search properties
        searchQuery: "",
        
        // Cart and wishlist properties  
        cartItemCount: 0,
        wishlistItemCount: 0,
        cartItems: [],
        
        // Language dropdown properties
        languageDropdownOpen: false,
        currentLanguage: "English"
      };
    },
    methods: {
      // Account dropdown methods
      openDropdown() {
        if (this.dropdownTimeout) {
          clearTimeout(this.dropdownTimeout);
          this.dropdownTimeout = null;
        }
        this.dropdownOpen = true;
      },
      closeDropdown() {
        this.dropdownTimeout = setTimeout(() => {
          this.dropdownOpen = false;
        }, 300);
      },
      
      // Navigation methods
      logout() {
        console.log("Logging out...");
        this.$router.push("/login");
      },
      handleSearch() {
        const query = this.searchQuery.trim();
        if (query) {
          this.$router.push({
            name: "SearchResults",
            query: { q: query },
          });
        }
      },
      goToCart() {
        this.$router.push("/cart");
      },
      goToWishlist() {
        this.$router.push("/wishlist");
      },
      
      // Language dropdown methods
      toggleLanguageDropdown() {
        this.languageDropdownOpen = !this.languageDropdownOpen;
      },
      changeLanguage(language) {
        this.currentLanguage = language;
        this.languageDropdownOpen = false;
        console.log(`Language changed to ${language}`);
      }
    },
    computed: {
      cartItemCount() {
        return this.cartItems.reduce((total, item) => total + item.quantity, 0);
      },
    },
    mounted() {
      // Close language dropdown when clicking outside
      document.addEventListener('click', (e) => {
        const dropdown = this.$el.querySelector('.language-dropdown');
        if (dropdown && !dropdown.contains(e.target)) {
          this.languageDropdownOpen = false;
        }
      });
    },
    beforeDestroy() {
      // Clean up event listener
      document.removeEventListener('click', this.handleClickOutside);
    },
  };
  </script>
  
  <style scoped>
  .nav-item.dropdown:hover .dropdown-menu {
    display: block;
    margin-top: 0;
  }
  .card-img-top {
    object-fit: cover;
    height: 200px;
  }
  .card {
    border: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .navbar-nav .nav-link {
    color: #333;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  .navbar-nav .nav-link:hover,
  .navbar-nav .nav-link.active {
    color: black;
  }
  a {
    text-decoration: none;
  }
  body {
    width: 200% !important;
  }
  .green {
    background-color: rgb(25, 135, 84);
  }
  
  /* CSS */
  .search-container {
    display: inline-flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 9999px; /* makes it fully rounded */
    overflow: hidden; /* ensures children respect the rounded border */
    background-color: #fff;
    max-width: 400px; /* optional: control the max width */
    flex-wrap: wrap;
  }
  .account-dropdown .dropdown-menu {
    margin-top: 0.5rem;
  }
  /* Search icon styling */
  .search-icon {
    width: 16px;
    height: 16px;
    margin-left: 12px;
    margin-right: 8px; /* optional spacing between icon & input */
    color: #aaa;
  }
  
  /* Search input styling */
  .search-container input {
    flex: 1; /* expands to fill remaining space */
    border: none; /* remove default border */
    outline: none; /* remove focus outline */
    padding: 8px 0; /* vertical padding; no horizontal since .search-container has it */
    color: #555;
    font-size: 14px;
  }
  
  /* Search button styling */
  .search-container button {
    background-color: rgb(25, 135, 84); /* green */
    color: #fff;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
  }
  
  /* Hover state for the button */
  .search-container button:hover {
    background-color: #007f68;
    color: #fff;
  }
  .card {
    border: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .btn:hover {
    /* background-color: #fff; */
    color: #198754;
  }
  .categories-header {
    display: flex;
    align-items: center;
    justify-content: space-between; /* pushes "View All →" to the right */
    margin-bottom: 1rem; /* optional spacing */
  }
  
  .categories-header h2 {
    margin: 0;
    font-size: 1.25rem; /* adjust as needed */
  }
  
  .view-all {
    color: #009879; /* green color */
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
  }
  
  .view-all:hover {
    color: #007f68; /* darker green on hover */
  }
  
  .arrow {
    margin-left: 4px; /* small spacing before arrow */
  }
  .card {
    position: relative;
    overflow: hidden; /* ensures the zoomed image doesn't exceed the card bounds */
    transition: transform 0.3s ease;
  }
  
  .card-img-top {
    transition: transform 0.3s ease;
  }
  
  .card:hover .card-img-top {
    transform: scale(1.05); /* zoom in the image */
  }
  
  .card:hover .card-title {
    color: rgb(25, 135, 84); /* change text color on hover */
  }
  .card:hover {
    cursor: pointer;
  }
  @media (max-width: 992px) {
    .search-container input,
    .search-container button {
      display: none !important;
    }
  }
  </style>
  