import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../pages/auth/auth.vue'

const routes = [
  { path: '/', name: 'Auth', component: Auth },
  { path: '/dashboard', name: 'Dashboard', component: () => import('../pages/dashboard/dashboard.vue') },
  { path: '/product', name: 'Product', component: () => import('../pages/product/product.vue') },
  { path: '/shop', name: 'Shop', component: () => import('../pages/shop/shop.vue') },
  { path: '/cart', name: 'Cart', component: () => import('../pages/cart/cart.vue') },
  { path: '/checkout', name: 'Checkout', component: () => import('../pages/cart/checkout.vue') },
  { path: '/orderhistory', name: 'Orderhistory', component: () => import('../pages/orderHistory/orderhistory.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
