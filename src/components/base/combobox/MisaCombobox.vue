<template lang="">
  <div class="misa-combobox" @blur="handelBlurSelect" ref="misaCombobox">
    <div class="misa-combobox__header">
      <input
        class="inp-combobox"
        :class="{'filter':iconFilter}"
        @focus="handelFocus"
        @input="handelChangeSelect"
        type="text"
        v-model="comSelect"
      />
      <img
        class="arrow-down"
        src="../../../assets/icon/combobox/arrow_drop_down.svg"
        alt=""
        @click="open = !open"
      />
    </div>

    <div
      class="misa-combobox__body"
      :class="{ 'misa-combobox__body-close': !open }"
      @blur="handelBlurSelect"
    >
      <div
        class="row"
        v-for="(option, index) in comOptions"
        :key="index"
        :class="{ 'row-select': tick[option] }"
      >
        <div class="row__container" @click="handelClickRow(option)">
          <img
            :class="{ hidden: !tick[option] }"
            class="tick"
            src="../../../assets/icon/combobox/tick.svg"
            alt=""
          />
          <span>{{ option }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: "MisaCombobox",
  props: ["optionsApi", "select","iconFilter","keyCombobox","option"],
  data() {
    return {
      comSelect: this.select,
      comOptions: [],
      tick: {},
      clickRow: false,
      open: false,
      options:[],
     
    };
  },
  created(){
    axios
      .get(this.optionsApi)
      .then((response) => {
        const data = response.data;
        console.log("🚀 ~ file: MisaCombobox.vue:65 ~ .then ~ data:", data)
        console.log("🚀 ~ file: MisaCombobox.vue:69 ~ .then ~ this.option:", this.option)
        data.forEach(i => {
          this.options.push(i[this.option])
          
        });
        this.comOptions=this.options
        for (const item of this.options) {
      this.tick[item] = false;
    }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
  
  mounted() {
    document.addEventListener("click", this.outsideClick);

  },
  beforeUnmount() {
    document.removeEventListener("click", this.outsideClick);
  },
  methods: {
    /*
    focus in select
    Created:dvphu 26/8/2023
    Modify:null
    */
    handelFocus() {
      this.comSelect = "";
    },
    /*
    blur out select
    Created:dvphu 26/8/2023
    Modify:null
    */
    handelBlurSelect() {},
    /*
    change slect
    Created:dvphu 26/8/2023
    Modify:null
    */
    handelChangeSelect() {
      this.open = true;
      this.comOptions = this.options.filter((item) =>
        item.toLowerCase().startsWith(this.comSelect.toLowerCase())
      );
    },
    /*
    event click row option
    @pram{row value}
    Created:dvphu 26/8/2023
    Modify:null
    */
    handelClickRow(option) {
      for (const key in this.tick) {
        if (typeof this.tick[option] === "boolean") {
          this.tick[key] = false;
        }
      }
      this.tick[option] = true;
      this.comSelect = option;
      this.clickRow = true;
      this.open = !this.open;
      const properties={
        key:this.keyCombobox,
        value:option,
      }
      this.$emit('handelChooseOption',properties)
    },
    /*
    event click row option
    @pram{index row, option click}
    Created:dvphu 26/8/2023
    Modify:null
    */
    outsideClick(event) {
      if (!this.$refs.misaCombobox.contains(event.target)) {
        if (!this.clickRow) {
          
          for (const item of this.options) {
            if(this.tick[item] === true){
              this.comSelect=item
              break
            }
             this.comSelect = this.select;
          }
        }
        this.clickRow = false;
        this.comOptions = this.options;
        this.open = false;
      }
    },
  },
};
</script>
<style scoped>
@import url(../../../css/combobox/combobox.css);
</style>
