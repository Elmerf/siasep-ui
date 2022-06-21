<template>
  <v-btn block :color="color" @click="clicked" :disabled="!valid"
    >{{ text }}
    <v-icon right v-if="icon">{{ icon }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    valid: {
      default: true,
      type: Boolean,
    },
    text: String,
    color: String,
    icon: String,
  },
  name: "AppButton",
  methods: {
    clicked() {
      this.$emit("clicked");
    },
  },
});
</script>
