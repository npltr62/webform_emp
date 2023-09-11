<template>
  <div>
    <b-form-select v-model="selectedValue">
      <option :value="null" disabled>Select an option</option>
      <option v-for="(option,index) in selectOptions" :value="option.value" :key="index">{{ option.label }}</option>
    </b-form-select>

    <b-form-radio-group v-model="selectedRadio">
      <b-form-radio
        v-for="radioOption in radioOptions"
        :key="radioOption.value"
        :value="radioOption.value"
        :disabled="isRadioDisabled(radioOption.value)"
      >
        {{ radioOption.label }}
      </b-form-radio>
    </b-form-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedValue: null,
      selectedRadio: null,
      selectOptions: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
      ],
      radioOptions: [
        { label: "Radio 1", value: "radio1" },
        { label: "Radio 2", value: "radio2" },
        { label: "Radio 3", value: "radio3" },
      ],
    };
  },
  methods: {
    isRadioDisabled(radioValue) {
      // Implement your logic to determine if the radio option should be disabled
      // based on the selectedValue from the select.
      // For example, you can disable "Radio 2" if selectedValue is "option1".
      console.log(this.selectedValue,radioValue);
      if (this.selectedValue === "option1" && radioValue === "radio3") {
        return true;
      }
      // You can add more conditions as needed.
      return false;
    },
  },
};
</script>
