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
      this.$store.state.tableroJuego[x][y] = this.$store.state.jugadorActivo;
      this.$store.commit('turno')
      console.log(this.$store.state.jugadorActivo)
      console.log(this.$store.state.tableroJuego)
    }
  }
}
</script>
