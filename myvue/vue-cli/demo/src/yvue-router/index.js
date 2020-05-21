import Vue from 'vue'
import YVueRouter from './yvue-router'
import Home from '@/views/Home.vue'
import Info from '@/views/Info.vue'

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
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    children: [
      {
        path: '/about/info',
        name: 'Info',
        component: Info
      }
    ]
  }
]

const router = new YVueRouter({
  routes
})

export default router
