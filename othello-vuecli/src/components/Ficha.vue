<template>
  <div class="main__tablero__casilla classic__casilla" @click="colocarFicha(posicionX, positionY)">
    <div v-if="contenido === $store.state.fichaBlanca" class="ficha classic__ficha--blanca"></div>
    <div v-if="contenido === $store.state.fichaNegra" class="ficha classic__ficha--negra"></div>
  </div>
</template>

<script>
export default {
  name: 'Ficha',
  props: {
    contenido: Number,
    posicionX: Number,
    positionY: Number
  },
  methods: {
    colocarFicha: function (x, y) {
      // creo una copia del tablero
      //let tablero = this.$store.state.tableroJuego
      // Inserto la ficha en la copia
      this.$store.state.tableroJuego[x][y] = this.$store.state.jugadorActivo
      // Reemplazo la copia
      //this.$store.state.tableroJuego = tablero
      // Cambio el turno
      this.$store.commit('turno')
      console.log(this.$store.state.tableroJuego)
    }
  }
}
</script>
