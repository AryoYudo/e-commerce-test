<template>
  <div class="d-flex">
    <Sidebar />
    <div class="main-content" :class="{ shifted: sidebar.collapsed }">
      <div>

        <ToggleSidebarButton />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSidebarStore } from "@/store/sidebar";
import Sidebar from "@/components/Sidebar.vue";
import ToggleSidebarButton from "@/components/ToggleSidebarButton.vue";

const sidebar = useSidebarStore();
</script>

<style>
.d-flex {
  display: flex;
}

.main-content {
  position: relative; /* supaya tombol bisa absolute kalau perlu */
  padding: 1rem;
  margin-left: 250px;
  transition: margin-left 0.3s ease;
  flex-grow: 1;
}
.main-content.shifted {
  margin-left: 60px;
}

</style>
