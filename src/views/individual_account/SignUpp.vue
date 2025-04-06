<template>
  <div>
    <!-- Render the current step component -->
    <component
      :is="currentComponent"
      @next="nextStep"
      @prev="prevStep"
      @submit="handleSubmit"
    />
    <!-- Optionally show progress or step indicators -->
  </div>
</template>

<script>
import { ref, computed } from "vue";
import CreateAccountBuyer from "./CreateAccountBuyer.vue";
import CreateAccountBuyer2 from "./CreateAccountBuyer2.vue";
import CreateAccountBuyer3 from "./CreateAccountBuyer3.vue";

export default {
  name: "Signup",
  components: { CreateAccountBuyer, CreateAccountBuyer2, CreateAccountBuyer3 },
  setup() {
    const currentStep = ref(1);
    const currentComponent = computed(() => {
      switch (currentStep.value) {
        case 1:
          return "CreateAccountBuyer";
        case 2:
          return "CreateAccountBuyer2";
        case 3:
          return "CreateAccountBuyer3";
        default:
          return "CreateAccountBuyer";
      }
    });
    const nextStep = () => {
      if (currentStep.value < 3) currentStep.value++;
    };
    const prevStep = () => {
      if (currentStep.value > 1) currentStep.value--;
    };
    const handleSubmit = async () => {
      console.log("Form submitted");
    };

    return { currentStep, currentComponent, nextStep, prevStep, handleSubmit };
  },
};
</script>
