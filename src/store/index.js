import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
// Mixims
import contarFichas from "../mixins/contarFichas";

// URL DE CONEXION CON EL API
const API_VERSION = 'v2'
const API = 'http://127.0.0.1:8000/api/'.concat(API_VERSION);
const API2 = window.location.origin.concat('/api/' ,API_VERSION);
console.log(API2)
const API_NUEVO_JUGADOR = API.concat('/jugador/crear/');
const API_NUEVA_PARTIDA = API.concat('/partida/crear/');
const API_UNIRSE_A_PARTIDA = API.concat('/partida/unirse/');
const API_JUGAR_A_PARTIDA = API.concat('/partida/jugar/');
const API_VER_PARTIDA = API.concat('/partida/');


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

    fichaNegra: 1,
    fichaBlanca: 2,
    empate: 3,
    casillaVacia: 0,

    disenyos: ['classic', 'simple', 'madera'],
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
    estadoActiva: 1,
    estadoEspera: 2,
    estadoCerrada: 3,

    permitirMemoria: true,
    estadoDelServidor: false,

    victoria: 0,


    jugador1: 1,
    jugador2: 2,
    jugadorActivo: 1,

    turno: 0,
    ultimoCambio: '',

    contadorFichasNegras: 2,
    contadorFichasBlancas: 2,

    posiciones: 0,

    menuEstado: false,
    menu: 0,

    menuInicio: 0,
    menuNuevaPartida: 1,
    menuOnlineCrear: 2,
    menuJugando: 3,
    menuPersonalizar: 4,
    menuVictoria: 5,

    idPatida: '',
    idJugador: '',

    juegasCon: 0,
    juegasConDefault: 0,

    abandono: false,

  },
  mutations: {
    // Reinicio del juego
    reset: state => {
      state.abandono = false;
      // Reestablezco el tablero
      state.tableroJuego = _.cloneDeep(tableroInicial);
      // Establezco que nadie tiene la victoria
      state.victoria = 0;
      // Limpio el estado de la partida
      state.estado = state.estadoPorDefecto;
      // Limpio el tipo de partida
      state.tipoDePartida = state.tipoDePartidaPorDefecto;
      // Limpio la ficha que llevo
      state.juegasCon = state.juegasConDefault;
      // Doy el turno a las fichas negras
      state.jugadorActivo = state.fichaNegra;
      // Reseteo el turno
      state.turno = 0;
    },

    // Inicios
    inicio: state => {
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
      } else {
        // Jugador 1 pasa a llevar blancas y jugador 2 negras
        state.jugador1 = state.fichaBlanca;
        state.jugador2 = state.fichaNegra;
      }
    },

    // Jugadores
    soyJugador1: state => {
      state.juegasCon = state.jugador1;
    },
    soyJugador2: state => {
      state.juegasCon = state.jugador2;
    },

    //  Tipos de partida
    tipoOnline: state => {
      // Establezco el estado
      state.estado = state.estadoEspera;
      // Abro la partida
      state.tipoDePartida = state.partidaOnline;
    },
    tipoLocal: state => {
      // Establezco el estado
      state.estado = state.estadoActiva;
      // Abro la partida
      state.tipoDePartida = state.partidaLocal;
    },
    tipoBoot: state => {
      // Establezco el estado
      state.estado = state.estadoActiva;
      // Abro la partida
      state.tipoDePartida = state.partidaBoot;
    },

    // Modos
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
      // Selecciono el menú que tiene que estar activo
      state.menu = state.menuVictoria;
      // Despliego el menu
      state.menuEstado = false;
    },
    modoAbandono: state => {
      // Establezco abandono
      state.abandono = true;
      // Selecciono el menú que tiene que estar activo
      state.menu = state.menuVictoria;
      // Despliego el menu
      state.menuEstado = false;
    },

    // Conexion con el api
    enviarPing: state => {
      fetch(API.concat("/ping/"), {
        headers: {
          'Content-type': 'application/json',
          "Access-Control-Allow-Origin": "*",
        },
        method: 'GET',
        body: JSON.stringify()
      })
          .then((response) => {
            // Transforma la respuesta. En este caso lo convierte a JSON
            return response.json();
          })
          .then((json) => {
            // Usamos la información recibida como necesitemos
            if (json['response'] === "pong") {
              return state.estadoDelServidor = json['response']
            }
          });
      return state.estadoDelServidor = false
    },
    crearIdJugador: state => {
      fetch(API_NUEVO_JUGADOR, {
        headers: {
          'Content-type': 'application/json',
          "Access-Control-Allow-Origin": "*",
        },
        method: 'POST',
        body: JSON.stringify()
      })
          .then((response) => {
            // Transforma la respuesta. En este caso lo convierte a JSON
            return response.json();
          })
          .then((json) => {
            // Usamos la información recibida como necesitemos
            return state.idJugador = json['id_jugador'];
          });
    },
    crearPartida: state => {
      fetch(API_NUEVA_PARTIDA.concat(state.tipoDePartida, '/', state.idJugador, '/'), {
        headers: {
          'Content-type': 'application/json',
          "Access-Control-Allow-Origin": "*",
        },
        method: 'POST',
        body: JSON.stringify()
      })
          .then((response) => {
            // Transforma la respuesta. En este caso lo convierte a JSON
            return response.json();
          })
          .then((json) => {
            // Usamos la información recibida como necesitemos
            state.idPatida = json['id_partida'];
            state.ultimoCambio = json['fecha_ultima_actualizacion'];
          });
    },
    unirseAPartida: state => {
      fetch(API_UNIRSE_A_PARTIDA.concat(state.idPatida, '/', state.idJugador, '/'), {
        headers: {
          'Content-type': 'application/json',
          "Access-Control-Allow-Origin": "*",
        },
        method: 'PUT',
      })
          .then((response) => {
            // Transforma la respuesta. En este caso lo convierte a JSON
            return response.json();
          })
          .then((json) => {
            // Usamos la información recibida como necesitemos
            if (state.ultimoCambio !== json['fecha_ultima_actualizacion']) {
              state.estado = json['estado'];
              state.turno = json['turno'];
              state.jugadorActivo = json['juega'];
              state.victoria = json['victoria'];
              state.tableroJuego = _.cloneDeep(JSON.parse(json['tablero']))
              state.ultimoCambio = json['fecha_ultima_actualizacion'];
            }
          });
    },
    actualizarPartida: state => {
      fetch(API_JUGAR_A_PARTIDA.concat(state.idPatida, '/', state.idJugador, '/'), {
        headers: {
          'Content-type': 'application/json',
          "Access-Control-Allow-Origin": "*",
        },
        method: 'PUT',
        body: JSON.stringify(
      {
              "estado": state.estado,
              "turno": state.turno,
              "juega": state.jugadorActivo,
              "victoria": state.victoria,
              "contador_jugador_1": state.contadorFichasNegras,
              "contador_jugador_2": state.contadorFichasBlancas,
              "tablero": JSON.stringify(state.tableroJuego),
              "state.ultimoCambio": state.ultimoCambio,
            }
        )
      })
          .then((response) => {
            // Transforma la respuesta. En este caso lo convierte a JSON
            return response.json();
          })
          .then((json) => {
            // Usamos la información recibida como necesitemos
            if (state.ultimoCambio !== json['fecha_ultima_actualizacion']) {
              state.estado = json['estado'];
              state.turno = json['turno'];
              state.jugadorActivo = json['juega'];
              state.victoria = json['victoria'];
              state.tableroJuego = _.cloneDeep(JSON.parse(json['tablero']))
              state.ultimoCambio = json['fecha_ultima_actualizacion'];
            }
          });
    },
    pedirCambios: state => {
      fetch(API_VER_PARTIDA.concat(state.idPatida))
          .then((response) => {
            // Transforma la respuesta. En este caso lo convierte a JSON
            return response.json();
          })
          .then((json) => {
            // Usamos la información recibida como necesitemos
            if (state.ultimoCambio !== json['fecha_ultima_actualizacion']) {
              state.estado = json['estado'];
              state.turno = json['turno'];
              state.jugadorActivo = json['juega'];
              state.victoria = json['victoria'];
              state.tableroJuego = _.cloneDeep(JSON.parse(json['tablero']))
              state.ultimoCambio = json['fecha_ultima_actualizacion'];
            }
          });
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
    },
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
      context.commit('crearPartida');
    },
    nuevaPartidaOnline: (context) => {
      context.commit('enviarPing')
      context.commit('reset');
      context.commit('tipoOnline');
      context.commit('inicio');
      context.commit('soyJugador1');
      context.commit('crearPartida');
    },
    unirseAPartidaOnline: (context) => {
      context.commit('reset');
      context.commit('tipoOnline');
      context.commit('inicio');
      context.commit('soyJugador2');
      context.commit('modoJuego');
      context.commit('unirseAPartida');
    },
    comprobarCambios: (context) => {
      if (context.state.tipoDePartida === context.state.partidaOnline) {
        if (context.state.estado === context.state.estadoActiva && context.state.turno === 0) {
          context.commit('modoJuego');
        }
        context.commit('pedirCambios');
        if (context.state.victoria !== 0) {
          context.commit('modoVictoria')
        }
      }
    },
    revancha: (context) => {
      context.commit('reset');
      context.commit('tipoLocal');
      context.commit('inicioConCambio');
      context.commit('modoJuego');
      context.commit('crearPartida');
    },
    rendirse: (context) => {
      context.commit('modoVictoria');
    },
    victoria: (context) => {
      context.commit('modoVictoria');
    },
  },
  modules: {
  },
  mixins: [
    // Computed
    contarFichas
  ],
})
