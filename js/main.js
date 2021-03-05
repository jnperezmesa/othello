// Fichas
const fichaBlanca = 1;
const fichaNegra = 2;
const casillaVacia = 0;

// Tablero de nueva partida
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

/*
* Menus:
    * Inicio: 1
    * Ajustes: 2
    * Menu: 3
    * Victoria: 4
* */


new Vue({
    el: '#app',
    data: {
        tableroJuego: tableroInicial,
        fichaBlanca: fichaBlanca,
        fichaNegra: fichaNegra,
        casillaVacia: casillaVacia,

        desplegado: true,
        menu: 1,
        victoria: 0,

        jugador1: true,
        jugador2: false,
        jugadorActivo: true
    },
    mounted: function () {
    },
    methods: {
        nuevaPartida: function () {
            this.tableroJuego = tableroInicial;
            this.desplegado = false;
            this.menu = 3;
        },
        turno: function () {
            this.jugadorActivo = !this.jugadorActivo;
        },
        colocarFicha: function () {

        }
    },
    computed: {

    },
    watch: {
        tableroJuego: function () {
            return this.tableroJuego;
        }
    }
})