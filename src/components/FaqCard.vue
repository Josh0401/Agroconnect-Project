<template>
  <router-link :to="'/faq-detail/' + index" class="faq-card-link">
    <div class="faq-card card mb-3" :class="{ 'clickable': true }">
      <div class="card-body">
        <img src="../assets/faq-check.png" alt="" />
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">{{ description }}</p>
      </div>
    </div>
  </router-link>
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
    index: {
      type: Number,
      required: true,
    }
  }
};
</script>

<style scoped>
.faq-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.faq-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  height: 40vh;
  width: 50vh;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.clickable {
  cursor: pointer;
}

.clickable:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  text-align: center !important;
  justify-content: center !important;
  align-items: center !important;
  margin-top: 30px;
}

.card-text {
  font-size: 1rem;
  color: #555;
  text-align: center !important;
  justify-content: center !important;
  align-items: center !important;
}

img {
  width: 10%;
}
</style>