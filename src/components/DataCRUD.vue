<template>
  <v-row class="mt-2">
    <v-col cols="12" md="3">
      <v-text-field
        color="rgba(0, 0, 0, 0.87)"
        prepend-inner-icon="mdi-file-search-outline"
        clearable
        v-model="searchQuery"
        label="Cari Surat"
        outlined
        rounded
        dense
        hint="Nomor Surat, Perihal, Nama AR"
        @keyup="searchSurat"
      >
      </v-text-field>
      <app-button
        text="Tambah Surat"
        icon="mdi-email-plus-outline"
        @clicked="openForm"
      ></app-button
      ><app-button
        text="Export Excel"
        color="green darken-1"
        icon="mdi-microsoft-excel"
        class="my-2"
        @clicked="openExcelExport"
      ></app-button>
    </v-col>
    <v-col cols="12" md="9">
      <v-progress-circular
        indeterminate
        color="primary"
        v-if="isLoading"
      ></v-progress-circular>
      <div v-if="items.length > 0">
        <v-card rounded="xl" elevation="4">
          <v-list>
            <v-list-item-group v-model="model">
              <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-avatar>
                  <v-icon class="primary lighten-3">mdi-file-check</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="item.nomor_surat"
                  ></v-list-item-title>
                  <v-list-item-subtitle>
                    Perihal: {{ item.detail.perihal }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text>
                    Terakhir Diperbaharui:
                    {{ formatDate(item.updatedAt) }}</v-list-item-action-text
                  >
                  <data-tooltip :surat="item"></data-tooltip>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
        <v-pagination
          v-model="page"
          class="my-4"
          :length="itemLength"
          :total-visible="7"
        ></v-pagination>
      </div>
      <p v-if="items.length === 0 && !isLoading" class="text-center body-1">
        Tidak ada data
      </p>
    </v-col>
  </v-row>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Vue from "vue";
import AppButton from "@/utils/AppButton.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { formatDate } from "@/utils/formatDate";
import DataTooltip from "./surat/DataTooltip.vue";
import debounce from "lodash.debounce";
import getSuratKeys from "@/utils/suratKeys";

export default Vue.extend({
  name: "DataCRUD",
  data() {
    return {
      searchQuery: "",
      model: -1,
      page: 1,
    };
  },
  components: { AppButton, DataTooltip },
  computed: {
    ...mapState(["items", "itemLength", "isLoading"]),
  },
  async created() {
    this.__created();
    this.setKeys(getSuratKeys());
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchSurat: debounce(function (this: any) {
      this.getItems(this.searchQuery);
    }, 1000),
    async __created() {
      this.clearItems();
      this.setIsLoading();
      if (this.$route.query.page)
        this.page = parseInt(this.$route.query.page as string);
      try {
        this.getItems();
      } catch (err) {
        console.log(err);
      }
    },
    formatDate,
    ...mapMutations(["setIsLoading", "clearItems"]),
    ...mapMutations("snackbar", ["showSnackbar"]),
    ...mapActions("detail", ["setKeys"]),
    ...mapActions(["getItems", "openForm", "openExcelExport"]),
  },
  watch: {
    searchQuery() {
      this.searchSurat();
    },
    page(newPage) {
      this.$router.replace({ query: { page: newPage } });
      this.__created();
    },
  },
});
</script>
