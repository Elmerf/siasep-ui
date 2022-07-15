<template>
  <v-container fluid>
    <h2>Admin Panel</h2>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="20"
      class="elevation-4 mt-2"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>List User</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            dark
            class="mb-2"
            @click="
              showDialog();
              addDialog = true;
            "
          >
            Tambah User
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.isAdmin`]="{ item }">
        <v-chip v-if="item.isAdmin" color="success" dark> Admin </v-chip>
        <v-chip v-else color="info" dark> User </v-chip>
      </template>
      <template v-slot:[`item.createdAt`]="{ item }">
        {{ formatDate(item.createdAt, "DD MMMM YYYY, HH:mm:ss") }}
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-row v-if="!(item.username === 'admin')" justify="start">
          <v-col md="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  color="warning lighten-1"
                  @click="resetPassword(item.username)"
                >
                  <v-icon color="warning lighten-1"
                    >mdi-lock-open-variant</v-icon
                  >
                </v-btn>
              </template>
              <span>Reset Password</span>
            </v-tooltip>
          </v-col>
          <v-col md="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" color="red lighten-1">
                  <v-icon
                    color="red lighten-1"
                    @click="
                      showDialog();
                      deleteDialog = true;
                      account = item.username;
                    "
                    >mdi-delete</v-icon
                  >
                </v-btn>
              </template>
              <span>Hapus Akun</span>
            </v-tooltip>
          </v-col>
          <v-col md="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-if="item.isAdmin"
                  icon
                  v-bind="attrs"
                  v-on="on"
                  color="secondary lighten-1"
                  @click="revokeAdmin(item.username)"
                >
                  <v-icon color="secondary lighten-1"
                    >mdi-sticker-remove</v-icon
                  >
                </v-btn>
                <v-btn
                  v-else-if="!item.isAdmin"
                  icon
                  v-bind="attrs"
                  v-on="on"
                  color="success lighten-1"
                  @click="grantAdmin(item.username)"
                >
                  <v-icon color="success lighten-1">mdi-sticker-check</v-icon>
                </v-btn>
              </template>
              <span v-if="item.isAdmin">Hapus akses admin</span>
              <span v-else>Beri akses admin</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
    <app-modal v-if="dialog" width="30%">
      <v-card v-if="addDialog">
        <v-card-title></v-card-title>
        <v-card-text>
          <v-text-field
            label="Nama User"
            dense
            v-model="nama"
            hide-details="true"
          ></v-text-field>
          <v-checkbox
            label="Admin"
            hide-details="true"
            v-model="isAdmin"
          ></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-row no-gutters justify="end">
            <v-col
              cols="5"
              md="3"
              :class="$vuetify.breakpoint.mdAndUp ? 'mx-2' : ''"
              ><app-button
                text="close"
                color="error lighten-2"
                @clicked="
                  hideDialog();
                  addDialog = false;
                "
              ></app-button
            ></v-col>
            <v-spacer v-if="$vuetify.breakpoint.smAndDown"></v-spacer>
            <v-col
              cols="5"
              md="3"
              :class="$vuetify.breakpoint.mdAndUp ? 'mx-2' : ''"
              ><app-button
                text="Tambah"
                color="primary"
                @clicked="addUser"
              ></app-button
            ></v-col>
          </v-row>
        </v-card-actions>
      </v-card>
      <v-card v-if="passwordDialog">
        <v-card-title>New Password</v-card-title>
        <v-card-text>
          <span
            >Password : <b>{{ newPassword }}</b></span
          ><br />
          <span>Segera ganti password setelah berhasil login</span>
        </v-card-text>
        <v-card-actions>
          <v-row no-gutters justify="end">
            <v-col cols="6" md="3" class="mx-2"
              ><app-button
                text="close"
                color="error lighten-1"
                @clicked="
                  hideDialog();
                  passwordDialog = false;
                  newPassword = '';
                "
              ></app-button
            ></v-col>
          </v-row>
        </v-card-actions>
      </v-card>
      <v-card v-if="deleteDialog">
        <v-card-title>Hapus Akun</v-card-title>
        <v-card-text>
          <span
            >Anda yakin akan menghapus akun : <b>{{ account }}</b></span
          ><br />
        </v-card-text>
        <v-card-actions>
          <v-row no-gutters justify="end">
            <v-col cols="6" md="3" class="mx-2"
              ><app-button
                text="close"
                color="secondary lighten-1"
                @clicked="
                  hideDialog();
                  deleteDialog = false;
                  account = '';
                "
              ></app-button
            ></v-col>
            <v-col cols="6" md="3" class="mx-2"
              ><app-button
                text="Hapus"
                color="red darken-1"
                @clicked="deleteUser"
              ></app-button
            ></v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </app-modal>
  </v-container>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import AppModal from "@/utils/AppModal.vue";
import AppButton from "@/utils/AppButton.vue";
import Vue from "vue";
import { mapMutations } from "vuex";

import { formatDate } from "@/utils/formatDate";

export default Vue.extend({
  components: { AppModal, AppButton },
  data() {
    return {
      nama: "",
      isAdmin: false,
      dialog: false,
      headers: [
        { text: "Username", value: "username" },
        { text: "Nama", value: "nama" },
        { text: "Type User", value: "isAdmin" },
        { text: "Dibuat Pada", value: "createdAt" },
        { text: "Aksi", value: "action" },
      ],
      items: [],
      addDialog: false,
      passwordDialog: false,
      deleteDialog: false,
      newPassword: "",
      account: "",
    };
  },
  methods: {
    ...mapMutations(["setShowModal", "unsetShowModal"]),
    ...mapMutations("snackbar", ["showSnackbar"]),
    formatDate,
    showDialog() {
      this.dialog = true;
      this.setShowModal();
    },
    hideDialog() {
      this.dialog = false;
      this.unsetShowModal();
    },
    async addUser() {
      try {
        await this.axios.post("/user", {
          nama: this.nama,
          isAdmin: this.isAdmin,
        });

        this.hideDialog();
        this.addDialog = false;

        this.showSnackbar({
          msg: "Berhasil Menambahkan Akun",
          color: "success",
        });

        const result = await this.axios.get("/user/all");
        this.items = result.data;
      } catch (error) {
        this.showSnackbar({
          msg: error,
          color: "error",
        });
        console.log(error);
      }
    },
    async resetPassword(username) {
      try {
        const result = await this.axios.put("/user/password", { username });

        this.showSnackbar({
          msg: "Reset Password Berhasil",
          color: "success",
        });

        this.passwordDialog = true;
        this.newPassword = result.data.newPassword;
        this.showDialog();

        console.log(result);
      } catch (error) {
        this.showSnackbar({
          msg: error,
          color: "error",
        });
        console.log(error);
      }
    },
    async deleteUser() {
      try {
        await this.axios.delete(`/user/${this.account}`);

        this.showSnackbar({
          msg: "Akun berhasil dihapus",
          color: "success",
        });

        this.deleteDialog = false;
        this.account = "";
        this.hideDialog();

        this.getUsers();
      } catch (error) {
        this.showSnackbar({
          msg: error,
          color: "error",
        });
        console.log(error);
      }
    },
    async revokeAdmin(username) {
      await this.axios.patch(`/user/${username}/admin`, { isAdmin: false });
      this.showSnackbar({
        msg: "Revoke Admin Berhasil",
        color: "success",
      });

      this.getUsers();
    },
    async grantAdmin(username) {
      await this.axios.patch(`/user/${username}/admin`, { isAdmin: true });
      this.showSnackbar({
        msg: "Grant Admin Berhasil",
        color: "success",
      });
      this.getUsers();
    },
    async getUsers() {
      const result = await this.axios.get("/user/all");
      this.items = result.data;
    },
  },
  async created() {
    this.getUsers();
  },
});
</script>
