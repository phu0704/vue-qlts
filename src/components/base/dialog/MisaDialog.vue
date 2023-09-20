<template lang="">
  <div>
    <div class="dialog__container">
      <div class="dialog__container--infor">
        <div class="infor__icon" :class="iconClass"></div>
        <div class="infor__content">
          {{ content }}
          <p v-if="errorCode" class="error-code">Mã Lỗi: {{ errorCode }}</p>
          
        </div>
      </div>
      <div class="dialog__container--footer">
        <m-btn
          @click="$emit('handelCancel')"
          class="btn-defaul"
          :contentBtn="btnWhiteContent"
        />
        <m-btn
          v-if="btnWhiteCenterContent"
          class="btn-defaul"
          :contentBtn="btnWhiteCenterContent"
        />
        <m-btn
          v-if="btnBlueContent"
          class="btn btn-save"
          :contentBtn="btnBlueContent"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MisaDialog",
  props: [
    "iconClass",
    "content",
    "btnWhite",
    "btnWhiteCenter",
    "btnBlue",
    "btnWhiteContent",
    "btnWhiteCenterContent",
    "btnBlueContent",
    "errorCode",
  ],
};
</script>
<style scoped>
@import url(../../../css/dialog/MisaDialog.css);
</style>
