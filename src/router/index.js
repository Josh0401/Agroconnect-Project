import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import AboutUs from "../views/AboutUs.vue";
import ContactSupport from "../views/ContactSupport.vue";
import Login from "../views/auth/Login.vue";
import ResetPassword from "../views/auth/ResetPassword.vue";
import SignUp from "../views/SignUp.vue";
import FAQ from "../views/FAQ.vue";
import FaqDetail from "../views/FaqDetail.vue"; // Import the new FaqDetail component
import CreateAccountSeller from "../views/individual_account/CreateAccountSeller.vue";
import CreateAccountSeller2 from "../views/individual_account/CreateAccountSeller2.vue";
import CreateAccountSeller3 from "../views/individual_account/CreateAccountSeller3.vue";
import CreateAccountBuyer from "../views/individual_account/CreateAccountBuyer.vue";
import CreateAccountBuyer2 from "../views/individual_account/CreateAccountBuyer2.vue";
import CreateAccountBuyer3 from "../views/individual_account/CreateAccountBuyer3.vue";
import Individuals from "../views/servicelist/Individuals.vue";
import MarketPlace from "../views/servicelist/MarketPlace.vue";
import Companies from "../views/servicelist/Companies.vue";
import Profile from "../views/auth/dashboard/Profile(seller).vue";
import ProfilePage from "../views/account/ProfilePage.vue"; // Added new ProfilePage component
import OrdersPage from "../views/account/OrdersPage.vue"; // Added new OrdersPage component
import TrackOrderPage from "../views/account/TrackOrderPage.vue"; // Import for Track Order Page
import ProductSeller from "../views/auth/dashboard/Product(seller).vue";
import OrderSeller from "../views/auth/dashboard/Order(seller).vue";
import TransactionSeller from "../views/auth/dashboard/Transaction(seller).vue";
import DashboardSeller from "../views/auth/dashboard/Dashboard(seller).vue";
import Market from "../views/marketplace/Market.vue";
import AllCategory from "../views/marketplace/AllCategory.vue";
import AllProduct from "../views/marketplace/AllProduct.vue";
import SignUpp from "../views/individual_account/SignUpp.vue";
import WishList from "../views/marketplace/WishList.vue";
import Cart from "../views/marketplace/Cart.vue";
import Checkout from "../views/marketplace/Checkout.vue";
import ProductDetail from "../views/marketplace/ProductDetail.vue";
import Cat from "../views/marketplace/Cat.vue";
import LoginSelect from "../views/LoginSelect.vue";
import LoginSeller from "../views/auth/LoginSeller.vue";
import TransactionsPage from "../views/account/TransactionsPage.vue";
import FilteredCategoriesPage from "../views/marketplace/FilteredCategoriesPage.vue";
import GroupsCommunitiesPage from "../views/account/GroupsCommunitiesPage.vue";
import SearchResults from "../views/marketplace/SearchResults.vue"; // Import the new SearchResults component
import NotificationsPage from "../views/account/NotificationsPage.vue";
import OrderSuccesful from "../views/marketplace/OrderSuccesful.vue";
//import Categories from "../components/Categories.vue";
//import MarketPlaceHome from "../views/MarketPlaceHome.vue";
// import About from "@/views/About.vue";

const routes = [
  { path: "/", component: Home },
  {
    path: "/about-us",
    component: AboutUs,
  },
  // {
  //   path: "/marketplace",
  //   component: MarketPlaceHome,
  // },
  {
    path: "/contact-support",
    component: ContactSupport,
  },
  {
    path: "/login",
    component: LoginSelect,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/login-buyer",
    component: Login,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/login-seller",
    component: LoginSeller,
    meta: { hideHeader: true, hideFooter: true },
  },

  {
    path: "/reset-password",
    component: ResetPassword,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/signup",
    component: SignUp,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/faq",
    component: FAQ,
  },
  // Add the new route for FAQ detail page
  {
    path: "/faq-detail/:id",
    name: "FaqDetail",
    component: FaqDetail,
    props: true,
  },
  {
    path: "/create-account-seller",
    component: CreateAccountSeller,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/create-seller2",
    component: CreateAccountSeller2,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/create-seller3",
    component: CreateAccountSeller3,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/create-account-buyer",
    component: CreateAccountBuyer,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/create-buyer2",
    component: CreateAccountBuyer2,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/create-buyer3",
    component: CreateAccountBuyer3,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/individuals",
    component: Individuals,
  },
  {
    path: "/marketplace",
    component: MarketPlace,
  },
  {
    path: "/companies",
    component: Companies,
  },
  {
    path: "/profile",
    component: Profile,
    meta: { hideHeader: true, hideFooter: true },
  },
  // New route for account profile page
  {
    path: "/account/profile",
    component: ProfilePage,
    meta: { hideHeader: true, hideFooter: true },
  },
  // New route for account orders page
  {
    path: "/account/orders",
    component: OrdersPage,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/product-seller",
    component: ProductSeller,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/order-seller",
    component: OrderSeller,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/transaction-seller",
    component: TransactionSeller,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/dashboard-seller",
    component: DashboardSeller,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/market",
    component: Market,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/allcategory",
    component: AllCategory,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/allproduct",
    component: AllProduct,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: ProductDetail,
    props: true,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/test",
    component: SignUpp,
  },
  {
    path: "/wishlist",
    component: WishList,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/cart",
    component: Cart,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/checkout",
    component: Checkout,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/order-success",
    component: OrderSuccesful,
    meta: { hideHeader: true, hideFooter: true },
  },
  // Added route for Track Order Page
  {
    path: "/orders/track/:id",
    name: "TrackOrder",
    component: TrackOrderPage,
    props: true,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/cat/:category?",
    name: "Cat",
    component: Cat,
    props: true,
  },
  {
    path: "/filtered-categories",
    name: "FilteredCategoriesPage",
    component: FilteredCategoriesPage,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/account/groups-communities",
    component: GroupsCommunitiesPage,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: NotificationsPage,
    meta: { hideHeader: true, hideFooter: true },
  },
  {
    path: "/account/transactions",
    component: TransactionsPage,
    meta: { hideHeader: true, hideFooter: true },
  },
  // Add the new route for search results
  {
    path: "/search",
    name: "SearchResults",
    component: SearchResults,
    meta: { hideHeader: true, hideFooter: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
