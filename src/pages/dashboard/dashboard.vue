<template>
  <div class="container-fluid py-4">
    <!-- Header -->
    <h3 class="fw-bold">Dashboard</h3>
    <p class="text-muted mb-4">Overview of your e-commerce metrics</p>

    <!-- Top Cards -->
    <div class="row g-3 mb-4">
      <div class="col-md-3" v-for="(item, index) in stats" :key="index">
        <div class="card shadow-sm border-0 h-100">
          <div class="card-body">
            <h6 class="text-muted">{{ item.title }}</h6>
            <h4 class="fw-bold">{{ item.value }}</h4>
            <small class="text-muted">{{ item.subtitle }}</small>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-md-6">
        <div class="card shadow-sm border-0" style="height: 350px;">
          <div class="card-body d-flex flex-column">
            <h6 class="fw-bold">Products by Category</h6>
            <p class="text-muted small">Distribution of products across categories</p>
            <div class="flex-grow-1">
              <canvas id="barChart" style="height: 100%"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card shadow-sm border-0" style="height: 350px;">
          <div class="card-body d-flex flex-column">
            <h6 class="fw-bold">Category Distribution</h6>
            <p class="text-muted small">Pie chart view of product categories</p>
            <div class="flex-grow-1">
              <canvas id="pieChart" style="height: 100%"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  BarController,
  PieController
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  BarController,
  PieController
);

export default {
  name: "Dashboard",
  data() {
    return {
      stats: [
        { title: "Total Products", value: "194", subtitle: "Available in store" },
        { title: "Total Users", value: "208", subtitle: "Registered customers" },
        { title: "Active Carts", value: "50", subtitle: "Items in carts" },
        { title: "Total Revenue", value: "$589088.80", subtitle: "From all carts" }
      ]
    };
  },
  mounted() {
    this.renderBarChart();
    this.renderPieChart();
  },
  methods: {
    renderBarChart() {
      new ChartJS(document.getElementById("barChart"), {
        type: "bar",
        data: {
          labels: ["beauty", "fragrances", "furniture", "groceries"],
          datasets: [{
            data: [5, 5, 5, 15],
            backgroundColor: "#9370DB"
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Biar tinggi ikut card
          plugins: {
            legend: { display: false }
          }
        }

      });
    },
    renderPieChart() {
      new ChartJS(document.getElementById("pieChart"), {
        type: "pie",
        data: {
          labels: ["fragrances 17%", "furniture 17%", "beauty 17%", "groceries 50%"],
          datasets: [{
            data: [17, 17, 17, 50],
            backgroundColor: ["#20B2AA", "#FFD700", "#1E90FF", "#FF7F50"]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Biar tinggi ikut card
          plugins: {
            legend: { position: "right" }
          }
        }

      });
    }
  }
};
</script>

<style>
body {
  font-family: "Segoe UI", sans-serif;
}
</style>
