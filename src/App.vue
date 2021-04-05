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
  mixins: [
    // Computed
    contarFichas
  ],
}
</script>


