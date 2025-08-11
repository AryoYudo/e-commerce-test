<template>
  <div class="container my-4">
    <h3>Checkout</h3>
    <p class="text-muted">Complete your purchase</p>

    <div class="row">
      <!-- Form -->
      <div class="col-md-8">
        <!-- Shipping Information -->
        <div class="card mb-4">
          <div class="card-body">
            <h5>Shipping Information</h5>
            <div class="row g-3 mt-2">
              <div class="col-md-6">
                <label for="firstName" class="mb-1 fw-medium">First Name</label>
                <input v-model="shipping.firstName" type="text" placeholder="First Name" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="mb-1 fw-medium">Last Name</label>
                <input v-model="shipping.lastName" type="text" placeholder="Last Name" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="mb-1 fw-medium">Email</label>
                <input v-model="shipping.email" type="email" placeholder="Email" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="mb-1 fw-medium">Phone</label>
                <input v-model="shipping.phone" type="tel" placeholder="Phone" class="form-control" />
              </div>
              <div class="col-12">
                <label class="mb-1 fw-medium">Address</label>
                <input v-model="shipping.address" type="text" placeholder="Address" class="form-control" />
              </div>
              <div class="col-md-4">
                <label class="mb-1 fw-medium">City</label>
                <input v-model="shipping.city" type="text" placeholder="City" class="form-control" />
              </div>
              <div class="col-md-4">
                <label class="mb-1 fw-medium">State</label>
                <input v-model="shipping.state" type="text" placeholder="State" class="form-control" />
              </div>
              <div class="col-md-4">
                <label class="mb-1 fw-medium">ZIP Code</label>
                <input v-model="shipping.zip" type="text" placeholder="ZIP Code" class="form-control" />
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Information -->
        <div class="card">
          <div class="card-body">
            <h5>Payment Information</h5>
            <div class="row g-3 mt-2">
              <div class="col-12">
                <label class="mb-1 fw-medium">Cardholder Name</label>
                <input v-model="payment.cardName" type="text" placeholder="Cardholder Name" class="form-control" />
              </div>
              <div class="col-12">
                <label class="mb-1 fw-medium">Card Number</label>
                <input v-model="payment.cardNumber" type="text" placeholder="1234 5678 9012 3456" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="mb-1 fw-medium">Expiry Date</label>
                <input v-model="payment.expiry" type="text" placeholder="MM/YY" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="mb-1 fw-medium">CVV</label>
                <input v-model="payment.cvv" type="text" placeholder="123" class="form-control" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5>Order Summary</h5>
            <div v-for="item in cart" :key="item.id" class="d-flex align-items-center mb-2">
              <img :src="item.thumbnail" alt="product" class="me-2" style="width: 40px; height: 40px; object-fit: contain;">
              <div class="flex-grow-1">
                <small>{{ item.title }}</small>
                <div>Qty: {{ item.quantity }}</div>
              </div>
              <div>${{ (item.price * item.quantity).toFixed(2) }}</div>
            </div>
            <hr>
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
            <button class="btn btn-dark w-100 mt-3" @click="completeOrder">Complete Order</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CheckoutPage",
  data() {
    return {
      shipping: {
        firstName: "Aryo",
        lastName: "Yudo",
        email: "aryoyudoo@gmail.com",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: ""
      },
      payment: {
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
      },
      cart: [], // data dari localStorage nanti
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
  mounted() {
    console.log("Mounted Hook Called");
    this.loadCartFromLocalStorage();
  },

  methods: {

  async fetchProductDetails(cartProducts) {
    try {
      console.log('Fetching product details for:', cartProducts);
      const products = await Promise.all(
        cartProducts.map(async (item) => {
          const res = await axios.get(`https://dummyjson.com/products/${item.id}`);
          return {
            id: item.id,
            quantity: item.quantity,
            title: res.data.title,
            thumbnail: res.data.thumbnail,
            price: 2.0
          };
        })
      );
      this.cart = products;
      console.log('Fetched products:', products);
    } catch (err) {
      console.error("Failed fetch product details", err);
      this.cart = cartProducts.map(item => ({
        ...item,
        title: "Unknown Product",
        thumbnail: "",
        price: 2.0
      }));
    }
  },

  async loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('userCart');
    console.log('LocalStorage userCart:', savedCart);
    if (savedCart) {
      const cartProducts = JSON.parse(savedCart);
      console.log('Parsed cartProducts:', cartProducts);
      if (cartProducts.length > 0) {
        await this.fetchProductDetails(cartProducts);
      } else {
        this.cart = [];
      }
    } else {
      this.cart = [];
    }
  },
}



};

</script>
