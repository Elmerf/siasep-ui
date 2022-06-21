<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    height="100vh"
    color="indigo lighten-5"
  >
    <v-list color="primary">
      <v-list-item>
        <v-list-item-avatar color="primary darken-1">
          <v-icon dark> mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> {{ nama }} </v-list-item-title>
          <v-list-item-subtitle>{{
            userType ? "Admin" : "User"
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item link color="rgba(0, 0, 0, 0.87)" to="/home">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-group
        :value="true"
        prepend-icon="mdi-email"
        color="rgba(0, 0, 0, 0.87)"
      >
        <v-list-item-title slot="activator">Surat</v-list-item-title>
        <v-icon slot="prependIcon" color="rgba(0, 0, 0, 0.54)"
          >mdi-email</v-icon
        >
        <v-list-group
          sub-group
          no-action
          :value="true"
          v-for="(item, index) in items"
          :key="index"
          color="rgba(0, 0, 0, 0.87)"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                v-text="capitalizeEveryFirstLetter(item[0].surat, '_')"
              ></v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon dense color="rgba(0, 0, 0, 0.54)">{{
                item[0].icon
              }}</v-icon>
            </v-list-item-icon>
          </template>

          <v-list-item
            v-for="(list, index) in item[1]"
            :key="index"
            link
            :to="list.route"
          >
            <v-list-item-title
              v-text="capitalizeEveryFirstLetter(list.sub_surat, '_')"
            ></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list-group>
      <v-list-item
        v-if="$cookies.get('isAdmin') === 'true'"
        link
        color="rgba(0, 0, 0, 0.87)"
        to="/admin"
      >
        <v-list-item-icon>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-icon>

        <v-list-item-title>Admin Panel</v-list-item-title>
      </v-list-item>
      <v-list-item link color="rgba(0, 0, 0, 0.87)" to="/pengaturan">
        <v-list-item-icon>
          <v-icon>mdi-cog</v-icon>
        </v-list-item-icon>

        <v-list-item-title>Pengaturan</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import { capitalizeEveryFirstLetter } from "./capitalizeEveryFirstLetter";

export default Vue.extend({
  name: "AppList",
  props: ["drawer"],
  data() {
    return {
      items: [
        [
          { surat: "masuk", icon: "mdi-email-receive" },
          [
            {
              id: 1,
              sub_surat: "elektronik",
              route: "/surat/masuk/elektronik",
            },
            { id: 2, sub_surat: "fisik", route: "/surat/masuk/fisik" },
          ],
        ],
        [
          { surat: "keluar", icon: "mdi-email-send" },
          [
            {
              id: 7,
              sub_surat: "alat_keterangan",
              route: "/surat/keluar/alat-keterangan",
            },
            {
              id: 5,
              sub_surat: "berita_acara",
              route: "/surat/keluar/berita-acara",
            },
            {
              id: 3,
              sub_surat: "laporan_penelitian",
              route: "/surat/keluar/laporan-penelitian",
            },
            {
              id: 6,
              sub_surat: "laporan_pengurangan_pph",
              route: "/surat/keluar/laporan-pengurangan-pph",
            },
          ],
        ],
      ],
      nama: "",
      userType: "",
    };
  },
  methods: {
    capitalizeEveryFirstLetter,
  },
  async created() {
    const res = await this.axios.get("/user/info");
    this.nama = res.data.nama;
    this.userType = res.data.isAdmin;
  },
});
</script>
