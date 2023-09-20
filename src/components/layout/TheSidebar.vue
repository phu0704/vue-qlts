<template lang="">
  <div class="wrapper__container--sidebar" @click="handleZoomInSidebar">
    <div class="sidebar__item--home item-home">
      <img class="icon-home" src="../../assets/icon/sidebar/home.svg" alt="" />
      <span class="sidebar__item--brand-name" :class="{ none: zoomOutSidebar }"
        >MISA QLTS</span
      >
    </div>
    <router-link
      to="/overview"
      class="sidebar__item"
      @mouseover="overview = true"
      @mouseout="overview = false"
      @click.stop="handleFocus('overview')"
      :class="{ 'sidebar__item-hover': qlts.overview }"
    >
      <div
        class="icon icon-tc"
        :class="{ 'icon-tc-hover': overview || qlts.overview }"
      ></div>
      <span :class="{ none: zoomOutSidebar }">Tổng quan</span>
    </router-link>
    <router-link
      to="/asset"
      class="sidebar__item"
      @mouseover="asset = true"
      @mouseout="asset = false"
      @click.stop="handleFocus('asset')"
      :class="{ 'sidebar__item-hover': qlts.asset }"
    >
      <div
        class="icon icon-qlts"
        :class="{ 'icon-qlts-hover': asset || qlts.asset }"
      ></div>
      <span :class="{ none: zoomOutSidebar }">Tài sản</span>
      <div
        class="icon-arrow-down"
        :class="{
          'icon-brightness100': asset || qlts.asset,
          none: zoomOutSidebar,
        }"
      ></div>
    </router-link>
    <router-link
      to="assetHTDB"
      class="sidebar__item"
      @mouseover="assetHTDB = true"
      @mouseout="assetHTDB = false"
      @click.stop="handleFocus('assetHTDB')"
      :class="{ 'sidebar__item-hover': qlts.assetHTDB }"
    >
      <div
        class="icon icon-htdb"
        :class="{ 'icon-htdb-hover': assetHTDB || qlts.assetHTDB }"
      ></div>
      <span :class="{ none: zoomOutSidebar }">Tài sản HT-ĐB</span>
      <div
        class="icon-arrow-down"
        :class="{
          'icon-brightness100': assetHTDB || qlts.assetHTDB,
          none: zoomOutSidebar,
        }"
      ></div>
    </router-link>
    <router-link
      to="tools"
      class="sidebar__item"
      @mouseover="tools = true"
      @mouseout="tools = false"
      @click.stop="handleFocus('tools')"
      :class="{ 'sidebar__item-hover': qlts.tools }"
    >
      <div
        class="icon icon-ccdc"
        :class="{ 'icon-ccdc-hover': tools || qlts.tools }"
      ></div>
      <span :class="{ none: zoomOutSidebar }">Công cụ dụng cụ</span>
      <div
        class="icon-arrow-down"
        :class="{
          'icon-brightness100': tools || qlts.tools,
          none: zoomOutSidebar,
        }"
      ></div>
    </router-link>
    <router-link
      to="category"
      class="sidebar__item"
      @mouseover="categoty = true"
      @mouseout="categoty = false"
      @click.stop="handleFocus('categoty')"
      :class="{ 'sidebar__item-hover': qlts.categoty }"
    >
      <div
        class="icon icon-dm"
        :class="{ 'icon-dm-hover': categoty || qlts.categoty }"
      ></div>
      <span :class="{ none: zoomOutSidebar }">Danh mục</span>
    </router-link>
    <router-link
      to="search"
      class="sidebar__item"
      @mouseover="search = true"
      @mouseout="search = false"
      @click.stop="handleFocus('search')"
      :class="{ 'sidebar__item-hover': qlts.search }"
    >
      <div
        class="icon icon-tracuu"
        :class="{ 'icon-tracuu-hover': search || qlts.search }"
      ></div>
      <span :class="{ none: zoomOutSidebar }">Tra cứu</span>
      <div
        class="icon-arrow-down"
        :class="{
          'icon-brightness100': search || qlts.search,
          none: zoomOutSidebar,
        }"
      ></div>
    </router-link>
    <router-link
      to="report"
      class="sidebar__item"
      @mouseover="report = true"
      @mouseout="report = false"
      @click.stop="handleFocus('report')"
      :class="{ 'sidebar__item-hover': qlts.report }"
    >
      <div
        class="icon icon-baocao"
        :class="{ 'icon-baocao-hover': report || qlts.report }"
      ></div>
      <span :class="{ none: zoomOutSidebar }">Báo cáo</span>
      <div
        class="icon-arrow-down"
        :class="{
          'icon-brightness100': report || qlts.report,
          none: zoomOutSidebar,
        }"
      ></div>
    </router-link>
  </div>
  <div class="sidebar__footer" :class="{ none: zoomOutSidebar }">
    <div
      class="sidebar__footer--close icon-close-sidebar"
      @click="handleZoomOutSidebar"
    ></div>
  </div>
</template>
<script>
export default {
  name: "SidebarComponent",
  data() {
    return {
      overview: false,
      asset: false,
      assetHTDB: false,
      tools: false,
      categoty: false,
      search: false,
      report: false,
      zoomOutSidebar: false,
      qlts: {
        overview: false,
        asset: false,
        assetHTDB: false,
        tools: false,
        categoty: false,
        search: false,
        report: false,
      },
    };
  },
  emits: ["handelZoomOutSidebar", "handelZoomInSidebar"],
  watch: {
    qlts() {},
  },
  mounted() {
    this.handleFocus("asset");
  },
  methods: {
    /**
     * zoom out sidebar
     * Author:dvphu (20/8/2023)
     * Modify:null
     */
    handleZoomOutSidebar() {
      this.zoomOutSidebar = true;
      this.$emit("handelZoomOutSidebar");
    },
    /**
     * zoom in sidebar
     * Author:dvphu (20/8/2023)
     * Modify:null
     */
    handleZoomInSidebar() {
      this.$emit("handelZoomInSidebar");
      this.zoomOutSidebar = false;
      console.log("zoom in");
    },
    /**
     * focus slide_item
     * Author:dvphu (20/8/2023)
     * Modify:null
     */
    handleFocus(data) {
      this.zoomOutSidebar = true;
      this.$emit("handelZoomOutSidebar");
      this.qlts.overview = false;
      this.qlts.asset = false;
      this.qlts.assetHTDB = false;
      this.qlts.tools = false;
      this.qlts.categoty = false;
      this.qlts.search = false;
      this.qlts.report = false;
      this.qlts[data] = true;
    },
  },
};
</script>
<style scoped>
.wrapper__container--sidebar {
  background-color: #1c3048;
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.16);
  /* width: 66px;
  height: 668px; */
  width: 100%;
  /* width: fit-content;
  min-width: 4.5vw;
  max-width: 15vw; */
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  /* padding: 17.5vw; */
  padding-top: 11px;
  color: #ffffff;
}
.item-home {
  display: flex;
  width: 85%;
  padding: 0 19px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0 28px 0;
}
.item-home img {
  transform: scale(1.1);
}
.sidebar__item {
  margin-bottom: 2px;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  box-sizing: border-box;
  width: 85%;
  padding: 0 19px;
  border-radius: 4px;
  height: 54px;
  font-size: 19px;

  color: #ffffff;
  text-decoration: none;
}
.sidebar__item span {
  width: 150px;
}
.sidebar__item:hover {
  background-color: #1aa4c8;
}
.sidebar__item-hover {
  background-color: #1aa4c8;
}
.sidebar__item--brand-name {
  font-size: 32px;
  font-weight: 900;
}
.sidebar__footer {
  width: 325px;
  height: 55px;
  /*background: red;*/
  position: absolute;
  padding-right: 10px;
  box-sizing: border-box;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: 3px solid rgba(119, 110, 110, 0.5);
}
</style>
