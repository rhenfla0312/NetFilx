import { createRouter, createWebHashHistory } from 'vue-router'

// components
import Home from './Home.vue'
import DetailInfo from './Detail_info.vue'

export default createRouter({
  scrollBehavior() {
    return { top : 0 }
  },

  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/detail/:id?',
      // name은 "" -> 문자열로 적어줘야한다
      name: "DetailInfo",
      component: DetailInfo 
    }
  ]
})