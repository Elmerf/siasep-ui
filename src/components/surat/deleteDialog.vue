<template>
  <app-modal v-if="show">
    <v-card>
      <v-card-title>Delete Surat?</v-card-title>
      <v-card-text>
        <span
          >Anda akan menghapus surat dengan Nomor Surat
          <b>{{ nomor_surat }}</b></span
        >
      </v-card-text>
      <v-card-actions>
        <v-row no-gutters justify="end">
          <v-col cols="6" md="4" class="mx-2"
            ><app-button
              text="Delete"
              color="red darken-2"
              @clicked="deleteSurat"
            ></app-button
          ></v-col>
          <v-col cols="6" md="4" class="mx-2"
            ><app-button
              text="Cancel"
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
  computed: mapState("delete", ["show", "nomor_surat"]),
  methods: mapActions("delete", ["hideDialog", "deleteSurat"]),
});
</script>
