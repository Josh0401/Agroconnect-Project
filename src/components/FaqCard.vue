<template>
  <div class="faq-card card mb-3">
    <div class="card-body">
      <img src="../assets/faq-check.png" alt="" />
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FaqCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.faq-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}
.card-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}
.card-text {
  font-size: 1rem;
  color: #555;
}
img {
  width: 10%;
}
</style>
