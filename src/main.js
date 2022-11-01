import { createApp } from 'vue'

// components
import App from './App.vue'
// plugin
import router from './routers/index.js'
import store from './store/index.js'

createApp(App).use(router).use(store).mount('#app')
