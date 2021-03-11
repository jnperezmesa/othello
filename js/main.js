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

        disenyoTablero: 'classic',
        disenyoFichaNegra: 'classic',
        disenyoFichaBlanca: 'classic',


        desplegado: true,
        menu: 1,
        victoria: null,

        jugador1: 2,
        jugador2: 1,
        jugadorActivo: '',

        contadorFichasNegras: 2,
        contadorFichasBlancas: 2,
        quedanHuecos: true
    },
    filter: {
    },
    mounted: function () {
    },
    methods: {
        resetBasico: function () {
            this.desplegado = false;
            this.tableroJuego = tableroInicial;
            this.victoria = null;
            this.jugadorActivo = this.fichaNegra;
            this.menu = 3;
        },
        nuevaPartida: function () {
            this.jugador1 = this.fichaNegra;
            this.jugador2 = this.fichaBlanca;
            this.resetBasico();
        },
        revancha: function () {
            if (this.jugador1 === this.fichaBlanca) {
                this.jugador1 = this.fichaNegra;
                this.jugador2 = this.fichaBlanca;
            }
            if (this.jugador1 === this.fichaNegra) {
                this.jugador2 = this.fichaNegra;
                this.jugador1 = this.fichaBlanca;
            }
            this.resetBasico();
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
            this.$forceUpdate();
        },
        convertirFichas: function (x, y) {
            this.turno();
        },
    },
    computed: {
        tablero: function () {
            if (this.jugadorActivo === 1) {
                return _.flattenDeep(this.tableroJuego);
            } else {
                return _.flattenDeep(this.tableroJuego);
            }
        },
        fichasNegras: function () {
            let fichas = [];
            fichas = this.tablero.filter(casilla => {
                return casilla === this.fichaNegra;
            });
            return fichas.length;
        },
        fichasBlancas: function () {
            let fichas = [];
            fichas = this.tablero.filter(casilla => {
                return casilla === this.fichaBlanca;
            });
            return fichas.length;
        }
    },
    watch: {
        jugadorActivo: function () {
            if (!this.tablero.includes(casillaVacia)) {
                if (this.fichasNegras < this.fichasBlancas) {
                    this.victoria = this.fichaNegra;
                }
                if (this.fichasNegras < this.fichasBlancas) {
                    this.victoria = this.fichaBlanca;
                }
                if (this.fichasNegras === this.fichasBlancas) {
                    this.victoria = 0;
                }
                this.menu = 4;
                this.desplegado = true;
            }
            console.log(this.jugadorActivo);
            console.log('Negras '.concat(this.fichasNegras));
            console.log('Blancas '.concat(this.fichasBlancas));
        }
    }
})