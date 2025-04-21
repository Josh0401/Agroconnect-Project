<template>
    <section class="get-started-section">
      <div class="container">
        <h1 class="get-started-title">Get Started</h1>
        
        <div class="description-container">
          <p class="main-description">
            Nowadays, it isn't great uncommon to see lenders rapidly adopting new technologies to streamline their operations. 
            Our platform provides an intuitive interface that helps you get started in minutes.
          </p>
        </div>
        
        <div class="accordion-section">
          <div class="accordion" id="getStartedAccordion">
            <div class="accordion-item" v-for="(item, index) in getStartedFaqs" :key="index">
              <h2 class="accordion-header" :id="'heading' + index">
                <button 
                  class="accordion-button" 
                  :class="{ collapsed: activeIndex !== index }" 
                  type="button" 
                  @click="toggleAccordion(index)"
                  :aria-expanded="activeIndex === index"
                  :aria-controls="'collapse' + index"
                >
                  {{ item.question }}
                </button>
              </h2>
              <div 
                :id="'collapse' + index" 
                class="accordion-collapse collapse" 
                :class="{ show: activeIndex === index }"
                :aria-labelledby="'heading' + index"
              >
                <div class="accordion-body">
                  {{ item.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="action-section">
          <button class="btn btn-primary btn-lg">Start Now</button>
          <button class="btn btn-outline-secondary btn-lg ms-3">Contact Support</button>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeIndex: null,
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
        ]
      };
    },
    methods: {
      toggleAccordion(index) {
        this.activeIndex = this.activeIndex === index ? null : index;
      }
    }
  };
  </script>
  
  <style scoped>
  .get-started-section {
    padding: 4rem 0;
    background-color: #f8f9fa;
  }
  
  .container {
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .get-started-title {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    font-weight: bold;
    text-align: center;
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
    color: #0d6efd;
  }
  
  .accordion-body {
    padding: 1.5rem;
    background-color: #f8f9fa;
  }
  
  .action-section {
    text-align: center;
    margin-top: 2rem;
  }
  
  /* Animations for accordion */
  .accordion-collapse {
    transition: all 0.3s ease;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .get-started-title {
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