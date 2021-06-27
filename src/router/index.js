import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Local from '../views/Local.vue'
import Online from '../views/Online.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/local',
    name: 'Local',
    component: Local
  },
  {
    path: '/online',
    name: 'Online',
    component: Online
  },
]

const router = new VueRouter({
  routes
})

export default router
