const editModule = {
  namespaced: true,
  state: {
    show: false,
  },
  mutations: {},
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    showDialog({ state, rootState }: any, surat): void {
      rootState.showModal = true;
      rootState.surat = {
        ...surat.detail,
        jenis: surat.nomor_surat.split("/")[0].split("-")[0],
        disposisi: surat.detail?.disposisi.split(",") as string[],
        nama_ar: surat.detail?.nama_ar.split(","),
        file_surat: null,
        id: surat.id,
      };
      state.show = true;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    hideDialog({ state, rootState }: any): void {
      rootState.showModal = false;
      state.show = false;
    },
  },
};

export default editModule;
