import { createStore } from "vuex";
import MisaResource from "./MisaResource";
import axios from "axios";
const store = createStore({
  state() {
    return {
      assetApi: [{}],
      count: 0,
      name: "dvphu",
      assetCodeDefaul: "00001",
    };
  },
  mutations: {
    /*
    increment count
    @param{count}
    CreatedBy:dvphu 25/8/2023
    Modify:null
    */
    increment(state) {
      state.count++;
    },
    /*
    change assetApi
    @param{assetApi}
    CreatedBy:dvphu 25/8/2023
    Modify:null
    */
    changeAssetApi(state, data) {
      state.assetApi = data;
    },
  },
  actions: {
    /*
    get api
    @param{string} url api
    CreatedBy:dvphu 07/9/2023
    Modify:null
    */
    getApiAssets() {
      return axios
        .get("http://localhost:3000/fixed_assets")
        .then((response) => {
          console.log("🚀 ~ file: store.js:44 ~ .then ~ response:", response)
          
          // this.assets = response.data;
          // this.booleanArray = new Array(this.assets.length).fill(false);
          // this.mouseArray = new Array(this.assets.length).fill(false);
          // this.$store.commit("changeAssetApi", response.data);
        })
        .catch((error) => {
          console.log("🚀 ~ file: store.js:52 ~ getApiAssets ~ error:", error)
          // this.checkApiError("checkApiError", error.response)
          //   .then((response) => {
          //     // Xử lý thành công
          //     this.error.code = response.errorCode;
          //     this.error.message = response.errorMessage;
          //   });
        });
    },
    /*
    check api error
    @param{obj}
    CreatedBy:dvphu 31/8/2023
    Modify:null
    */
    checkApiError(state, response) {
      let err = {
        errorCode: 0,
        errorMessage: "",
      };
      if (response) {
        if (response.status === 400) {
          err.errorCode = 400;
          err.errorMessage = MisaResource["VN"].error400;
        } else if (response.status === 401) {
          err.errorCode = 401;
          err.errorMessage = MisaResource["VN"].error401;
        } else if (response.status === 403) {
          err.errorCode = 403;
          err.errorMessage = MisaResource["VN"].error403;
        } else if (response.status === 404) {
          err.errorCode = 404;
          err.errorMessage = MisaResource["VN"].error404;
        } else if (response.status === 500) {
          err.errorCode = 500;
          err.errorMessage = MisaResource["VN"].error500;
        } else {
          err.errorCode = 0;
          err.errorMessage = MisaResource["VN"].errorDownloadData;
        }
      } else {
        err.errorCode = 0;
        err.errorMessage = MisaResource["VN"].errorConnectServer;
      }
      return err;
    },
  },
});

export default store;
