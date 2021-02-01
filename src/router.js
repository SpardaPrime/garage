import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home.vue';
import Ad from './components/Ads/Ad.vue';
import AdList from './components/Ads/AdList.vue';
import NewAd from './components/Ads/NewAd.vue';

import Login from './components/Auth/Login.vue';
import Registration from './components/Auth/Registration.vue';

import Order from './components/User/Order.vue';



Vue.use(VueRouter);

export default new VueRouter({
  routes: [{
      path: '/',
      name: '',
      component: Home
    },
    {
      path: '/ad/:id',
      props: true,
      name: 'ad',
      component: Ad
    },
    {
      path: '/list',
      name: 'list',
      component: AdList,
  
    },
    {
      path: '/new',
      name: 'mewAd',
      component: NewAd,
 

    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'reg',
      component: Registration
    },
    {
      path: '/orders',
      name: 'orders',
      component: Order,


    },
  ],
  mode: 'history'
})
