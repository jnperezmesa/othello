
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
        tableroJuego: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ],

        fichaBlanca: fichaBlanca,
        fichaNegra: fichaNegra,
        casillaVacia: casillaVacia,
    },
    mounted: function () {
        this.nuevaPartida();
    },
    methods: {
        nuevaPartida: function () {
            this.tableroJuego = tableroInicial.reverse();
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