<template>
  <div class="main__tablero__casilla classic__casilla" @click="colocarFicha(posicionX, positionY)">
    <div v-if="contenido === $store.state.fichaBlanca" class="ficha" :class="{ 'classic__ficha--blanca' : this.$store.state.disenyoFichaBlanca === 'classic'}"></div>
    <div v-if="contenido === $store.state.fichaNegra" class="ficha" :class="{ 'classic__ficha--negra' : this.$store.state.disenyoFichaNegra === 'classic'}"></div>
  </div>
</template>

<script>
// Mixins
import posicionesPosibles from "../mixins/posicionesPosibles";
import convertirFichas from "../mixins/convertirFichas";


export default {
  name: 'Casilla',
  props: {
    contenido: Number,
    posicionX: Number,
    positionY: Number
  },
  methods: {
    // Colocar
    colocarFicha: function (x, y) {
      if (this.contenido === this.$store.state.casillaVacia) {

        // Comprbar victoria
        this.victoria();

        // Exploro el tablero y cambio las fichas
        let paso = this.convertirFichas(x, y)

        if (paso === true) {

          // Inserto la ficha en la copia
          this.$store.state.tableroJuego[x][y] = this.$store.state.jugadorActivo

          // Cambio el turno
          this.$store.commit('turno')

          // Reviso si el siguiente jugador tiene opcion de colocar ficha
          let quedan = this.filtrarPosiciones(this.estadoTablero(this.$store.state.jugadorActivo))

          // Si el jugador contrario no puede jugar paso turno automaticamente
          if (quedan === false) {
            this.$store.commit('turno')
          }
        }
      }
    },
    // Situación del tablero
    victoria: function () {
      // Compruebo el estado del tablero
      let quedanNegras = this.filtrarPosiciones(this.estadoTablero(this.$store.state.fichaNegra))
      let quedanBlancas = this.filtrarPosiciones(this.estadoTablero(this.$store.state.fichaBlanca))

      // Si no quedan huecos vacios declaro la victoria
      if (quedanBlancas === false && quedanNegras === false) {
        this.$router.push('Victoria')
      }
    }
  },
  mixins: [
    // Methods
    convertirFichas,
    posicionesPosibles
  ],
}
</script>
