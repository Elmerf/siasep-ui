<template>
  <v-form ref="form" class="mt-2">
    <v-row>
      <v-col cols="12" md="6">
        <!-- TODO: otomatis -->
        <v-text-field label="Nomor Surat"></v-text-field>
      </v-col>
      <v-col cols="12" md="6"
        ><v-text-field label="Tanggal Surat"></v-text-field
      ></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field label="Nama WP"></v-text-field>
      </v-col>
      <v-col cols="12" md="6"><v-text-field label="NPWP"></v-text-field></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field label="Perihal"></v-text-field>
      </v-col>
      <!-- TODO: Autocomplete -->
      <v-col cols="12" md="6"
        ><v-text-field label="Nama AR"></v-text-field
      ></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-textarea label="Keterangan"></v-textarea>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
