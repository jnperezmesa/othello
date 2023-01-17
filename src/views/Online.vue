<template>
  <main class="main main_online">
    <Contador :tipo="3" :jugador="oponente" :puntuacionNegras="fichasNegras" :puntuacionBlancas="fichasBlancas"/>
    <Tablero/>
    <Contador :tipo="1" :jugador="this.$store.state.juegasCon" :puntuacionNegras="fichasNegras" :puntuacionBlancas="fichasBlancas"/>
  </main>
</template>

<script>
// @ is an alias to /src
import Tablero from "../components/juego/Tablero";
import Contador from "../components/juego/Contador";
import contarFichas from "../mixins/contarFichas";
import gestionarAlmacenamientoLocal from "../mixins/gestionarAlmacenamientoLocal";

export default {
  name: 'Online',
  components: {
    Tablero,
    Contador
  },
  mounted: function () {
    this.$forceUpdate()
    this.comprobarIdJugador()
    this.unirsePorUrl()
    this.activarIntervalo()
  },
  data: function () {
    return {
      invitado: 2,
    }
  },
  methods: {
    activarIntervalo: function () {
      return setInterval(() => {
        this.$store.dispatch('comprobarCambios');
      }, 2000);
    },
    unirsePorUrl: function () {
      if (this.$route.query.id_partida) {
        this.$store.state.idPatida = this.$route.query.id_partida
        setTimeout(() => {
         this.$store.dispatch('unirseAPartidaOnline')
        }, 100)
      }
    }
  },
  computed: {
    oponente: function () {
      if (this.$store.state.juegasCon === this.$store.state.fichaNegra) {
        return this.$store.state.fichaBlanca
      } else {
        return this.$store.state.fichaNegra
      }
    }
  },
  watch: {
  },
  mixins: [
    // Computed
    contarFichas,
    // Almacenamiento local e id
    gestionarAlmacenamientoLocal
  ],
}
</script>