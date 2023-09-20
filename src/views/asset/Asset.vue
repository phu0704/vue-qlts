<template lang="">
  <div>
    <main class="content">
      <div class="function">
        <div class="function__search">
          <input
            class="input-search"
            type="text"
            placeholder="Tìm kiếm tài sản"
            v-model="valueSearch"
          />

          <m-combobox
            :iconFilter="true"
            :optionsApi="$ApiConfig.FIXED_ASSET_CATEGORY"
            option="fixedAssetCategoryName"
            select="Loại tài sản"
            @handelChooseOption="handelChooseOption"
            keyCombobox="fixedAssetCategoryName"
          />
          <m-combobox
            :iconFilter="true"
            :optionsApi="$ApiConfig.DEPARTMENT"
            option="departmentName"
            select="Bộ phận sử dụng"
            @handelChooseOption="handelChooseOption"
            keyCombobox="departmentName"
          />
        </div>
        <div class="function__add">
          <m-btn
            classBtn="btn-add"
            @click="formAddShow = true"
            contentBtn="+ Thêm tài sản"
          >
          </m-btn>
          <m-btn classBtn="btn-export">
            <img src="../../assets/icon/main/XuatKhau.svg" alt="" />
          </m-btn>
          <m-btn classBtn="btn-delete" @click="deleteAsset">
            <img src="../../assets/icon/main/delete.svg" alt="" />
          </m-btn>
        </div>
      </div>
      <div class="table">
        <div class="table__container">
          <div class="thead">
            <div class="content-center">
              <input type="checkbox" @change="setAllBooleanArray" />
            </div>
            <div>STT</div>
            <div>Mã tài sản</div>
            <div>Tên tài sản</div>
            <div>Loại tài sản</div>
            <div>Bộ phận sử dụng</div>
            <div>Số lượng</div>
            <div>Nguyên giá</div>
            <div>HM/KH lũy kế</div>
            <div>Giá trị còn lại</div>
            <div>Chức năng</div>
          </div>
          <div
            class="row"
            v-for="(asset, index) in assets"
            :key="asset.id"
            @mouseover="mouseArray[index] = true"
            @mouseout="mouseArray[index] = false"
          >
            <div class="content-center">
              <input
                type="checkbox"
                :checked="booleanArray[index]"
                @change="booleanArray[index] = !booleanArray[index]"
              />
            </div>
            <div>
              <p>{{ index + 1 }}</p>
            </div>
            <div>
              <p>{{ asset.fixedAssetCode }}</p>
            </div>
            <div>
              <p>{{ asset.fixedAssetName }}</p>
            </div>
            <div>
              <p>{{ asset.fixedAssetCategoryName }}</p>
            </div>
            <div>
              <p>{{ asset.departmentName }}</p>
            </div>
            <div class="content-end quantity">
              <p>{{ asset.quantity }}</p>
            </div>
            <div class="content-end original-price">
              <p>{{ $MisaHelper.formatNumberWithDots(asset.cost) }}</p>
            </div>
            <div class="content-end accumulated">
              <p>{{ $MisaHelper.formatNumberWithDots(asset.accumulated) }}</p>
            </div>
            <div class="content-end residual-value">
              <p>
                {{ $MisaHelper.formatNumberWithDots(asset.residualValue) }}
              </p>
            </div>
            <div class="content-center" v-show="mouseArray[index]">
              <img
                src="../../assets/icon/main/edit.svg"
                alt=""
                @click="formAddShow = true"
              />
              <img src="../../assets/icon/main/copy.svg" alt="" />
            </div>
          </div>
          <footer class="footer">
            <div class="footer__left">
              <div class="footer__left--total">
                <span>Tổng số: </span>
                <span class="text-bold">{{ assets.length }}</span>
                <span> bản ghi</span>
              </div>
              <div class="footer__left--select">
                <select>
                  <option value="Loaitaisan">20</option>
                  <option value="saab">1</option>
                  <option value="mercedes">2</option>
                  <option value="audi">3</option>
                </select>
              </div>
              <div class="footer__left--pagination">
                <span> &lt; 1 2 ... 10 ></span>
              </div>
            </div>
            <div class="footer__right">
              <div class="footer__right--price">
                <p class="content-end quantity">{{ countQuantity() }}</p>
                <p class="content-end original-price">{{ countCost() }}</p>
                <p class="content-end accumulated">{{ countAccumulated() }}</p>
                <p class="content-end residual-value">
                  {{ countResidualValue() }}
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </main>
    <TheFormDetail v-if="formAddShow" @closeFormAdd="closeFormAdd" />
    <MisaDialog
      v-if="error.message"
      @handelCancel="handelCancel"
      iconClass="warning"
      :content="error.message"
      :btnWhiteContent="$MisaResource['VN'].ok"
      :errorCode="error.code"
    />
  </div>
</template>
<script>
import axios from "axios";
import TheFormDetail from "../../components/layout/form-detail/TheFormDetail.vue";
import MisaDialog from "../../components/base/dialog/MisaDialog.vue";
export default {
  name: "AssetIndex",
  data() {
    return {
      assets: [{}],
      booleanArray: [],
      mouseArray: [],
      rowActive: false,
      formAddShow: false,
      valueSearch: "",
      valueCombobox: {
        assetCategoryName: "",
        departmentName: "",
      },
      error: {
        code: 0,
        message: "",
      },
    };
  },
  components: {
    TheFormDetail,
    MisaDialog,
  },
  created() {
    /*Get api table ASSETS
    CreatedBy: dvphu 28/8/2023
    Modify:dvphu 30/8/2023
    */
    axios
      .get(this.$ApiConfig.FIXED_ASSETS)
      .then((response) => {
        this.assets = response.data;
        this.booleanArray = new Array(this.assets.length).fill(false);
        this.mouseArray = new Array(this.assets.length).fill(false);
        this.$store.commit("changeAssetApi", response.data);
      })
      .catch((error) => {
        this.$store
          .dispatch("checkApiError", error.response)
          .then((response) => {
            // Xử lý thành công
            this.error.code = response.errorCode;
            this.error.message = response.errorMessage;
          });
      });
  },
  mounted() {
    //
  },
  watch: {
    /**
     * check chage valueSearch
     * Author:dvphu (27/8/2023)
     * Modify:null
     */
    valueSearch(newValue) {
      let searchString = newValue;
      this.assets = this.$store.state.assetApi.filter((obj) => {
        return (
          obj.fixedAssetName
            .toLowerCase()
            .startsWith(searchString.toLowerCase()) ||
          obj.fixedAssetCode
            .toLowerCase()
            .startsWith(searchString.toLowerCase())
        );
      });
    },
  },
  methods: {
    /**
     * change count in store
     * Author:dvphu (24/8/2023)
     * Modify:null
     */
    countChange() {
      this.$store.commit("increment");
    },
    /**
     * set all boolean array reverse
     * Author:dvphu (24/8/2023)
     * Modify:null
     */
    setAllBooleanArray() {
      this.booleanArray = this.booleanArray.map((i) => (i = !i));
    },
    /**
     * count quantity
     * Author:dvphu (24/8/2023)
     * Modify:null
     */
    countQuantity() {
      return this.assets.reduce((total, i) => total + i.quantity, 0);
    },
    /**
     * count cost
     * Author:dvphu (25/8/2023)
     * Modify:null
     */
    countCost() {
      let totalCost = this.assets.reduce((total, i) => total + i.cost, 0);
      return this.$MisaHelper.formatNumberWithDots(totalCost);
    },
    /**
     * count accumulated
     * Author:dvphu (25/8/2023)
     * Modify:null
     */
    countAccumulated() {
      let totalAccumulated = this.assets.reduce(
        (total, i) => total + i.accumulated,
        0
      );
      return this.$MisaHelper.formatNumberWithDots(totalAccumulated);
    },
    /**
     * count residual_value
     * Author:dvphu (25/8/2023)
     * Modify:null
     */
    countResidualValue() {
      let totalResidualValue = this.assets.reduce(
        (total, i) => total + i.residualValue,
        0
      );
      return this.$MisaHelper.formatNumberWithDots(totalResidualValue);
    },
    /**
     * close form detail
     * Author:dvphu (20/8/2023)
     * Modify:null
     */
    closeFormAdd() {
      this.formAddShow = false;
    },
    /**
     * select combobox
     * @pram{data}
     * Author:dvphu (20/8/2023)
     * Modify:null
     */
    handelChooseOption(properties) {
      console.log("🚀 ~ file: Asset.vue:305 ~ handelChooseOption ~ properties:", properties)
      this.$store.state.assetApi.forEach(i=>{
   
        console.log("🚀 ~ file: Asset.vue:308 ~ handelChooseOption ~ i.fixedAssetCategoryName:", i.fixedAssetCategoryName)
      })
      try {
        this.valueCombobox[properties.key] = properties.value;
        if (properties.key === "fixedAssetCategoryName") {
          this.assets = this.$store.state.assetApi.filter((obj) => {
            return obj.fixedAssetCategoryName
              .toLowerCase()
              .startsWith(this.valueCombobox[properties.key].toLowerCase());
          });
        } else {
          this.assets = this.$store.state.assetApi.filter((obj) => {
            return obj.departmentName
              .toLowerCase()
              .startsWith(this.valueCombobox[properties.key].toLowerCase());
          });
        }
      } catch (error) {
        console.error(error, "do not change properties of valueCombobox");
      }
    },
    /**
     * cancel form
     * Author:dvphu (20/8/2023)
     * Modify:null
     */
    handelCancel() {
      this.error.message = "";
    },
    /**
     * event: delete asset select
     * Author:dvphu (07/9/2023)
     * Modify:null
     */
    deleteAsset() {
      this.booleanArray.forEach((i, index) => {
        console.log("🚀 ~ file: Asset.vue:326 ~ deleteAsset ~ i:", i, index);
      });
    },
  },
};
</script>
<style scoped>
/* .wrapper__container--main {
  width: 95vw;
  width: 83vw;
  box-sizing: border-box;
  transition: 0.3s;
} */
.content {
  background-color: #f4f7ff;
  width: 95.52vw;
}
.function {
  padding: 10px 19px 0 19px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.function__add {
  display: flex;
  gap: 11px;
}
.function__search {
  display: flex;
  gap: 10px;
}
.table {
  padding: 10px 19px;
  font-size: 17px;
}
.table .table__container {
  background-color: #ffffff;
  border-radius: 3.5px;
  border: 1px solid #afafaf;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
  overflow: hidden;
}
.table__container p {
  margin: 0;
}
.thead {
  background-color: #f5f5f5;
  align-items: center;
  height: 36px;
  font-weight: 700;
  display: grid;
  grid-template-columns: 3.9vw 3.7vw 13vw 12vw 12vw 13vw 6.5vw 7.4vw 9vw 7vw 6vw;
  border-bottom: 1px solid #afafaf;
}
.row {
  display: grid;
  align-items: center;
  height: 36px;
  grid-template-columns: 3.9vw 3.7vw 13vw 12vw 12vw 13vw 6.5vw 7.4vw 9vw 7vw 6vw;
  border-bottom: 1px solid #afafaf;
}
.row:hover {
  background-color: rgba(26, 164, 200, 0.2);
}
.content-center {
  margin: 0 auto;
}
.content-end {
  display: flex;
  justify-content: flex-end;
}
.quantity {
  padding-right: 3vw;
}
.original-price {
  padding-right: 3vw;
}
.accumulated {
  padding-right: 3vw;
}
.residual-value {
  padding-right: 1vw;
}
.footer {
  display: flex;
  justify-content: space-between;
  padding-left: 19px;
  height: 38px;
}
.footer__left {
  display: flex;
  gap: 38px;
  align-items: center;
}
.footer__left--select select {
  height: 25px;
  width: 60px;
  background-color: #ffffff;
  border-radius: 2.625px;
  border: 1px solid #afafaf;
  width: 59px;
  height: 25px;
  overflow: hidden;
}
.footer__right {
  display: flex;
  align-items: center;
}
.footer__right--price {
  display: grid;
  grid-template-columns: 6.5vw 7.4vw 9vw 7vw 5.4vw;
  font-weight: 700;
  padding-right: 0.5vw;
}
.text-bold {
  font-weight: 700;
}
</style>
