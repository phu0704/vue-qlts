<template lang="">
  <div>
    <div class="wrapper__form-add" id="form-add">
      <div class="form-add">
        <div class="form-add__container">
          <!-- {{ formData }}
          {{ submit }} -->
          <div class="form-add__container--title">
            <p>Thêm tài sản</p>
            <img
              @click="$emit('closeFormAdd')"
              class="title__close"
              src="../../../assets/icon/main/x-thin.svg"
              alt=""
            />
          </div>

          <div class="form-add__container--asset-name">
            <m-laput
              labName="Mã tài sản"
              inputType="text"
              inPlaceholder="Nhập mã tài sản"
              v-model:valueInput="valueAssetCode"
              ref="firstInput"
              :errorContent="errorAssetCode"
            />
            <m-laput
              labName="Tên tài sản"
              inputType="text"
              inPlaceholder="Nhập tên tài sản"
              v-model:valueInput="valueAssetName"
              :errorContent="errorAssetName"
            />
            <div class="labox">
              <label class="lab" for=""
                >Mã bộ phận sử dụng<span class="lab-mts">*</span></label
              >
              <m-combobox
                keyCombobox="departmentCode"
                @handelChooseOption="handelChooseOption"
                :iconFilter="false"
                :optionsApi="$ApiConfig.DEPARTMENT"
                select="Mã bộ phận sử dụng"
                option="departmentCode"
              />
            </div>
            <div class="input-not">
              <label class="input-not_lab lab" for=""
                >Tên bộ phận sử dụng</label
              >
              <div class="input-not__content">
                {{ departmentName }}
              </div>
            </div>
            <div class="labox">
              <label class="lab" for=""
                >Mã loại tài sản<span class="lab-mts">*</span></label
              >
              <m-combobox
                keyCombobox="assetCategoryCode"
                @handelChooseOption="handelChooseOption"
                :iconFilter="false"
                :optionsApi="$ApiConfig.FIXED_ASSET_CATEGORY"
                select="Mã loại tài sản"
                option="fixedAssetCategoryCode"
              />
            </div>
            <div class="input-not">
              <label class="input-not_lab lab" for="">Tên loại tài sản</label>
              <div class="input-not__content">
                {{ assetCategoryName }}
              </div>
            </div>
          </div>
          <div class="form-add__container--data">
            <m-laput
              labName="Số lượng"
              inputType="number"
              v-model:valueInput="valueQuantity"
              :errorContent="errorQuantity"
            />
            <m-laput
              labName="Nguyên giá"
              inputType="number"
              v-model:valueInput="valueCost"
            />
            <m-laput
              labName="Số năm sử dụng"
              inputType="number"
              v-model:valueInput="valueLifeTime"
            />
            <m-laput
              labName="Tỉ lệ hao mòn (%)"
              inputType="number"
              :step="0.01"
              v-model:valueInput="valueDepreciationRate"
            />
            <m-laput
              labName="Giá trị hao mòn năm"
              inputType="number"
              v-model:valueInput="valueDepreciationYear"
              @changeDepreciationYear="changeDepreciationYear"
            />
            <m-laput
              labName="Năm theo dõi"
              inputType="number"
              v-model:valueInput="currentYear"
              :isReadOnly="true"
            />
          </div>
          <div class="form-add__container--date">
            <div class="purchase-date">
              <label class="lab" for=""
                >Ngày mua<span class="lab-mts">*</span></label
              >
              <InputDate v-model:valueDate="purchaseDate" />
            </div>
            <div class="started-using">
              <label class="lab" for=""
                >Ngày bắt đầu sử dụng<span class="lab-mts">*</span></label
              >
              <InputDate v-model:valueDate="startedUsingDay" />
            </div>
          </div>
          <div class="form-add__container--btn">
            <m-btn
              class="btn btn-cancel"
              contentBtn="Hủy"
              @click="$emit('closeFormAdd')"
            />
            <m-btn
              title='ccascd'
              class="btn btn-save"
              :class="{'btn-disabled':!submit}"
              contentBtn="Lưu"
              @click="handelSave"
              :disabled="!submit"
              
            />
          </div>
        </div>
      </div>
    </div>
    <MisaDialog
      v-if="dialogShow"
      @handelCancel="handelCancel"
      iconClass="warning"
      :content="$MisaResource['VN'].warningNotSave"
      :btnWhiteContent="$MisaResource['VN'].cancel"
      :btnWhiteCenterContent="$MisaResource['VN'].noSave"
      :btnBlueContent="$MisaResource['VN'].save"
    />
  </div>
</template>
<script>
import MisaDialog from "../../base/dialog/MisaDialog.vue";
import InputDate from "../../base/inputDate/InputDate.vue";
import axios from "axios";
export default {
  name: "FormAddComponent",
  props: ["formAddShow", ""],
  components: {
    MisaDialog,
    InputDate,
  },
  data() {
    return {
      valueAssetCode: "TS" + this.$store.state.assetCodeDefaul,
      valueAssetName: "",
      valueCombobox: {
        assetCategoryCode: "",
        departmentCode: "",
      },
      departmentName: "",
      assetCategoryName: "",
      purchaseDate: this.convertDateFormat(new Date().toLocaleDateString()),
      valueCost: 0,
      valueQuantity: 1,
      valueDepreciationRate: 0,
      valueLifeTime: "",
      // các thuộc tính post thêm mới asset
      dialogShow: false,
      errorAssetCode: "",
      errorAssetName: "",
      errorQuantity: "",
      valueDepreciationYear: 0,
      currentYear: new Date().getFullYear(),
      startedUsingDay: this.convertDateFormat(new Date().toLocaleDateString()),
      formData: {
        assetCode: false,
        assetName: false,
        departmentCode: false,
        assetCategoryCode: false,
        quantity: false,
        cost: false,
        lifeTime: false,
        depreciationRate: false,
        currentYear: false,
        purchaseDate: false,
        startedUsingDay: false,
      },
      submit: false,
    };
  },
  watch: {
    /**
     * check change valueAssetCode
     * Author:dvphu (27/8/2023)
     * Modify:null
     */
    valueAssetCode(newValue) {
      this.checkAssetCode(newValue);
    },
    /**
     * check change valueAssetName
     * Author:dvphu (31/8/2023)
     * Modify:null
     */
    valueAssetName(newValue) {
      this.errorAssetName = "";
      this.formData.assetName = false;

      if (!this.$MisaHelper.validationLengthInput(newValue, 5, 25)) {
        this.errorAssetName = "Mã tài sản có ít nhất 5 và nhiều nhất 25 ký tự";
      } else {
        this.formData.assetName = true;
      }

      console.log(
        "🚀 ~ file: TheFormDetail.vue:201 ~ valueAssetCode ~ this.formData.assetName:",
        this.formData.assetCode
      );
    },
    /**
     * check change valueQuantity
     * Author:dvphu (31/8/2023)
     * Modify:null
     */
    valueQuantity(newValue) {
      this.errorQuantity = "";
      this.formData.quantity = false;
      if (newValue < 1) {
        this.errorQuantity = "Số lượng phải lớn hơn 0";
        this.valueQuantity = 1;
      } else this.formData.quantity = true;
    },
    /**
     * check chage valueCost
     * Author:dvphu (31/8/2023)
     * Modify:null
     */
    valueCost(newValue) {
      this.formData.cost = false;
      if (newValue <= 0) {
        this.valueCost = 0;
      } else {
        if (newValue > 0) this.formData.cost = true;
        let number = newValue * this.valueDepreciationRate;
        this.valueDepreciationYear = this.$MisaHelper.toFixed(number);
      }
    },
    /**
     * check chage valueDepreciationRate
     * Author:dvphu (31/8/2023)
     * Modify:null
     */
    valueDepreciationRate(newValue) {
      this.formData.depreciationRate = false;
      if (newValue > 0) this.formData.depreciationRate = true;
      let number = newValue * this.valueCost;
      this.valueDepreciationYear = this.$MisaHelper.toFixed(number);
    },
    /**
     * check chage lifetime
     * Author:dvphu (31/8/2023)
     * Modify:null
     */
    valueLifeTime(newValue) {
      this.formData.lifeTime = false;
      if (newValue > 0) this.formData.lifeTime = true;
    },
    /**
     * check form data
     * Author:dvphu (31/8/2023)
     * Modify:null
     */
    formData: {
      handler(newValue) {
        this.submit = false;
        this.submit = Object.values(newValue).every((value) => value === true);
      },
      deep: true,
    },
  },
  mounted() {
    this.$refs.firstInput.focusFirstInput();
    this.checkAssetCode(this.valueAssetCode);
    this.formData.quantity = true;
    this.formData.currentYear = true;
    this.formData.purchaseDate = true;
    this.formData.startedUsingDay = true;
  },
  methods: {
    /**
     * save form
     * Author:dvphu (20/8/2023)
     * Modify:null
     */
    async handelSave() {
      this.dialogShow = true;
      // const apiUrl = this.$ApiConfig.FIXED_ASSETS; // Thay đổi URL API tương ứng
      let newAsset = {  
        fixed_asset_id: 0,
        fixed_asset_code: this.valueAssetCode,
        fixed_asset_name: this.valueAssetName,
        department_id: "0",
        department_code: this.valueCombobox.departmentCode,
        department_name: this.departmentName,
        fixed_asset_category_id: "0",
        fixed_asset_category_code: this.valueCombobox.assetCategoryCode,
        fixed_asset_category_name: this.assetCategoryName,
        purchase_date:this.purchaseDate,
        cost: this.valueCost,
        quantity: this.valueQuantity,
        depreciation_rate: this.valueDepreciationRate,
        tracked_year: "0",
        life_time: this.valueLifeTime,
        production_year: "2023",
        accumulated: 894000,
        residual_value: 19106000,
      };
      try {
         await axios.post('http://localhost:3000/fixed_assets', newAsset);
         this.$store.commit('changeAssetApi',this.$store.state.assetApi.push(newAsset))
      } catch (error) {
        this.$store.dispatch('checkApiError',error.response)
      }
    },
    /**
     * cancel form
     * Author:dvphu (20/8/2023)
     * Modify:null
     */
    handelCancel() {
      this.dialogShow = false;
    },
    /**
     * select combobox
     * @pram{data}
     * Author:dvphu (20/8/2023)
     * Modify:null
     */
    handelChooseOption(properties) {
      try {
        this.valueCombobox[properties.key] = properties.value;
        this.$store.state.assetApi.map((i) => {
          if (i.departmentCode === this.valueCombobox.departmentCode) {
            this.departmentName = i.departmentName;
          }
          if (
            i.fixedAssetCategoryCode === this.valueCombobox.assetCategoryCode
          ) {
            this.assetCategoryName = i.fixedAssetCategoryName;
            this.valueLifeTime = i.lifeTime;
            this.valueDepreciationRate = i.depreciationRate;
          }
        });
        if (properties.key === "departmentCode") {
          this.formData.departmentCode = true;
        } else this.formData.assetCategoryCode = true;
      } catch (error) {
        console.error(error, "do not change properties of valueCombobox");
      }
    },
    /**
     * convet date mm/dd/yyyy => dd/mm/yyyy
     * @pram{date}
     * Author:dvphu (29/8/2023)
     * Modify:null
     */
    convertDateFormat(inputDate) {
      const parts = inputDate.split("/");
      if (parts.length !== 3) {
        return inputDate; // Trả về ngày tháng ban đầu nếu không đúng định dạng
      }
      const day = parts[1];
      const month = parts[0];
      const year = parts[2];
      return `${day}/${month}/${year}`;
    },
    /**
     * check chage valueDepreciationYear
     * Author:dvphu (29/8/2023)
     * Modify:null
     */
    changeDepreciationYear() {
      let number = this.valueDepreciationYear / this.valueCost;
      this.valueDepreciationRate = this.$MisaHelper.toFixed(number);
    },
    /**
     * check asset code
     * Author:dvphu (31/8/2023)
     * Modify:null
     */
    checkAssetCode(newValue) {
      let checkDuplicate = false; // if error =>true
      this.errorAssetCode = "";
      this.formData.assetCode = false;
      this.$store.state.assetApi.map((i) => {
        if (i.fixed_asset_code === newValue) {
          this.errorAssetCode = "Mã tài sản bị trùng lặp";
          checkDuplicate = true;
        }
      });
      if (!checkDuplicate) {
        if (!this.$MisaHelper.validationLengthInput(newValue, 5, 25)) {
          this.errorAssetCode =
            "Mã tài sản có ít nhất 5 và nhiều nhất 25 ký tự";
        } else {
          this.formData.assetCode = true;
        }
      }
    },
  },
};
</script>
<style scoped>
.wrapper__form-add {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(69, 71, 69, 0.5);
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.16);
  /* display: none; */
}
.form-add {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  flex-direction: column;
}
.form-add__container {
  width: 1200px;
  /* height: 700px; */
  background-color: #ffffff;
  border-radius: 4px;
  padding: 19px;
  padding-bottom: 0;
  box-sizing: border-box;
}
.form-add__container--title {
  font-weight: 700;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
}
.form-add__container--title p {
  margin: 0;
}
.title__close {
  width: 35px;
  height: 35px;
  cursor: pointer;
}
.title__close:hover{
  filter: brightness(70%);
  background: white;
}
.title__close:hover {
  filter: brightness(130%);
}
.form-add__container--asset-name {
  display: grid;
  grid-template-columns: 375px auto;
  gap: 19px;
}
.form-add__container--data {
  padding-top: 19px;
  display: grid;
  grid-template-columns: 375px 375px 375px;
  gap: 19px;
}
.form-add__container--date {
  padding-top: 19px;
  display: grid;
  grid-template-columns: 375px 375px;
  padding-right: 273px;
  gap: 19px;
}
.form-add__container--btn {
  width: 1200px;
  /* padding: 13px 19px; */
  margin: 40px -19px 0 -19px;
  padding: 19px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  gap: 19px;
  background-color: #dbe5e7;
  border-radius: 4px;
}
.input-not__content {
  background-color: #f4f7ff;
  border-radius: 2.5px;
  border: 1px solid #afafaf;
  height: 36px;
  overflow: hidden;
  padding: 0 12px;
  box-sizing: border-box;
  width: 100%;
  outline: none;
  margin-bottom: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 13.3333px;
}
</style>
