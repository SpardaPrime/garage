import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);
const opts = {
  theme: {
    dark: true
  },
  themes: {
    dark: {
      primary: "#263238",
      secondary: "#424242",
      accent: "#FF4081",
      error: "#FF5252",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FB8C00"
    }
  },
  icons: {
    iconfont: "mdiSvg" // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  }
};

export default new Vuetify(opts);
