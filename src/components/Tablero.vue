<template>
  <section class="main__tablero" :class="{ 'classic__tablero' : this.$store.state.disenyoTablero === 'classic'}">
    <div class="main__tablero__columna"
         :key="indiceX"
         v-for="(x, indiceX) in estadoTablero">
        <Casilla class="main__tablero__casilla classic__casilla"
               v-for="(y, indiceY) in x"
               :key="indiceX + indiceY"
               :contenido="y"
               :posicion-x="indiceX"
               :position-y="indiceY"
        />
    </div>
  </section>
</template>

<script>
// Componentes
import Casilla from "./Casilla";

export default {
  name: 'Tablero',
  components: {
    Casilla
  },
  computed: {
    estadoTablero: function () {
      // Utilizo el jugador activo para forzar la actualizacion
      if (this.$store.state.jugadorActivo === 1) {
        // Entrego el estado del tablero
        return this.$store.state.tableroJuego
      } else {
        return this.$store.state.tableroJuego
      }
    }
  }
}
</script>
