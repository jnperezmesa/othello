<template>
  <div id="app">
    <header class="header">
      <router-view/>
    </header>
    <main class="main">
      <Contador :tipo="2" :jugador="this.$store.state.jugador2" :puntuacionNegras="fichasNegras" :puntuacionBlancas="fichasBlancas"/>
      <Tablero/>
      <Contador :tipo="1" :jugador="this.$store.state.jugador1" :puntuacionNegras="fichasNegras" :puntuacionBlancas="fichasBlancas"/>
    </main>
  </div>
</template>

<script>
// Componentes
import Tablero from "./components/Tablero";
import Contador from "./components/Contador";
// Mixins
import explorarTablero from "./mixins/explorarTablero";
import contarFichas from "./mixins/contarFichas";

export default {
  name: 'App',
  components: {
    Tablero,
    Contador
  },
  computed: {
    // Jugador Activo
    jugadorActivoLocal: function () {
      // Traigo localmente el estado del jugador activo
      return this.$store.state.jugadorActivo
    }
  },
  watch: {
    jugadorActivoLocal: function () {
      // Observo el jugador activo para analizar el estado del tablero, si no hay casillas vacias entro
      console.log('¿victoria?')
      if (this.$store.getters.tablero.includes(0) === false) {
        console.log('si')
        // Voy a la vista de victoria
        this.$router.push('Victoria')
      }
      // Sigo con la partida
      console.log(this.jugadorActivoLocal);
      console.log('Negras '.concat(this.fichasNegras));
      console.log('Blancas '.concat(this.fichasBlancas));
    },
  },
  mixins: [
    // Methods
    explorarTablero,
    // Computed
    contarFichas
  ],
}
</script>


