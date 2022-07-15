<template>
  <v-row>
    <v-col>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="getDetailSurat">
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </template>
        <span>Detail Surat</span>
      </v-tooltip>
    </v-col>
    <v-col>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            color="red lighten-1"
            @click="deleteSurat"
          >
            <v-icon color="red lighten-1">mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Hapus Entri Surat</span>
      </v-tooltip>
    </v-col>
    <v-col>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            color="primary lighten-1"
            @click="editDetailSurat"
          >
            <v-icon color="primary lighten-1">mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Ubah Detail Surat</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Vue from "vue";
import { mapActions } from "vuex";
export default Vue.extend({
  props: ["surat"],
  methods: {
    ...mapActions("delete", ["showDialog"]),
    ...mapActions("detail", {
      detailShow: "showDialog",
    }),
    ...mapActions("edit", {
      editShow: "showDialog",
    }),
    getDetailSurat() {
      this.detailShow(this.surat);
    },
    deleteSurat() {
      this.showDialog(this.surat.nomor_surat);
    },
    editDetailSurat() {
      this.editShow(this.surat);
    },
  },
});
</script>
