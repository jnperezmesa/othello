import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'


const tableroInicial = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    tableroJuego: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],

    fichaBlanca: 1,
    fichaNegra: 2,
    casillaVacia: 0,

    disenyoTablero: 'classic',
    disenyoFichaNegra: 'classic',
    disenyoFichaBlanca: 'classic',

    victoria: null,

    jugador1: 2,
    jugador2: 1,
    jugadorActivo: 2,

    contadorFichasNegras: 2,
    contadorFichasBlancas: 2,
    quedanHuecos: true
  },
  mutations: {
    reset: state => {
      // Reestablezco el tablero
      state.tableroJuego = _.cloneDeep(tableroInicial);
      // Establezco que nadie tiene la victoria
      state.victoria = null;
      // Doy el turno a las fichas negras
      state.jugadorActivo = state.fichaNegra;
      console.log('reseteo')
    },
    inicio: state => {
      // Establezco que fichas lleva cada jugador
      state.jugador1 = state.fichaNegra;
      state.jugador2 = state.fichaBlanca;
      console.log('Nueva partida')
    },
    inicioConCambio: state => {
      // Compruebo que ficha lleva el jugador 1
      if (state.jugador1 === state.fichaBlanca) {
        // Jugador 1 pasa a llevar negras y jugador 2 blancas
        state.jugador1 = state.fichaNegra;
        state.jugador2 = state.fichaBlanca;
      }
      if (state.jugador1 === state.fichaNegra) {
        // Jugador 1 pasa a llevar blancas y jugador 2 negras
        state.jugador2 = state.fichaNegra;
        state.jugador1 = state.fichaBlanca;
      }
      console.log('Revancha')
      //console.log(state.tableroJuego)
    },
    turno: state => {
      // Compruebo quien tiene el turno
      if (state.jugadorActivo === state.fichaNegra) {
        // Cambio el turno de negro a  blanco
        state.jugadorActivo = state.fichaBlanca;
      } else {
        // Cambio el turno de blanco a negro
        state.jugadorActivo = state.fichaNegra;
      }
    }
  },
  getters: {
    tablero: state => {
      // Utilizo el jugador para forzar la actualizacion del array sin profundidad
      if (state.jugadorActivo === 1) {
        // Elimino la profundidad de la matriz y la comvierto en un array simple
        return _.flattenDeep(state.tableroJuego);
      } else {
        return _.flattenDeep(state.tableroJuego);
      }
    },
  },
  actions: {
    nuevaPartida: (context) => {
      context.commit('reset');
      context.commit('inicio');
    },
    revancha: (context) => {
      context.commit('reset');
      context.commit('inicioConCambio');
    }
  },
  modules: {
  }
})
