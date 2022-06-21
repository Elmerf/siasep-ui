<template>
  <v-dialog v-model="modal" :max-width="width" persistent>
    <slot></slot>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  props: {
    width: {
      default: "50%",
    },
  },
  computed: {
    ...mapState({
      modal: "showModal",
    }),
  },
});
</script>
