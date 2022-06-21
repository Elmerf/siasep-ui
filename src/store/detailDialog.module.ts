import Vue from "vue";

const detailModule = {
  namespaced: true,
  state: {
    keys: [],
    surat: {},
    previewURL: "",
    show: false,
  },
  mutations: {},
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    showDialog({ state, rootState }: any, surat): void {
      rootState.showModal = true;
      state.surat = {
        ...surat,
        detail: {
          tanggal_penelitian: surat.detail.tanggal_surat,
          tanggal_ba: surat.detail.tanggal_surat,
          ...surat.detail,
        },
      };
      state.show = true;
      Vue.axios
        .get(`/surat/preview?nomor_surat=${surat.nomor_surat}`)
        .then((res) => {
          if (typeof res.data !== "string") {
            state.previewURL = "";
            return;
          }
          state.previewURL = res.data;
        })
        .catch((err) => console.log(err));
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    hideDialog({ state, rootState }: any): void {
      rootState.showModal = false;
      state.show = false;
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    setKeys({ state }, keys: string[]): void {
      state.keys = keys;
    },
  },
};

export default detailModule;
