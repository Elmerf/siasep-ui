<template>
  <div>
    <v-row>
      <v-col cols="12" md="6">
        <date-picker
          label="Tanggal Terima"
          v-model="surat.tanggal_terima"
        ></date-picker>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="ID Nadine"
          counter="9"
          dense
          :rules="nadineRules"
          v-model="surat.id_nadine"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <date-picker
          label="Tanggal Surat"
          v-model="surat.tanggal_surat"
        ></date-picker>
      </v-col>
      <v-col cols="12" md="6"
        ><v-text-field
          label="Nomor Surat"
          dense
          v-model="surat.nomor_surat"
          :rules="rules"
        ></v-text-field
      ></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          label="Nama Pengirim"
          dense
          v-model="surat.nama_pengirim"
          :rules="rules"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6"
        ><v-text-field
          label="Perihal"
          dense
          v-model="surat.perihal"
          :rules="rules"
        ></v-text-field
      ></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          label="Nama WP"
          dense
          v-model="surat.nama_wp"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6"
        ><v-select
          label="Disposisi"
          dense
          multiple
          v-model="surat.disposisi"
          :items="disposisiList"
          :rules="disposisiRule"
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

type Rules = (value: string) => boolean | string;

import Vue from "vue";
import { checkExtensions } from "@/utils/allowedExtensions";
import { mapState } from "vuex";
export default Vue.extend({
  components: { DatePicker },
  data() {
    return {
      disposisiList: [
        "Eko Adi Nugroho",
        "Suwarti",
        "Irhamni",
        "Supriadi",
        "Dian Juwita Sari",
        "Yoshia Samosir",
        "Chika Andrani",
      ],
      rules: [(v: string) => !!v || "Mohon untuk diisi"] as Rules[],
      nadineRules: [
        (v: string) => v.length === 9 || "Jumlah digit tidak sesuai",
        (v: string) => !!v || "Mohon untuk diisi",
      ] as Rules[],
      disposisiRule: [(v: string[]) => v.length > 0 || "Mohon untuk diisi"],
    };
  },
  computed: {
    fileRule() {
      return [(v: File) => checkExtensions(v) || "File tidak valid!"];
    },
    ...mapState(["surat"]),
  },
});
</script>
