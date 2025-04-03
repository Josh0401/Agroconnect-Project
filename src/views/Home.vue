<template>
  <HeroSection />
  <WhyChoose />
  <About />
  <WhoFor />
  <HowToStart />
  <!-- <Testimonials /> -->
  <!-- <Newsletter /> -->
</template>

<script>
import HeroSection from "../components/HeroSection.vue";
import WhyChoose from "../components/WhyChoose.vue";
import About from "../components/About.vue";
import WhoFor from "../components/WhoFor.vue";
import HowToStart from "../components/HowToStart.vue";
import Testimonials from "../components/Testimonials.vue";
import Newsletter from "../components/Newsletter.vue";

export default {
  components: {
    HeroSection,
    WhyChoose,
    About,
    WhoFor,
    HowToStart,
    Testimonials,
    Newsletter,
  },
};
</script>
