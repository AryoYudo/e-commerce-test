<template>
  <div :class="['sidebar', { collapsed: sidebar.collapsed }]">
    <div class="sidebar-header alaign-items-center d-flex">
      <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 11.9997C2 7.28562 2 4.9286 3.46447 3.46413C4.70529 2.22331 6.58687 2.03382 10 2.00488M22 11.9997C22 7.28562 22 4.9286 20.5355 3.46413C19.2947 2.22331 17.4131 2.03382 14 2.00488" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M10 22C7.19974 22 5.79961 22 4.73005 21.455C3.78924 20.9757 3.02433 20.2108 2.54497 19.27C2 18.2004 2 16.8003 2 14C2 11.1997 2 9.79961 2.54497 8.73005C3.02433 7.78924 3.78924 7.02433 4.73005 6.54497C5.79961 6 7.19974 6 10 6H14C16.8003 6 18.2004 6 19.27 6.54497C20.2108 7.02433 20.9757 7.78924 21.455 8.73005C22 9.79961 22 11.1997 22 14C22 16.8003 22 18.2004 21.455 19.27C20.9757 20.2108 20.2108 20.9757 19.27 21.455C18.2004 22 16.8003 22 14 22" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M12 17L12 11M12 11L14.5 13.5M12 11L9.5 13.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      <span v-if="!sidebar.collapsed" class="brand">DummyJSON Store</span>
    </div>

    <ul class="nav flex-column">
      <li class="nav-item" v-for="item in menuItems" :key="item.text">
        <a :href="item.link" class="nav-link d-flex align-items-center justify-content-between">
          <span>
            <i :class="item.icon"></i>
            <span v-if="!sidebar.collapsed" class="ms-2">{{ item.text }}</span>
          </span>

          <!-- Tampilkan badge hanya untuk item Cart -->
          <span v-if="item.text === 'Cart' && cartCount > 0" class="badge bg-danger rounded-pill ms-2">
            {{ cartCount }}
          </span>
        </a>
      </li>
    </ul>

    <div class="sidebar-footer" v-if="!sidebar.collapsed">
      <small class="text-muted">Emily Johnson</small>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useSidebarStore } from "@/store/sidebar";

export default {
  name: "Sidebar",
  setup() {
    const sidebar = useSidebarStore();

    const menuItems = [
      { text: "Dashboard", icon: "bi bi-speedometer2", link: "/dashboard" },
      { text: "Products", icon: "bi bi-box", link: "/product" },
      { text: "Shop", icon: "bi bi-shop", link: "/shop" },
      { text: "Cart", icon: "bi bi-cart", link: "/cart" },
      { text: "Orders", icon: "bi bi-bag-check", link: "/orderhistory" }
    ];

    const cartCount = ref(0);

    const updateCartCount = () => {
      const savedCart = localStorage.getItem('userCart');
      if (savedCart) {
        const cartProducts = JSON.parse(savedCart);
        cartCount.value = cartProducts.reduce((acc, p) => acc + p.quantity, 0);
      } else {
        cartCount.value = 0;
      }
    };

    // langsung panggil supaya langsung muncul
    updateCartCount();

    onMounted(() => {
      window.addEventListener('storage', updateCartCount);
    });

    return { sidebar, menuItems, cartCount };
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
