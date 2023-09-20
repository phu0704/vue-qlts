<template lang="">
  <button :class="classBtn">
    {{ contentBtn }}
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "MisaButton",
  props: {
    classBtn: {
      type: String,
      default: "",
    },
    contentBtn: {
      type: String,
      default: "",
    },
  },
};
</script>
<style scoped>
@import url(../../../css/button/button.css);
</style>
