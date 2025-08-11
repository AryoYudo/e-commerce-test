<template>
  <div class="container my-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <h3>Shopping Cart</h3>
        <small>{{ cart.length }} items in your cart</small>
      </div>
      <button class="btn btn-outline-secondary btn-sm" @click="clearCart">Clear Cart</button>
    </div>

    <div class="row">
      <!-- Daftar Produk -->
      <div class="col-md-8" v-if="cart.length > 0">
        <div v-for="item in cart" :key="item.id" class="card mb-3">
          <div class="card-body d-flex align-items-center">
            <img :src="item.thumbnail" alt="Product Image" class="me-3" style="width: 60px; height: auto;">
            <div class="flex-grow-1">
              <h6 class="mb-1">{{ item.title }}</h6>
              <strong>${{ item.price.toFixed(2) }}</strong>
            </div>
            <div class="d-flex align-items-center">
              <button class="btn btn-outline-secondary btn-sm" @click="decreaseQty(item)">-</button>
              <span class="mx-2">{{ item.quantity }}</span>
              <button class="btn btn-outline-secondary btn-sm" @click="increaseQty(item)">+</button>
              <span class="ms-3">${{ (item.price * item.quantity).toFixed(2) }}</span>
              <button class="btn btn-link text-danger ms-2" @click="removeItem(item)">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Cart Message -->
      <div class="col-md-8" v-else>
        <div class="text-center p-4 border rounded">
          <h5>Your cart is empty</h5>
          <p class="text-muted mb-3">Add some products to get started</p>
          <router-link to="/shop" class="btn btn-dark">Continue Shopping</router-link>
        </div>
      </div>

      <!-- Summary & Actions -->
      <div class="col-md-4" v-if="cart.length > 0">
        <div class="card">
          <div class="card-body">
            <h5>Order Summary</h5>
            <div class="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div class="d-flex justify-content-between">
              <span>Tax</span>
              <span>${{ tax.toFixed(2) }}</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
            <router-link to="/checkout" class="btn btn-dark w-100 mt-3">
              Proceed to Checkout
            </router-link>
            <router-link to="/shop" class="btn btn-outline-secondary w-100 mt-2">
              Continue Shopping
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OrdersPage",
  data() {
    return {
      cart: [],
      taxRate: 0.1
    };
  },
  computed: {
    subtotal() {
      return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    tax() {
      return this.subtotal * this.taxRate;
    },
    total() {
      return this.subtotal + this.tax;
    }
  },
  methods: {
    async fetchCartProductsDetails(cartProducts) {
      try {
        const productDetails = await Promise.all(
          cartProducts.map(async p => {
            const res = await axios.get(`https://dummyjson.com/products/${p.id}`)
            return { ...res.data, quantity: p.quantity }
          })
        )
        this.cart = productDetails
      } catch (error) {
        console.error(error)
      }
    },

    async loadCart() {
      const savedCart = localStorage.getItem('userCart')
      if (savedCart) {
        const cartProducts = JSON.parse(savedCart)
        if (cartProducts.length > 0) {
          await this.fetchCartProductsDetails(cartProducts)
        } else {
          this.cart = []
        }
      } else {
        this.cart = []
      }
    },

    increaseQty(item) {
      item.quantity++
      this.updateLocalCart()
    },
    decreaseQty(item) {
      if (item.quantity > 1) {
        item.quantity--
        this.updateLocalCart()
      }
    },
    removeItem(item) {
      this.cart = this.cart.filter(p => p.id !== item.id)
      this.updateLocalCart()
    },
    clearCart() {
      this.cart = []
      localStorage.removeItem('userCart')
    },
    updateLocalCart() {
      const cartProducts = this.cart.map(p => ({ id: p.id, quantity: p.quantity }))
      localStorage.setItem('userCart', JSON.stringify(cartProducts))
    }
  },
  mounted() {
    this.loadCart()
  }
};
</script>

<style scoped>
.card img {
  object-fit: contain;
}
</style>
