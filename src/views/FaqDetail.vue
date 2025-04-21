<template>
  <section class="faq-detail-section">
    <div class="container">
      <div class="back-link">
        <router-link to="/faq" class="btn btn-link">
          <i class="fas fa-arrow-left"></i> Back to FAQ
        </router-link>
      </div>
      
      <h1 class="faq-detail-title">{{ currentFaq.title }}</h1>
      
      <div class="description-container">
        <p class="main-description">{{ currentFaq.description }}</p>
      </div>
      
      <div class="accordion-section">
        <!-- Get Started FAQs -->
        <div v-if="currentFaq.title === 'Get Started'" class="accordion">
          <div class="accordion-item" v-for="(item, index) in getStartedFaqs" :key="index">
            <h2 class="accordion-header" :id="'heading' + index">
              <button 
                class="accordion-button" 
                :class="{ collapsed: activeIndex !== 'gs-'+index }" 
                type="button" 
                @click="toggleAccordion('gs-'+index)"
                :aria-expanded="activeIndex === 'gs-'+index"
                :aria-controls="'collapse' + index"
              >
                {{ item.question }}
              </button>
            </h2>
            <div 
              :id="'collapse' + index" 
              class="accordion-collapse collapse" 
              :class="{ show: activeIndex === 'gs-'+index }"
              :aria-labelledby="'heading' + index"
            >
              <div class="accordion-body">
                {{ item.answer }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Payment & Transactions FAQs -->
        <div v-else-if="currentFaq.title === 'Payment & Transactions'" class="accordion">
          <div class="accordion-item" v-for="(item, index) in paymentFaqs" :key="index">
            <h2 class="accordion-header" :id="'heading' + index">
              <button 
                class="accordion-button" 
                :class="{ collapsed: activeIndex !== 'pay-'+index }" 
                type="button" 
                @click="toggleAccordion('pay-'+index)"
                :aria-expanded="activeIndex === 'pay-'+index"
                :aria-controls="'collapse' + index"
              >
                {{ item.question }}
              </button>
            </h2>
            <div 
              :id="'collapse' + index" 
              class="accordion-collapse collapse" 
              :class="{ show: activeIndex === 'pay-'+index }"
              :aria-labelledby="'heading' + index"
            >
              <div class="accordion-body">
                {{ item.answer }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Order & Tracking FAQs -->
        <div v-else-if="currentFaq.title === 'Order & Tracking'" class="accordion">
          <div class="accordion-item" v-for="(item, index) in orderFaqs" :key="index">
            <h2 class="accordion-header" :id="'heading' + index">
              <button 
                class="accordion-button" 
                :class="{ collapsed: activeIndex !== 'order-'+index }" 
                type="button" 
                @click="toggleAccordion('order-'+index)"
                :aria-expanded="activeIndex === 'order-'+index"
                :aria-controls="'collapse' + index"
              >
                {{ item.question }}
              </button>
            </h2>
            <div 
              :id="'collapse' + index" 
              class="accordion-collapse collapse" 
              :class="{ show: activeIndex === 'order-'+index }"
              :aria-labelledby="'heading' + index"
            >
              <div class="accordion-body">
                {{ item.answer }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Product FAQs -->
        <div v-else-if="currentFaq.title === 'Product'" class="accordion">
          <div class="accordion-item" v-for="(item, index) in productFaqs" :key="index">
            <h2 class="accordion-header" :id="'heading' + index">
              <button 
                class="accordion-button" 
                :class="{ collapsed: activeIndex !== 'prod-'+index }" 
                type="button" 
                @click="toggleAccordion('prod-'+index)"
                :aria-expanded="activeIndex === 'prod-'+index"
                :aria-controls="'collapse' + index"
              >
                {{ item.question }}
              </button>
            </h2>
            <div 
              :id="'collapse' + index" 
              class="accordion-collapse collapse" 
              :class="{ show: activeIndex === 'prod-'+index }"
              :aria-labelledby="'heading' + index"
            >
              <div class="accordion-body">
                {{ item.answer }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Community Guidelines FAQs -->
        <div v-else-if="currentFaq.title === 'Community Guidelines'" class="accordion">
          <div class="accordion-item" v-for="(item, index) in communityFaqs" :key="index">
            <h2 class="accordion-header" :id="'heading' + index">
              <button 
                class="accordion-button" 
                :class="{ collapsed: activeIndex !== 'comm-'+index }" 
                type="button" 
                @click="toggleAccordion('comm-'+index)"
                :aria-expanded="activeIndex === 'comm-'+index"
                :aria-controls="'collapse' + index"
              >
                {{ item.question }}
              </button>
            </h2>
            <div 
              :id="'collapse' + index" 
              class="accordion-collapse collapse" 
              :class="{ show: activeIndex === 'comm-'+index }"
              :aria-labelledby="'heading' + index"
            >
              <div class="accordion-body">
                {{ item.answer }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Data Privacy FAQs -->
        <div v-else-if="currentFaq.title === 'Data Privacy'" class="accordion">
          <div class="accordion-item" v-for="(item, index) in privacyFaqs" :key="index">
            <h2 class="accordion-header" :id="'heading' + index">
              <button 
                class="accordion-button" 
                :class="{ collapsed: activeIndex !== 'priv-'+index }" 
                type="button" 
                @click="toggleAccordion('priv-'+index)"
                :aria-expanded="activeIndex === 'priv-'+index"
                :aria-controls="'collapse' + index"
              >
                {{ item.question }}
              </button>
            </h2>
            <div 
              :id="'collapse' + index" 
              class="accordion-collapse collapse" 
              :class="{ show: activeIndex === 'priv-'+index }"
              :aria-labelledby="'heading' + index"
            >
              <div class="accordion-body">
                {{ item.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Action Buttons for different sections -->
      
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: null,
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
      getStartedFaqs: [
        {
          question: "How do I create an account?",
          answer: "Creating an account is simple. Click the 'Sign Up' button in the top right corner, fill in your details, verify your email address, and you're ready to go!"
        },
        {
          question: "What documents do I need to get started?",
          answer: "For basic account setup, you'll need a valid email address and phone number. For lending services, you may need to provide identification documents, proof of address, and financial statements depending on your user type."
        },
        {
          question: "How long does the onboarding process take?",
          answer: "Our streamlined onboarding process typically takes less than 10 minutes to complete. Verification of documents usually happens within 24 hours during business days."
        },
        {
          question: "Is there a trial period available?",
          answer: "Yes, we offer a 14-day free trial with access to most features. No credit card is required to start your trial."
        },
        {
          question: "Can I integrate your platform with my existing systems?",
          answer: "Absolutely! Our platform offers API integration with most major financial and CRM systems. Contact our technical support team for integration assistance."
        },
        {
          question: "What kind of support is available during setup?",
          answer: "We provide 24/7 chat support, comprehensive documentation, video tutorials, and personalized onboarding calls for enterprise customers."
        }
      ],
      paymentFaqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), bank transfers, PayPal, Apple Pay, and Google Pay. For enterprise customers, we also offer invoice-based payments."
        },
        {
          question: "How secure are your payment processes?",
          answer: "We use industry-standard encryption and security protocols. All transactions are processed through PCI-DSS compliant payment gateways. We never store your complete credit card information on our servers."
        },
        {
          question: "Do you offer refunds?",
          answer: "Yes, we offer a 30-day money-back guarantee for most of our services. Refunds are processed within 5-7 business days to your original payment method."
        },
        {
          question: "Are there any hidden fees?",
          answer: "No, we are fully transparent about our pricing. All fees are clearly displayed before purchase, and we don't charge additional processing or hidden fees."
        },
        {
          question: "How do I update my payment information?",
          answer: "You can update your payment information at any time in your account settings under the 'Billing' section. Changes take effect immediately."
        },
        {
          question: "Do you offer invoices for business purchases?",
          answer: "Yes, we automatically generate invoices for all payments. These can be downloaded from your account dashboard or can be emailed to your financial department upon request."
        }
      ],
      orderFaqs: [
        {
          question: "How do I check my order status?",
          answer: "You can check your order status by logging into your account and visiting the 'Orders' section of your dashboard. You'll also receive email updates as your order progresses."
        },
        {
          question: "Can I modify an order after it's been placed?",
          answer: "Orders can be modified within 1 hour of placement. After that, please contact our customer support team who will assist you based on the current status of your order."
        },
        {
          question: "How do I track my shipment?",
          answer: "Once your order ships, you'll receive a tracking number via email. You can also find this in your account dashboard under 'Orders'. Click on the tracking number to see real-time updates."
        },
        {
          question: "What if my order is delayed?",
          answer: "We strive to process all orders promptly. If there's a delay, you'll be notified via email with the reason and estimated new delivery date. For urgent inquiries, please contact our support team."
        },
        {
          question: "How long do orders typically take to process?",
          answer: "Most orders are processed within 24-48 hours. During peak periods or for customized services, processing may take up to 72 hours. Digital products are usually delivered immediately."
        },
        {
          question: "Can I cancel my order?",
          answer: "Orders can be cancelled within 24 hours of placement for a full refund. After this period, cancellation may be subject to our standard refund policy depending on the processing status."
        }
      ],
      productFaqs: [
        {
          question: "What makes your products different from competitors?",
          answer: "Our products are designed with a user-first approach, featuring intuitive interfaces, robust security, and regular updates based on customer feedback. We offer superior customer support and integration capabilities compared to most competitors."
        },
        {
          question: "Do you offer product customization?",
          answer: "Yes, we offer various levels of customization depending on the product and your subscription tier. Enterprise customers have access to advanced customization options and dedicated support for implementation."
        },
        {
          question: "How often are products updated?",
          answer: "We release minor updates monthly and major feature updates quarterly. All updates are included in your subscription and are automatically applied to ensure you always have the latest version."
        },
        {
          question: "Do you offer product training?",
          answer: "Yes, we provide comprehensive documentation, video tutorials, and webinars for all users. Enterprise customers receive personalized training sessions and onboarding assistance."
        },
        {
          question: "What if I encounter a bug or issue?",
          answer: "You can report bugs through your account dashboard or contact our support team. Critical issues are addressed within 24 hours, and all reported bugs are tracked transparently in our system."
        },
        {
          question: "Can I request new features?",
          answer: "Absolutely! We encourage feature requests through our feedback portal. Popular requests are regularly reviewed by our product team and incorporated into our development roadmap."
        }
      ],
      communityFaqs: [
        {
          question: "What are the basic rules for community interaction?",
          answer: "Our community is based on mutual respect and constructive communication. We prohibit harassment, hate speech, spam, and inappropriate content. All members are expected to communicate professionally and considerately."
        },
        {
          question: "How do you handle reported violations?",
          answer: "All reports are reviewed by our moderation team within 24 hours. Depending on the severity, actions range from warnings to temporary suspension or permanent account termination for serious violations."
        },
        {
          question: "Can I share my work or projects with the community?",
          answer: "Yes, we encourage sharing work, case studies, and projects! Use the appropriate channels in our community forum, and ensure you're not sharing confidential information or infringing on intellectual property rights."
        },
        {
          question: "How can I contribute to community resources?",
          answer: "You can contribute by sharing knowledge in forums, participating in discussions, answering questions, and submitting resources to our community library. Quality contributions are recognized through our reputation system."
        },
        {
          question: "Are there meetups or events for community members?",
          answer: "Yes, we host monthly virtual meetups and quarterly webinars. We also support regional in-person meetups organized by community members and sponsor several industry conferences annually."
        },
        {
          question: "How do I report inappropriate behavior?",
          answer: "You can report inappropriate behavior using the 'Report' button available on all content or by contacting our moderation team directly. All reports are confidential and handled with discretion."
        }
      ],
      privacyFaqs: [
        {
          question: "What personal data do you collect?",
          answer: "We collect basic account information (name, email, contact details), usage data, payment information, and any data you choose to provide in your profile or through our services. Details are outlined in our comprehensive Privacy Policy."
        },
        {
          question: "How do you use my data?",
          answer: "We use your data to provide and improve our services, process payments, send notifications, and offer customer support. We may use anonymized aggregate data for analytics. We never sell your personal information to third parties."
        },
        {
          question: "How long do you keep my data?",
          answer: "We retain your data as long as your account is active or as needed to provide services. After account closure, we retain certain data for legal compliance, but unnecessary personal information is deleted or anonymized within 90 days."
        },
        {
          question: "Can I request my data to be deleted?",
          answer: "Yes, you can request data deletion through your account settings or by contacting our privacy team. We will process your request within 30 days, subject to legal retention requirements."
        },
        {
          question: "How do you protect my data?",
          answer: "We implement robust security measures including encryption, secure servers, regular security audits, and strict access controls. We follow industry best practices and comply with international security standards."
        },
        {
          question: "What are my privacy rights?",
          answer: "Depending on your location, you have rights to access, correct, delete, port, or restrict processing of your data. We comply with GDPR, CCPA, and other applicable privacy regulations worldwide."
        }
      ]
    };
  },
  computed: {
    currentFaq() {
      const id = parseInt(this.$route.params.id);
      return this.faqItems[id] || { title: 'Not Found', description: 'The requested FAQ was not found.' };
    }
  },
  methods: {
    toggleAccordion(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    }
  }
};
</script>

<style scoped>
.faq-detail-section {
  padding: 4rem 0;
  background-color: #f8f9fa;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.faq-detail-title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  text-align: center;
  color:rgb(11, 158, 89);
}

.description-container {
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.main-description {
  font-size: 1.2rem;
  color: #6c757d;
  line-height: 1.6;
}

.accordion-section {
  margin-bottom: 3rem;
}

.accordion-button:focus {
  box-shadow: none;
  border-color: rgba(0,0,0,.125);
}

.accordion-button:not(.collapsed) {
  background-color: #f1f8ff;
  color: rgb(11, 158, 89);
}

.accordion-body {
  padding: 1.5rem;
  background-color: #f8f9fa;
}

.action-section {
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.back-link {
  text-align: left;
  margin-bottom: 2rem;
  position: relative;
  text-decoration:none !important;
}
.btn-link{
  text-decoration:none !important;
  color:rgb(25, 135, 84);
}
.btn-link:hover{
  text-decoration:none !important;
  color:rgb(11, 158, 89);
}

/* Animations for accordion */
.accordion-collapse {
  transition: all 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .faq-detail-title {
    font-size: 2rem;
  }
  
  .main-description {
    font-size: 1.1rem;
  }
  
  .action-section .btn {
    display: block;
    width: 100%;
    margin: 0.5rem 0;
  }
  
  .action-section .ms-3 {
    margin-left: 0 !important;
  }
}
</style>