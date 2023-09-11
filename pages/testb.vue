<template>
  <div>
    <b-form @submit="submitForm">
      <!-- Step 1 -->
      <b-form-group v-if="currentStep === 1">
        <label for="step1Input">Step 1 Input:</label>
        <b-form-input id="step1Input" v-model="step1Data" required></b-form-input>
      </b-form-group>

      <!-- Step 2 -->
      <b-form-group v-if="currentStep === 2">
        <label for="step2Input">Step 2 Input:</label>
        <b-form-input id="step2Input" v-model="step2Data" required></b-form-input>
      </b-form-group>

      <!-- Add more steps as needed -->

      <!-- Navigation Buttons -->
      <b-container class="d-flex justify-content-between">
        <b-button @click="prevStep" variant="secondary" v-if="currentStep > 1">Previous</b-button>
        <b-button @click="nextStep" variant="primary" v-if="currentStep < totalSteps">Next</b-button>
        <b-button type="submit" variant="success" v-else>Submit</b-button>
      </b-container>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1,
      totalSteps: 2, // Update this with the total number of steps
      step1Data: '',
      step2Data: '',
      // Define more data properties for additional steps
    };
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    submitForm() {
      // Handle form submission logic here
      // You can access form data using this.step1Data, this.step2Data, etc.
    },
  },
};
</script>
