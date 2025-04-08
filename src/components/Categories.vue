<template>
  <div class="categories py-5">
    <section class="newproduct">
      <div class="container">
        <div class="categories-header">
          <p class="h1">Categories</p>
          <router-link to="/allcategory" class="view-all">
            View All <span class="arrow">&rarr;</span>
          </router-link>
        </div>
        <div class="container my-5">
          <div
            class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4"
          >
            <!-- Card 1: Herbs and Spices -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Herbs and Spices' },
                }"
                class="card h-100"
              >
                <img
                  src="../assets/herb.jpg"
                  class="card-img-top"
                  alt="Herbs and Spices"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Herbs and Spices</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 2: Fresh Fruits -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Fresh Fruits' },
                }"
                class="card h-100"
              >
                <img
                  src="../assets/fresh-fruit.png"
                  class="card-img-top"
                  alt="Fresh Fruits"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Fresh Fruits</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 3: Grains -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Grains' },
                }"
                class="card h-100"
              >
                <img
                  src="../assets/grains.png"
                  class="card-img-top"
                  alt="Grains"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Grains</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 4: Roots and Tubers -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Roots and Tubers' },
                }"
                class="card h-100"
              >
                <img
                  src="../assets/root-tuber.jpg"
                  class="card-img-top"
                  alt="Roots and Tubers"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Roots and Tubers</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 5: Nuts and Seeds -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Nuts and Seeds' },
                }"
                class="card h-100"
              >
                <img
                  src="../assets/nut-seeds.png"
                  class="card-img-top"
                  alt="Nuts and Seeds"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Nuts and Seeds</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 6: Cooking -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Cooking' },
                }"
                class="card h-100"
              >
                <img
                  src="../assets/cooking.png"
                  class="card-img-top"
                  alt="Cooking"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Cooking</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 7: Dairy Products -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Dairy Products' },
                }"
                class="card h-100"
              >
                <img
                  src="../assets/dairy.png"
                  class="card-img-top"
                  alt="Dairy Products"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Dairy Products</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 8: Processed Foods -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Processed Foods' },
                }"
                class="card h-100"
              >
                <img
                  src="../assets/processed-food.png"
                  class="card-img-top"
                  alt="Processed Foods"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Processed Foods</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 9: Agro Chemicals -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Agro Chemicals' },
                }"
                class="card h-100"
              >
                <img
                  src="../assets/agro-chem.png"
                  class="card-img-top"
                  alt="Agro Chemicals"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Agro Chemicals</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 10: Diabetics -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Diabetics' },
                }"
                class="card h-100"
              >
                <img
                  src="../assets/diabetic.png"
                  class="card-img-top"
                  alt="Diabetics"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Diabetics</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 11: Proteins -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Proteins' },
                }"
                class="card h-100"
              >
                <img
                  src="../assets/protein.png"
                  class="card-img-top"
                  alt="Proteins"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Proteins</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 12: Baking Ingredients -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Baking Ingredients' },
                }"
                class="card h-100"
              >
                <img
                  src="../assets/baking.png"
                  class="card-img-top"
                  alt="Baking Ingredients"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Baking Ingredients</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 13: Snacks and Pastries -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Snacks and Pastries' },
                }"
                class="card h-100"
              >
                <img
                  src="../assets/snack.png"
                  class="card-img-top"
                  alt="Snacks and Pastries"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Snacks and Pastries</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 14: Cereals and Beverages -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Cereals and Beverages' },
                }"
                class="card h-100"
              >
                <img
                  src="../assets/cereal.png"
                  class="card-img-top"
                  alt="Cereals"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Cereals and Beverages</h5>
                </div>
              </router-link>
            </div>

            <!-- Card 15: Fresh Vegetables -->
            <div class="col">
              <router-link
                :to="{
                  name: 'FilteredCategoriesPage',
                  query: { category: 'Fresh Vegetables' },
                }"
                class="card h-100"
              >
                <img
                  src="../assets/fresh-veg.png"
                  class="card-img-top"
                  alt="Fresh Vegetables"
                />
                <div class="card-body text-center">
                  <h5 class="card-title">Fresh Vegetables</h5>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Categories",
  data() {
    return {
      categories: [
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
      ],
    };
  },
};
</script>

<style>
/* (Your existing styles remain unchanged) */
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
  text-decoration: none !important;
}
.card-title {
  text-decoration: none !important;
}

a .card-title,
router-link .card-title,
.card-title {
  text-decoration: none !important;
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