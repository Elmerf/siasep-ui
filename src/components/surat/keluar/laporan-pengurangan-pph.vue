<template>
  <div>
    <v-row>
      <v-col cols="12" md="6"
        ><date-picker
          label="Tanggal Surat"
          v-model="surat.tanggal_surat"
        ></date-picker
      ></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          label="Nama WP"
          dense
          v-model="surat.nama_wp"
          :rules="rules"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6"
        ><v-text-field
          label="NPWP"
          dense
          v-model="surat.npwp"
          :rules="rules"
        ></v-text-field
      ></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6"
        ><v-text-field
          label="Perihal"
          dense
          v-model="surat.perihal"
          :rules="rules"
        ></v-text-field
      ></v-col>
      <!-- TODO: Autocomplete -->
      <v-col cols="12" md="6"
        ><v-select
          label="Nama AR"
          dense
          multiple
          v-model="surat.nama_ar"
          :items="listAR"
          :rules="peRule"
        ></v-select
      ></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-textarea
          label="Keterangan"
          dense
          no-resize
          rows="2"
          v-model="surat.keterangan"
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="6">
        <v-file-input
          accept="application/pdf"
          v-model="surat.file_surat"
          label="File Surat"
          dense
          :rules="fileRule"
        ></v-file-input>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
const DatePicker = () => import("@/utils/DatePicker.vue");

import { checkExtensions } from "@/utils/allowedExtensions";
import { LIST_AR } from "@/utils/listAR";
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  data() {
    return {
      listAR: LIST_AR,
      peRule: [(v: string[]) => v.length > 0 || "Mohon untuk diisi"],
      rules: [(v: string) => !!v || "Mohon untuk diisi"],
    };
  },
  components: { DatePicker },
  computed: {
    fileRule() {
      return [(v: File) => checkExtensions(v) || "File tidak valid!"];
    },
    ...mapState(["surat"]),
  },
  created() {
    this.surat.jenis = "LAP-PPH";
  },
});
</script>
