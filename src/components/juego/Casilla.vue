<template>
  <div class="main__tablero__casilla" :class="this.$store.state.disenyoTablero.concat('__casilla')" @click="colocarFicha(posicionX, positionY)">
    <div v-if="contenido === $store.state.fichaBlanca" class="ficha" :class="this.$store.state.disenyoFichaBlanca.concat('__ficha--blanca')"></div>
    <div v-if="contenido === $store.state.fichaNegra" class="ficha" :class="this.$store.state.disenyoFichaNegra.concat('__ficha--negra')"></div>
  </div>
</template>

<script>
// Mixins
import posicionesPosibles from "../../mixins/posicionesPosibles";
import convertirFichas from "../../mixins/convertirFichas";
// Dependencias
import _ from 'lodash'


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
        // Copruebo que ficha lleva el jugador
        if (
            this.$store.state.juegasCon === this.$store.state.jugadorActivo ||
            this.$store.state.juegasCon === this.$store.state.juegasConDefault
        ) {

          // Comprbar victoria
          this.esVictoria();

          // Exploro el tablero y cambio las fichas
          let paso = this.convertirFichas(x, y)

          if (paso === true) {

            // Inserto la ficha en la copia
            this.$store.state.tableroJuego[x][y] = this.$store.state.jugadorActivo

            // Cambio el turno
            this.$store.commit('turno')

            // Compruebo victoria otra vez
            this.esVictoria()

            // Reviso si el siguiente jugador tiene opcion de colocar ficha
            let quedan = this.filtrarPosiciones(this.estadoTablero(this.$store.state.jugadorActivo))

            // Si el jugador contrario no puede jugar paso turno automaticamente
            if (quedan.length === 0) {
              this.$store.commit('turno')
            }
          }
          // Actualizo el servidor
          this.$store.commit('actualizarPartida');
        }
      }
    },
    // Situación del tablero
    esVictoria: function () {
      // Compruebo el estado del tablero
      const quedanNegras = this.filtrarPosiciones(this.estadoTablero(this.$store.state.fichaNegra))
      const quedanBlancas = this.filtrarPosiciones(this.estadoTablero(this.$store.state.fichaBlanca))

      // Si no quedan huecos vacios declaro la victoria
      if (
          quedanBlancas === false && quedanNegras === false ||
          _.includes(this.$store.getters.tablero, this.$store.state.casillaVacia) === false ||
          _.includes(this.$store.getters.tablero, this.$store.state.fichaBlanca) === false ||
          _.includes(this.$store.getters.tablero, this.$store.state.fichaNegra) === false) {
        return this.$store.dispatch('victoria');
      }
      return false;
    }
  },
  mixins: [
    // Methods
    convertirFichas,
    posicionesPosibles
  ],
}
</script>
