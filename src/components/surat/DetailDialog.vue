<template>
  <app-modal v-if="show" width="75%">
    <v-card>
      <v-card-title>Detail Surat</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="7">
            <iframe
              v-if="previewURL"
              style="position: relative; min-height: 400px; width: 100%"
              :src="previewURL"
              frameborder="0"
              scrolling="no"
            ></iframe>
            <span v-else>Belum mengunggah file</span>
          </v-col>
          <v-col cols="12" md="5">
            <span class="text-body-1 font-weight-medium">{{
              surat.nomor_surat
            }}</span
            ><br />
            <span v-for="(value, key) in surat.detail" :key="key">
              <span v-if="!checkExluded(key) && checkIncluded(key)">
                <span style="display: inline-block; width: 10.5em">{{
                  styleWords(key)
                }}</span>
                : <a v-if="key === 'file'" :href="value" v-text="value"></a
                ><span
                  v-else-if="key === 'disposisi' || key === 'nama_ar'"
                  v-text="splitWords(value)"
                ></span
                ><span v-else v-text="value"></span><br /> </span
            ></span>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-row no-gutters justify="end">
          <v-col cols="6" md="4" class="mx-2"
            ><app-button
              text="close"
              color="primary lighten-2"
              @clicked="hideDialog"
            ></app-button
          ></v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </app-modal>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import AppButton from "@/utils/AppButton.vue";
import AppModal from "@/utils/AppModal.vue";
import Vue from "vue";
import { mapActions, mapState } from "vuex";
export default Vue.extend({
  components: { AppModal, AppButton },
  computed: mapState("detail", ["show", "surat", "previewURL", "keys"]),
  methods: {
    checkExluded(key) {
      const exls = ["id", "file_id", "nomor_surat"];
      return exls.includes(key);
    },
    checkIncluded(key) {
      return this.keys.includes(key);
    },
    splitWords(key: string) {
      return key.replaceAll(",", ", ");
    },
    styleWords(key: string) {
      return key.replaceAll("_", " ").toUpperCase();
    },
    ...mapActions("detail", ["hideDialog"]),
  },
});
</script>
