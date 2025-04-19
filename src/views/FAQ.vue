<template>
  <section class="faq-section">
    <div class="container">
      <h1 class="faq-title">Frequently Asked Questions</h1>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" v-for="(item, index) in faqItems" :key="index">
          <FaqCard :title="item.title" :description="item.description" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FaqCard from "../components/FaqCard.vue";

export default {
  components: { FaqCard },
  data() {
    return {
      faqItems: [
        {
          title: "Get Started",
          description:
            "Nowadays, it isn't great uncommon to see lenders rapidly adopting",
        },
        {
          title: "Payment & Transactions",
          description:
            "Nowadays, it isn't great uncommon to see lenders rapidly adopting",
        },
        {
          title: "Order & Tracking",
          description:
            "Nowadays, it isn't great uncommon to see lenders rapidly adopting",
        },
        {
          title: "Product",
          description:
            "Nowadays, it isn't great uncommon to see lenders rapidly adopting",
        },
        {
          title: "Community Guidelines",
          description:
            "Nowadays, it isn't great uncommon to see lenders rapidly adopting",
        },
        {
          title: "Data Privacy",
          description:
            "Nowadays, it isn't great uncommon to see lenders rapidly adopting",
        },
      ],
    };
  },
};
</script>

<style scoped>
.faq-section {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.faq-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: bold;
}
</style>
