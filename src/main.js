import { createApp } from "vue";
import App from "./App.vue";
import MisaLaput from "./components/base/laput/MisaLaput.vue";
import MisaButton from "./components/base/button/MisaButton.vue";
import MisaCombobox from "./components/base/combobox/MisaCombobox.vue";
import MisaHelper from "./js/MisaHelper";
import MisaResource from "./js/MisaResource";
import MisaEnum from "./js/MisaEnum";
import store from "./js/store"; // Import store từ tệp store.js
import * as ApiConfig from "./js/ApiConfig.js"; // apiConfig
import router from "./router/router"; //router
const app = createApp(App);
app.use(store); // use store
app.use(router); //use router
app.component("m-laput", MisaLaput);
app.component("m-btn", MisaButton);
app.component("m-combobox", MisaCombobox);

app.config.globalProperties.$MisaHelper = MisaHelper;
app.config.globalProperties.$MisaResource = MisaResource;
app.config.globalProperties.$MisaEnum = MisaEnum;
app.config.globalProperties.$ApiConfig = ApiConfig;


app.mount("#app");
