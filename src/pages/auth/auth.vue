<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div class="card shadow-sm border-0" style="max-width: 400px; width: 100%;">
      <div class="card-body p-4">
        <h4 class="fw-bold text-center mb-1">Sign in</h4>
        <p class="text-muted text-center mb-4">
          Enter your credentials to access the e-commerce dashboard
        </p>

        <form @submit.prevent="handleLogin">
          <!-- Username -->
          <div class="mb-3">
            <label class="form-label fw-semibold">Username</label>
            <input
              v-model="username"
              type="text"
              placeholder="Enter your username"
              class="form-control"
              required
            />
          </div>

          <!-- Password -->
          <div class="mb-4">
            <label class="form-label fw-semibold">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="form-control"
              required
            />
          </div>

          <!-- Sign in Button -->
          <button
            type="submit"
            class="btn btn-dark w-100 py-2 fw-semibold"
          >
            Sign in
          </button>
        </form>

        <!-- Error Message -->
        <div v-if="error" class="text-danger text-center mt-3 small">
          {{ error }}
        </div>

        <!-- Demo Credentials -->
        <div class="mt-4 p-3 rounded bg-light border">
          <p class="small fw-semibold mb-1 text-primary">Demo Credentials:</p>
          <p class="small mb-0">Username: emilys</p>
          <p class="small mb-0">Password: emilyspass</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async handleLogin() {
      this.error = "";
      try {
        const res = await axios.post("https://dummyjson.com/auth/login", {
          username: this.username,
          password: this.password
        });

        console.log("Login success:", res.data);

        // Simpan token atau flag login
        localStorage.setItem("token", res.data.token);

        alert(`Welcome, ${res.data.firstName} ${res.data.lastName}!`);

        // Redirect ke dashboard
        this.$router.push("/dashboard");
      } catch (err) {
        this.error = "Invalid username or password.";
      }
    }

  }
};
</script>

<style>
body {
  font-family: "Segoe UI", sans-serif;
}
</style>
