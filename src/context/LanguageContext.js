// src/context/LanguageContext.js
import { reactive, provide, inject, readonly } from 'vue';

// Define translations
const translations = {
  en: {
    // Common
    language: 'English',
    // Navigation
    home: 'Home',
    about: 'About',
    services: 'Services',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    // Products
    products: 'Products',
    newProducts: 'New Products',
    viewAll: 'View All',
    // Actions
    search: 'Search',
    addToCart: 'Add to Cart',
    addToWishlist: 'Add to Wishlist',
    // Profile
    profile: 'Profile',
    orders: 'Orders',
    transactions: 'Transactions',
    logout: 'Logout'
  },
  fr: {
    // Common
    language: 'Français',
    // Navigation
    home: 'Accueil',
    about: 'À Propos',
    services: 'Services',
    contact: 'Contact',
    login: 'Connexion',
    register: 'S\'inscrire',
    // Products
    products: 'Produits',
    newProducts: 'Nouveaux Produits',
    viewAll: 'Voir Tout',
    // Actions
    search: 'Rechercher',
    addToCart: 'Ajouter au Panier',
    addToWishlist: 'Ajouter aux Favoris',
    // Profile
    profile: 'Profil',
    orders: 'Commandes',
    transactions: 'Transactions',
    logout: 'Déconnexion'
  },
  es: {
    // Common
    language: 'Español',
    // Navigation
    home: 'Inicio',
    about: 'Acerca de',
    services: 'Servicios',
    contact: 'Contacto',
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    // Products
    products: 'Productos',
    newProducts: 'Nuevos Productos',
    viewAll: 'Ver Todo',
    // Actions
    search: 'Buscar',
    addToCart: 'Añadir al Carrito',
    addToWishlist: 'Añadir a Favoritos',
    // Profile
    profile: 'Perfil',
    orders: 'Pedidos',
    transactions: 'Transacciones',
    logout: 'Cerrar Sesión'
  },
  km: {
    // Common
    language: 'Kreol Morisien',
    // Navigation
    home: 'Lakaz',
    about: 'Lor Nou',
    services: 'Servis',
    contact: 'Kontakte',
    login: 'Konekte',
    register: 'Anrejistre',
    // Products
    products: 'Prodwi',
    newProducts: 'Nouvo Prodwi',
    viewAll: 'Get Tou',
    // Actions
    search: 'Serche',
    addToCart: 'Mete Dan Panier',
    addToWishlist: 'Mete Dan Fafori',
    // Profile
    profile: 'Profil',
    orders: 'Komand',
    transactions: 'Tranzaksion',
    logout: 'Dekonekte'
  }
};

// Create symbol for provide/inject
const LanguageSymbol = Symbol();

// Create the language state and methods
export function createLanguageContext() {
  // State
  const state = reactive({
    language: 'en', // Default language
    t: translations.en // Default translations
  });

  // Methods
  function setLanguage(lang) {
    if (translations[lang]) {
      state.language = lang;
      state.t = translations[lang];
      // Save to localStorage for persistence
      localStorage.setItem('preferredLanguage', lang);
    }
  }

  // Initialize from localStorage if available
  const savedLanguage = localStorage.getItem('preferredLanguage');
  if (savedLanguage && translations[savedLanguage]) {
    setLanguage(savedLanguage);
  }

  // Public API
  const publicApi = {
    // Readonly state
    language: readonly(() => state.language),
    t: readonly(() => state.t),
    // Methods
    setLanguage,
    // Helper to get all available languages
    getAvailableLanguages: () => Object.keys(translations).map(code => ({
      code,
      name: translations[code].language
    }))
  };

  // Provide context to the app
  provide(LanguageSymbol, publicApi);

  return publicApi;
}

// Hook to use the language context
export function useLanguage() {
  const context = inject(LanguageSymbol);
  if (!context) {
    throw new Error('useLanguage must be used within a component that has access to the LanguageContext');
  }
  return context;
}