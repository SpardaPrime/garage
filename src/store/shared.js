export default {
  state: {
    loading: false,
    error: null,
    success: false,
    loadHomePage: false,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setSuccess(state, payload) {
      state.success = payload;
    },
    clearAll(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    loadHomePage(state, payload) {
      state.loadHomePage = payload;
    }
  },
  actions: {
    setLoading({
      commit
    }, payload) {
      commit("setLoading", payload);
    },
    setError({
      commit
    }, payload) {
      commit("setError", payload);
    },
    clearError({
      commit
    }) {
      commit("clearError");
    },
    setSuccess({
      commit
    }, payload) {
      commit("setSuccess", payload);
    }
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    success(state) {
      return state.success;
    },
    loadHomePage(state) {
      return state.loadHomePage;
    }
  }
};
