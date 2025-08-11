<template>
  <div class="container py-4">
    <h2 class="mb-1 fw-bold">Shop</h2>
    <p class="text-muted">Browse and purchase products</p>

    <!-- Filter bar -->
    <div class="row g-2 mb-4">
      <div class="col-md-6">
        <input v-model="searchQuery" type="text" class="form-control" placeholder="Search products..." />
      </div>
      <div class="col-md-3">
        <select v-model="selectedCategory" class="form-select">
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">
            {{ capitalize(cat.name) }}
          </option>
        </select>
      </div>
      <div class="col-md-3">
        <select v-model="sortOption" class="form-select">
          <option value="default">Default</option>
          <option value="az">Name A-Z</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>

    <!-- Product Grid -->
    <div class="row g-4">
      <div v-for="product in filteredProducts" :key="product.id" class="col-12 col-sm-6 col-lg-3">
        <div class="card h-100 position-relative">
          <!-- Discount badge -->
          <span v-if="product.discountPercentage"
            class="badge bg-danger position-absolute top-0 start-0 m-2">
            -{{ Math.round(product.discountPercentage) }}%
          </span>

          <img :src="product.thumbnail" class="card-img-top p-3" style="height: 200px; object-fit: contain;" />

          <div class="card-body d-flex flex-column">
            <h6 class="card-title mb-1">{{ product.title }}</h6>
            <p class="text-muted small mb-2">{{ truncate(product.description, 50) }}</p>
            <div class="mb-2">
              <strong>${{ product.price.toFixed(2) }}</strong>
              <span v-if="product.discountPercentage"
                class="text-muted text-decoration-line-through small ms-1">
                ${{ (product.price / (1 - product.discountPercentage / 100)).toFixed(2) }}
              </span>
            </div>
            <div class="text-muted small mb-3">
              ⭐ {{ product.rating }} • {{ product.stock }} in stock
            </div>

            <button class="btn btn-dark mt-auto" @click="addToCart(product)">🛒 Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Shop",
  data() {
    return {
      products: [],
      categories: [],
      searchQuery: '',
      selectedCategory: '',
      sortOption: 'default',
      cartProducts: [] // Simpan produk yang mau dikirim ke API
    }
  },
  computed: {
  filteredProducts() {
    let filtered = [...this.products]

    // search filter
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase()
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      )
    }

    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.category === this.selectedCategory)
    }

    switch (this.sortOption) {
      case 'az':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'priceLow':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'priceHigh':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
    }

    return filtered
  }

  },
  methods: {
    async fetchProducts() {
      const res = await axios.get('https://dummyjson.com/products?limit=100')
      this.products = res.data.products
    },
    async fetchCategories() {
      const res = await axios.get('https://dummyjson.com/products/categories')
      this.categories = res.data
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    truncate(str, len) {
      return str.length > len ? str.substring(0, len) + "..." : str
    },

    async addToCart(product) {
      // Cek apakah produk sudah ada di cartProducts
      const existing = this.cartProducts.find(p => p.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.cartProducts.push({ id: product.id, quantity: 1 })
      }

      // Kirim ke API add cart
      try {
        const payload = {
          userId: 1, // Contoh userId tetap 1
          products: this.cartProducts
        }

        const res = await axios.post('https://dummyjson.com/carts/add', payload, {
          headers: { 'Content-Type': 'application/json' }
        })

        // Simpan hasil cart di localStorage biar bisa diambil di halaman Cart
        localStorage.setItem('userCart', JSON.stringify(res.data.products))

        alert('Product added to cart!')
      } catch (error) {
        console.error('Add to cart error:', error)
        alert('Failed to add to cart')
      }
    }
  },
  mounted() {
    this.fetchProducts()
    this.fetchCategories()

    // Load cart dari localStorage supaya state konsisten (optional)
    const savedCart = localStorage.getItem('userCart')
    if (savedCart) {
      this.cartProducts = JSON.parse(savedCart).map(p => ({ id: p.id, quantity: p.quantity }))
    }
  }
}
</script>
