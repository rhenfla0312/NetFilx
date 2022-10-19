import { createApp } from 'vue'

// components
import App from './App.vue'
// plugin
import router from './routers'

createApp(App).use(router).mount('#app')
