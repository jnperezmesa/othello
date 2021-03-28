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
  },
  mixins: [
    // Methods
    explorarTablero
  ],
}
</script>
