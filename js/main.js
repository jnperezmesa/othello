
const fichaBlanca = 1;
const fichaNegra = 2;
const casillaVacia = 0;

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


new Vue({
    el: '#app',
    data: {
        tableroJuego: tableroInicial,
        fichaBlanca: fichaBlanca,
        fichaNegra: fichaNegra,
        casillaVacia: casillaVacia,

        desplegado: true
        menu:
    },
    mounted: function () {
    },
    methods: {
        nuevaPartida: function () {
            this.tableroJuego = tableroInicial;
        },
    },
    computed: {

    },
    watch: {
        tableroJuego: function () {
            return this.tableroJuego;
        }
    }
})