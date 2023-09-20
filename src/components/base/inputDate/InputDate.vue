<template>
  <div class="container">
    <input
      ref="datepicker"
      type="text"
      class="flatpickr inp"
      v-model="selectedDate"
    />
    <div class="icon-date" @click="clickIcon" @mouseover="hoverIcon"></div>
  </div>
</template>

<script>
import Flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Vietnamese } from "flatpickr/dist/l10n/vn.js"; //
export default {
  props: ["valueDate"],
  data() {
    return {
      selectedDate: this.valueDate,
    };
  },
  mounted() {
    this.initFlatpickr();
  },
  watch: {
    selectedDate(newValue) {
      this.$emit("update:valueDate", newValue);
      
    },
  },
  methods: {
    /*tuy chinh input date flatpcikr
    Created:library
    Modify:null
    */
    initFlatpickr() {
      // const options = {
      //   dateFormat: "d/m/Y",
      //   // Các tùy chọn khác của Flatpickr nếu cần
      //   // dateFormat: "Y-m-d H:i",
      //   locale: 'Russian'
      // };

      this.flatpickr = new Flatpickr(this.$refs.datepicker, {
        dateFormat: "d/m/Y",
        locale: Vietnamese,
      });

      // this.flatpickr.config.onChange.push((selectedDates) => {
      //   // Gán giá trị ngày đã chọn vào biến selectedDate
      //   this.selectedDate = selectedDates[0]
      //     ? selectedDates[0].toLocaleDateString("en-GB") // Đặt ngôn ngữ thành en-GB để đảm bảo định dạng dd/mm/yyyy
      //     : null;
      // });
    },
    /*
    event click icon date
    createby: dvphu 11/9/2023

    */
    clickIcon() {
      this.$refs.datepicker.click();

    },
    /*
    event hover icon date
    createby: dvphu 11/9/2023

    */
    hoverIcon() {
      this.$refs.datepicker.dispatchEvent(new MouseEvent("mouseover"));
    },
  },
  beforeUnmount() {
    this.flatpickr.destroy();
  },
};
</script>

<style scoped>
/* Cần thêm kiểu cho phần input */
@import url(../../../css/input/input.css);
.container {
  position: relative;
}
.icon-date {
  width: 36px;
  height: 36px;
  background-image: url(../../../assets/icon/sidebar/qlts-icon.svg);
  background-position: -277px -60px;
  /* background: rgb(128, 112, 112,0.2); */
  z-index: 2;
  position: absolute;
  top: 0;
  right: 2px;
  box-sizing: border-box;
  cursor: pointer;
  /* border: 1px solid red; */
}
</style>
