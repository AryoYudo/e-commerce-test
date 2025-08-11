<template>
  <div class="container py-4">
    <h4 class="fw-bold mb-2">Order History</h4>
    <p class="text-muted">Track and manage your orders</p>

    <div v-for="(order, index) in orders" :key="order.orderId" class="card shadow-sm mb-3 border-0">
      <div class="card-body d-flex justify-content-between align-items-center">
        <!-- Gambar -->
        <img :src="order.thumbnail" alt="Product" class="rounded"
          style="width: 60px; height: 60px; object-fit: contain; background-color: #f8f9fa;" />

        <!-- Info order -->
        <div class="ms-3 flex-grow-1">
          <div class="d-flex align-items-center mb-1">
            <h6 class="mb-0 fw-semibold">Order #{{ order.orderId }}</h6>
            <span class="badge bg-success ms-2">completed</span>
          </div>
          <div class="text-muted small">
            <i class="bi bi-calendar me-1"></i>{{ order.date }}
            <span class="mx-2">|</span>
            <i class="bi bi-currency-dollar me-1"></i>{{ order.total.toFixed(2) }}
            <span class="mx-2">|</span>
            <i class="bi bi-bag me-1"></i>{{ order.quantity }} items
          </div>
        </div>

        <!-- Tombol -->
        <button class="btn btn-outline-secondary btn-sm"
          @click="openOrderDetails(order)">
          <i class="bi bi-eye me-1"></i> View Details
        </button>
      </div>
    </div>

    <!-- Modal Order Details -->
    <div class="modal fade" id="orderModal" tabindex="-1"
      aria-labelledby="orderModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content p-3" v-if="selectedOrder">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="modal-title fw-bold">
              Order #{{ selectedOrder.orderId }} Details
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <small class="text-muted">
            Order placed on {{ selectedOrder.date }}
          </small>

          <!-- Order Info -->
          <div class="row mt-3">
            <div class="col">
              <p class="mb-1 fw-bold">Order Status</p>
              <span class="badge bg-success text-capitalize">
                completed
              </span>
            </div>
            <div class="col text-end">
              <p class="mb-1 fw-bold">Total Amount</p>
              <h5 class="fw-bold">${{ selectedOrder.total.toFixed(2) }}</h5>
            </div>
          </div>

          <!-- Items Ordered -->
          <div class="mt-3">
            <p class="fw-bold mb-2">Items Ordered</p>
            <div v-for="(item, idx) in selectedOrder.items || []" :key="idx"
              class="border rounded p-2 d-flex justify-content-between align-items-center mb-2">
              <div class="d-flex align-items-center">
                <img :src="item.image" alt="" class="rounded me-3"
                  style="width: 50px; height: 50px; object-fit: cover" />
                <div>
                  <p class="mb-0 fw-semibold">{{ item.name }}</p>
                  <small class="text-muted">
                    Quantity: {{ item.qty }} × ${{ item.price }}
                  </small>
                </div>
              </div>
              <div>
                <p class="fw-bold mb-0">${{ item.total }}</p>
              </div>
            </div>
          </div>

          <!-- Shipping Info -->
          <div class="mt-3">
            <p class="fw-bold mb-2">Shipping Information</p>
            <div class="p-3 bg-light rounded">
              <p class="mb-0 fw-semibold">{{ selectedOrder.shipping.name }}</p>
              <p class="mb-0">{{ selectedOrder.shipping.address1 }}</p>
              <p class="mb-0">{{ selectedOrder.shipping.address2 }}</p>
              <small class="text-muted d-block">
                Email: {{ selectedOrder.shipping.email }}
              </small>
              <small class="text-muted d-block">
                Phone: {{ selectedOrder.shipping.phone }}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as bootstrap from "bootstrap";

export default {
  name: "OrderHistoryPage",
  data() {
    return {
      orders: [],
      selectedOrder: null
    };
  },
  methods: {
    async fetchOrders() {
      try {
        const savedOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];

        if (savedOrders.length > 0) {
          this.orders = savedOrders.map((order, i) => ({
            orderId: 1000 + i,
            date: new Date(order.date).toLocaleDateString(),
            thumbnail: order.cart[0]?.thumbnail || '',
            quantity: order.cart.reduce((sum, item) => sum + (item.qty || 1), 0),
            total: order.total,
            items: order.cart.map(c => ({
              name: c.name || c.title,
              qty: c.qty || 1,
              price: c.price,
              total: (c.qty || 1) * c.price,
              image: c.thumbnail
            })),
            shipping: {
              name: `${order.shipping.firstName} ${order.shipping.lastName}`,
              address1: order.shipping.address,
              address2: `${order.shipping.city}, ${order.shipping.state} ${order.shipping.zip}`,
              email: order.shipping.email,
              phone: order.shipping.phone
            }
          }));
        }
      } catch (err) {
        console.error("Gagal memuat data:", err);
      }
    },

    openOrderDetails(order) {
      this.selectedOrder = order;
      const modal = new bootstrap.Modal(document.getElementById("orderModal"));
      modal.show();
    }
  },

  mounted() {
    this.fetchOrders();
  }
};
</script>
