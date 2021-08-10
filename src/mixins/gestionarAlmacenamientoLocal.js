// Funciones que controlan el almacenamiento local

export default {
    data: function () {
        return {
            local: window.localStorage,
        }
    },
    methods: {
        comprobarIdJugador: function () {
            if (this.$store.state.idJugador === '') {
                this.recuperarLocal();
                if (this.$store.state.idJugador === '') {
                    this.$store.commit('crearIdJugador');
                    setTimeout(() => {
                        this.guardarEnLocal();
                    }, 1000);
                }
            }
        },
        guardarEnLocal: function () {
            if (this.$store.state.permitirMemoria) {
                return this.local.setItem('othello', JSON.stringify(
                    {
                        "id_jugador": this.$store.state.idJugador,
                        "disenyoTablero": this.$store.state.disenyoTablero,
                        "disenyoFichaNegra": this.$store.state.disenyoFichaNegra,
                        "disenyoFichaBlanca": this.$store.state.disenyoFichaBlanca
                    }
                ))
            }
        },
        recuperarLocal: function () {
            if (this.local.getItem('othello') !== null) {
                let datos = JSON.parse(this.local.getItem('othello'));
                this.$store.state.idJugador = datos["id_jugador"];
                this.$store.state.disenyoTablero = datos["disenyoTablero"];
                this.$store.state.disenyoFichaNegra = datos["disenyoFichaNegra"];
                this.$store.state.disenyoFichaBlanca = datos["disenyoFichaBlanca"];
            }
        },
    }
}