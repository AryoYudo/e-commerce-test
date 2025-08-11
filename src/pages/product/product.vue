<template>
  <div class="container py-4">
    <!-- Header -->
  <div>
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>

          <h2>Products</h2>
          <p class="text-muted">Manage your product inventory</p>
        </div>
        <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#addProductModal">
          <i class="bi bi-plus-lg"></i> Add Product
        </button>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="addProductModal" tabindex="-1" aria-hidden="true" >
        <div class="modal-dialog modal-md modal-dialog-centered">
          <div class="modal-content border-0 rounded-3 shadow">
            <!-- Header -->
            <div class="modal-header border-0 pb-0">
              <div>
                <h5 class="modal-title fw-bold">Add New Product</h5>
                <small class="text-muted">Create a new product for your store</small>
              </div>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <!-- Body -->
            <div class="modal-body">
              <form>
                <!-- Title -->
                <div class="mb-3">
                  <label class="form-label fw-semibold">Title</label>
                  <input
                    v-model="form.title"
                    type="text"
                    class="form-control"
                    placeholder="Enter product title"
                  />
                </div>

                <!-- Description -->
                <div class="mb-3">
                  <label class="form-label fw-semibold">Description</label>
                  <textarea
                    v-model="form.description"
                    class="form-control"
                    rows="3"
                    placeholder="Write a short description..."
                  ></textarea>
                </div>

                <div class="row">
                  <!-- Price -->
                  <div class="col-md-6 mb-3">
                    <label class="form-label fw-semibold">Price</label>
                    <input
                      v-model="form.price"
                      type="number"
                      step="0.01"
                      class="form-control"
                      placeholder="0.00"
                    />
                  </div>

                  <!-- Stock -->
                  <div class="col-md-6 mb-3">
                    <label class="form-label fw-semibold">Stock</label>
                    <input
                      v-model="form.stock"
                      type="number"
                      class="form-control"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div class="row">
                  <!-- Brand -->
                  <div class="col-md-6 mb-3">
                    <label class="form-label fw-semibold">Brand</label>
                    <input
                      v-model="form.brand"
                      type="text"
                      class="form-control"
                      placeholder="Enter brand name"
                    />
                  </div>

                  <!-- Category -->
                  <div class="col-md-6 mb-3">
                    <label class="form-label fw-semibold">Category</label>
                    <select
                      v-model="form.category"
                      class="form-select"
                    >
                      <option value="">Select category</option>
                      <option
                        v-for="cat in categories"
                        :key="cat"
                        :value="cat"
                      >
                        {{ cat }}
                      </option>
                    </select>
                  </div>
                </div>
              </form>
            </div>

            <!-- Footer -->
            <div class="modal-footer border-0">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-dark px-4"
                @click="saveProduct"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Search & Filter -->
    <div class="row mb-4">
      <div class="col-md-8 mb-2">
        <input v-model="search" type="text" class="form-control" placeholder="Search products..." />
      </div>
      <div class="col-md-4 mb-2">
        <select v-model="selectedCategory" class="form-select">
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
    </div>

    <!-- Product Cards -->
    <div class="row">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="col-md-4 mb-4"
      >
        <div class="card h-100 shadow-sm">
          <img
            :src="product.thumbnail"
            class="card-img-top"
            style="height: 220px; object-fit: contain"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-truncate">{{ product.title }}</h5>
            <p class="card-text text-muted small text-truncate">
              {{ product.description }}
            </p>
            <div class="mt-auto">
              <div class="d-flex justify-content-between align-items-center">

                <h5 class="fw-bold">${{ product.price }}</h5>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-star-fill text-warning me-1"></i>
                  <span>{{ product.rating }}</span>
                </div>
              </div>
                          <!-- category kiri, stock kanan -->
              <div class="d-flex justify-content-between align-items-center">
                <span class="badge bg-secondary text-capitalize">{{ product.category }}</span>
                <span class="text-muted small">Stock: {{ product.stock }}</span>
              </div>
            </div>
          </div>
          <div class="card-footer bg-white border-0 d-flex justify-content-start gap-2">
            <button class="btn border btn-sm" title="Edit">
              <i class="bi bi-pencil"  @click="openEditModal(product)"></i>
            </button>
            <button class="btn border btn-sm" title="Delete">
              <i class="bi bi-trash"  @click="deleteProduct(product.id)" ></i>
            </button>
          </div>

        </div>
      </div>
    </div>
    <div class="modal fade" id="editProductModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Product</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <input v-model="form.title" class="form-control mb-2" placeholder="Title" />
            <textarea v-model="form.description" class="form-control mb-2" placeholder="Description"></textarea>
            <input v-model="form.price" type="number" step="0.01" class="form-control mb-2" placeholder="Price" />
            <input v-model="form.stock" type="number" class="form-control mb-2" placeholder="Stock" />
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
            <button class="btn btn-dark " @click="updateProduct">Update Product</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Toast Container -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="deleteToast" class="toast align-items-center text-bg-success border-0" role="alert">
        <div class="d-flex">
          <div class="toast-body">
            Product deleted successfully!
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import axios from "axios";
import * as bootstrap from 'bootstrap';
import Swal from "sweetalert2";


export default {
  name: "ProductPage",
  data() {
    return {
      products: [],
      search: "",
      selectedCategory: "",
      form: {
        title: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        stock: ""
      },
      editMode: false
    };
  },
  computed: {
    categories() {
      const allCats = this.products.map((p) => p.category);
      return [...new Set(allCats)];
    },
    filteredProducts() {
      return this.products.filter((p) => {
        const matchesSearch = p.title
          .toLowerCase()
          .includes(this.search.toLowerCase());
        const matchesCategory = this.selectedCategory
          ? p.category === this.selectedCategory
          : true;
        return matchesSearch && matchesCategory;
      });
    },
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    openEditModal(product) {
      this.editMode = true;

      // Isi form dengan data product yang dipilih
      this.form = {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        brand: product.brand,
        stock: product.stock
      };

      // Tampilkan modal
      const modalEl = document.getElementById("editProductModal");
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    },

    async fetchProducts() {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        const fetchedProducts = res.data.products;
        const allProducts = [...this.products, ...fetchedProducts];
        const uniqueProducts = allProducts.filter(
          (prod, index, self) =>
            index === self.findIndex(p => p.id === prod.id)
        );
        this.products = uniqueProducts.sort((a, b) => b.id - a.id);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    },

    async updateProduct() {
      try {
        const res = await axios.put(
          `https://dummyjson.com/products/${this.form.id}`,
          {
            title: this.form.title,
            description: this.form.description,
            price: parseFloat(this.form.price),
            category: this.form.category,
            brand: this.form.brand,
            stock: parseInt(this.form.stock)
          }
        );

        // Update data di state
        const index = this.products.findIndex(p => p.id === this.form.id);
        if (index !== -1) {
          this.products[index] = res.data;
        }

        // Tutup modal edit
        const modalEl = document.getElementById("editProductModal");
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();

        // Toast sukses
        Swal.fire({
          toast: true,
          position: 'bottom-end',
          icon: 'success',
          title: 'Product updated successfully!',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });

      } catch (error) {
        // Toast error
        Swal.fire({
          toast: true,
          position: 'bottom-end',
          icon: 'error',
          title: 'Failed to update product',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });
      }
    },


    async deleteProduct(id) {

      try {
        await axios.delete(`https://dummyjson.com/products/${id}`);

        // Hapus dari state
        this.products = this.products.filter(p => p.id !== id);

        Swal.fire({
          toast: true,
          position: 'bottom-end',
          icon: 'success',
          title: 'Product deleted successfully',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });

      } catch (err) {
        Swal.fire({
          toast: true,
          position: 'bottom-end',
          icon: 'error',
          title: 'Failed to delete product',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });
      }
    },

    async saveProduct() {
      if (
        !this.form.title ||
        !this.form.description ||
        !this.form.price ||
        !this.form.category ||
        !this.form.brand ||
        !this.form.stock
      ) {
        Swal.fire("Error", "All fields are required!", "error");
        return;
      }

      try {
        const res = await axios.post("https://dummyjson.com/products/add", {
          title: this.form.title,
          description: this.form.description,
          price: parseFloat(this.form.price),
          category: this.form.category,
          brand: this.form.brand,
          stock: parseInt(this.form.stock)
        });

        this.products.push(res.data);

        this.form = {
          title: "",
          description: "",
          price: "",
          category: "",
          brand: "",
          stock: ""
        };

        document.querySelector('#addProductModal .btn-close').click();

        document.body.classList.remove('modal-open');
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('padding-right');
        document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());

        Swal.fire({
          toast: true,
          position: 'bottom-end',
          icon: 'success',
          title: 'Product deleted successfully',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });
      } catch (error) {
        Swal.fire({
          toast: true,
          position: 'bottom-end',
          icon: 'error',
          title: 'Failed to add product',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });
      }
    }


  },
};
</script>

<style>
.card-title {
  font-size: 1rem;
}
</style>
