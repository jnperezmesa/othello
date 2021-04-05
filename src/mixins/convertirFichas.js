// Mixins
import explorarTablero from "./explorarTablero";
// Dependencias
import _ from "lodash";

export default {
    methods: {
        // Convertir
        convertirFichas: function (x, y) {
            let lineas = []
            // Inserto las fichas que se pueden cambiar de las columnas
            lineas.push(this.filtrarFichas(this.explorarColumnas(x), x, y))
            // Inserto las fichas que se pueden cambiar de las filas
            lineas.push(this.filtrarFichas(this.explorarFilas(y), x, y))
            // Inserto las fichas que se pueden cambiar de las diagonales A
            lineas.push(this.filtrarFichas(this.explorarDiagonalesA(x, y), x, y))
            // Inserto las fichas que se pueden cambiar de las diagonales B
            lineas.push(this.filtrarFichas(this.explorarDiagonalesB(x, y), x, y))
            // Elimini la matriz
            const fichas = _.flattenDeep(lineas)
            // Convierto todas
            fichas.forEach((ficha) => {
                this.$store.state.tableroJuego[ficha.x][ficha.y] = this.$store.state.jugadorActivo
            })
            let hecho = false
            if (fichas.length > 0) {
                hecho = true
                return hecho
            } else {
                hecho = false
                return hecho
            }
        }
    },
    mixins: [
        explorarTablero
    ]
}