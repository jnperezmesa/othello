import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tableroInicial: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],

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
    jugadorActivo: '',

    contadorFichasNegras: 2,
    contadorFichasBlancas: 2,
    quedanHuecos: true
  },
  mutations: {
    resetBasico: state => {
      state.tableroJuego = state.tableroInicial;
      state.victoria = null;
      state.jugadorActivo = state.fichaNegra;
      state.$forceUpdate();
    },
    nuevaPartida: state => {
      state.jugador1 = state.fichaNegra;
      state.jugador2 = state.fichaBlanca;
      this.resetBasico();
    },
    revancha: state => {
      if (state.jugador1 === state.fichaBlanca) {
        state.jugador1 = state.fichaNegra;
        state.jugador2 = state.fichaBlanca;
      }
      if (state.jugador1 === state.fichaNegra) {
        state.jugador2 = state.fichaNegra;
        state.jugador1 = state.fichaBlanca;
      }
      this.resetBasico();
    },
    turno: state => {
      if (state.jugadorActivo === state.fichaNegra) {
        state.jugadorActivo = state.fichaBlanca;
      } else {
        state.jugadorActivo = state.fichaNegra;
      }
    }
  },
  getters: {
    tablero: state => {
      if (state.jugadorActivo === 1) {
        return _.flattenDeep(state.tableroJuego);
      } else {
        return _.flattenDeep(state.tableroJuego);
      }
    },
    fichasNegras: state => {
      let fichas = [];
      fichas = this.tablero.filter(casilla => {
        return casilla === state.fichaNegra;
      });
      return fichas.length;
    },
    fichasBlancas: state => {
      let fichas = [];
      fichas = this.tablero.filter(casilla => {
        return casilla === state.fichaBlanca;
      });
      return fichas.length;
    }
  },
  actions: {
  },
  modules: {
  }
})
