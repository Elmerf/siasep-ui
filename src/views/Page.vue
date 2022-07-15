<template>
  <v-container fluid>
    <div class="d-flex">
      <v-icon v-if="category === 'masuk'">mdi-email-receive</v-icon>
      <v-icon v-else>mdi-email-send</v-icon>
      <h2 class="ml-2">{{ title }}</h2>
    </div>
    <v-divider></v-divider>
    <DataCRUD />
    <app-modal v-if="$store.state.showForm || editShow">
      <surat-form></surat-form>
    </app-modal>
    <app-modal v-if="$store.state.showExport" width="30%">
      <v-card>
        <v-card-title>Export Excel</v-card-title>
        <v-card-text>
          <v-select
            label="Pilih Tahun"
            dense
            v-model="year"
            :items="yearList"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-row no-gutters justify="end">
            <v-col cols="4" class="mx-2">
              <app-button
                color="green lighten-2"
                text="Export"
                @clicked="exportToExcel(year)"
              ></app-button>
            </v-col>
            <v-col cols="4">
              <app-button
                color="secondary lighten-2"
                text="close"
                @clicked="closeExcelExport"
              ></app-button>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </app-modal>
    <delete-dialog></delete-dialog>
    <detail-dialog></detail-dialog>
  </v-container>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Vue from "vue";
import { capitalizeEveryFirstLetter } from "@/utils/capitalizeEveryFirstLetter";
import { mapActions, mapState } from "vuex";

const DataCRUD = () => import("@/components/DataCRUD.vue");
const AppModal = () => import("@/utils/AppModal.vue");
const SuratForm = () => import("@/components/surat/SuratForm.vue");
const AppButton = () => import("@/utils/AppButton.vue");
const DeleteDialog = () => import("@/components/surat/deleteDialog.vue");
const DetailDialog = () => import("@/components/surat/DetailDialog.vue");

export default Vue.extend({
  name: "PageView",
  components: {
    DataCRUD,
    AppModal,
    SuratForm,
    AppButton,
    DeleteDialog,
    DetailDialog,
  },
  data() {
    return {
      show: false,
      year: new Date().getFullYear(),
    };
  },
  computed: {
    ...mapState("edit", {
      editShow: "show",
    }),
    title() {
      let text = this.$route.path.split(/\/|-/g).splice(1);
      if (text[text.length - 1] === "pph") text[text.length - 1] = "PPh";
      const title = text.join(" ");
      return capitalizeEveryFirstLetter(title);
    },
    category() {
      let text: string[] = this.$route.path.split(/\/|-/g).splice(1);
      return text[1].toLowerCase();
    },
    yearList() {
      let arr: number[] = [];
      const MIN_YEAR = 2020;
      const NOW = new Date().getFullYear();

      for (let i = 0; i <= NOW - MIN_YEAR; i++) {
        arr.push(MIN_YEAR + i);
      }

      return arr;
    },
  },
  methods: {
    ...mapActions(["closeExcelExport"]),
    exportToExcel(year) {
      const path = this.$route.fullPath;
      window.open(`https://api.siasep.my.id${path}/excel?year=${year}`);
      this.$store.dispatch("closeExcelExport");
    },
  },
});
</script>
