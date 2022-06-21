<template>
  <v-container fluid>
    <h2>Home</h2>
    <v-divider></v-divider>
    <v-row class="my-1">
      <v-col cols="12" md="6">
        <canvas id="chart" ref="chart"></canvas>
      </v-col>
      <v-col v-for="(item, i) in items" :key="i" cols="6" md="3">
        <v-card
          class="rounded-xl lighten-1"
          :class="classList[i]"
          elevation="8"
        >
          <v-card-title class="justify-center font-weight-medium"
            >SURAT {{ item.tipe.tipe_surat.toUpperCase() }}</v-card-title
          >
          <v-card-text class="text-center text-h3">{{
            item.jumlah_surat
          }}</v-card-text>
        </v-card>
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
  month: number;
  surat_keluar: string;
  surat_masuk: string;
}

export default Vue.extend({
  name: "HomeView",
  data() {
    return {
      classList: ["success", "info"],
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ],
      items: [],
      recent: [],
      graphStats: [] as Stat[],
      jumlah_masuk: new Array(12).fill(0),
      jumlah_keluar: new Array(12).fill(0),
      year: new Date().getFullYear(),
    };
  },
  async created() {
    this.items = (await this.axios.get("/surat/home")).data;
    this.graphStats = (await this.axios.get("/surat/graph")).data as Stat[];

    for (let i = 0; i < this.graphStats.length; i++) {
      this.jumlah_masuk[this.graphStats[i].month - 1] = parseInt(
        this.graphStats[i].surat_masuk
      );
      this.jumlah_keluar[this.graphStats[i].month - 1] = parseInt(
        this.graphStats[i].surat_keluar
      );
    }

    this.initializeChart();

    this.recent = (await this.axios.get("/surat/recent")).data;
  },
  methods: {
    formatDate,
    initializeChart() {
      const ctx = this.$refs.chart as ChartItem;
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.labels,
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
              text: `Total Administrasi Surat Tahun ${this.year}`,
            },
          },
          scales: {
            y: {
              max:
                Math.ceil(
                  Math.max(...this.jumlah_masuk, ...this.jumlah_keluar) / 5
                ) * 5,
            },
          },
        },
      });
    },
  },
});
</script>
