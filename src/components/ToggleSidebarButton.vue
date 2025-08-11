<template>
  <button @click="toggleSidebar" class="toggle-btn">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sidebar">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="9" y1="3" x2="9" y2="21"></line>
    </svg>
  </button>
</template>

<script setup>
import { useSidebarStore } from "@/store/sidebar";
const sidebar = useSidebarStore();

function toggleSidebar() {
  sidebar.collapsed = !sidebar.collapsed;
}
</script>

<style scoped>
.toggle-btn {
  /* Hapus posisi fixed */
  position: static; /* atau langsung hilangkan property position */
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: auto; /* gak perlu z-index kalau gak fixed */
  /* Kalau mau dikit jarak dari pojok */
  margin-bottom: 1rem;
}

.toggle-btn svg {
  width: 28px;
  height: 28px;
}
</style>
