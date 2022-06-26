<template>
  <v-app id="inspire">
    <div v-if="!$route.path.includes('login')">
      <app-list :drawer="drawer"></app-list>
      <v-app-bar app dense color="primary lighten-1">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title
          >Sistem Informasi Administrasi Seksi Pengawasan IV
        </v-toolbar-title>
      </v-app-bar>
    </div>

    <v-main>
      <v-snackbar v-model="show" :color="color" top>
        {{ msg }}

        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="hideSnackbar">
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <router-view :key="$route.path"></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations, mapState } from "vuex";
const AppList = () => import("@/utils/AppList.vue");

export default Vue.extend({
  components: { AppList },
  data: () => ({ drawer: true }),
  computed: {
    show: {
      get() {
        return this.$store.state.snackbar.show;
      },
      set() {
        this.hideSnackbar();
      },
    },
    ...mapState("snackbar", ["msg", "color"]),
  },
  methods: mapMutations("snackbar", ["hideSnackbar", "showSnackbar"]),
  async created() {
    console.log("CREATED APP");
    await this.axios.get("/");
  },
});
</script>
