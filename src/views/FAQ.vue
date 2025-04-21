<template>
  <section class="faq-section">
    <div class="container">
      <h1 class="faq-title">Frequently Asked Questions</h1>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" v-for="(item, index) in faqItems" :key="index">
          <FaqCard 
            :title="item.title" 
            :description="item.description" 
            :index="index"
          />
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
            "Nowadays, it isn't great uncommon to see lenders rapidly adopting new technologies to streamline their operations. Our platform provides an intuitive interface that helps you get started in minutes.",
        },
        {
          title: "Payment & Transactions",
          description:
            "We offer multiple secure payment methods including credit/debit cards, bank transfers, and digital wallets. All transactions are encrypted and processed securely.",
        },
        {
          title: "Order & Tracking",
          description:
            "After placing an order, you'll receive a confirmation email with tracking details. You can also view order status in your account dashboard.",
        },
        {
          title: "Product",
          description:
            "Our products are designed with users in mind, focusing on quality, reliability, and ease of use. Each product undergoes rigorous testing before reaching the market.",
        },
        {
          title: "Community Guidelines",
          description:
            "Our community thrives on respect, collaboration, and positive interactions. We encourage constructive feedback while prohibiting harassment, hate speech, and inappropriate content.",
        },
        {
          title: "Data Privacy",
          description:
            "We take data privacy seriously and comply with global regulations like GDPR and CCPA. Your personal information is encrypted and never sold to third parties.",
        },
      ],
    };
  }
};
</script>

<style scoped>
.faq-section {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center !important;
  justify-content: center !important;
  align-items: center !important;
}

.faq-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: bold;
  text-align: center !important;
  justify-content: center !important;
  align-items: center !important;
}

.accordion-section {
  margin-top: 4rem;
  margin-bottom: 2rem;
}

/* Smooth scrolling for the whole page */
html {
  scroll-behavior: smooth;
}
</style>