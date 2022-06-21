const snackbarModule = {
  namespaced: true,
  state: {
    msg: "",
    color: "",
    show: false,
  },
  mutations: {
    hideSnackbar(state: { show: boolean }): void {
      state.show = false;
    },
    showSnackbar(
      state: { show: boolean; msg: string; color: string },
      payload: { msg: string; color: string }
    ): void {
      state.show = true;
      state.msg = payload.msg;
      state.color = payload.color;
    },
  },
  actions: {},
  getters: {},
};

export default snackbarModule;
