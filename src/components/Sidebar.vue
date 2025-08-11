<template>
  <div :class="['sidebar', { collapsed: sidebar.collapsed }]">
    <div class="sidebar-header">
      <span v-if="!sidebar.collapsed" class="brand">DummyJSON Store</span>
    </div>

    <ul class="nav flex-column">
      <li class="nav-item" v-for="item in menuItems" :key="item.text">
        <a :href="item.link" class="nav-link">
          <i :class="item.icon"></i>
          <span v-if="!sidebar.collapsed">{{ item.text }}</span>
        </a>
      </li>
    </ul>

    <div class="sidebar-footer" v-if="!sidebar.collapsed">
      <small class="text-muted">Emily Johnson</small>
    </div>
  </div>
</template>

<script>
import { useSidebarStore } from "@/store/sidebar";

export default {
  name: "Sidebar",
  setup() {
    const sidebar = useSidebarStore();
    const menuItems = [
      { text: "Dashboard", icon: "bi bi-speedometer2", link: "/dashboard" },
      { text: "Products", icon: "bi bi-box", link: "/product" },
      { text: "Shop", icon: "bi bi-shop", link: "/shop" },
      { text: "Cart", icon: "bi bi-cart", link: "#" },
      { text: "Orders", icon: "bi bi-bag-check", link: "#" }
    ];
    return { sidebar, menuItems };
  }
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #fff;
  border-right: 1px solid #ddd;
  height: 100vh;
  padding: 10px;
  transition: width 0.3s ease;
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 100;
}
.sidebar.collapsed {
  width: 60px;
  padding: 10px 5px;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #333;
}
.sidebar-footer {
  position: absolute;
  bottom: 10px;
  left: 15px;
}
</style>
