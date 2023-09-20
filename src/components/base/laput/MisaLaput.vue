<template lang="">
  <div>
    <label class="lab" for=""
      >{{ labName }}<span class="lab-mts">*</span></label
    >
    <input
      ref="input"
      @focus="handelFocusInput"
      class="inp"
      :type="inputType"
      :placeholder="inPlaceholder"
      v-model="value"
      :class="{
        'input-required': required && !value,
        'readonly': isReadOnly,
        'input-number': inputType==='number',
      }"
      :step="step"
      :readonly="isReadOnly"
      @input="changeDepreciationYear"
    />
    <span class="error">{{ errorContent }}</span>
    <span v-show="!errorContent" class="error">{{ requiredContent }}</span>
  </div>
</template>
<script>
export default {
  name: "MisaLaput",
  props: [
    "labName",
    "inputType",
    "inPlaceholder",
    "valueInput",
    "handelChangeValue",
    "errorContent",
    "step",
    "isReadOnly",
  ],

  data() {
    return {
      value: this.valueInput,
      required: false,
      requiredContent: "",
    };
  },
  watch: {
    value(newValue) {
      this.$emit("update:valueInput", newValue);
      if (!this.value && this.required) {
        this.requiredContent = "Cần phải nhập thông tin";
      } else {
        this.requiredContent = "";
      }
    },
    valueInput(newValue) {
      this.value = newValue;
    },
  },
  methods: {
    /**
     * focus First Input
     * Author:dvphu (25/8/2023)
     * Modify:null
     */
    focusFirstInput() {
      this.$refs.input.focus();
    },
    /**
     * handel focus input
     * Author:dvphu (25/8/2023)
     * Modify:null
     */
    handelFocusInput() {
      this.required = true;
      if (!this.value && this.required) {
        this.requiredContent = "Cần phải nhập thông tin";
      }
    },
    /**
     * change deperciation year
     * Author:dvphu (31/8/2023)
     * Modify:null
     */
    changeDepreciationYear() {
      if (this.labName === "Giá trị hao mòn năm") {
        this.$emit("changeDepreciationYear");
      }
    },
  },
};
</script>
<style scoped>
@import url(../../../css/input/input.css);
@import url(../../../css/label/label.css);
.error {
  color: red;
  font-size: 14px;
  width: fit-content;
}
</style>
