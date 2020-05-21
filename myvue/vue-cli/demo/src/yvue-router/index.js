import Vue from 'vue'
import YVueRouter from './yvue-router'
import Home from '@/views/Home.vue'

Vue.use(YVueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  }
]

const router = new YVueRouter({
  routes
})

export default router
