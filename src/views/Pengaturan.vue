<template>
  <v-container fluid>
    <h2>Pengaturan</h2>
    <v-divider></v-divider>
    <v-row justify="start" class="mt-2">
      <v-col md="2">
        <span>Ubah Password</span>
      </v-col>
      <v-col md="4">
        <v-text-field
          type="password"
          label="Password Baru"
          hide-details="true"
          filled
          dense
          class="mb-2"
          v-model="password"
        ></v-text-field>
        <v-text-field
          type="password"
          label="Ulangi Password"
          hide-details="true"
          filled
          dense
          class="mb-2"
          v-model="repassword"
        ></v-text-field>
        <app-button
          text="Ubah Password"
          color="primary lighten-1"
          :valid="isSamePassword"
          @clicked="changePassword"
        >
        </app-button>
      </v-col>
    </v-row>
    <v-row justify="start" class="mt-2">
      <v-col md="2">
        <span>Ubah Username</span>
      </v-col>
      <v-col md="4">
        <v-text-field
          label="Masukkan Username Baru"
          hide-details="true"
          filled
          dense
          class="mb-2"
          v-model="newUsername"
        ></v-text-field>
        <app-button
          text="Username Baru"
          color="primary lighten-1"
          :valid="isValidUsername"
          @clicked="changeUsername"
        >
        </app-button>
      </v-col>
    </v-row>
    <span class="text-caption"
      >*Setelah mengubah username Anda akan teralihkan untuk login ulang</span
    >
    <v-row justify="start" class="mt-2">
      <v-col md="2">
        <span>Ubah Nama</span>
      </v-col>
      <v-col md="4">
        <v-text-field
          label="Ganti Nama"
          hide-details="true"
          filled
          dense
          class="mb-2"
          v-model="name"
        ></v-text-field>
        <app-button
          text="Ubah"
          color="primary lighten-1"
          :valid="isValidName"
          @clicked="changeName"
        >
        </app-button>
      </v-col>
    </v-row>
    <v-row justify="start" class="mt-2">
      <v-col md="6">
        <app-button text="Logout" color="primary lighten-1" @clicked="logout">
        </app-button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import AppButton from "@/utils/AppButton.vue";
import Vue from "vue";
import { mapMutations } from "vuex";
export default Vue.extend({
  components: { AppButton },
  data: () => ({
    password: "",
    repassword: "",
    newUsername: "",
    name: "",
  }),
  computed: {
    isSamePassword(): boolean {
      return Boolean(this.password && this.password === this.repassword);
    },
    isValidUsername(): boolean {
      return Boolean(
        this.newUsername &&
          this.newUsername.length >= 4 &&
          !this.newUsername.includes(" ")
      );
    },
    isValidName(): boolean {
      return Boolean(this.name);
    },
  },
  methods: {
    ...mapMutations("snackbar", ["showSnackbar"]),
    async changePassword() {
      try {
        await this.axios.put("/user/password", {
          username: this.$cookies.get("username"),
          new_password: this.password,
        });

        this.password = "";
        this.repassword = "";

        this.showSnackbar({
          msg: "Berhasil Ubah Password",
          color: "success",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async changeUsername() {
      try {
        await this.axios.put("user/username", {
          username: this.$cookies.get("username"),
          new_username: this.newUsername,
        });

        this.newUsername = "";
        this.showSnackbar({
          msg: "Berhasil Ubah Username",
          color: "success",
        });

        this.$cookies.remove("username");
        this.$cookies.remove("session_id");
        this.$cookies.remove("isAdmin");

        this.$router.go(0);
      } catch (error) {
        console.log(error);
      }
    },
    async changeName() {
      try {
        await this.axios.put("user/name", {
          username: this.$cookies.get("username"),
          new_name: this.name,
        });

        this.name = "";
        this.showSnackbar({
          msg: "Berhasil Ganti Nama",
          color: "success",
        });

        this.$router.go(0);
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      try {
        await this.axios.post("user/logout", {
          username: this.$cookies.get("username"),
        });

        this.$cookies.remove("username");
        this.$cookies.remove("session_id");
        this.$cookies.remove("isAdmin");

        this.$router.go(0);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
