<template>
  <div class="main__tablero__casilla classic__casilla" @click="colocarFicha(posicionX, positionY)">
    <div v-if="contenido === $store.state.fichaBlanca" class="ficha classic__ficha--blanca"></div>
    <div v-if="contenido === $store.state.fichaNegra" class="ficha classic__ficha--negra"></div>
    {{ posicionX }} / {{ positionY }}
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
      if (this.actualizarEstado === true) {
        this.explorarColumnas(x, y)
        this.explorarFilas(y)
        this.explorarDiagonalesA(x, y)
        this.explorarDiagonalesB(x, y)
        // Inserto la ficha en la copia
        this.$store.state.tableroJuego[x][y] = this.$store.state.jugadorActivo
        // Cambio el turno
        this.$store.commit('turno')
      }
    },
    // Explorar el tablero
    explorarColumnas: function (x, y) {
      let columna = []
      this.$store.state.tableroJuego.forEach(function (contenidoX, indiceX) {
        contenidoX.forEach(function (contenidoY, indiceY) {
          if (indiceX === x) {
            columna.push({
              x: x,
              y: indiceY,
              valor: contenidoY
            })
            return columna
          }
        })
      })
      console.log('columna')
      console.log(columna)
      this.convertirFichas(columna, x, y)
    },
    explorarFilas: function (y) {
      let fila = []
      this.$store.state.tableroJuego.forEach(function (contenidoX, indiceX) {
        contenidoX.forEach(function (contenidoY, indiceY) {
          if (indiceY === y) {
            fila.push({
              x: indiceX,
              y: y,
              valor: contenidoY
            })
            return fila
          }
        })
      })
      console.log('fila')
      console.log(fila)
    },
    explorarDiagonalesA: function (x, y) {
      let lineasDiagonalesA = []
      let diagonalSuperior = []
      for (var i=0;i<this.$store.state.tableroJuego.length;i++) {
        console.log(diagonalSuperior)
        lineasDiagonalesA.push(diagonalSuperior = [])
        for (var j=0;j<=i;j++) {
          diagonalSuperior.push({
            x: i-j,
            y: j,
            valor: this.$store.state.tableroJuego[i-j][j]
          })
        }
      }
      let lineasDiagonalesB = []
      let diagonalInferior = []
      for (var i=0;i<this.$store.state.tableroJuego.length;i++) {
        console.log(diagonalInferior);
        lineasDiagonalesB.push(diagonalInferior = [])
        for (var j=0;j<this.$store.state.tableroJuego.length-i-1;j++) {
          diagonalInferior.push({
            x: this.$store.state.tableroJuego.length-j-1,
            y: j+i+1,
            valor: this.$store.state.tableroJuego[this.$store.state.tableroJuego.length-j-1][j+i+1]
          })
        }
      }
      const diagonales = lineasDiagonalesA.concat(lineasDiagonalesB.slice(0))
      const miDiagonal = []
      diagonales.forEach(function (contenidoX, indiceX) {
        contenidoX.forEach(function (contenidoY, indiceY) {
          if (contenidoY.x === x && contenidoY.y === y) {
            miDiagonal.push(contenidoX)
          }
          return miDiagonal
        })
      })
      console.log('DiagonalesA')
      console.log(diagonales)
      console.log('miDiagonalA')
      console.log(miDiagonal)
    },
    explorarDiagonalesB: function (x, y) {
      let lineasDiagonalesA = []
      let diagonalSuperior = []
      for (var i=0;i<this.$store.state.tableroJuego.length;i++) {
        lineasDiagonalesA.push(diagonalSuperior = [])
        for (var j=0;j<i+1;j++) {
          diagonalSuperior.push({
            x: j,
            y: this.$store.state.tableroJuego.length-1-i+j,
            valor: this.$store.state.tableroJuego[j][this.$store.state.tableroJuego.length-1-i+j]
          })
        }
      }
      let lineasDiagonalesB = []
      let diagonalInferior = []
      for (var i=1;i<this.$store.state.tableroJuego.length;i++) {
        lineasDiagonalesB.push(diagonalInferior = [])
        for (var j=0;j<this.$store.state.tableroJuego.length-i;j++) {
          diagonalInferior.push({
            x: i+j,
            y: j,
            valor: this.$store.state.tableroJuego[i+j][j]
          })
        }
      }
      const diagonales = lineasDiagonalesA.concat(lineasDiagonalesB.slice(0))
      const miDiagonal = []
      diagonales.forEach(function (contenidoX, indiceX) {
        contenidoX.forEach(function (contenidoY, indiceY) {
          if (contenidoY.x === x && contenidoY.y === y) {
            miDiagonal.push(contenidoX)
          }
          return miDiagonal
        })
      })
      console.log('DiagonalesB')
      console.log(diagonales)
      console.log('miDiagonalB')
      console.log(miDiagonal)
    },
    // Convertir
    convertirFichas: function (array, x, y) {
      let origen = 0
      array.forEach(function (casilla, index){
        if (casilla.x === x && casilla.y === y) {
          origen = index
        }
        return origen
      })
      console.log(origen)
      let subir = _.slice(array, origen, array.length)
      let bajar = _.slice(array, 0, origen)
      console.log('subir')
      console.log(subir)
      console.log('bajar')
      console.log(bajar)
    }
  },
  computed: {
    // Revisa el estado de la ficha y lo actualiza en la base de datos
    actualizarEstado: function () {
      if (this.sePuedePonerFicha === true) {
        this.$store.state.estadoCasillas[this.posicionX][this.positionY] = true
        return true
      } else {
        this.$store.state.estadoCasillas[this.posicionX][this.positionY] = false
        return false
      }
    },
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
    }
  }
}
</script>
