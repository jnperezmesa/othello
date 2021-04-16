// Mixins
import explorarTablero from "./explorarTablero";
// Dependencias
import _ from "lodash";

export default {
    methods: {
        // Posivles posiciones
        estadoTablero: function (jugador) {
            // Creo un array donde guardar las posiciones posibles
            let casillas = []

            // Itero el tablero para crear un json con los datos de cada casilla
            this.$store.state.tableroJuego.forEach(function (x, indiceX){
                x.forEach(function (y, indiceY){
                    casillas.push({
                        x: indiceX,
                        y: indiceY,
                        valor: y
                    })
                    return casillas
                })
            })

            // Filtro el array para quedarme solo con las casillas vacias
            let casillasVacias = _.filter(casillas, {'valor': 0})

            // Creo un array donde guardar las casillas libres que estan cerca de fichas contrarias
            let libres = []

            // Itero el array de casillas vacias para quedarme con las que estan al lado de casillas con fichas contrarias
            casillasVacias.forEach((casilla) => {
                // Centro
                if (casilla.x !== 0 && casilla.y !== 0 && casilla.x !== 7 && casilla.y !== 7) {
                    if (jugador === 1) {
                        if (
                            // Arriba
                            this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y - 1)] === 2 ||
                            this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 2 ||
                            this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y + 1)] === 2 ||
                            // Centro
                            this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 2 ||
                            this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 2 ||
                            // Abajo
                            this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y - 1)] === 2 ||
                            this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 2 ||
                            this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y + 1)] === 2
                        ) {
                            return libres.push(casilla)
                        }
                    }
                    if (jugador === 2) {
                        if (
                            // Arriba
                            this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y - 1)] === 1 ||
                            this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 1 ||
                            this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y + 1)] === 1 ||
                            // Centro
                            this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 1 ||
                            this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 1 ||
                            // Abajo
                            this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y - 1)] === 1 ||
                            this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 1 ||
                            this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y + 1)] === 1
                        ) {
                            return libres.push(casilla)
                        }
                    }
                }
                // Arriba
                if (casilla.x === 0 && casilla.y !== 0 && casilla.x !== 7 && casilla.y !== 7) {
                    if (jugador === 1) {
                        if (
                            // Centro
                            this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 2 ||
                            this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 2 ||
                            // Abajo
                            this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y - 1)] === 2 ||
                            this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 2 ||
                            this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y + 1)] === 2
                        ) {
                            return libres.push(casilla)
                        }
                    }
                    if (jugador === 2) {
                        if (
                            // Centro
                            this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 1 ||
                            this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 1 ||
                            // Abajo
                            this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y - 1)] === 1 ||
                            this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 1 ||
                            this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y + 1)] === 1
                        ) {
                            return libres.push(casilla)
                        }
                    }
                }
                // Lateral derecho
                if (casilla.x !== 0 && casilla.y === 0 && casilla.x !== 7 && casilla.y !== 7) {
                    if (jugador === 1) {
                        if (
                            // Arriba
                            this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 2 ||
                            this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y + 1)] === 2 ||
                            // Centro
                            this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 2 ||
                            // Abajo
                            this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 2 ||
                            this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y + 1)] === 2
                        ) {
                            return libres.push(casilla)
                        }
                    }
                    if (jugador === 2) {
                        if (
                            // Arriba
                            this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y - 1)] === 1 ||
                            this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 1 ||
                            this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y + 1)] === 1 ||
                            // Centro
                            this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 1 ||
                            this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 1 ||
                            // Abajo
                            this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y - 1)] === 1 ||
                            this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 1 ||
                            this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y + 1)] === 1
                        ) {
                            return libres.push(casilla)
                        }
                    }
                }
                // Abajo
                if (casilla.x !== 0 && casilla.y !== 0 && casilla.x === 7 && casilla.y !== 7) {
                    if (jugador === 1) {
                        if (
                            // Arriba
                            this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y - 1)] === 2 ||
                            this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 2 ||
                            this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y + 1)] === 2 ||
                            // Centro
                            this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 2 ||
                            this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 2
                        ) {
                            return libres.push(casilla)
                        }
                    }
                    if (jugador === 2) {
                        if (
                            // Arriba
                            this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y - 1)] === 1 ||
                            this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 1 ||
                            this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y + 1)] === 1 ||
                            // Centro
                            this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 1 ||
                            this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 1
                        ) {
                            return libres.push(casilla)
                        }
                    }
                }
                // Lateral izquierdo
                if (casilla.x !== 0 && casilla.y !== 0 && casilla.x !== 7 && casilla.y === 7) {
                    if (jugador === 1) {
                        if (
                            // Arriba
                            this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y - 1)] === 2 ||
                            this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 2 ||
                            // Centro
                            this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 2 ||
                            // Abajo
                            this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y - 1)] === 2 ||
                            this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 2
                        ) {
                            return libres.push(casilla)
                        }
                    }
                    if (jugador === 2) {
                        if (
                            // Arriba
                            this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y - 1)] === 1 ||
                            this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 1 ||
                            this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y + 1)] === 1 ||
                            // Centro
                            this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 1 ||
                            this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 1 ||
                            // Abajo
                            this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y - 1)] === 1 ||
                            this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 1 ||
                            this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y + 1)] === 1
                        ) {
                            return libres.push(casilla)
                        }
                    }
                }
                // Esquina arriba derecha
                if (casilla.x === 0 && casilla.y === 0 && casilla.x !== 7 && casilla.y !== 7) {
                    if (jugador === 1) {
                        if (
                            // Centro
                            this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 2 ||
                            // Abajo
                            this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 2 ||
                            this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y + 1)] === 2
                        ) {
                            return libres.push(casilla)
                        }
                    }
                    if (jugador === 2) {
                        if (
                            // Centro
                            this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 1 ||
                            // Abajo
                            this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 1 ||
                            this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y + 1)] === 1
                        ) {
                            return libres.push(casilla)
                        }
                    }
                }
                // Esquina arriba izquierda
                if (casilla.x === 0 && casilla.y !== 0 && casilla.x !== 7 && casilla.y === 7) {
                    if (jugador === 1) {
                        if (
                            // Centro
                            this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 2 ||
                            // Abajo
                            this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y - 1)] === 2 ||
                            this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 2
                        ) {
                            return libres.push(casilla)
                        }
                    }
                    if (jugador === 2) {
                        if (
                            // Centro
                            this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 1 ||
                            // Abajo
                            this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y - 1)] === 1 ||
                            this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 1
                        ) {
                            return libres.push(casilla)
                        }
                    }
                }
                // Esquina abajo izquierda
                if (casilla.x !== 0 && casilla.y !== 0 && casilla.x === 7 && casilla.y === 7) {
                    if (jugador === 1) {
                        if (
                            // Arriba
                            this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y - 1)] === 2 ||
                            this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 2 ||
                            // Centro
                            this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 2
                        ) {
                            return libres.push(casilla)
                        }
                    }
                    if (jugador === 2) {
                        if (
                            // Arriba
                            this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y - 1)] === 1 ||
                            this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 1 ||
                            // Centro
                            this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 1
                        ) {
                            return libres.push(casilla)
                        }
                    }
                }
                // Esquina abajo derecha
                if (casilla.x !== 0 && casilla.y === 0 && casilla.x === 7 && casilla.y !== 7) {
                    if (jugador === 1) {
                        if (
                            // Arriba
                            this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 2 ||
                            this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y + 1)] === 2 ||
                            // Centro
                            this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 2
                        ) {
                            return libres.push(casilla)
                        }
                    }
                    if (jugador === 2) {
                        if (
                            // Arriba
                            this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 1 ||
                            this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y + 1)] === 1 ||
                            // Centro
                            this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 1
                        ) {
                            return libres.push(casilla)
                        }
                    }
                }
            })
            // Devuelvo las posiciones que tienen más posibilidades de ser ocupables
            return libres
        },
        // Filtro de posibles posiciones
        filtrarPosiciones: function (array) {
            // Guardo las casillas que se capturarían desde cada posición posible
            let lineas = []
            // Examino cada casilla candidata y compruebo cuantas fichas puede capturarse desde cada posición
            array.forEach((casilla) => {
                // Inserto las fichas que se pueden cambiar de las columnas
                lineas.push(this.filtrarFichas(this.explorarColumnas(casilla.x), casilla.x, casilla.y))
                // Inserto las fichas que se pueden cambiar de las filas
                lineas.push(this.filtrarFichas(this.explorarFilas(casilla.y), casilla.x, casilla.y))
                // Inserto las fichas que se pueden cambiar de las diagonales A
                lineas.push(this.filtrarFichas(this.explorarDiagonalesA(casilla.x, casilla.y), casilla.x, casilla.y))
                // Inserto las fichas que se pueden cambiar de las diagonales B
                lineas.push(this.filtrarFichas(this.explorarDiagonalesB(casilla.x, casilla.y), casilla.x, casilla.y))
            })

            // Elimini la matriz y
            const fichas = lineas.filter(function (posicion) {
                if (posicion.length !== 0) {
                    return posicion
                }
            })

            return fichas
        }
    },
    mixins: [
        explorarTablero
    ]
}