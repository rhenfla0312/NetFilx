import { createRouter, createWebHashHistory } from 'vue-router'

// components
import Home from './Home.vue'
import DetailInfo from './Detail_info.vue'
import New from './New.vue'
import Popular from './Popular.vue'
import Search from './Search.vue'

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
      path: '/detail/:CHECK_DATA?/:id?',
      // name은 "" -> 문자열로 적어줘야한다
      name: "DetailInfo",
      component: DetailInfo 
    },
    {
      path: '/new',
      name: "New",
      component: New
    },
    {
      path: '/popular',
      name: "Popular",
      component: Popular
    },
    {
      path: '/search/:title?',
      name: "Search",
      component: Search
    }
  ]
})