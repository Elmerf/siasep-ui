<template>
  <v-card>
    <v-card-text class="pt-5">
      <v-form ref="form" class="mt-2" v-model="validForm">
        <component :is="componentPath"></component>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <button-action></button-action>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
const ButtonAction = () => import("@/components/surat/ButtonAction.vue");

import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  components: { ButtonAction },
  computed: {
    componentPath() {
      let path = `components${this.$route.path}.vue`;
      return () => import(`@/${path}`);
    },
    validForm: {
      get() {
        return this.$store.state.validForm;
      },
      set(value) {
        if (value === false) {
          this.$store.commit("unsetValidForm");
          return;
        }
        this.$store.commit("setValidForm");
      },
    },
    ...mapState(["resetForm"]),
  },
  watch: {
    resetForm(value) {
      console.log(value);
      if (value === true)
        (
          this.$refs.form as Vue & { resetValidation: () => boolean }
        ).resetValidation();
    },
  },
});
</script>
