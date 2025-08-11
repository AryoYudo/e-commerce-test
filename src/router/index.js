import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../pages/auth/auth.vue'

const routes = [
  { path: '/', name: 'Auth', component: Auth },
  { path: '/dashboard', name: 'Dashboard', component: () => import('../pages/dashboard/dashboard.vue'), meta: { requiresAuth: true } },
  { path: '/product', name: 'Product', component: () => import('../pages/product/product.vue'), meta: { requiresAuth: true } },
  { path: '/shop', name: 'Shop', component: () => import('../pages/shop/shop.vue'), meta: { requiresAuth: true } },
  { path: '/cart', name: 'Cart', component: () => import('../pages/cart/cart.vue'), meta: { requiresAuth: true } },
  { path: '/checkout', name: 'Checkout', component: () => import('../pages/cart/checkout.vue'), meta: { requiresAuth: true } },
  { path: '/orderhistory', name: 'Orderhistory', component: () => import('../pages/orderHistory/orderhistory.vue'), meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard untuk cek login
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('token') // atau state dari Pinia/Vuex
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Auth' }) // redirect ke login
  } else {
    next()
  }
})

export default router
