import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

// eslint-disable-next-line
const routes: any[] = [
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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/gratitude/detail/:id',
    name: 'gratitude/detail',
    component: () => import('../views/gratitude/Detail.vue')
  },
  {
    path: '/gratitude/new',
    name: 'addgratitude',
    component: () => import('../views/gratitude/AddGratitude.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
