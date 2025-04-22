// src/services/searchService.js

import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

// Create a shared search state that can be used across components
const searchQuery = ref('');

export function useSearch() {
  const router = useRouter();
  const { t, locale } = useI18n();

  /**
   * Perform a search and navigate to the search results page
   * @param {string} query - The search query
   * @param {string} currentLocale - The current locale
   */
  const performSearch = (query, currentLocale = locale.value) => {
    if (!query || !query.trim()) return;
    
    // Store the search query
    searchQuery.value = query.trim();
    
    // Navigate to the search results page with the query and language
    router.push({
      name: 'SearchResults',
      query: { 
        q: query.trim(),
        lang: currentLocale
      }
    });
  };

  /**
   * Handle keydown events for the search input
   * @param {Event} event - The keydown event
   */
  const handleSearchKeydown = (event) => {
    if (event.key === 'Enter') {
      performSearch(searchQuery.value);
    }
  };

  return {
    searchQuery,
    performSearch,
    handleSearchKeydown,
    // Helper function to get translated placeholder
    getSearchPlaceholder: () => t('search', 'Search')
  };
}