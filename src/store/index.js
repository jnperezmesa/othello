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

    tipoDePartida: 0,
    tipoDePartidaPorDefecto: 0,
    partidaOnline: 1,
    partidaLocal: 2,
    partidaBoot: 3,

    estado: 0,
    estadoPorDefecto: 0,
    estadoEspera: 1,
    estadoActiva: 2,
    estadoCerrada: 3,

    victoria: false,

    jugador1: 2,
    jugador2: 1,
    jugadorActivo: 2,

    contadorFichasNegras: 2,
    contadorFichasBlancas: 2,

    posiciones: 0,

    menuEstado: false,
    menu: 0,

    menuInicio: 0,
    menuNuevaPartida: 1,
    menuOnlineOpciones: 2,
    menuOnlineCrear: 3,
    menuOnlineUnirse: 4,
    menuJugando: 5,
    menuPersonalizar: 6,
    menuVictoria: 7,

    idPatida: 'Test',
    idJugador: '',
    juegasCon: 0,
    juegasConDefault: 0,

  },
  mutations: {
    reset: state => {
      // Reestablezco el tablero
      state.tableroJuego = _.cloneDeep(tableroInicial);
      // Establezco que nadie tiene la victoria
      state.victoria = false;
      // Limpio el estado de la partida
      state.estado = state.estadoPorDefecto;
      // Limpio el tipo de partida
      state.tipoDePartida = state.tipoDePartidaPorDefecto;
      // Limpio la ficha que llevo
      state.juegasCon = state.juegasConDefault;
      // Doy el turno a las fichas negras
      state.jugadorActivo = state.fichaNegra;
    },
    inicio: state => {
      // Abro la partida
      state.estado = state.estadoActiva;
      // Establezco que fichas lleva cada jugador
      state.jugador1 = state.fichaNegra;
      state.jugador2 = state.fichaBlanca;
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
    },
    soyJugador1: state => {
      state.juegasCon = state.jugador1;
    },
    soyJugador2: state => {
      state.juegasCon = state.jugador2;
    },
    tipoOnline: state => {
      // Abro la partida
      state.tipoDePartida = state.partidaOnline;
    },
    tipoLocal: state => {
      // Abro la partida
      state.tipoDePartida = state.partidaLocal;
    },
    tipoBoot: state => {
      // Abro la partida
      state.tipoDePartida = state.partidaBoot;
    },
    modoJuego: state => {
      // Selecciono el menú que tiene que estar activo.
      state.menu = state.menuJugando;
      // Oculto el menu
      state.menuEstado = true;
    },
    modoMenu: state => {
      // Selecciono el menú que tiene que estar activo
      state.menu = state.menuInicio;
      // Abro el menu
      state.menuEstado = false;
    },
    modoVictoria: state => {
      // Declaro la victoria
      state.victoria = true
      // Ciero la partida
      state.estado = state.estadoCerrada;
      // Selecciono el menú que tiene que estar activo
      state.menu = state.menuVictoria;
      // Despliego el menu
      state.menuEstado = false;
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
    },
    desplegarMenu: state => {
      return state.menuEstado = !state.menuEstado
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
      context.commit('tipoLocal');
      context.commit('inicio');
      context.commit('modoJuego');
    },
    nuevaPartidaOnline: (context) => {
      context.commit('reset');
      context.commit('tipoOnline');
      context.commit('inicio');
      context.commit('soyJugador1');
    },
    unirseAPartidaOnline: (context) => {
      context.commit('reset');
      context.commit('inicio');
      context.commit('soyJugador2');
      context.commit('modoJuego');
    },
    revancha: (context) => {
      context.commit('reset');
      context.commit('inicioConCambio');
    },
    rendirse: (context) => {
      context.commit('reset');
      context.commit('modoMenu');
    },
    victoria: (context) => {
      context.commit('modoVictoria');
    },
  },
  modules: {
  }
})
