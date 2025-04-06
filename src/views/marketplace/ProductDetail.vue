<template>
    <div class="product-detail-wrapper">
      <!-- Header/Navbar from Market.vue -->
      <nav class="navbar navbar-expand-lg sticky-top bg-white shadow-sm py-3">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center" href="/">
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
                    <router-link class="dropdown-item" to="/account/settings"
                      >Transactions</router-link
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" @click.prevent="logout"
                      >Logout</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
  
      <!-- Breadcrumb - Keep original -->
      <div class="container mt-3 mb-1">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/market" class="text-decoration-none">
                <i class="bi bi-house-door"></i>
              </router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/allcategory" class="text-decoration-none">Categories</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/allcategory/vegetables" class="text-decoration-none">Vegetables</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{ product.name }}</li>
          </ol>
        </nav>
      </div>
  
      <!-- Loading Spinner - Keep original -->
      <div class="container my-5" v-if="loading">
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
  
      <!-- Product Detail - Keep original -->
      <div class="container" v-else>
        <div class="row mb-4">
          <div class="col-12">
            <!-- Product name and stock status -->
            <div class="d-flex justify-content-between align-items-center">
              <h2 class="product-title mb-0">{{ product.name }}</h2>
              <span class="badge bg-light text-success border border-success">In Stock</span>
            </div>
            
            <!-- Ratings -->
            <div class="d-flex align-items-center mt-2">
              <div class="ratings">
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-half text-warning"></i>
              </div>
              <span class="ms-2 text-muted small">6 Reviews</span>
              <span class="ms-3 text-muted small">SKU: #{{ product.sku || 'SKU4321' }}</span>
            </div>
          </div>
        </div>
  
        <div class="row">
          <!-- Product Images - Keep original -->
          <div class="col-md-6 mb-4">
            <!-- Main image -->
            <div class="main-image-container mb-3">
              <img :src="currentImage" :alt="product.name" class="img-fluid rounded main-product-image border" />
            </div>
            
            <!-- Thumbnail images -->
            <div class="thumbnails-container d-flex">
              <div 
                v-for="(image, index) in productImages" 
                :key="index" 
                class="thumbnail-wrapper me-2 p-1 border rounded"
                :class="{'border-success': currentImageIndex === index}"
                @click="selectImage(index)">
                <img :src="image" :alt="`${product.name} thumbnail ${index + 1}`" class="img-fluid thumbnail-image" />
              </div>
            </div>
          </div>
          
          <!-- Product Information - Keep original -->
          <div class="col-md-6">
            <div class="product-details">
              <!-- Price -->
              <div class="d-flex align-items-center mb-3">
                <h4 class="text-decoration-line-through text-muted me-2 mb-0">Rs {{ formatPrice(product.originalPrice || product.price * 1.6) }}</h4>
                <h3 class="text-success fw-bold mb-0">Rs {{ formatPrice(product.price) }}</h3>
                <span class="ms-2 badge bg-danger">64% Off</span>
              </div>
              
              <!-- Seller -->
              <div class="seller-info d-flex align-items-center mb-3">
                <p class="mb-0 me-2">Seller</p>
                <div class="seller-logo d-flex align-items-center">
                  <span class="bg-success text-white rounded-circle p-1 me-1">
                    <i class="bi bi-shop"></i>
                  </span>
                  <span class="text-muted">FarmEasy</span>
                </div>
                
                <!-- Share options -->
                <div class="share-options ms-auto">
                  <span class="me-2">Share item:</span>
                  <button class="btn btn-sm btn-outline-primary rounded-circle me-1"><i class="bi bi-facebook"></i></button>
                  <button class="btn btn-sm btn-outline-info rounded-circle me-1"><i class="bi bi-twitter"></i></button>
                  <button class="btn btn-sm btn-outline-danger rounded-circle me-1"><i class="bi bi-pinterest"></i></button>
                  <button class="btn btn-sm btn-outline-dark rounded-circle"><i class="bi bi-instagram"></i></button>
                </div>
              </div>
              
              <!-- Product description -->
              <p class="product-description mb-4">{{ product.description }}</p>
              
              <!-- Quantity selector and Add to Cart -->
              <div class="d-flex align-items-center my-4">
                <div class="quantity-selector d-flex align-items-center border rounded me-3">
                  <button class="btn" @click="decreaseQuantity">
                    <i class="bi bi-dash"></i>
                  </button>
                  <input type="number" class="form-control border-0 text-center" v-model="quantity" min="1" />
                  <button class="btn" @click="increaseQuantity">
                    <i class="bi bi-plus"></i>
                  </button>
                </div>
                
                <button class="btn btn-success d-flex align-items-center px-4">
                  <i class="bi bi-cart-plus me-2"></i>
                  Add to Cart
                </button>
                <button class="btn btn-outline-secondary ms-2 rounded-circle">
                  <i class="bi bi-heart"></i>
                </button>
              </div>
              
              <!-- Product categories and tags -->
              <div class="product-meta">
                <div class="mb-2">
                  <strong>Category:</strong> <span class="text-muted">{{ product.category }}</span>
                </div>
                <div>
                  <strong>Tags:</strong>
                  <span class="text-muted">
                    <span v-for="(tag, index) in productTags" :key="index" class="me-2">
                      {{ tag }} {{ index < productTags.length - 1 ? '•' : '' }}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Product tabs: Description, Information, Feedback - Keep original -->
        <div class="row mt-5">
          <div class="col-12">
            <ul class="nav nav-tabs" id="productTabs" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="description-tab" data-bs-toggle="tab" data-bs-target="#description" type="button" role="tab" aria-controls="description" aria-selected="true">Descriptions</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="information-tab" data-bs-toggle="tab" data-bs-target="#information" type="button" role="tab" aria-controls="information" aria-selected="false">Additional Information</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="feedback-tab" data-bs-toggle="tab" data-bs-target="#feedback" type="button" role="tab" aria-controls="feedback" aria-selected="false">Customer Feedback</button>
              </li>
            </ul>
            <div class="tab-content p-4 border border-top-0 rounded-bottom" id="productTabsContent">
              <!-- Description tab -->
              <div class="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                <div class="row">
                  <div class="col-md-8">
                    <p class="mb-4">{{ product.longDescription || 'Sed commodo aliquam dictum porta. Fusce ipsum felis, imperdiet at posuere ac, viverra at mauris. Maecenas tincidunt ligula a sem vestibulum pharetra. Praesent auctor tortor lacus, nec laoreet nisi porttitor vel.' }}</p>
                    
                    <ul class="list-unstyled">
                      <li class="mb-2">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        100 g of fresh leaves provides:
                      </li>
                      <li class="mb-2">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        Aliquam ac elit at dapibus volutpat elementum.
                      </li>
                      <li class="mb-2">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        Quisque nec enim eget sapien molestie.
                      </li>
                      <li class="mb-2">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        Proin convallis odio volutpat finibus posuere.
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-4">
                    <div class="video-thumbnail position-relative">
                      <img src="../../assets/product-video-thumbnail.jpg" alt="Product video thumbnail" class="img-fluid rounded" />
                      <div class="play-button position-absolute top-50 start-50 translate-middle">
                        <button class="btn btn-success rounded-circle">
                          <i class="bi bi-play-fill"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Benefits -->
                <div class="row mt-4">
                  <div class="col-md-6">
                    <div class="benefit-card d-flex align-items-center p-3 border rounded mb-3">
                      <div class="benefit-icon me-3">
                        <i class="bi bi-percent text-success fs-3"></i>
                      </div>
                      <div>
                        <h5 class="mb-1">64% Discount</h5>
                        <p class="mb-0 text-muted">Save your 64% money with us</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="benefit-card d-flex align-items-center p-3 border rounded mb-3">
                      <div class="benefit-icon me-3">
                        <i class="bi bi-shield-check text-success fs-3"></i>
                      </div>
                      <div>
                        <h5 class="mb-1">100% Organic</h5>
                        <p class="mb-0 text-muted">100% Organic Vegetables</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Additional Information tab -->
              <div class="tab-pane fade" id="information" role="tabpanel" aria-labelledby="information-tab">
                <h5 class="mb-3">Product Specifications</h5>
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <th scope="row" class="bg-light" style="width: 30%;">Variety</th>
                      <td>{{ product.variety || 'Chinese Cabbage' }}</td>
                    </tr>
                    <tr>
                      <th scope="row" class="bg-light">Cultivation</th>
                      <td>Organic, pesticide-free</td>
                    </tr>
                    <tr>
                      <th scope="row" class="bg-light">Nutritional Value</th>
                      <td>Rich in vitamins A, C, K and fiber</td>
                    </tr>
                    <tr>
                      <th scope="row" class="bg-light">Storage</th>
                      <td>Refrigerate in a perforated bag up to 1 week</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <!-- Customer Feedback tab -->
              <div class="tab-pane fade" id="feedback" role="tabpanel" aria-labelledby="feedback-tab">
                <div class="row">
                  <div class="col-md-4">
                    <div class="overall-rating text-center p-3">
                      <h2 class="display-4 mb-0">4.5</h2>
                      <div class="ratings mb-2">
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-half text-warning"></i>
                      </div>
                      <p class="text-muted mb-3">Based on 6 reviews</p>
                      <button class="btn btn-outline-primary">Write a Review</button>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="review-item mb-3 pb-3 border-bottom">
                      <div class="d-flex justify-content-between">
                        <h5>Fresh and crispy!</h5>
                        <div class="ratings">
                          <i class="bi bi-star-fill text-warning"></i>
                          <i class="bi bi-star-fill text-warning"></i>
                          <i class="bi bi-star-fill text-warning"></i>
                          <i class="bi bi-star-fill text-warning"></i>
                          <i class="bi bi-star-fill text-warning"></i>
                        </div>
                      </div>
                      <p class="text-muted small">by John D. - March 15, 2023</p>
                      <p>The cabbage was delivered fresh and lasted over a week in my refrigerator. Great quality!</p>
                    </div>
                    <div class="review-item">
                      <div class="d-flex justify-content-between">
                        <h5>Good value for money</h5>
                        <div class="ratings">
                          <i class="bi bi-star-fill text-warning"></i>
                          <i class="bi bi-star-fill text-warning"></i>
                          <i class="bi bi-star-fill text-warning"></i>
                          <i class="bi bi-star-fill text-warning"></i>
                          <i class="bi bi-star text-warning"></i>
                        </div>
                      </div>
                      <p class="text-muted small">by Sarah M. - February 28, 2023</p>
                      <p>Great quality vegetables at a reasonable price. Will order again.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Related Products - Keep original -->
        <div class="related-products mt-5">
          <h3 class="mb-4">Related Products</h3>
          <div class="row">
            <div class="col-md-3 col-6 mb-4" v-for="(product, index) in relatedProducts" :key="index">
              <div class="card product-card h-100 position-relative">
                <!-- Sale tag for first product -->
                <div class="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 m-2 small rounded" v-if="index === 0">
                  Stock Sale
                </div>
                <router-link :to="'/product/' + product.id">
                  <img :src="product.image" class="card-img-top product-thumbnail" :alt="product.name">
                </router-link>
                <div class="card-body d-flex flex-column">
                  <router-link :to="'/product/' + product.id" class="text-decoration-none">
                    <h5 class="card-title text-dark">{{ product.name }}</h5>
                  </router-link>
                  <p class="card-text text-success fw-bold mb-2">Rs {{ formatPrice(product.price) }}</p>
                  <div class="ratings mb-2">
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star text-warning"></i>
                  </div>
                  <div class="mt-auto d-flex">
                    <button class="btn btn-sm btn-outline-secondary flex-grow-1 me-2">
                      <i class="bi bi-cart-plus"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-secondary">
                      <i class="bi bi-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProductDetail",
    data() {
      return {
        loading: true,
        quantity: 1,
        productId: '',
        currentImageIndex: 0,
        product: {
          name: "",
          price: 0,
          originalPrice: 0,
          sku: "",
          description: "",
          longDescription: "",
          category: "",
          benefits: [],
          variety: ""
        },
        relatedProducts: [
          {
            id: "green-apple",
            name: "Green Apple",
            price: 3000,
            image: "../../assets/green-apple.jpg"
          },
          {
            id: "cauliflower",
            name: "Cauliflower",
            price: 3000,
            image: "../../assets/cauliflower.jpg"
          },
          {
            id: "green-capsicum",
            name: "Green Capsicum",
            price: 3000,
            image: "../../assets/green-capsicum.jpg"
          },
          {
            id: "ladies-finger",
            name: "Ladies Finger",
            price: 3000,
            image: "../../assets/ladies-finger.jpg"
          }
        ],
        // Added from Market.vue navbar
        searchQuery: "",
        dropdownOpen: false,
        dropdownTimeout: null,
        wishlistItemCount: 0,
        cartItems: []
      };
    },
    computed: {
      productImages() {
        // Get the main product image and generate additional views
        const mainImage = this.getProductImage();
        // For a real application, you would have multiple actual images
        // Here we're simulating additional views with the same main image
        return [
          mainImage,
          mainImage,
          mainImage,
          mainImage
        ];
      },
      currentImage() {
        return this.productImages[this.currentImageIndex];
      },
      productTags() {
        return ["Vegetables", "Healthy", "Chinese", "Cabbage", "Green Cabbage"];
      },
      // Added from Market.vue navbar
      cartItemCount() {
        return this.cartItems.reduce((total, item) => total + item.quantity, 0);
      }
    },
    mounted() {
      this.loadProduct();
      
      // Add Bootstrap icons CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css';
      document.head.appendChild(link);
    },
    methods: {
      loadProduct() {
        // Get the product ID from the route
        this.productId = this.$route.params.id;
        console.log("Loading product with ID:", this.productId);
        
        // Simple product mapping for testing
        const products = {
          'chinese-cabbage': {
            name: 'Chinese Cabbage',
            price: 10000,
            originalPrice: 18000,
            sku: 'SKU4321',
            description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, aliquam et ipsum. Nulla varius magna a consequat pulvinar.',
            longDescription: 'Sed commodo aliquam dictum porta. Fusce ipsum felis, imperdiet at posuere ac, viverra at mauris. Maecenas tincidunt ligula a sem vestibulum pharetra. Praesent auctor tortor lacus, nec laoreet nisi porttitor vel. Etiam finibus eros vel dui interdum sollicitudin. Mauris sem orci, vestibulum nec dui vitae dignissim mollis lacus.',
            category: 'Vegetables',
            benefits: [
              'Rich in vitamins and minerals',
              'Low in calories',
              'High in fiber'
            ],
            variety: 'Chinese'
          },
          'hybrid-coconut-seedlings': {
            name: 'Hybrid Coconut Seedlings',
            price: 10000,
            originalPrice: 18000,
            description: 'High-yielding hybrid coconut seedlings that are disease-resistant and perfect for plantation.',
            longDescription: 'Our hybrid coconut seedlings are known for their excellent growth rate and high yield potential. They are carefully cultivated to ensure maximum viability and productivity.',
            category: 'Seedlings',
            benefits: [
              'Early fruiting within 3-4 years',
              'High yield potential',
              'Disease and pest resistant'
            ],
            variety: 'Hybrid'
          },
          'hybrid-tenera-oil-palm-seedlings': {
            name: 'Hybrid Tenera Oil Palm Seedlings',
            price: 15000,
            originalPrice: 22000,
            description: 'Premium quality Tenera oil palm seedlings with high oil content and excellent yield potential.',
            category: 'Seedlings',
            benefits: [
              'High oil content',
              'Early fruiting',
              'Disease resistant'
            ],
            variety: 'Tenera'
          },
        };
    
        // Simulate API call
        setTimeout(() => {
          if (products[this.productId]) {
            this.product = products[this.productId];
          } else {
            // If product not found, create a default product based on ID
            // or use the Chinese Cabbage as default
            this.product = products['chinese-cabbage'];
            this.product.name = this.productId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          }
          
          // Set loading to false
          this.loading = false;
        }, 500);
      },
      
      increaseQuantity() {
        this.quantity++;
      },
      
      decreaseQuantity() {
        if (this.quantity > 1) {
          this.quantity--;
        }
      },
      
      addToCart() {
        alert(`Added ${this.quantity} ${this.product.name} to cart!`);
      },
      
      selectImage(index) {
        this.currentImageIndex = index;
      },
      
      formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      
      getProductImage() {
        if (this.productId === 'hybrid-coconut-seedlings') {
          return '../../assets/hybrid-coconut.jpg';
        } else if (this.productId === 'hybrid-tenera-oil-palm-seedlings') {
          return '../../assets/hybrid_tenera_oil_palm.jpg';
        } else if (this.productId === 'tenera-oil-palm-sprouted-seeds') {
          return '../../assets/tenera_oil_palm_sprouted_seeds.jpg';
        } else if (this.productId === 'black-eyed-pea-cowpea') {
          return '../../assets/cowpea.jpg';
        } else if (this.productId === 'white-maize') {
          return '../../assets/white-maize.jpg';
        } else if (this.productId === 'white-beans') {
          return '../../assets/white-beans.jpg';
        } else if (this.productId === 'cassava') {
          return '../../assets/cassava.jpeg';
        } else if (this.productId === 'mung-beans') {
          return '../../assets/mung-beans.jpg';
        } else if (this.productId === 'red-kidney-beans') {
          return '../../assets/red-kidney-beans.jpg';
        } else if (this.productId === 'soursop-tea') {
          return '../../assets/soursop-tea.jpg';
        } else if (this.productId === 'chinese-cabbage') {
          return '../../assets/chinese-cabbage.jpg';
        } else {
          return '../../assets/Agroconnect.png';
        }
      },
      
      // Added from Market.vue navbar
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
      logout() {
        console.log("Logging out...");
        this.$router.push("/login");
      }
    }
  };
  </script>
  
  <style scoped>
  .main-product-image {
    max-height: 400px;
    width: 100%;
    object-fit: contain;
  }
  
  .quantity-selector {
    width: 120px;
  }
  
  .quantity-selector input {
    width: 40px;
  }
  
  .thumbnail-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    cursor: pointer;
  }
  
  .thumbnail-wrapper {
    transition: all 0.2s ease;
  }
  
  .thumbnail-wrapper:hover {
    border-color: #198754 !important;
  }
  
  .product-thumbnail {
    height: 180px;
    object-fit: contain;
    padding: 10px;
  }
  
  .benefit-card {
    transition: all 0.3s ease;
  }
  
  .benefit-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .play-button .btn {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .play-button .bi-play-fill {
    font-size: 24px;
    margin-left: 3px;
  }
  
  /* Tab styling */
  .nav-tabs .nav-link {
    color: #495057;
    border: none;
    border-bottom: 2px solid transparent;
    padding: 10px 20px;
  }
  
  .nav-tabs .nav-link.active {
    color: #198754;
    background-color: transparent;
    border-bottom: 2px solid #198754;
  }
  
  /* Make product cards same height */
  .product-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  /* Added from Market.vue navbar */
  .nav-item.dropdown:hover .dropdown-menu {
    display: block;
    margin-top: 0;
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

  .search-container {
    display: inline-flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 9999px;
    overflow: hidden;
    background-color: #fff;
    max-width: 400px;
    flex-wrap: wrap;
  }

  .account-dropdown .dropdown-menu {
    margin-top: 0.5rem;
  }

  .search-icon {
    width: 16px;
    height: 16px;
    margin-left: 12px;
    margin-right: 8px;
    color: #aaa;
  }

  .search-container input {
    flex: 1;
    border: none;
    outline: none;
    padding: 8px 0;
    color: #555;
    font-size: 14px;
  }

  .search-container button {
    background-color: rgb(25, 135, 84);
    color: #fff;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
  }

  .search-container button:hover {
    background-color: #007f68;
    color: #fff;
  }

  .btn:hover {
    color: #198754;
  }

  @media (max-width: 992px) {
    .search-container input,
    .search-container button {
      display: none !important;
    }
  }
  </style>