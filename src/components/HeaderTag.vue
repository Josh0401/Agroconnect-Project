<template>
  <div class="container">
    <div class="navbar">
      <div class="logo">
        <!-- <img src="assets/img/agroease1.png" alt="logo" /> -->
      </div>
      <div class="search-wrapper">
        <form>
          <div class="search-btn-wrapper">
            <button class="search-btn">Search</button>
          </div>
        </form>
      </div>
      <div class="user-account">
        <div class="my-account-name" id="my-account-name">
          <!-- <img src="assets/img/profile.svg" alt="profile" /> -->
          <div class="dropdown-profile" id="dropdown-profile">
            <a href="order.html">Orders</a>
            <a href="transaction.html">Transactions</a>
            <a href="profile.html">Profile</a>
          </div>
        </div>
        <div class="my-account-love">
          <div class="divider-line"></div>
          <a href="wishlist.html">
            <!-- <img src="assets/img/Heart.svg" alt="Heart" /> -->
          </a>
          <div class="divider-line"></div>
        </div>
        <div class="my-account-cart">
          <div class="my-account-cart-img">
            <a href="shoppingcart.html">
              <ion-icon name="bag-outline"></ion-icon>
            </a>
            <span class="my-account-cart-number">2</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
