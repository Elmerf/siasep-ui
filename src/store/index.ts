import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import snackbarModule from "./snackbar.module";
import deleteModule from "./deleteDialog.module";
import detailModule from "./detailDialog.module";
import editModule from "./editDialog.module";

Vue.use(Vuex);

function intializeSurat() {
  return {
    id_nadine: "",
    tanggal_terima: "",
    tanggal_surat: "",
    nomor_surat: "",
    nama_pengirim: "",
    perihal: "",
    nama_wp: "",
    nama_ar: [],
    disposisi: [],
    nilai_data: 0,
    jenis_dokumen: "",
    jenis: "",
    keterangan: "",
    file_surat: null,
  };
}

export default new Vuex.Store({
  state: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: [] as any[],
    isLoading: false,
    itemLength: -1,
    resetForm: false,
    validForm: false,
    showModal: false,
    showForm: false,
    showExport: false,
    showDetail: false,
    showEdit: false,
    surat: intializeSurat(),
  },
  mutations: {
    addItem(state, data) {
      state.items.unshift(data);
    },
    setShowModal(state) {
      state.showModal = true;
    },
    unsetShowModal(state) {
      state.showModal = false;
    },
    setValidForm(state) {
      state.validForm = true;
    },
    unsetValidForm(state) {
      state.validForm = false;
    },
    clearSurat(state) {
      state.surat = intializeSurat();
    },
    setResetForm(state) {
      state.resetForm = true;
    },
    unsetResetForm(state) {
      state.resetForm = false;
    },
    setIsLoading(state) {
      state.isLoading = true;
    },
    unsetIsLoading(state) {
      state.isLoading = false;
    },
    clearItems(state) {
      state.items = [];
    },
  },
  actions: {
    getItems({ commit, state }, keyword) {
      const path = router.currentRoute.path;
      const { page } = router.currentRoute.query;
      Vue.axios
        .get(
          `${path}?page=${page ? page : 1}&keyword=${keyword ? keyword : ""}`
        )
        .then((respons) => {
          const { length, rows, msg } = respons.data;
          if (msg !== undefined) {
            router.go(0);
          }
          if (length !== undefined && rows !== undefined) {
            state.itemLength = length;
            state.items = rows;
          }
          commit("unsetIsLoading");
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
        });
    },
    closeForm({ commit, state, dispatch }) {
      state.showForm = false;
      dispatch("edit/hideDialog", { root: true });
      commit("unsetShowModal");
      commit("unsetResetForm");
      commit("clearSurat");
    },
    openForm({ commit, state }) {
      state.showForm = true;
      commit("setShowModal");
      commit("setResetForm");
    },
    openExcelExport({ commit, state }) {
      state.showExport = true;
      commit("setShowModal");
    },
    closeExcelExport({ commit, state }) {
      state.showExport = false;
      commit("unsetShowModal");
    },
  },
  modules: {
    snackbar: snackbarModule,
    delete: deleteModule,
    detail: detailModule,
    edit: editModule,
  },
});
