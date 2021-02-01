import firebase from "firebase";
import regeneratorRuntime from "regenerator-runtime";

export default {
  state: {
    user: null
  },
  actions: {
    registerUser({
      commit
    }, {
      email,
      password
    }) {
      commit("clearAll");
      commit("setLoading", true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          commit("setUser", user);
          commit("setLoading", false);
          commit("setSuccess", true);
        })
        .catch(error => {
          commit("setSuccess", false);
          commit("setLoading", false);
          commit("setError", error.message);
        });
    },
    loginUser({
      commit
    }, {
      email,
      password
    }) {
      commit("clearAll");
      commit("setLoading", true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          commit("setUser", user);
          commit("setLoading", false);
          commit("setSuccess", true);
        })
        .catch(error => {
          commit("setSuccess", false);
          commit("setLoading", false);
          commit("setError", error.message);
        });
    },
    autoLoginUser({
      commit
    }, payload) {
      commit("setUser", payload);
    },
    userLogout({
      commit
    }, payload) {
      firebase.auth().signOut();
      commit("userLogout", payload);
    }
  },
  getters: {
    user({
      user
    }) {
      return user;
    },
    userId({
      user
    }) {
      if (user) {
        return user.uid;
      }
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    userLogout(state, payload) {
      state.user = payload;
    }
  }
};
