<template>
  <TheHome />
  
</template>

<script>
import TheHome from './components/TheHome.vue'

export default {
  name: 'App',
  components: {
    TheHome
  }
}
</script>

<style>
@import url(./css/button/button.css);
@import url(./css/combobox/combobox.css);
@import url(./css/fonts/font.css);
@import url(./css/icon/icon.css);
@import url(./css/input/input.css);
@import url(./css/label/label.css);
* {
  font-family: mainFont, sans-serif;
}
body{
  margin: 0;
}
</style>
