<template>
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
          <div class="search-container">
            <!-- Inline SVG for the search icon -->
            <svg class="search-icon" fill="currentColor" viewBox="0 0 16 16">
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85.708-.708-3.85-3.85zm-5.242.656
           a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"
              />
            </svg>

            <!-- Search input -->
            <input
              id="searchInput"
              type="text"
              placeholder="Search"
              onkeydown="if(event.key === 'Enter') handleSearch()"
            />
            <button type="button" onclick="handleSearch()">Search</button>
          </div>
        </ul>
        <!-- <div class="d-flex align-items-center py-1">
            <router-link
              class="nav-link me-3 btn btn-success text-white green rounded-pill px-4 py-1"
              to="/login"
              >Login/Signup</router-link
            >
          </div> -->
      </div>
    </div>
  </nav>

  <div class="products py-5">
    <section class="newproduct">
      <div class="container">
        <div class="categories-header">
          <p class="h1">Products</p>
        </div>
        <div class="container my-5">
          <div
            class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4"
          >
            <!-- Card 1 -->
            <div class="col">
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
            </div>

            <!-- Card 2 -->
            <div class="col">
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
            </div>

            <!-- Card 3 -->
            <div class="col">
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
            </div>

            <!-- Card 4 -->
            <div class="col">
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
            </div>

            <!-- Card 5 -->
            <div class="col">
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
            </div>

            <!-- Card 6 -->
            <div class="col">
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
            </div>

            <!-- Card 7 -->
            <div class="col">
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
            </div>

            <!-- Card 8 -->
            <div class="col">
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
            </div>

            <!-- Card 9 -->
            <div class="col">
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
            </div>

            <!-- Card 10 -->
            <div class="col">
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

export default {
  name: "HomePage",
  components: {
    Footer,
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    handleSearch() {
      const query = this.searchQuery.trim();
      if (query) {
        // Example: route to a "SearchResults" page, passing the query
        this.$router.push({
          name: "SearchResults",
          query: { q: query },
        });
      }
    },
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
</style>
