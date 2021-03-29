<template>
  <div class="main__tablero__casilla classic__casilla" @click="colocarFicha(posicionX, positionY)">
    <div v-if="contenido === $store.state.fichaBlanca" class="ficha classic__ficha--blanca"></div>
    <div v-if="contenido === $store.state.fichaNegra" class="ficha classic__ficha--negra"></div>
  </div>
</template>

<script>
// Mixins
import explorarTablero from "../mixins/explorarTablero";
// Dependencias
import _ from 'lodash'

export default {
  name: 'Ficha',
  props: {
    contenido: Number,
    posicionX: Number,
    positionY: Number
  },
  methods: {
    // Colocar
    colocarFicha: function (x, y) {
      if (this.contenido === this.$store.state.casillaVacia) {
        // Exploro el tablero y cambio las fichas
        let paso = this.convertirFichas(x, y)
        if (paso === true) {
          // Inserto la ficha en la copia
          this.$store.state.tableroJuego[x][y] = this.$store.state.jugadorActivo
          // Cambio el turno
          this.$store.commit('turno')
          let posiciones = this.estadoTablero()
          if (posiciones === 0) {
            this.$store.commit('turno')
          }
        }
      }
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
    },
    estadoTablero: function () {
      let casillas = []

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

      console.log('tablero')
      console.log(casillas)

      let casillasVacias = _.filter(casillas, {'valor': 0})

      console.log('Casillas vacias')
      console.log(casillasVacias)

      let libres = []

      casillasVacias.forEach((casilla) => {
        // Centro
        if (casilla.x !== 0 && casilla.y !== 0 && casilla.x !== 7 && casilla.y !== 7) {
          if (this.$store.state.jugadorActivo === 1) {
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
          if (this.$store.state.jugadorActivo === 2) {
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
          if (this.$store.state.jugadorActivo === 1) {
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
          if (this.$store.state.jugadorActivo === 2) {
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
          if (this.$store.state.jugadorActivo === 1) {
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
          if (this.$store.state.jugadorActivo === 2) {
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
          if (this.$store.state.jugadorActivo === 1) {
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
          if (this.$store.state.jugadorActivo === 2) {
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
          if (this.$store.state.jugadorActivo === 1) {
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
          if (this.$store.state.jugadorActivo === 2) {
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
          if (this.$store.state.jugadorActivo === 1) {
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
          if (this.$store.state.jugadorActivo === 2) {
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
          if (this.$store.state.jugadorActivo === 1) {
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
          if (this.$store.state.jugadorActivo === 2) {
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
          if (this.$store.state.jugadorActivo === 1) {
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
          if (this.$store.state.jugadorActivo === 2) {
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
          if (this.$store.state.jugadorActivo === 1) {
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
          if (this.$store.state.jugadorActivo === 2) {
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
      console.log(libres.length)
      return libres.length
    }
  },
  mixins: [
    // Methods
    explorarTablero,
  ],
}
</script>
