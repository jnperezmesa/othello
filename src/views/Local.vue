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
  mounted: function () {
  },
  methods: {
  },
  computed: {
  },
  watch: {
  },
  mixins: [
    // Computed
    contarFichas
  ],
}
</script>