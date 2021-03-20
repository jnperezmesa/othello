import Vue from 'vue'
import VueRouter from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Juego from '../views/Juego.vue'
import EnPartida from "../views/EnPartida";
import Victoria from "../views/Victoria";
import Personalizar from "../views/Personalizar";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/juego',
    name: 'Juego',
    component: Juego
  },
  {
    path: '/enpartida',
    name: 'EnPartida',
    component: EnPartida
  },
  {
    path: '/victoria',
    name: 'Victoria',
    component: Victoria
  },
  {
    path: '/personalizar',
    name: 'Personalizar',
    component: Personalizar
  }
]

const router = new VueRouter({
  routes
})

export default router
