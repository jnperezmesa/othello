<template>
  <main class="main main_local">
    <Contador :tipo="2" :jugador="this.$store.state.jugador2" :puntuacionNegras="fichasNegras" :puntuacionBlancas="fichasBlancas"/>
    <Tablero/>
    <Contador :tipo="1" :jugador="this.$store.state.jugador1" :puntuacionNegras="fichasNegras" :puntuacionBlancas="fichasBlancas"/>
  </main>
</template>

<script>
// @ is an alias to /src
import Tablero from "../components/juego/Tablero";
import Contador from "../components/juego/Contador";
import contarFichas from "../mixins/contarFichas";

export default {
  name: 'Local',
  components: {
    Tablero,
    Contador
  },
  computed: {
    // Jugador Activo
    jugadorActivoLocal: function () {
      // Traigo localmente el estado del jugador activo
      return this.$store.state.jugadorActivo
    },
  },
  watch: {
    // Vigilo si se ha producido la victoria
    jugadorActivoLocal: function () {
      // Observo el jugador activo para analizar el estado del tablero, si no hay casillas vacias entro
      if (this.$store.state.victoria === true) {
        // Voy a la vista de victoria
        this.$router.push('Victoria')
      }
    }
  },
  mixins: [
    // Computed
    contarFichas
  ],
}
</script>