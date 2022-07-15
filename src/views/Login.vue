<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-layout justify-center class="mb-4">
          <v-img
            src="@/assets/logo.jpg"
            alt="Logo SIASEP"
            max-height="100"
            max-width="100"
            class="elevation-4 rounded-circle"
          />
        </v-layout>
        <v-card class="elevation-4">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Masuk SIASEP</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account"
                name="Username"
                label="Username"
                type="text"
                v-model="username"
                dense
                class="my-2"
                autocomplete="off"
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
                v-model="password"
                @keydown.enter.prevent="sendCredentials"
                dense
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="sendCredentials">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Vue from "vue";
import { mapMutations } from "vuex";
export default Vue.extend({
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations("snackbar", ["showSnackbar"]),
    async sendCredentials() {
      try {
        const res = await this.axios.post("/auth/login", {
          username: this.username,
          password: this.password,
        });

        this.$cookies.set("session_id", res.data.session_id, "7d");
        this.$cookies.set("isAdmin", res.data.admin, "7d");
        this.$cookies.set("username", this.username, "7d");

        this.showSnackbar({
          msg: "Berhasil Login",
          color: "success",
        });

        this.$router.push("/");
      } catch (err) {
        console.log(err);
        this.showSnackbar({
          msg: err.response?.data?.msg,
          color: "error",
        });
      }
    },
  },
});
</script>
