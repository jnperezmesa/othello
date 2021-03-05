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

        jugador1: 2,
        jugador2: 1,
        jugadorActivo: '',

        tablero: [],
        contarNegras: [],
        contarBlancas: []
    },
    mounted: function () {
    },
    methods: {
        nuevaPartida: function () {
            this.tableroJuego = tableroInicial;
            this.desplegado = false;
            this.jugador1 = this.fichaNegra;
            this.jugador2 = this.fichaBlanca;
            this.jugadorActivo = this.fichaNegra;
            this.menu = 3;
        },
        revancha: function () {
            this.tableroJuego = tableroInicial;
            this.desplegado = false;
            if (this.jugador1 === this.fichaBlanca) {
                this.jugador1 = this.fichaNegra;
                this.jugador2 = this.fichaBlanca;
            }
            if (this.jugador1 === this.fichaNegra) {
                this.jugador2 = this.fichaNegra;
                this.jugador1 = this.fichaBlanca;
            }
            this.jugadorActivo = this.fichaNegra;
            this.menu = 3;
        },
        turno: function () {
            if (this.jugadorActivo === this.fichaNegra) {
                this.jugadorActivo = this.fichaBlanca;
            } else {
                this.jugadorActivo = this.fichaNegra;
            }
        },
        colocarFicha: function (x, y) {
            this.tableroJuego[x][y] = this.jugadorActivo;
            this.convertirFichas();
            // no va
            this.revisarTablero();
            this.$forceUpdate();
        },
        convertirFichas: function () {
            this.turno();
        },
        // No va
        revisarTablero: function () {
            this.tablero = _.flattenDeep(this.tableroJuego);
            this.contarBlancas = this.tablero.filter(this.fichaBlanca);
            this.contarNegras = this.tablero.filter(this.fichaNegra);
        },
    },
    computed: {
    },
    watch: {
    }
})