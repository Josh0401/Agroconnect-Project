<!-- src/components/SearchBar.vue -->
<template>
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
        :placeholder="placeholder"
        @keydown="handleKeydown"
        v-model="searchText"
        class="d-none d-lg-block form-control me-2"
      />
      <button
        type="button"
        @click="handleSearch"
        class="d-none d-lg-block btn btn-outline-secondary"
      >
        {{ buttonText }}
      </button>
    </div>
  </template>
  
  <script>
  import { ref, computed, watchEffect } from 'vue';
  import { useSearch } from '../services/searchService';
  
  export default {
    name: 'SearchBar',
    props: {
      // Allow overriding the placeholder text
      customPlaceholder: {
        type: String,
        default: ''
      },
      // Allow overriding the button text
      customButtonText: {
        type: String,
        default: ''
      },
      // Pass the current language if it's not using i18n
      currentLanguage: {
        type: String,
        default: 'en'
      }
    },
    setup(props) {
      // Get search functionality and shared state
      const { searchQuery, performSearch, handleSearchKeydown, getSearchPlaceholder } = useSearch();
      
      // Create a local copy of the search query for this component
      const searchText = ref(searchQuery.value);
      
      // Sync the local search text with the global search query
      watchEffect(() => {
        searchQuery.value = searchText.value;
      });
      
      // Use prop values or fallback to translations
      const placeholder = computed(() => {
        return props.customPlaceholder || getSearchPlaceholder();
      });
      
      const buttonText = computed(() => {
        return props.customButtonText || getSearchPlaceholder();
      });
      
      // Handle search button click
      const handleSearch = () => {
        performSearch(searchText.value, props.currentLanguage);
      };
      
      // Handle keydown events (primarily Enter key)
      const handleKeydown = (event) => {
        handleSearchKeydown(event);
      };
      
      return {
        searchText,
        placeholder,
        buttonText,
        handleSearch,
        handleKeydown
      };
    }
  }
  </script>
  
  <style scoped>
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
  
  @media (max-width: 992px) {
    .search-container input,
    .search-container button {
      display: none !important;
    }
  }
  </style>