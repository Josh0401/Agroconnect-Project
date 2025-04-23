<template>
  <div class="product-detail-wrapper">
    <!-- Header/Navbar with login state -->
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
            <SearchBar
              :current-language="$i18n.locale"
              :custom-placeholder="$t('search')"
              :custom-button-text="$t('search')"
            />
          </ul>
          <div class="d-flex align-items-center py-1">
            <!-- Language Selector Dropdown - Always Visible -->
            <LanguageDropdown class="me-3" />

            <!-- Logged Out UI Elements -->
            <div v-if="!isLoggedIn" class="d-flex align-items-center">
              <router-link to="/login" class="btn btn-outline-success me-2">
                {{ $t("login") }}
              </router-link>
              <router-link to="/signup" class="btn btn-success">
                {{ $t("signup") }}
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

              <!-- Notification Bell Icon -->
              <button
                class="btn position-relative me-3"
                @click="goToNotifications"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-bell"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"
                  />
                </svg>
                <span
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  v-if="notificationCount > 0"
                >
                  {{ notificationCount }}
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
                      {{ $t("profile") }}
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="/account/orders">
                      {{ $t("orders") }}
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      class="dropdown-item"
                      to="/account/transactions"
                    >
                      {{ $t("transactions") }}
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      class="dropdown-item"
                      to="/account/groups-communities"
                    >
                      {{ $t("groupsCommunities", "Groups") }}
                    </router-link>
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="handleLogout"
                    >
                      {{ $t("logout") }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Breadcrumb -->
    <div class="container mt-3 mb-1">
      <div class="container mt-3">
        <router-link to="/market" class="back-to-market">
          <span class="arrow-left">&#8592;</span> Back to Marketplace
        </router-link>
      </div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" id="crumb">
            <router-link to="/market" class="text-decoration-none">
              <i class="bi bi-house-door"></i>
            </router-link>
          </li>
          <li class="breadcrumb-item" id="crumb">
            <router-link to="/allcategory" class="text-decoration-none"
              >Categories</router-link
            >
          </li>
          <li class="breadcrumb-item" id="crumb">
            <router-link
              :to="
                '/filtered-categories?category=' +
                (
                  product.product_category ||
                  product.category ||
                  'Category'
                )
              "
              class="text-decoration-none"
            >
              {{ product.product_category || product.category || "Category" }}
            </router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ product.product_name || product.name }}
          </li>
        </ol>
      </nav>
    </div>

    <!-- Loading Spinner -->
    <div class="container my-5" v-if="loading">
      <div class="d-flex justify-content-center">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <!-- Product Detail -->
    <div class="container" v-else>
      <div class="row mb-4">
        <div class="col-12">
          <!-- Product name and stock status -->
          <div class="d-flex justify-content-between align-items-center">
            <h2 class="product-title mb-0">
              {{ product.product_name || product.name }}
            </h2>
            <span
              v-if="product.inStock > 0"
              class="badge bg-light text-success border border-success"
            >
              In Stock
            </span>
            <span
              v-else
              class="badge bg-light text-danger border border-danger"
            >
              Out of Stock
            </span>
          </div>

          <!-- Ratings -->
          <div class="d-flex align-items-center mt-2">
            <div class="ratings">
              <i
                v-for="n in 5"
                :key="n"
                class="bi"
                :class="
                  n <= avgRating
                    ? 'bi-star-fill'
                    : n <= avgRating + 0.5
                    ? 'bi-star-half'
                    : 'bi-star'
                "
                aria-hidden="true"
              ></i>
            </div>
            <span class="ms-2 text-muted small"
              >{{ productReviews.length }}
              {{ productReviews.length === 1 ? "Review" : "Reviews" }}</span
            >
            <span class="ms-3 text-muted small"
              >SKU: #{{ product.id || "SKU4321" }}</span
            >
          </div>
        </div>
      </div>

      <div class="row">
        <!-- Product Images -->
        <div class="col-md-6 mb-4">
          <!-- Main image -->
          <div class="main-image-container mb-3">
            <img
              :src="currentImage"
              :alt="product.name"
              class="img-fluid rounded main-product-image border"
            />
          </div>

          <!-- Thumbnail images -->
          <div class="thumbnails-container d-flex">
            <div
              v-for="(image, index) in productImages"
              :key="index"
              class="thumbnail-wrapper me-2 p-1 border rounded"
              :class="{ 'border-success': currentImageIndex === index }"
              @click="selectImage(index)"
            >
              <img
                :src="image"
                :alt="`${product.name} thumbnail ${index + 1}`"
                class="img-fluid thumbnail-image"
              />
            </div>
          </div>
        </div>

        <!-- Product Information -->
        <div class="col-md-6">
          <div class="product-details">
            <!-- Price -->
            <div class="d-flex align-items-center mb-3">
              <h3 class="text-success fw-bold mb-0">
                Rs
                {{
                  formatPrice(
                    product.product_price ||
                      product.product_unit_price ||
                      product.unitPrice?.replace("Rs ", "") ||
                      0
                  )
                }}
              </h3>
            </div>

            <!-- Seller -->
            <div class="seller-info d-flex align-items-center mb-3">
              <p class="mb-0 me-2">Seller</p>
              <div class="seller-logo d-flex align-items-center">
                <span class="bg-success text-white rounded-circle p-1 me-1">
                  <i class="bi bi-shop"></i>
                </span>
                <span class="text-muted">{{ sellerName }}</span>
              </div>

              <!-- Share options -->
              <div class="share-options ms-auto">
                <span class="me-2">Share item:</span>
                <button
                  class="btn btn-sm btn-outline-primary rounded-circle me-1"
                >
                  <i class="bi bi-facebook"></i>
                </button>
                <button class="btn btn-sm btn-outline-info rounded-circle me-1">
                  <i class="bi bi-twitter"></i>
                </button>
                <button
                  class="btn btn-sm btn-outline-danger rounded-circle me-1"
                >
                  <i class="bi bi-pinterest"></i>
                </button>
                <button class="btn btn-sm btn-outline-dark rounded-circle">
                  <i class="bi bi-instagram"></i>
                </button>
              </div>
            </div>

            <!-- Product description -->
            <p class="product-description mb-4">{{ productDescription }}</p>

            <!-- Quantity selector and Add to Cart -->
            <div class="d-flex align-items-center my-4">
              <div
                class="quantity-selector d-flex align-items-center border rounded me-3"
              >
                <button
                  class="quantity-btn"
                  @click="decreaseQuantity"
                  :disabled="product.inStock <= 0"
                >
                  <i class="bi bi-dash"></i>
                </button>
                <input
                  type="number"
                  class="form-control border-0 text-center quantity-input"
                  v-model="quantity"
                  min="1"
                  :max="product.inStock"
                  :disabled="product.inStock <= 0"
                  @input="validateQuantity"
                />
                <button
                  class="quantity-btn"
                  @click="increaseQuantity"
                  :disabled="
                    product.inStock <= 0 || quantity >= product.inStock
                  "
                >
                  <i class="bi bi-plus"></i>
                </button>
              </div>

              <button
                class="btn btn-success d-flex align-items-center px-4"
                @click="addToCart"
                :disabled="product.inStock <= 0"
              >
                <i class="bi bi-cart-plus me-2"></i>
                Add to Cart
              </button>
              <button
                class="btn btn-outline-secondary ms-2 rounded-circle"
                @click="toggleWishlist"
              >
                <i
                  class="bi"
                  :class="
                    isInWishlist ? 'bi-heart-fill text-danger' : 'bi-heart'
                  "
                ></i>
              </button>
            </div>

            <!-- Product categories and tags -->
            <div class="product-meta">
              <div class="mb-2">
                <strong>Category:</strong>
                <span class="text-muted">{{ product.category }}</span>
              </div>
              <div v-if="product.unit">
                <strong>Unit:</strong>
                <span class="text-muted">{{ product.unit }}</span>
              </div>
              <div v-if="productTags.length > 0" class="mt-2">
                <strong>Tags:</strong>
                <span class="text-muted">
                  <span
                    v-for="(tag, index) in productTags"
                    :key="index"
                    class="me-2"
                  >
                    {{ tag }} {{ index < productTags.length - 1 ? "•" : "" }}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product tabs: Description, Information, Feedback -->
      <div class="row mt-5">
        <div class="col-12">
          <ul class="nav nav-tabs" id="productTabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="description-tab"
                data-bs-toggle="tab"
                data-bs-target="#description"
                type="button"
                role="tab"
                aria-controls="description"
                aria-selected="true"
              >
                Descriptions
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="information-tab"
                data-bs-toggle="tab"
                data-bs-target="#information"
                type="button"
                role="tab"
                aria-controls="information"
                aria-selected="false"
              >
                Additional Information
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="feedback-tab"
                data-bs-toggle="tab"
                data-bs-target="#feedback"
                type="button"
                role="tab"
                aria-controls="feedback"
                aria-selected="false"
              >
                Customer Feedback
              </button>
            </li>
          </ul>
          <div
            class="tab-content p-4 border border-top-0 rounded-bottom"
            id="productTabsContent"
          >
            <!-- Description tab -->
            <div
              class="tab-pane fade show active"
              id="description"
              role="tabpanel"
              aria-labelledby="description-tab"
            >
              <div class="row">
                <div class="col-md-8">
                  <p class="mb-4">{{ productLongDescription }}</p>

                  <ul class="list-unstyled">
                    <li
                      v-for="(benefit, index) in productBenefits"
                      :key="index"
                      class="mb-2"
                    >
                      <i class="bi bi-check-circle-fill text-success me-2"></i>
                      {{ benefit }}
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Benefits -->
              <div class="row mt-4">
                <div class="col-md-6">
                  <div
                    class="benefit-card d-flex align-items-center p-3 border rounded mb-3"
                  >
                    <div class="benefit-icon me-3">
                      <i class="bi bi-truck text-success fs-3"></i>
                    </div>
                    <div>
                      <h5 class="mb-1">Fast Delivery</h5>
                      <p class="mb-0 text-muted">
                        Free delivery for orders over Rs 5,000
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div
                    class="benefit-card d-flex align-items-center p-3 border rounded mb-3"
                  >
                    <div class="benefit-icon me-3">
                      <i class="bi bi-shield-check text-success fs-3"></i>
                    </div>
                    <div>
                      <h5 class="mb-1">100% Organic</h5>
                      <p class="mb-0 text-muted">
                        100% Organic {{ product.category || "Products" }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Additional Information tab -->
            <div
              class="tab-pane fade"
              id="information"
              role="tabpanel"
              aria-labelledby="information-tab"
            >
              <h5 class="mb-3">Product Specifications</h5>
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <th scope="row" class="bg-light" style="width: 30%">
                      Product ID
                    </th>
                    <td>{{ product.id }}</td>
                  </tr>
                  <tr v-if="product.variety">
                    <th scope="row" class="bg-light">Variety</th>
                    <td>{{ product.variety || "Standard" }}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="bg-light">Category</th>
                    <td>{{ product.category }}</td>
                  </tr>
                  <tr v-if="product.unit">
                    <th scope="row" class="bg-light">Unit</th>
                    <td>{{ product.unit }}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="bg-light">In Stock</th>
                    <td>{{ product.inStock }} {{ product.unit || "units" }}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="bg-light">Storage</th>
                    <td>{{ getStorageInfo() }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Customer Feedback tab -->
            <div
              class="tab-pane fade"
              id="feedback"
              role="tabpanel"
              aria-labelledby="feedback-tab"
            >
              <div class="row">
                <div class="col-md-4">
                  <div class="overall-rating text-center p-3">
                    <h2 class="display-4 mb-0">{{ avgRating.toFixed(1) }}</h2>
                    <div class="ratings mb-2">
                      <i
                        v-for="n in 5"
                        :key="n"
                        class="bi"
                        :class="
                          n <= avgRating
                            ? 'bi-star-fill'
                            : n <= avgRating + 0.5
                            ? 'bi-star-half'
                            : 'bi-star'
                        "
                        aria-hidden="true"
                      >
                      </i>
                    </div>
                    <p class="text-muted mb-3">
                      Based on {{ productReviews.length }}
                      {{ productReviews.length === 1 ? "review" : "reviews" }}
                    </p>
                    <button
                      class="btn btn-outline-primary"
                      @click="showReviewModal = true"
                    >
                      Write a Review
                    </button>
                  </div>
                </div>
                <div class="col-md-8">
                  <div
                    v-if="productReviews.length === 0"
                    class="text-center p-4"
                  >
                    <p class="text-muted">
                      No reviews yet. Be the first to review this product!
                    </p>
                  </div>
                  <div v-else>
                    <div
                      v-for="(review, index) in productReviews"
                      :key="index"
                      class="review-item mb-3 pb-3"
                      :class="{
                        'border-bottom': index < productReviews.length - 1,
                      }"
                    >
                      <div class="d-flex justify-content-between">
                        <h5>{{ review.title }}</h5>
                        <div class="ratings">
                          <i
                            v-for="n in 5"
                            :key="n"
                            class="bi"
                            :class="
                              n <= review.rating ? 'bi-star-fill' : 'bi-star'
                            "
                            aria-hidden="true"
                          >
                          </i>
                        </div>
                      </div>
                      <p class="text-muted small">
                        by {{ review.name }} - {{ review.date }}
                      </p>
                      <p>{{ review.text }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div class="related-products mt-5">
        <h3 class="mb-4">Related Products</h3>
        <div class="row">
          <div v-if="loading" class="col-12 text-center">
            <div class="spinner-border text-success" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div v-else-if="relatedProducts.length === 0" class="col-12">
            <p class="text-muted">No related products found.</p>
          </div>
          <div
            v-else
            class="col-md-3 col-6 mb-4"
            v-for="(relProduct, index) in relatedProducts"
            :key="index"
          >
            <div class="card product-card h-100 position-relative">
              <!-- Sale tag for first product -->
              <div
                class="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 m-2 small rounded"
                v-if="index === 0"
              >
                Stock Sale
              </div>
              <router-link :to="'/product/' + relProduct.id">
                <img
                  :src="relProduct.image"
                  class="card-img-top product-thumbnail"
                  :alt="relProduct.name"
                />
              </router-link>
              <div class="card-body d-flex flex-column">
                <router-link
                  :to="'/product/' + relProduct.id"
                  class="text-decoration-none"
                >
                  <h5 class="card-title text-dark">{{ relProduct.name }}</h5>
                </router-link>
                <p class="card-text text-success fw-bold mb-2">
                  {{ relProduct.unitPrice }}
                </p>
                <div class="ratings mb-2">
                  <i class="bi bi-star-fill text-warning"></i>
                  <i class="bi bi-star-fill text-warning"></i>
                  <i class="bi bi-star-fill text-warning"></i>
                  <i class="bi bi-star-fill text-warning"></i>
                  <i class="bi bi-star text-warning"></i>
                </div>
                <div class="mt-auto d-flex">
                  <button
                    class="btn btn-sm btn-outline-secondary flex-grow-1 me-2"
                    @click.prevent="addRelatedToCart(relProduct, $event)"
                    :disabled="relProduct.inStock <= 0"
                  >
                    <i class="bi bi-cart-plus"></i>
                  </button>
                  <button
                    class="btn btn-sm btn-outline-secondary"
                    @click.prevent="toggleRelatedWishlist(relProduct, $event)"
                  >
                    <i
                      class="bi"
                      :class="
                        isProductInWishlist(relProduct.id)
                          ? 'bi-heart-fill text-danger'
                          : 'bi-heart'
                      "
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- NEW REVIEW MODAL with UPDATED STAR RATING -->
    <div
      class="modal fade"
      id="reviewModal"
      tabindex="-1"
      aria-labelledby="reviewModalLabel"
      aria-hidden="true"
      v-if="showReviewModal"
      :class="{ show: showReviewModal }"
      style="display: block"
      @click.self="showReviewModal = false"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="reviewModalLabel">Write a Review</h5>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="showReviewModal = false"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitReview">
              <div class="mb-3">
                <label for="reviewerName" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="reviewerName"
                  v-model="reviewForm.name"
                  placeholder="Enter Your Name"
                  required
                />
              </div>

              <!-- UPDATED STAR RATING SECTION -->
              <div class="mb-3 text-center">
                <label class="form-label d-block"
                  >Tap the Stars to rate this product</label
                >
                <div class="star-rating d-flex justify-content-center">
                  <span
                    v-for="n in 5"
                    :key="n"
                    @click="setRating(n)"
                    @mouseover="hoverRating = n"
                    @mouseleave="hoverRating = 0"
                    class="star-container mx-1"
                  >
                    <i
                      class="bi"
                      :class="
                        hoverRating >= n || reviewForm.rating >= n
                          ? 'bi-star-fill'
                          : 'bi-star'
                      "
                      style="font-size: 1.5rem; color: #ffa500; cursor: pointer"
                    ></i>
                  </span>
                </div>
                <small
                  class="text-muted mt-1 d-block"
                  v-if="reviewForm.rating === 0"
                  >No rating selected</small
                >
                <small class="text-muted mt-1 d-block" v-else
                  >You selected {{ reviewForm.rating }}
                  {{ reviewForm.rating === 1 ? "star" : "stars" }}</small
                >
              </div>

              <div class="mb-3">
                <label for="reviewTitle" class="form-label"
                  >What did you like about this product</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="reviewTitle"
                  v-model="reviewForm.title"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="reviewText" class="form-label">Review</label>
                <textarea
                  class="form-control"
                  id="reviewText"
                  rows="4"
                  v-model="reviewForm.text"
                  placeholder="Enter Message"
                  required
                ></textarea>
              </div>

              <div class="d-grid">
                <button
                  type="submit"
                  class="btn btn-primary py-2"
                  style="background-color: #20b2aa; border-color: #20b2aa"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal backdrop -->
    <div class="modal-backdrop fade show" v-if="showReviewModal"></div>

    <!-- Login Required Modal -->
    <div
      class="modal fade"
      id="loginRequiredModal"
      tabindex="-1"
      aria-labelledby="loginRequiredModalLabel"
      aria-hidden="true"
      v-if="showLoginRequiredModal"
      :class="{ show: showLoginRequiredModal }"
      style="display: block"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="loginRequiredModalLabel">
              Login Required
            </h5>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="showLoginRequiredModal = false"
            ></button>
          </div>
          <div class="modal-body">
            <p>Please login to continue with this action.</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showLoginRequiredModal = false"
            >
              Cancel
            </button>
            <router-link to="/login" class="btn btn-success">Login</router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal backdrop for login required -->
    <div class="modal-backdrop fade show" v-if="showLoginRequiredModal"></div>

    <!-- Success notification toast -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div
        :class="['toast', 'align-items-center', { show: showToast }]"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="d-flex">
          <div class="toast-body">
            <i class="bi bi-check-circle-fill text-success me-2"></i>
            {{ toastMessage }}
          </div>
          <button
            type="button"
            class="btn-close me-2 m-auto"
            @click="showToast = false"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>

    <!-- Footer component -->
    <Footer />
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "../../stores/product";
import { useAuthStore } from "../../stores/auth";
import Footer from "../../components/MarketFooter.vue";

export default {
  name: "ProductDetail",
  components: {
    Footer,
  },
  setup() {
    // Stores and router setup
    const productStore = useProductStore();
    const authStore = useAuthStore();
    const route = useRoute();
    const router = useRouter();

    // State
    const loading = ref(true);
    const quantity = ref(1);
    const productId = ref("");
    const currentImageIndex = ref(0);
    const product = ref({
      name: "",
      product_price: "",
      product_unit_price: "",
      unitPrice: "",
      category: "",
      product_category: "",
      inStock: 0,
      image: "",
      id: "",
    });

    // UI state
    const isLoggedIn = computed(() => !!authStore.token);
    const searchQuery = ref("");
    const dropdownOpen = ref(false);
    let dropdownTimeout = null;
    const wishlistItems = ref([]);
    const cartItems = ref([]);
    const notificationCount = ref(0);
    const showReviewModal = ref(false);
    const showLoginRequiredModal = ref(false);
    const hoverRating = ref(0);
    const isInWishlist = ref(false);
    const showToast = ref(false);
    const toastMessage = ref("");

    // Review form data
    const reviewForm = ref({
      name: "",
      rating: 0,
      title: "",
      text: "",
    });

    // Mock product reviews
    const productReviews = ref([
      {
        name: "John D.",
        rating: 5,
        title: "Fresh and crispy!",
        text: "The product was delivered fresh and lasted over a week in my refrigerator. Great quality!",
        date: "March 15, 2023",
      },
      {
        name: "Sarah M.",
        rating: 4,
        title: "Good value for money",
        text: "Great quality product at a reasonable price. Will order again.",
        date: "February 28, 2023",
      },
    ]);

    // Computed properties
    const wishlistItemCount = computed(() => wishlistItems.value.length);

    const cartItemCount = computed(() =>
      cartItems.value.reduce((total, item) => total + item.quantity, 0)
    );

    const productImages = computed(() => {
      // For a real application, you would have multiple actual images
      // Here we're simulating additional views with the same main image
      const mainImage =
        product.value.image ||
        (product.value.product_img
          ? `https://agroconnect.shop/public/storage/${product.value.product_img}`
          : "../../assets/Agroconnect.png");
      return [mainImage, mainImage, mainImage, mainImage];
    });

    const currentImage = computed(
      () => productImages.value[currentImageIndex.value] || ""
    );

    const productTags = computed(() => {
      if (!product.value.category) return [];
      // Generate tags based on product category and other attributes
      const tags = [product.value.category];
      if (product.value.category === "Vegetables") {
        tags.push("Healthy", "Fresh", "Organic");
      } else if (product.value.category === "Fruits") {
        tags.push("Fresh", "Seasonal", "Organic");
      } else if (
        product.value.category === "Seeds" ||
        product.value.category === "Seedlings"
      ) {
        tags.push("Planting", "Farming", "Organic");
      }
      return tags;
    });

    const avgRating = computed(() => {
      if (productReviews.value.length === 0) return 0;
      const sum = productReviews.value.reduce(
        (total, review) => total + review.rating,
        0
      );
      return sum / productReviews.value.length;
    });

    const sellerName = computed(() => {
      return product.value.seller || "FarmEasy";
    });

    const productDescription = computed(() => {
      if (product.value.description) return product.value.description;

      // Default descriptions based on category
      if (product.value.category === "Vegetables") {
        return `Fresh ${product.value.name} sourced directly from local farms. Our vegetables are pesticide-free and harvested at peak ripeness to ensure the best flavor and nutritional value.`;
      } else if (product.value.category === "Fruits") {
        return `Premium quality ${product.value.name} sourced from certified organic farms. Our fruits are naturally ripened and hand-picked to ensure the best taste and freshness.`;
      } else if (
        product.value.category === "Seeds" ||
        product.value.category === "Seedlings"
      ) {
        return `High-quality ${product.value.name} with excellent germination rates. Perfect for both small gardens and large-scale farming operations.`;
      }

      return `Quality ${product.value.name} sourced directly from trusted farmers. We ensure all our products meet the highest standards for freshness and quality.`;
    });

    const productLongDescription = computed(() => {
      if (product.value.longDescription) return product.value.longDescription;

      // Generate a longer description based on product category
      return `${productDescription.value} We work directly with farmers to ensure fair prices and sustainable farming practices. All products are carefully inspected and packaged to maintain freshness during delivery. When you purchase from AgroEase, you're supporting local agriculture and helping to build a more sustainable food system.`;
    });

    const productBenefits = computed(() => {
      // Generate benefits based on product category
      if (product.value.category === "Vegetables") {
        return [
          `${product.value.name} is rich in essential vitamins and minerals`,
          "Low in calories and high in fiber",
          "Grown using sustainable farming practices",
          "Harvested at peak ripeness for maximum flavor and nutrition",
        ];
      } else if (product.value.category === "Fruits") {
        return [
          `${product.value.name} is packed with natural antioxidants`,
          "Source of essential vitamins and minerals",
          "Naturally sweet and delicious",
          "Carefully selected for optimal ripeness",
        ];
      } else if (
        product.value.category === "Seeds" ||
        product.value.category === "Seedlings"
      ) {
        return [
          "High germination rate guaranteed",
          "Disease-resistant varieties",
          "Suitable for various growing conditions",
          "Produces high-yielding plants",
        ];
      }

      return [
        "100% authentic and quality assured",
        "Sourced directly from certified farmers",
        "Fully traceable from farm to table",
        "Supports sustainable agricultural practices",
      ];
    });

    // Get related products from the same category
    const relatedProducts = computed(() => {
      if (!product.value.category && !product.value.product_category) return [];

      const category = product.value.product_category || product.value.category;

      return productStore.getProducts
        .filter(
          (p) =>
            (p.category === category || p.product_category === category) &&
            p.id !== product.value.id &&
            p.id.toString() !== product.value.id.toString()
        )
        .slice(0, 4);
    });

    // Methods
    const loadProduct = async () => {
      loading.value = true;
      productId.value = route.params.id;

      // Make sure products are loaded
      if (productStore.getProducts.length === 0) {
        await productStore.fetchProducts();
      }

      // Find the product in the store
      const foundProduct = productStore.getProducts.find(
        (p) => p.id === productId.value || p.id.toString() === productId.value
      );

      if (foundProduct) {
        // Handle API product data structure
        if (foundProduct.product_name) {
          product.value = {
            ...foundProduct,
            name: foundProduct.product_name,
            inStock: parseInt(foundProduct.product_qty) || 0,
            image:
              foundProduct.image ||
              (foundProduct.product_img
                ? `https://agroconnect.shop/public/storage/${foundProduct.product_img}`
                : "../../assets/Agroconnect.png"),
          };
        } else {
          product.value = foundProduct;
        }

        // Ensure we have proper inStock value from API
        if (foundProduct.product_qty) {
          product.value.inStock = parseInt(foundProduct.product_qty);
        } else if (foundProduct.inStock !== undefined) {
          product.value.inStock = foundProduct.inStock;
        } else {
          product.value.inStock = 0;
        }

        console.log("Found product:", product.value);
      } else {
        console.error("Product not found:", productId.value);
        product.value = {
          name: productId.value
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          product_price: "0",
          product_unit_price: "0",
          category: "Unknown",
          inStock: 0,
          image: "../../assets/Agroconnect.png",
          id: productId.value,
        };
      }

      // Check if product is in wishlist
      checkWishlistStatus();

      // Simulate checking user notifications
      notificationCount.value = Math.floor(Math.random() * 5);

      setTimeout(() => {
        loading.value = false;
      }, 500);
    };

    const checkWishlistStatus = () => {
      // Check if product is already in wishlist
      isInWishlist.value = wishlistItems.value.some(
        (item) => item.id === product.value.id
      );
    };

    // Get product price with proper fallbacks
    const getProductPrice = (prod) => {
      return (
        prod.product_price ||
        prod.product_unit_price ||
        (prod.unitPrice ? prod.unitPrice.replace("Rs ", "") : 0)
      );
    };

    const getStorageInfo = () => {
      // Return storage information based on category
      if (product.value.category === "Vegetables") {
        return "Refrigerate in a perforated bag up to 1 week";
      } else if (product.value.category === "Fruits") {
        return "Store at room temperature until ripe, then refrigerate";
      } else if (product.value.category === "Seeds") {
        return "Store in a cool, dry place away from direct sunlight";
      } else if (product.value.category === "Seedlings") {
        return "Plant in well-draining soil with adequate sunlight";
      }

      return "Store appropriately based on product type";
    };

    const increaseQuantity = () => {
      if (quantity.value < product.value.inStock) {
        quantity.value++;
      }
    };

    const decreaseQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--;
      }
    };

    const validateQuantity = () => {
      let qty = parseInt(quantity.value);
      if (isNaN(qty) || qty < 1) {
        quantity.value = 1;
      } else if (qty > product.value.inStock) {
        quantity.value = product.value.inStock;
      }
    };

    const showToastNotification = (message) => {
      toastMessage.value = message;
      showToast.value = true;

      // Hide toast after 3 seconds
      setTimeout(() => {
        showToast.value = false;
      }, 3000);
    };

    const addToCart = () => {
      if (isLoggedIn.value) {
        // Check if product is in stock
        if (product.value.inStock <= 0) {
          showToastNotification("Sorry, this product is out of stock");
          return;
        }

        // Add to cart logic
        const existingItem = cartItems.value.find(
          (item) => item.id === product.value.id
        );

        if (existingItem) {
          existingItem.quantity += quantity.value;
        } else {
          cartItems.value.push({
            id: product.value.id,
            name: product.value.name,
            price: product.value.unitPrice,
            image: product.value.image,
            quantity: quantity.value,
          });
        }

        showToastNotification(
          `Added ${quantity.value} ${product.value.name} to cart!`
        );
      } else {
        // Show login required modal
        showLoginRequiredModal.value = true;
      }
    };

    const toggleWishlist = () => {
      if (isLoggedIn.value) {
        if (isInWishlist.value) {
          // Remove from wishlist
          wishlistItems.value = wishlistItems.value.filter(
            (item) => item.id !== product.value.id
          );
          isInWishlist.value = false;
          showToastNotification(`Removed ${product.value.name} from wishlist`);
        } else {
          // Add to wishlist
          wishlistItems.value.push({
            id: product.value.id,
            name: product.value.name,
            price: product.value.unitPrice,
            image: product.value.image,
          });
          isInWishlist.value = true;
          showToastNotification(`Added ${product.value.name} to wishlist`);
        }
      } else {
        // Show login required modal
        showLoginRequiredModal.value = true;
      }
    };

    const isProductInWishlist = (prodId) => {
      return wishlistItems.value.some((item) => item.id === prodId);
    };

    const addRelatedToCart = (relatedProduct, event) => {
      event.preventDefault();
      if (isLoggedIn.value) {
        // Check if product is in stock
        if (relatedProduct.inStock <= 0) {
          showToastNotification("Sorry, this product is out of stock");
          return;
        }

        // Add related product to cart
        const existingItem = cartItems.value.find(
          (item) => item.id === relatedProduct.id
        );

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cartItems.value.push({
            id: relatedProduct.id,
            name: relatedProduct.name,
            price: relatedProduct.unitPrice,
            image: relatedProduct.image,
            quantity: 1,
          });
        }

        showToastNotification(`Added ${relatedProduct.name} to cart!`);
      } else {
        // Show login required modal
        showLoginRequiredModal.value = true;
      }
    };

    const toggleRelatedWishlist = (relatedProduct, event) => {
      event.preventDefault();
      if (isLoggedIn.value) {
        const isInList = isProductInWishlist(relatedProduct.id);

        if (isInList) {
          // Remove from wishlist
          wishlistItems.value = wishlistItems.value.filter(
            (item) => item.id !== relatedProduct.id
          );
          showToastNotification(`Removed ${relatedProduct.name} from wishlist`);
        } else {
          // Add to wishlist
          wishlistItems.value.push({
            id: relatedProduct.id,
            name: relatedProduct.name,
            price: relatedProduct.unitPrice,
            image: relatedProduct.image,
          });
          showToastNotification(`Added ${relatedProduct.name} to wishlist`);
        }
      } else {
        // Show login required modal
        showLoginRequiredModal.value = true;
      }
    };

    const selectImage = (index) => {
      currentImageIndex.value = index;
    };

    const formatPrice = (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const setRating = (rating) => {
      if (isLoggedIn.value) {
        reviewForm.value.rating = rating;
      } else {
        showReviewModal.value = false;
        showLoginRequiredModal.value = true;
      }
    };

    const submitReview = () => {
      if (!isLoggedIn.value) {
        showReviewModal.value = false;
        showLoginRequiredModal.value = true;
        return;
      }

      // Validate rating is set
      if (reviewForm.value.rating === 0) {
        alert("Please select a star rating");
        return;
      }

      // Add review to the reviews array
      const today = new Date();
      const formattedDate = `${today.toLocaleString("default", {
        month: "long",
      })} ${today.getDate()}, ${today.getFullYear()}`;

      productReviews.value.unshift({
        name: reviewForm.value.name,
        rating: reviewForm.value.rating,
        title: reviewForm.value.title,
        text: reviewForm.value.text,
        date: formattedDate,
      });

      showToastNotification("Thank you for your review!");

      // Reset form and close modal
      reviewForm.value = {
        name: "",
        rating: 0,
        title: "",
        text: "",
      };
      showReviewModal.value = false;
    };

    const handleSearch = () => {
      const query = searchQuery.value.trim();
      if (query) {
        router.push({
          name: "SearchResults",
          query: { q: query },
        });
      }
    };

    const goToCart = () => {
      if (isLoggedIn.value) {
        router.push("/cart");
      } else {
        showLoginRequiredModal.value = true;
      }
    };

    const goToWishlist = () => {
      if (isLoggedIn.value) {
        router.push("/wishlist");
      } else {
        showLoginRequiredModal.value = true;
      }
    };

    const goToNotifications = () => {
      if (isLoggedIn.value) {
        router.push("/notifications");
      } else {
        showLoginRequiredModal.value = true;
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
      // Clear local cart and wishlist
      cartItems.value = [];
      wishlistItems.value = [];
      isLoggedIn.value = false;
      router.push("/login");
    };

    // Watch for route changes to load the new product
    watch(
      () => route.params.id,
      (newId, oldId) => {
        if (newId !== oldId) {
          loadProduct();
        }
      }
    );

    // Load product on component mount
    onMounted(() => {
      // Add Bootstrap icons CSS
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css";
      document.head.appendChild(link);

      loadProduct();
    });

    // Return all refs, computed properties, and methods to the template
    return {
      // State
      loading,
      quantity,
      productId,
      currentImageIndex,
      product,
      isLoggedIn,
      searchQuery,
      dropdownOpen,
      wishlistItems,
      cartItems,
      notificationCount,
      showReviewModal,
      showLoginRequiredModal,
      hoverRating,
      reviewForm,
      productReviews,
      isInWishlist,
      showToast,
      toastMessage,

      // Computed
      wishlistItemCount,
      cartItemCount,
      productImages,
      currentImage,
      productTags,
      avgRating,
      sellerName,
      productDescription,
      productLongDescription,
      productBenefits,
      relatedProducts,

      // Methods
      getProductPrice,
      getStorageInfo,
      increaseQuantity,
      decreaseQuantity,
      validateQuantity,
      addToCart,
      toggleWishlist,
      isProductInWishlist,
      addRelatedToCart,
      toggleRelatedWishlist,
      selectImage,
      formatPrice,
      setRating,
      submitReview,
      handleSearch,
      goToCart,
      goToWishlist,
      goToNotifications,
      openDropdown,
      closeDropdown,
      handleLogout,
    };
  },
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
  height: 42px;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #ced4da;
}

.quantity-btn {
  background: none;
  border: none;
  font-size: 16px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #555;
  height: 100%;
  padding: 0;
}

.quantity-btn:hover {
  background-color: #f0f0f0;
  color: #333;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-input {
  width: 48px;
  text-align: center;
  border: none;
  font-size: 16px;
  -moz-appearance: textfield; /* Firefox */
  padding: 0;
  margin: 0;
  background-color: transparent;
}

.quantity-input:focus {
  box-shadow: none;
  outline: none;
}

.quantity-input::-webkit-outer-spin-button,
.quantity-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Star rating hover effects */
.star-container {
  cursor: pointer;
  transition: transform 0.2s;
}

.star-container:hover {
  transform: scale(1.2);
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
.breadcrumb-item a{
  color: #198754 !important;
}
.breadcrumb-item.active{
  color: #198754 !important;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Navbar styles */
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
  color: #e5e9e7;
}

/* Toast styling */
.toast {
  transition: opacity 0.3s ease;
  opacity: 0;
  background-color: rgba(255, 255, 255, 0.95);
  border-left: 4px solid #198754;
}

.toast.show {
  opacity: 1;
}

.back-to-market {
  color: #198754;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 10px;
  font-weight: 500;
}

.back-to-market:hover {
  text-decoration: underline;
}

.arrow-left {
  font-size: 18px;
}

@media (max-width: 992px) {
  .search-container input,
  .search-container button {
    display: none !important;
  }

  .share-options {
    display: none;
  }
}

@media (max-width: 768px) {
  .product-meta {
    margin-top: 20px;
  }
}
</style>
