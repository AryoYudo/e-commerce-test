<template>
  <div :class="showSidebar ? 'd-flex' : ''">
    <Sidebar v-if="showSidebar" />
    <div
      class="main-content"
      :class="[{ shifted: sidebar.collapsed }, !showSidebar ? 'no-sidebar' : '']"
    >
      <div>
        <ToggleSidebarButton v-if="showSidebar" />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useSidebarStore } from "@/store/sidebar";
import Sidebar from "@/components/Sidebar.vue";
import ToggleSidebarButton from "@/components/ToggleSidebarButton.vue";

const sidebar = useSidebarStore();
const route = useRoute();
const showSidebar = computed(() => route.name !== "Auth");
</script>

<style>
.d-flex {
  display: flex;
}

.main-content {
  position: relative;
  padding: 1rem;
  margin-left: 250px;
  transition: margin-left 0.3s ease;
  flex-grow: 1;
}
.main-content.shifted {
  margin-left: 60px;
}

/* Kalau tanpa sidebar, margin dihapus dan centerkan konten */
.no-sidebar {
  margin-left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* supaya vertikal center */
}
</style>
