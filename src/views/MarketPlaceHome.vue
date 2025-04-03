<template>
  <HeaderTag />
  <section class="hero-section">
    <div class="container">
      <!-- Initialize Swiper -->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="grid-hero">
              <div class="grid-sale1">
                <h2>Fresh & Healthy Organic Food</h2>
                <div class="sales-alert">
                  <p>Sale up to <span class="discount">30% OFF</span></p>
                  <span>Free shipping on all your order.</span>
                </div>
                <a href="#" class="btn-shop-now">
                  Shop Now <img src="assets/img/larrow.svg" alt="" />
                </a>
              </div>

              <div class="grid-sale2">
                <div class="sales-alert2">
                  <span>Christmas Sale</span>
                  <h3>75% OFF</h3>
                  <span>Only Fruit & Vegetable</span>
                  <a href="#" class="btn-shop-now btn-outline-green" id="but">
                    Shop Now <img src="assets/img/larrow.svg" alt="" />
                  </a>
                </div>
              </div>

              <div class="grid-sale3">
                <div class="best-deal">
                  <span>Best Deal</span>
                  <h3>Special Products Deal of the Month</h3>
                  <a href="#" class="btn-shop-nows btn-outline-white" id="brt">
                    Shop Now <img src="assets/img/rarrow.svg" id="arr" alt="" />
                  </a>
                </div>
              </div>
            </div>
            <!-- Add more swiper slides if needed -->
          </div>
          <!-- Add pagination and navigation -->
          <!-- <div class="swiper-pagination"></div> -->
        </div>
      </div>
    </div>
  </section>
  <section class="categories">
    <div class="popular-category-header">
      <h2>Popular Categories</h2>
      <a href="#">View All<img src="assets/img/larrow.svg" alt="larrow" /></a>
    </div>
    <div class="box-container">
      <div class="box">
        <a href="fruits.html">
          <img src="assets/img/freshfruits.png" alt="" />
          <h3>Fresh Fruits</h3>
        </a>
      </div>

      <div class="box">
        <a href="vegetables.html">
          <img src="assets/img/vegatables.png" alt="" />
          <h3>Fresh Vegetables</h3>
        </a>
      </div>

      <div class="box">
        <img src="assets/img/fish.png" alt="" />
        <h3>Processed Fruits & Veg.</h3>
      </div>

      <div class="box">
        <img src="assets/img/beverages.png" alt="" />
        <h3>Cereals & beverages</h3>
      </div>

      <div class="box">
        <img src="assets/img/Nut.png" id="nut" alt="" />
        <h3>Nuts & Seeds</h3>
      </div>

      <div class="box">
        <img src="assets/img/fish.png" alt="" />
        <h3>Proteins</h3>
      </div>

      <div class="box">
        <img src="assets/img/cooking.png" alt="" />
        <h3>Processed Foods</h3>
      </div>

      <div class="box">
        <img src="assets/img/oil.png" alt="" />
        <h3>Cooking</h3>
      </div>

      <div class="box">
        <img src="assets/img/snacks.png" alt="" />
        <h3>Snacks</h3>
      </div>

      <div class="box">
        <img src="assets/img/Grain.png" id="grain" alt="" />
        <h3>Grains</h3>
      </div>

      <div class="box">
        <img src="assets/img/Agro Chem.png" alt="" />
        <h3>Agro Chemicals</h3>
      </div>

      <div class="box">
        <img src="assets/img/diabetic.png" alt="" />
        <h3>Diabetics</h3>
      </div>
    </div>
  </section>
  <section class="products" id="products">
    <div class="popular-product-header">
      <h2>Popular Product</h2>
      <a href="#">View All<img src="assets/img/larrow.svg" alt="larrow" /></a>
    </div>
    <div class="box-container">
      <div class="box">
        <div class="image">
          <img src="assets/img/Image (1).png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">&#8358;5,000</div>
            <div class="cut">&#8358;7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>

      <div class="box">
        <div class="image">
          <img src="assets/img/Orange.png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">&#8358;5,000</div>
            <div class="cut">&#8358;7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>

      <div class="box">
        <div class="image">
          <img src="assets/img/Cabbage.png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">&#8358;5,000</div>
            <div class="cut">&#8358;7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>

      <div class="box">
        <div class="image">
          <img src="assets/img/Lett.png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">&#8358;5,000</div>
            <div class="cut">&#8358;7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>

      <div class="box">
        <div class="image">
          <img src="assets/img/Eggplant.png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">&#8358;5,000</div>
            <div class="cut">&#8358;7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>

      <div class="box">
        <div class="image">
          <img src="assets/img/Potato.png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">&#8358;5,000</div>
            <div class="cut">&#8358;7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>

      <div class="box">
        <div class="image">
          <img src="assets/img/Corn.png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">&#8358;5,000</div>
            <div class="cut">&#8358;7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>

      <div class="box">
        <div class="image">
          <img src="assets/img/Cauliflower.png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">&#8358;5,000</div>
            <div class="cut">&#8358;7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>

      <div class="box">
        <div class="image">
          <img src="assets/img/Green Pepper.png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">&#8358;5,000</div>
            <div class="cut">&#8358;7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>

      <div class="box">
        <div class="image">
          <img src="assets/img/Green Chili.png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">₦5,000</div>
            <div class="cut">₦7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="review" id="review">
    <div class="swiper review-slider">
      <div class="swiper-wrapper">
        <div class="swiper-slide box" id="swipe">
          <p>Best Deals</p>
          <h3>Sale of the Month</h3>
          <div class="countdown-timer">
            <div class="countdown-timer-start">
              <span id="span">00</span>
              <span>DAYS</span>
            </div>
            <span id="span">:</span>
            <div class="countdown-timer-start">
              <span id="span">01</span>
              <span>HOURS</span>
            </div>
            <span id="span">:</span>
            <div class="countdown-timer-start">
              <span id="span">20</span>
              <span>MINS</span>
            </div>
            <span id="span">:</span>
            <div class="countdown-timer-start">
              <span id="span">18</span>
              <span>SECS</span>
            </div>
          </div>
          <a href="#" class="btn-shopnow">
            Shop Now <img src="assets/img/larrow.svg" alt="" />
          </a>
        </div>

        <div class="swiper-slide box" id="swipee">
          <p id="p3">85% Fat Free</p>
          <h3>Low-Fat Meat</h3>
          <p id="p1">Started at $79.99</p>
          <a href="#" class="btn-shopnow">
            Shop Now <img src="assets/img/larrow.svg" alt="" />
          </a>
        </div>

        <div class="swiper-slide box" id="swipeee">
          <p id="p0">Summer Sale</p>
          <h3>100% Fresh Fruit</h3>
          <p id="p2">Up to 64% OFF</p>
          <a href="#" class="btn-shopnow">
            Shop Now <img src="assets/img/larrow.svg" alt="" />
          </a>
        </div>
      </div>
    </div>
  </section>

  <section class="productss" id="productss">
    <br />
    <div class="popular-product-header">
      <h2>Hot Deals</h2>
      <a href="#">View All<img src="assets/img/larrow.svg" alt="larrow" /></a>
    </div>
    <div class="box-container">
      <div class="box" id="bust">
        <div class="image">
          <img src="assets/img/Image (1).png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">&#8358;5,000</div>
            <div class="cut">&#8358;7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>

      <div class="box" id="box1">
        <div class="image">
          <img src="assets/img/Orange.png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">&#8358;5,000</div>
            <div class="cut">&#8358;7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>

      <div class="box" id="box2">
        <div class="image">
          <img src="assets/img/Cabbage.png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">&#8358;5,000</div>
            <div class="cut">&#8358;7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>

      <div class="box" id="box3">
        <div class="image">
          <img src="assets/img/Lett.png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">&#8358;5,000</div>
            <div class="cut">&#8358;7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>

      <div class="box" id="box1">
        <div class="image">
          <img src="assets/img/Eggplant.png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">&#8358;5,000</div>
            <div class="cut">&#8358;7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>

      <div class="box" id="box2">
        <div class="image">
          <img src="assets/img/Potato.png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">&#8358;5,000</div>
            <div class="cut">&#8358;7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>

      <div class="box" id="box3">
        <div class="image">
          <img src="assets/img/Corn.png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">&#8358;5,000</div>
            <div class="cut">&#8358;7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>

      <div class="box" id="box5">
        <div class="image">
          <img src="assets/img/Cauliflower.png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">&#8358;5,000</div>
            <div class="cut">&#8358;7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>

      <div class="box" id="box6">
        <div class="image">
          <img src="assets/img/Green Pepper.png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">&#8358;5,000</div>
            <div class="cut">&#8358;7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>

      <div class="box" id="box7">
        <div class="image">
          <img src="assets/img/Green Chili.png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">₦5,000</div>
            <div class="cut">₦7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>
      <div class="box" id="box4">
        <div class="image">
          <img src="assets/img/Green Chili.png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">₦5,000</div>
            <div class="cut">₦7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>
      <div class="box" id="box8">
        <div class="image">
          <img src="assets/img/Green Chili.png" alt="" />
          <div class="icons">
            <a href="#" class="fas fa-heart"></a>
            <a href="#" class="fas fa-eye"></a>
          </div>
        </div>
        <div class="content">
          <h3>Green Apple</h3>
          <div class="price">
            <div class="amount">₦5,000</div>
            <div class="cut">₦7,000</div>
          </div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star" id="sta"></i>
          </div>
          <div class="icons">
            <a href="#" class="fas fa-shopping-bag"></a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <FooterTag />
</template>

<script setup>
// import FooterTag from "../src/components/FooterTag.vue";
</script>
