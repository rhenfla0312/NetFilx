import { createApp } from 'vue'

// components
import App from './App.vue'
// plugin
import router from './routers/index.js'
import store from './store/index.js'

// alert plugin
// 전역으로 사용한다면 this.$plugin 으로 객체처럼 사용할수가 있다
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


// full page
// import 'vue-fullpage.js/dist/style.css'
// // import './fullpage.scrollHorizontally.min' // Optional. When using fullpage extensions
// import VueFullPage from 'vue-fullpage.js'

createApp(App).use(VueSweetalert2).use(router).use(store).mount('#app')
