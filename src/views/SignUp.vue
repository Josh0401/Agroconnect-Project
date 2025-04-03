<template>
  <div class="select-profile container px-5 py-5">
    <!-- Back Button -->
    <button
      class="btn btn-link text-muted back mb-4 d-inline-flex align-items-center"
      @click="goBack"
    >
      <i class="bi bi-arrow-left me-2"></i> Back
    </button>

    <!-- Heading -->
    <h2 class="fw-bold mb-2">Oh great! kindly let us know</h2>
    <p class="text-muted mb-4">
      Let's help you customize your page, select your profile.
    </p>

    <!-- Profile Cards -->
    <div class="row mb-4">
      <div
        v-for="option in options"
        :key="option.value"
        class="col-12 col-md-4 mb-3"
      >
        <div
          class="card h-100"
          :class="{ 'border-success': selected === option.value }"
          style="cursor: pointer"
          @click="selectOption(option.value)"
        >
          <div class="card-body text-center">
            <div class="icon mb-3">
              <img src="../assets/person.png" alt="" />
            </div>
            <h5 class="card-title">{{ option.title }}</h5>
            <p class="card-text text-muted">{{ option.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Continue Button -->
    <button
      class="btn btn-success text-center px-4 py-2"
      @click="handleContinue"
    >
      Continue
    </button>
  </div>
</template>

<script>
export default {
  name: "SelectProfile",
  data() {
    return {
      selected: null,
      options: [
        {
          value: "buyer",
          title: "Buyer",
          description:
            "Nowadays, it isn't great uncommon to see lenders rapidly adopting",
        },
        {
          value: "seller",
          title: "Seller",
          description:
            "Nowadays, it isn't great uncommon to see lenders rapidly adopting",
        },
      ],
    };
  },
  methods: {
    goBack() {
      // Navigate back or to a specific route
      if (this.$router) {
        this.$router.go(-1);
      } else {
        window.history.back();
      }
    },
    selectOption(value) {
      this.selected = value;
    },
    handleContinue() {
      if (!this.selected) {
        alert("Please select a profile before continuing.");
        return;
      }
      if (this.selected === "buyer") {
        this.$router.push("/create-account-buyer");
      } else if (this.selected === "seller") {
        this.$router.push("/create-account-seller");
      }
    },
  },
};
</script>

<style scoped>
.select-profile {
  max-width: 1000px;
  margin: 0 auto;
}
.back {
  text-decoration: none;
}
/* Card hover effect */
.card {
  transition: box-shadow 0.2s ease-in-out;
}
.card:hover {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

/* Highlight selected card */
.border-success {
  border: 2px solid #198754 !important;
}
</style>
