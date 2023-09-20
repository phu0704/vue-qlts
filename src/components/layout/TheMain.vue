<template lang="">
  <div class="wrapper__container--main" :class="{ 'width-96': zoomSidebar }">
    <TheHeader />
    <div :class="{ hidden: !zoomSidebar }"><router-view></router-view></div>
  </div>
</template>
<script>
import TheHeader from "./TheHeader.vue";

export default {
  name: "TheMain",
  props: {
    zoomSidebar: Boolean,
  },
  data() {
    return {};
  },
  components: {
    TheHeader,
  },

  methods: {},
};
</script>
<style scoped>
.wrapper__container--main {
  width: 82vw;
  box-sizing: border-box;
  transition: width 0.1s linear;
}
.width-96 {
  width: 96vw;
}
</style>
