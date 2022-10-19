import { createRouter, createWebHashHistory } from 'vue-router'

// components
import Home from './Home.vue'


export default createRouter({
  // scrollBehavior() {
  //   return { top : 0 }
  // }

  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
  ]
})