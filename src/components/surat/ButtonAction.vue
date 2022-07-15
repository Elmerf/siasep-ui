<template>
  <v-row no-gutters justify="end">
    <v-col cols="5" md="3" :class="$vuetify.breakpoint.mdAndUp ? 'mx-2' : ''">
      <app-button
        color="secondary lighten-2"
        text="close"
        @clicked="closeForm"
      ></app-button>
    </v-col>
    <v-spacer v-if="$vuetify.breakpoint.smAndDown"></v-spacer>
    <v-col cols="5" md="3" :class="$vuetify.breakpoint.mdAndUp ? 'mx-2' : ''">
      <app-button
        color="primary"
        text="submit"
        @clicked="submitForm"
        :valid="validForm"
      ></app-button>
    </v-col>
  </v-row>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const AppButton = () => import("@/utils/AppButton.vue");

import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
export default Vue.extend({
  components: { AppButton },
  methods: {
    submitForm() {
      if (this.validForm) {
        let dt = new FormData();
        for (const key of Object.keys(this.surat)) {
          dt.append(key, this.surat[key]);
        }
        this.showSnackbar({
          color: "info",
          msg: "Uploading...",
        });
        if (this.editShow) {
          this.axios
            .put(this.$route.path, dt)
            .then(() => {
              this.showSnackbar({
                color: "success",
                msg: "Update Berhasil",
              });
              this.getItems();
              this.closeForm();
            })
            .catch((err) => {
              this.showSnackbar({
                color: "error",
                msg: err,
              });
              console.log(err);
            });
        } else {
          this.axios
            .post(this.$route.path, dt)
            .then(() => {
              this.showSnackbar({
                color: "success",
                msg: "Berhasil Menambahkan Surat",
              });
              this.getItems();
              this.closeForm();
            })
            .catch((err) => {
              this.showSnackbar({
                color: "error",
                msg: err,
              });
              console.log(err);
            });
        }
      }
    },
    ...mapMutations("snackbar", ["showSnackbar"]),
    ...mapActions(["getItems", "closeForm"]),
  },
  computed: {
    ...mapState("edit", {
      editShow: "show",
    }),
    ...mapState(["validForm", "surat"]),
  },
});
</script>
