import firebase from "firebase";

class Order {
  constructor({
    adId,
    ownerId,
    id = null,
    done = false,
    title
  }) {

    this.adId = adId;
    this.ownerId = ownerId;
    this.id = id;
    this.done = done;
    this.title = title;
  }
}

export default {
  state: {
    orders: [],
    userOrdersID: "",
    loadingOrder: false,
    successOrder: false,
    errorOrder: false,
    addedCar: false,
  },
  mutations: {
    claerAllEventsOrder(state) {
      state.loadingOrder = false;
      state.successOrder = false;
      state.errorOrder = false;
      state.addedCar = false;

    },
    setAddedCar(state, payload) {
      state.addedCar = payload;
    },
    createOrder(state, payload) {
      state.orders = payload;
    },
    setUserOrdersId(state, payload) {
      state.userOrdersID = payload;
    },
    clearOrders(state) {
      state.orders = [];
    },
    setloadingOrder(state, payload) {
      state.loadingOrder = payload;
    },
    setsuccessOrder(state, payload) {
      state.successOrder = payload;
    },
    seterrorOrder(state, payload) {
      state.errorOrder = payload;
    },
  },
  actions: {
    createOrder({
      commit,
      state
    }, payload) {
      commit('setloadingOrder', true);
      const order = new Order(payload);

      firebase
        .database()
        .ref(`/users/${state.userOrdersID}/orders`)
        .push(order)
        .then(res => {
          commit('setloadingOrder', false);
          commit('setsuccessOrder', true);


        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchOrders({
      commit,
      state
    }) {
      const resultOrders = [];
      firebase
        .database()
        .ref(`/users/${state.userOrdersID}/orders`)
        .once("value")
        .then(res => res.val())
        .then(res => {

          if (!res) return;
          Object.keys(res).forEach(key => {
            const order = res[key];
            resultOrders.push({
              ...new Order(order),
              id: key
            });
          });

          commit("createOrder", resultOrders);
        })
        .catch(err => console.log(err));
    },
    markOrederDone({
      state
    }, {
      id,
      done
    }) {
      firebase
        .database()
        .ref(`/users/${state.userOrdersID}/orders`)
        .child(id)
        .update({
          done
        });
    }
  },
  getters: {
    orders(state) {
      return state.orders.sort((a, b) => (a.done ? +1 : -1));
    },
    loadingOrder(state) {
      return state.loadingOrder;
    },
    successOrder(state) {
      return state.successOrder;
    },
    errorOrder(state) {
      return state.errorOrder;
    },
    addedCar(state) {
      return state.addedCar;
    }
  }
};
