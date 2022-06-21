import Vue from "vue";
import store from "./index";

const deleteModule = {
  namespaced: true,
  state: {
    nomor_surat: "",
    show: false,
  },
  mutations: {},
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    showDialog({ state, rootState }: any, nomor: string): void {
      rootState.showModal = true;
      state.nomor_surat = nomor;
      state.show = true;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    hideDialog({ state, rootState }: any): void {
      rootState.showModal = false;
      state.nomor_surat = "";
      state.show = false;
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    deleteSurat({ commit, dispatch, state }: any): void {
      Vue.axios
        .delete(`/surat?nomor_surat=${state.nomor_surat}`)
        .then((res) => {
          commit(
            "snackbar/showSnackbar",
            {
              msg: res.data.msg,
              color: "success",
            },
            { root: true }
          );
          store.dispatch("getItems");
        })
        .catch((err) => {
          commit(
            "snackbar/showSnackbar",
            {
              msg: err,
              color: "error",
            },
            { root: true }
          );
          console.log(err);
        })
        .finally(() => {
          dispatch("hideDialog");
        });
    },
  },
  getters: {},
};

export default deleteModule;
