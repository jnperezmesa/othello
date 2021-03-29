export default {
    computed: {
        // Contador de fichas negras
        fichasNegras: function () {
            // Creo un array para almacenar las fichas negras
            let fichas = [];
            // Filtro el array para quedarme las fichas negras
            fichas = this.$store.getters.tablero.filter(casilla => {
                return casilla === this.$store.state.fichaNegra;
            });
            // Devuelvo el total de posiciones
            return fichas.length;
        },
        // Contador de fichas blancas
        fichasBlancas: function () {
            // Creo un array para almacenar las fichas negras
            let fichas = [];
            // Filtro el array para quedarme las fichas negras
            fichas = this.$store.getters.tablero.filter(casilla => {
                return casilla === this.$store.state.fichaBlanca;
            });
            // Devuelvo el total de posiciones
            return fichas.length;
        }
    }
}