<template>
  <div class="container-fluid py-4">
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
            <p class="text-muted small">Number of products in each category</p>
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
            <p class="text-muted small">Percentage of products by category</p>
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
        { title: "Total Products", value: "0", subtitle: "Available in store" },
        { title: "Total Users", value: "0", subtitle: "Registered customers" },
        { title: "Active Carts", value: "0", subtitle: "Items in carts" },
        { title: "Total Revenue", value: "$0.00", subtitle: "From all carts" }
      ]
    };
  },
  mounted() {
    this.fetchStats();
    this.fetchProductCharts();
  },
  methods: {
    // Ambil data untuk top cards dari carts API
    async fetchStats() {
      try {
        const res = await fetch("https://dummyjson.com/carts");
        const data = await res.json();

        const totalProducts = data.carts.reduce((sum, cart) => sum + cart.totalProducts, 0);
        const totalUsers = new Set(data.carts.map(c => c.userId)).size;
        const activeCarts = data.carts.length;
        const totalRevenue = data.carts.reduce((sum, cart) => sum + cart.total, 0);

        this.stats = [
          { title: "Total Products", value: totalProducts, subtitle: "Available in store" },
          { title: "Total Users", value: totalUsers, subtitle: "Registered customers" },
          { title: "Active Carts", value: activeCarts, subtitle: "Items in carts" },
          { title: "Total Revenue", value: `$${totalRevenue.toFixed(2)}`, subtitle: "From all carts" }
        ];
      } catch (err) {
        console.error(err);
      }
    },

    // Ambil data untuk chart dari products API
    async fetchProductCharts() {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();

        // Hitung jumlah produk per kategori
        const categoryMap = {};
        data.products.forEach(p => {
          if (!categoryMap[p.category]) {
            categoryMap[p.category] = 0;
          }
          categoryMap[p.category] += 1;
        });

        const labels = Object.keys(categoryMap);
        const counts = Object.values(categoryMap);

        this.renderBarChart(labels, counts);
        this.renderPieChart(labels, counts);
      } catch (err) {
        console.error(err);
      }
    },

    renderBarChart(labels, counts) {
      new ChartJS(document.getElementById("barChart"), {
        type: "bar",
        data: {
          labels: labels,
          datasets: [{
            data: counts,
            backgroundColor: "#9370DB"
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          }
        }
      });
    },

    renderPieChart(labels, counts) {
      new ChartJS(document.getElementById("pieChart"), {
        type: "pie",
        data: {
          labels: labels,
          datasets: [{
            data: counts,
            backgroundColor: ["#20B2AA", "#FFD700", "#1E90FF", "#FF7F50", "#8A2BE2", "#FF69B4", "#3CB371", "#FFA500"]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
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
