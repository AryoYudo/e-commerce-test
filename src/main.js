// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Bootstrap & Icons
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Buat instance app
const app = createApp(App)

// Gunakan Pinia & Router
app.use(createPinia())
app.use(router)

// Mount ke DOM
app.mount('#app')
