<template>
    <div class="container py-4">
      <div class="row">
        <!-- Sidebar: Categories -->
        <aside class="col-md-3 mb-4">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Categories</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li
                v-for="category in categories"
                :key="category"
                class="list-group-item list-group-item-action"
                :class="{ active: category === selectedCategory }"
                @click="selectCategory(category)"
                style="cursor: pointer"
              >
                {{ category }}
              </li>
            </ul>
          </div>
        </aside>
  
        <!-- Products Section -->
        <section class="col-md-9">
          <div class="mb-3">
            <h4>{{ selectedCategory }}</h4>
            <small class="text-muted"
              >{{ filteredProducts.length }} Results Found</small
            >
          </div>
          <div class="row">
            <div
              class="col-sm-6 col-lg-4 mb-4"
              v-for="product in filteredProducts"
              :key="product.id"
            >
              <div class="card h-100">
                <img
                  v-if="product.imageUrl"
                  :src="product.imageUrl"
                  :alt="product.title"
                  class="card-img-top"
                />
                <div class="card-body">
                  <h5 class="card-title">{{ product.title }}</h5>
                  <p class="card-text text-success">\${{ product.price }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from "vue";
  import { useRoute } from "vue-router";
  import img from "../../assets/cowpea.jpg"; // Example image
  
  // Get the route object in order to read query parameters
  const route = useRoute();
  
  // Sample list of categories
  const categories = ref([
    "Herbs and Spices",
    "Fresh Fruits",
    "Grains",
    "Roots and Tubers",
    "Nuts and Seeds",
    "Cooking",
    "Dairy Products",
    "Processed Foods",
    "Agro Chemicals",
    "Diabetics",
    "Proteins",
    "Baking Ingredients",
    "Snacks and Pastries",
    "Cereals and Beverages",
    "Fresh Vegetables",
  ]);
  
  // Sample products data
  const products = ref([
    {
      id: 1,
      category: "Herbs and Spices",
      title: "Capsicum",
      price: 2.9,
      imageUrl: img,
    },
    {
      id: 2,
      category: "Herbs and Spices",
      title: "Soursop Tea with Ginger",
      price: 11.99,
      imageUrl: img,
    },
    {
      id: 3,
      category: "Fresh Fruits",
      title: "Apples",
      price: 0.99,
      imageUrl: img,
    },
    // ... more products
  ]);
  
  // Set the default selected category from the URL query if valid,
  // otherwise default to the first category in the list.
  const selectedCategory = ref(
    route.query.category && categories.value.includes(route.query.category)
      ? route.query.category
      : categories.value[0]
  );
  
  // Watch for changes in the route query parameter and update selectedCategory accordingly.
  watch(
    () => route.query.category,
    (newCategory) => {
      if (newCategory && categories.value.includes(newCategory)) {
        selectedCategory.value = newCategory;
      }
    }
  );
  
  // Handle category selection from the sidebar (e.g., user clicks a category)
  function selectCategory(category) {
    selectedCategory.value = category;
    // Optionally, you could update the URL query parameter here as well.
    // For example, you might use useRouter and push the change,
    // but if you want the change to be purely internal, leaving it like this is fine.
  }
  
  // Compute the filtered products based on the selected category.
  const filteredProducts = computed(() =>
    products.value.filter(
      (product) => product.category === selectedCategory.value
    )
  );
  </script>
  
  <style scoped>
  /* Optional: Additional styling for active list group items */
  .list-group-item.active {
    background-color: rgb(25, 135, 84);
    border-color: rgb(25, 135, 84);
    color: #fff;
  }
  </style>