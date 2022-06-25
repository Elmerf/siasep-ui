<template>
  <div>
    <v-row>
      <v-col cols="12" md="6">
        <!-- TODO: otomatis -->
        <date-picker
          label="Tanggal Surat"
          v-model="surat.tanggal_surat"
        ></date-picker>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="Nama WP"
          dense
          v-model="surat.nama_wp"
          :rules="rules"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          label="NPWP"
          dense
          v-model="surat.npwp"
          :rules="rules"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6"
        ><v-text-field
          label="Jenis Dokumen"
          dense
          v-model="surat.jenis_dokumen"
          :rules="rules"
        ></v-text-field
      ></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          label="Nilai Data"
          dense
          v-model="surat.nilai_data"
          prefix="Rp."
          :rules="rules"
        ></v-text-field>
      </v-col>
      <!-- TODO: Autocomplete -->
      <v-col cols="12" md="6"
        ><v-select
          label="Nama AR"
          dense
          multiple
          v-model="surat.nama_ar"
          :items="listAR"
          :rules="arRule"
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
import { LIST_AR } from "@/utils/listAR";
import { checkExtensions } from "@/utils/allowedExtensions";
import Vue from "vue";
import { mapState } from "vuex";

const DatePicker = () => import("@/utils/DatePicker.vue");

export default Vue.extend({
  components: {
    DatePicker,
  },
  data() {
    return {
      rules: [(v: string) => !!v || "Mohon untuk diisi"],
      listAR: LIST_AR,
      arRule: [(v: string[]) => v.length > 0 || "Mohon untuk diisi"],
    };
  },
  computed: {
    fileRule() {
      return [(v: File) => checkExtensions(v) || "File tidak valid!"];
    },
    ...mapState(["surat"]),
  },
  created() {
    this.surat.jenis = "ALKET";
  },
});
</script>
