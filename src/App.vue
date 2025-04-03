<template>
  <Header v-if="showHeader" />
  <router-view />
  <Footer v-if="showFooter" />
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: { Header, Footer },
  data() {
    return {
      showHeader: true,
      showFooter: true,
    };
  },
  watch: {
    // Watch route changes
    $route(to) {
      // Hide header/footer if meta says so, otherwise show them
      this.showHeader = !to.meta.hideHeader;
      this.showFooter = !to.meta.hideFooter;
    },
  },
};
</script>

<style>
body,
html {
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
