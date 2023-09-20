<template>
  <div class="body">
    <div class="wrapper">
      <div class="wrapper__container">
        <SidebarComponent
          @handelZoomOutSidebar="handelZoomOutSidebar"
          @handelZoomInSidebar="handelZoomInSidebar"
        />
        <MainComponent :zoomSidebar="zoomSidebar" />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarComponent from "./layout/TheSidebar.vue";
import MainComponent from "./layout/TheMain.vue";

export default {
  name: "HomeComponent",
  components: {
    SidebarComponent,
    MainComponent,
  },
  data() {
    return {
      zoomSidebar: false,
    };
  },
  methods: {
    /**
     * Zoom out sidebar
     * Author:dvphu (20/8/2023)
     * Modify:null
     */
    handelZoomOutSidebar() {
      this.zoomSidebar = true;
    },
    /**
     * zoom in sidebar
     * Author:dvphu (20/8/2023)
     * Modify:null
     */
    handelZoomInSidebar() {
      this.zoomSidebar = false;
    },
  },
};
</script>
<style>
.body {
  margin: 0;
}
.wrapper {
  background-color: rgb(92, 86, 86);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper__container {
  /* width: 1366px;
  height: 668px; */
  height: 100vh;
  width: 100%;
  background-color: #f4f7ff;
  display: flex;
}
.sidebar__item-zoom {
  /* padding: 0 19px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 85%;
  padding: 0 19px;
  border-radius: 4px;
  height: 54px;
  font-size: 19px;
}
.sidebar__item-zoom:hover {
  background-color: #1aa4c8;
}
.none {
  display: none !important ;
}
.hidden {
  visibility: hidden;
}
</style>
