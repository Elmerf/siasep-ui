<template>
  <v-container fluid>
    <h2>Home</h2>
    <v-divider></v-divider>
    <v-row class="my-1">
      <v-col cols="12" md="6">
        <v-row>
          <v-col><h4>Filter</h4></v-col>
          <v-col md="5">
            <v-select
              :items="[2021, 2022, 2023]"
              v-model="year"
              hide-details="true"
              label="Pilih Tahun"
              dense
              outlined
              @change="getNewGraph"
            ></v-select>
          </v-col>
          <v-col md="5">
            <v-select
              :items="['', ...labels]"
              v-model="month"
              hide-details="true"
              label="Pilih Bulan"
              dense
              outlined
              @change="getNewGraph"
            ></v-select>
          </v-col>
        </v-row>
        <canvas id="chart" ref="chart"></canvas>
      </v-col>
      <v-col cols="12" md="6">
        <h4>Rekapitulasi Surat</h4>
        <h5 class="mt-1">Bulan ini</h5>
        <v-row class="mb-1">
          <v-col v-for="(item, i) in itemsBulanIni" :key="i" col="6" md="4">
            <v-card
              class="rounded-lg lighten-1"
              :class="classList[i]"
              elevation="8"
            >
              <v-card-text class="text-center">
                <h3
                  v-if="
                    item.tipe_surat === 'keluar' || item.tipe_surat === 'masuk'
                  "
                >
                  SURAT {{ item.tipe_surat.toUpperCase() }}
                </h3>
                <h3 v-else>TOTAL SURAT</h3>
                <br />
                <h1>{{ item.jumlah_surat }}</h1>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <h5 class="mt-1">Sepanjang waktu</h5>
        <v-row>
          <v-col v-for="(item, i) in itemsSemua" :key="i" col="6" md="4">
            <v-card
              class="rounded-lg lighten-1"
              :class="classList[i]"
              elevation="8"
            >
              <v-card-text class="text-center">
                <h3
                  v-if="
                    item.tipe_surat === 'keluar' || item.tipe_surat === 'masuk'
                  "
                >
                  SURAT {{ item.tipe_surat.toUpperCase() }}
                </h3>
                <h3 v-else>TOTAL SURAT</h3>
                <br />
                <h1>{{ item.jumlah_surat }}</h1>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <h4>Surat Terbaru</h4>
    <v-row class="mt-1">
      <v-col v-for="(item, i) in recent" :key="i" cols="6" md="4">
        <v-card class="rounded-lg" elevation="4">
          <v-card-text>
            <span class="text-body-1 font-weight-medium">{{
              item.nomor_surat
            }}</span
            ><br />
            <span>Diinput pada: {{ formatDate(item.createdAt) }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
  CategoryScale,
  Chart,
  ChartItem,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip
);

import { formatDate } from "@/utils/formatDate";
import Vue from "vue";

interface Stat {
  month?: number;
  day?: number;
  surat_keluar: string;
  surat_masuk: string;
}

export default Vue.extend({
  name: "HomeView",
  data() {
    return {
      classList: ["success", "info", "deep-orange"],
      labels: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
      dayLabels: Array.from({ length: 31 }, (_, i) => Number(i + 1).toString()),
      itemsBulanIni: [],
      itemsSemua: [],
      recent: [],
      graphStats: [] as Stat[],
      jumlah_masuk: new Array(12).fill(0),
      jumlah_keluar: new Array(12).fill(0),
      year: new Date().getFullYear(),
      month: "",
      myChart: null as any,
    };
  },
  async created() {
    const items = (await this.axios.get("/surat/home")).data;
    this.itemsBulanIni = items[0];
    this.itemsSemua = items[1];

    await this.getGraphData();
    this.initializeChart();

    this.recent = (await this.axios.get("/surat/recent")).data;
  },
  methods: {
    formatDate,
    initializeChart() {
      const ctx = this.$refs.chart as ChartItem;
      const label = this.month
        ? this.dayLabels
        : this.labels.map((val) => val.slice(0, 3));
      const titleText = this.month
        ? `Total Administrasi Surat Tahun ${this.year} Bulan ${this.month}`
        : `Total Administrasi Surat Tahun ${this.year}`;

      this.myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: label,
          datasets: [
            {
              label: "#Surat Masuk",
              data: this.jumlah_masuk,
              borderColor: "#448AFF",
              tension: 0.1,
            },
            {
              label: "#Surat Keluar",
              data: this.jumlah_keluar,
              borderColor: "#66BB6A",
              tension: 0.1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              title: {
                font: {
                  family: `"Roboto", sans-serif`,
                },
              },
            },
            title: {
              display: true,
              text: titleText,
            },
          },
          scales: {
            y: {
              max:
                Math.ceil(
                  Math.max(...this.jumlah_masuk, ...this.jumlah_keluar) / 5
                ) * 5 || 5,
            },
          },
        },
      });
    },
    async getNewGraph() {
      this.myChart.destroy();
      await this.getGraphData();
      this.initializeChart();
    },
    async getGraphData() {
      this.jumlah_masuk = this.month
        ? new Array(31).fill(0)
        : new Array(12).fill(0);
      this.jumlah_keluar = this.month
        ? new Array(31).fill(0)
        : new Array(12).fill(0);

      const monthIndex = this.labels.indexOf(this.month) + 1;
      this.graphStats = (
        await this.axios.get(
          `/surat/graph?year=${this.year}&month=${monthIndex}`
        )
      ).data as Stat[];

      for (let i = 0; i < this.graphStats.length; i++) {
        const index =
          this.graphStats[i].day != undefined
            ? this.graphStats[i]?.day - 1
            : this.graphStats[i]?.month - 1;

        this.jumlah_masuk[index] = parseInt(this.graphStats[i].surat_masuk);
        this.jumlah_keluar[index] = parseInt(this.graphStats[i].surat_keluar);
      }
    },
  },
});
</script>
