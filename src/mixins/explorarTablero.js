// Dependencias
import _ from "lodash";

export default {
    methods: {
        // Funciones de exploración
        explorarColumnas: function (x) {
            // Creo un array para almacenar la columna
            let columna = []
            // Filtro el tablero para sacar todas las posiciones que incluyan x
            this.$store.state.tableroJuego.forEach(function (contenidoX, indiceX) {
                contenidoX.forEach(function (contenidoY, indiceY) {
                    // Si el indice coincide con X, guardo la posicon
                    if (indiceX === x) {
                        columna.push({
                            x: x,
                            y: indiceY,
                            valor: contenidoY
                        })
                        // devuelvo el array
                        return columna
                    }
                })
            })

            // exporto el array con las posiciones x
            return columna
        },
        explorarFilas: function (y) {
            // Creo un array para almacenar la fila
            let fila = []
            // Exploro el array y guardo las posicones que coinciden con y
            this.$store.state.tableroJuego.forEach(function (contenidoX, indiceX) {
                contenidoX.forEach(function (contenidoY, indiceY) {
                    // Si el indice conicide con y guardo la posicon
                    if (indiceY === y) {
                        fila.push({
                            x: indiceX,
                            y: y,
                            valor: contenidoY
                        })
                        // devuelvo el array
                        return fila
                    }
                })
            })

            // Exporto el array con las posicones y
            return fila
        },
        explorarDiagonalesA: function (x, y) {
            // Creo un array para guardar todas las diagonales en una dirección
            let lineasDiagonalesA = []
            // creo un array para las diagonales superiores de una dirección
            let diagonalSuperior = []
            // Empiezo en la posicion 0 y voy aumentando el numero hasta la extensión del array
            for (let i=0;i<this.$store.state.tableroJuego.length;i++) {
                // Creo un array para cada linea, cuando cambie i se generará una
                lineasDiagonalesA.push(diagonalSuperior = [])
                // exploro cada posición de i aumentnando j (profundidad) hasta alcanzar a i
                for (let j=0;j<=i;j++) {
                    diagonalSuperior.push({
                        x: i-j,
                        y: j,
                        valor: this.$store.state.tableroJuego[i-j][j]
                    })
                }
            }
            let lineasDiagonalesB = []
            let diagonalInferior = []
            for (let i=0;i<this.$store.state.tableroJuego.length;i++) {
                lineasDiagonalesB.push(diagonalInferior = [])
                for (let j=0;j<this.$store.state.tableroJuego.length-i-1;j++) {
                    diagonalInferior.push({
                        x: this.$store.state.tableroJuego.length-j-1,
                        y: j+i+1,
                        valor: this.$store.state.tableroJuego[this.$store.state.tableroJuego.length-j-1][j+i+1]
                    })
                }
            }
            const diagonales = lineasDiagonalesA.concat(lineasDiagonalesB.slice(0))
            const miDiagonal = []
            diagonales.forEach(function (contenidoX) {
                contenidoX.forEach(function (contenidoY) {
                    if (contenidoY.x === x && contenidoY.y === y) {
                        miDiagonal.push(contenidoX)
                    }
                    return miDiagonal
                })
            })
            const diagonal = _.flattenDeep(miDiagonal)

            return diagonal
        },
        explorarDiagonalesB: function (x, y) {
            let lineasDiagonalesA = []
            let diagonalSuperior = []
            for (let i=0;i<this.$store.state.tableroJuego.length;i++) {
                lineasDiagonalesA.push(diagonalSuperior = [])
                for (let j=0;j<i+1;j++) {
                    diagonalSuperior.push({
                        x: j,
                        y: this.$store.state.tableroJuego.length-1-i+j,
                        valor: this.$store.state.tableroJuego[j][this.$store.state.tableroJuego.length-1-i+j]
                    })
                }
            }
            let lineasDiagonalesB = []
            let diagonalInferior = []
            for (let i=1;i<this.$store.state.tableroJuego.length;i++) {
                lineasDiagonalesB.push(diagonalInferior = [])
                for (let j=0;j<this.$store.state.tableroJuego.length-i;j++) {
                    diagonalInferior.push({
                        x: i+j,
                        y: j,
                        valor: this.$store.state.tableroJuego[i+j][j]
                    })
                }
            }
            const diagonales = lineasDiagonalesA.concat(lineasDiagonalesB.slice(0))
            const miDiagonal = []
            diagonales.forEach(function (contenidoX) {
                contenidoX.forEach(function (contenidoY) {
                    if (contenidoY.x === x && contenidoY.y === y) {
                        miDiagonal.push(contenidoX)
                    }
                    return miDiagonal
                })
            })
            const diagonal = _.flattenDeep(miDiagonal)

            return diagonal
        },
        // Funcion de filtrado
        filtrarFichas: function (array, x, y) {
            // Establezco donde tengo que hacer el corte del array
            let origen = 0
            // Busco la posición donde está la ficha dentro del array que me llega de la exploración y la marco en origen
            array.forEach(function (casilla, index){
                // Si x conincide con x e y tambien con y se guarda
                if (casilla.x === x && casilla.y === y) {
                    origen = index
                }
                // Devuelvo la constante cambiada
                return origen
            })

            // Creo dos arrays uno subiendo desde la posicion de corte y otro bajando
            let subir = _.slice(array, (origen + 1), array.length)
            // El de bajada lo invierto para que en la iteración vaya desde la posición de corte en adelante
            let bajar = _.reverse(_.slice(array, 0, origen))

            // Creo un array donde almacenar las posiciones que se cambiarán
            let cambiar = []

            // Compruebo quien es el jugador activo
            if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {

                // Compruebo que en esa dirección haya una ficha mia
                let copiarSubir = false
                subir.forEach((casilla) => {
                    if (casilla.valor === this.$store.state.fichaNegra) {
                        copiarSubir = true
                        return copiarSubir
                    }
                })

                if (copiarSubir === true) {
                    // Control de paso
                    let pasoSubir = true
                    // Guardo temporalmente las casillas
                    let casillasSubir = []
                    // Itero el array de subida buscando fichas del color contrario
                    subir.forEach((casilla) => {
                        // Si no es de mi color pasa y detiene la exploración
                        if (casilla.valor === this.$store.state.fichaBlanca && pasoSubir === true) {
                            casillasSubir.push(casilla)
                            return casillasSubir
                        } else {
                            // Si la casilla es 0, borro el array
                            if (casilla.valor === this.$store.state.casillaVacia && pasoSubir === true) {
                                casillasSubir = []
                                pasoSubir = false
                                return casillasSubir
                            }
                            // Si la que encuentro es de mi color o vacía, bloqueo el paso
                            return pasoSubir = false
                        }
                    })

                    // Agrego las casillasSubir a cambiar
                    cambiar.push(_.flattenDeep(casillasSubir))
                }


                // Compruebo que en esa dirección haya una ficha mia
                let copiarBajar = false
                bajar.forEach((casilla) => {
                    if (casilla.valor === this.$store.state.fichaNegra) {
                        copiarBajar = true
                        return copiarBajar
                    }
                })

                if (copiarBajar === true) {
                    // Control de paso
                    let pasoBajar = true
                    // Guardo temporalmente las casillas
                    let casillasBajar = []
                    // Itero el array de bajada buscando fichas del color contrario
                    bajar.forEach((casilla) => {
                        // Si no es de mi color pasa y detiene la exploración
                        if (casilla.valor === this.$store.state.fichaBlanca && pasoBajar === true) {
                            casillasBajar.push(casilla)
                            return casillasBajar
                        } else {
                            // Si la casilla es 0, borro el array
                            if (casilla.valor === this.$store.state.casillaVacia && pasoBajar === true) {
                                casillasBajar = []
                                pasoBajar = false
                                return casillasBajar
                            }
                            // Si la que encuentro es de mi color o vacía, bloqueo el paso
                            return pasoBajar = false
                        }
                    })
                    // Agrego las casillasSubir a cambiar
                    cambiar.push(_.flattenDeep(casillasBajar))
                }

            }

            // La misma operación, pero si soy de otro color
            if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {

                // Compruebo que en esa dirección haya una ficha mia
                let copiarSubir = false
                subir.forEach((casilla) => {
                    if (casilla.valor === this.$store.state.fichaBlanca) {
                        copiarSubir = true
                        return copiarSubir
                    }
                })

                if (copiarSubir === true) {
                    // Control de paso
                    let pasoSubir = true
                    // Guardo temporalmente las casillas
                    let casillasSubir = []
                    // Itero el array de subida buscando fichas del color contrario
                    subir.forEach((casilla) => {
                        // Si no es de mi color pasa y detiene la exploración
                        if (casilla.valor === this.$store.state.fichaNegra && pasoSubir === true) {
                            casillasSubir.push(casilla)
                            return casillasSubir
                        } else {
                            // Si la casilla es 0, borro el array
                            if (casilla.valor === this.$store.state.casillaVacia && pasoSubir === true) {
                                casillasSubir = []
                                pasoSubir = false
                                return casillasSubir
                            }
                            // Si la que encuentro es de mi color o vacía, bloqueo el paso
                            return pasoSubir = false
                        }
                    })
                    // Agrego las casillasSubir a cambiar
                    cambiar.push(_.flattenDeep(casillasSubir))
                }

                // Compruebo que en esa dirección haya una ficha mia
                let copiarBajar = false
                bajar.forEach((casilla) => {
                    if (casilla.valor === this.$store.state.fichaBlanca) {
                        copiarBajar = true
                        return copiarBajar
                    }
                })

                if (copiarBajar === true) {
                    // Control de paso
                    let pasoBajar = true
                    // Guardo temporalmente las casillas
                    let casillasBajar = []
                    // Itero el array de bajada buscando fichas del color contrario
                    bajar.forEach((casilla) => {
                        // Si no es de mi color pasa
                        if (casilla.valor === this.$store.state.fichaNegra && pasoBajar === true) {
                            casillasBajar.push(casilla)
                            return casillasBajar
                        } else {
                            // Si la casilla es 0, borro el array
                            if (casilla.valor === this.$store.state.casillaVacia && pasoBajar === true) {
                                casillasBajar = []
                                pasoBajar = false
                                return casillasBajar
                            }
                            // Si la que encuentro es de mi color o vacía, bloqueo el paso
                            return pasoBajar = false
                        }
                    })
                    // Agrego las casillasSubir a cambiar
                    cambiar.push(_.flattenDeep(casillasBajar))
                }

            }
            // Devuelvo las fichas que tengo que cambiar
            return _.flattenDeep(cambiar)
        },
    }
}