<template>
  <div class="main__tablero__casilla classic__casilla" @click="colocarFicha(posicionX, positionY)">
    <div v-if="contenido === $store.state.fichaBlanca" class="ficha classic__ficha--blanca"></div>
    <div v-if="contenido === $store.state.fichaNegra" class="ficha classic__ficha--negra"></div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Ficha',
  props: {
    contenido: Number,
    posicionX: Number,
    positionY: Number
  },
  methods: {
    colocarFicha: function (x, y) {
      // Exploro el tablero y cambio las fichas
      let paso = this.convertirFichas(x, y)
      if (paso === true) {
        // Inserto la ficha en la copia
        this.$store.state.tableroJuego[x][y] = this.$store.state.jugadorActivo
        // Cambio el turno
        this.$store.commit('turno')
      }
    },
    // Explorar el tablero
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
    // Filtrar
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
        subir.forEach(function (casilla) {
          if (casilla.valor === 2) {
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
          subir.forEach(function (casilla) {
            // Si no es de mi color pasa
            if (casilla.valor === 1 && pasoSubir === true) {
              casillasSubir.push(casilla)
              return casillasSubir
            } else {
              // Si la casilla es 0, borro el array
              if (casilla.valor === 0 && pasoSubir === true) {
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
        bajar.forEach(function (casilla) {
          if (casilla.valor === 2) {
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
          bajar.forEach(function (casilla) {
            // Si no es de mi color pasa
            if (casilla.valor === 1 && pasoBajar === true) {
              casillasBajar.push(casilla)
              return casillasBajar
            } else {
              // Si la casilla es 0, borro el array
              if (casilla.valor === 0 && pasoBajar === true) {
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
        subir.forEach(function (casilla) {
          if (casilla.valor === 1) {
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
          subir.forEach(function (casilla) {
            // Si no es de mi color pasa
            if (casilla.valor === 2 && pasoSubir === true) {
              casillasSubir.push(casilla)
              return casillasSubir
            } else {
              // Si la casilla es 0, borro el array
              if (casilla.valor === 0 && pasoSubir === true) {
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
        bajar.forEach(function (casilla) {
          if (casilla.valor === 1) {
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
          bajar.forEach(function (casilla) {
            // Si no es de mi color pasa
            if (casilla.valor === 2 && pasoBajar === true) {
              casillasBajar.push(casilla)
              return casillasBajar
            } else {
              // Si la casilla es 0, borro el array
              if (casilla.valor === 0 && pasoBajar === true) {
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
      console.log('cambios')
      console.log(fichas)
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
  computed: {
    /*
    sePuedePonerFicha: function () {
      // Interior
      if (this.posicionX !== 0 && this.positionY !== 0 && this.positionX !== 7 && this.positionY !== 7) {
        if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY + 1)] === this.$store.state.fichaBlanca ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaBlanca ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY + 1)] === this.$store.state.fichaBlanca
          ) {
            return true
          } else {
            return false
          }
        }
        if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY + 1)] === this.$store.state.fichaNegra ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaNegra ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY + 1)] === this.$store.state.fichaNegra
          ) {
            return true
          } else {
            return false
          }
        }
      }
      // Arriba (x = 0)
      if (this.posicionX === 0 && this.positionY !== 0 && this.positionX !== 7 && this.positionY !== 7) {
        if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
          if (
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaBlanca ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY + 1)] === this.$store.state.fichaBlanca
          ) {
            return true
          } else {
            return false
          }
        }
        if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
          if (
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaNegra ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY + 1)] === this.$store.state.fichaNegra
          ) {
            return true
          } else {
            return false
          }
        }
      }
      // Derecha (y = 7)
      if (this.posicionX !== 0 && this.positionY !== 0 && this.positionX !== 7 && this.positionY === 7) {
        if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaBlanca ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaBlanca
          ) {
            return true
          } else {
            return false
          }
        }
        if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaNegra ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaNegra
          ) {
            return true
          } else {
            return false
          }
        }
      }
      // Abajo (x = 7)
      if (this.posicionX !== 0 && this.positionY !== 0 && this.positionX === 7 && this.positionY !== 7) {
        if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY + 1)] === this.$store.state.fichaBlanca ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaBlanca
          ) {
            return true
          } else {
            return false
          }
        }
        if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY + 1)] === this.$store.state.fichaNegra ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaNegra
          ) {
            return true
          } else {
            return false
          }
        }
      }
      // Izquierda (y = 0)
      if (this.posicionX !== 0 && this.positionY === 0 && this.positionX !== 7 && this.positionY !== 7) {
        if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY + 1)] === this.$store.state.fichaBlanca ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaBlanca ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY + 1)] === this.$store.state.fichaBlanca
          ) {
            return true
          } else {
            return false
          }
        }
        if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY + 1)] === this.$store.state.fichaNegra ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaNegra ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY + 1)] === this.$store.state.fichaNegra
          ) {
            return true
          } else {
            return false
          }
        }
      }
      // Esquina Superior-Izquierda (x = 0 / y = 0)
      if (this.posicionX === 0 && this.positionY === 0 && this.positionX !== 7 && this.positionY !== 7) {
        if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
          if (
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaBlanca ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY + 1)] === this.$store.state.fichaBlanca
          ) {
            return true
          } else {
            return false
          }
        }
        if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
          if (
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaNegra ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY + 1)] === this.$store.state.fichaNegra
          ) {
            return true
          } else {
            return false
          }
        }
      }
      // Esquina Superior-Derecha (x = 0 / y = 7)
      if (this.posicionX === 0 && this.positionY !== 0 && this.positionX !== 7 && this.positionY === 7) {
        if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
          if (
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaBlanca
          ) {
            return true
          } else {
            return false
          }
        }
        if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
          if (
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaNegra
          ) {
            return true
          } else {
            return false
          }
        }
      }
      // Esquina Inferior-Derecha (x = 7 / y = 7)
      if (this.posicionX !== 0 && this.positionY !== 0 && this.positionX === 7 && this.positionY === 7) {
        if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaBlanca ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaBlanca
          ) {
            return true
          } else {
            return false
          }
        }
        if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaNegra ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaNegra
          ) {
            return true
          } else {
            return false
          }
        }
      }
      // Esquina Inferior-Izquierda (x = 7 / y = 0)
      if (this.posicionX !== 0 && this.positionY === 0 && this.positionX === 7 && this.positionY !== 7) {
        if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY + 1)] === this.$store.state.fichaBlanca ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaBlanca
          ) {
            return true
          } else {
            return false
          }
        }
        if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY + 1)] === this.$store.state.fichaNegra ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaNegra
          ) {
            return true
          } else {
            return false
          }
        }
      }
    }*/
  },
}
</script>
