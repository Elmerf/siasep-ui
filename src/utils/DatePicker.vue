<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="formatedDate"
        :label="label"
        hint="DD/MM/YYYY format"
        persistent-hint
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        dense
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="dateComputed"
      no-title
      @input="handleInput"
    ></v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    label: String,
  },
  data() {
    return {
      menu: false,
    };
  },
  computed: {
    dateComputed: {
      get() {
        if (this.$attrs.value) return this.$attrs.value;
        return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10);
      },
      set(newVal) {
        return newVal;
      },
    },
    formatedDate: {
      get(): string | null {
        return this.formatDate(this.dateComputed as string);
      },
      set(val: string): string | null {
        return this.formatDate(val);
      },
    },
  },
  methods: {
    formatDate(date: string): string | null {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    handleInput(val) {
      this.$emit("input", val);
      this.menu = false;
    },
  },
  watch: {
    dateComputed(val) {
      this.formatedDate = this.formatDate(val);
    },
  },
  created() {
    this.$emit("input", this.dateComputed);
  },
});
</script>
