import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store/index';
import BuyModal from './components/shared/BuyModal.vue';
import firebaseConfig from './keys';

Vue.component('app-buy-modal', BuyModal);


new Vue({
  el: '#app',
  store,
  render: h => h(App),
  vuetify,
  router,
  created() {

    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user);
        this.$store.commit('setUserOrdersId', user.uid)
      }
    });

    this.$store.dispatch('fetchAds');

  }

})
