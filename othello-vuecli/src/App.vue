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
import Tablero from "./components/Tablero";
import Contador from "./components/Contador";
//import _ from 'lodash';

export default {
  name: 'App',
  components: {
    Tablero,
    Contador
  },
  mounted() {

  },
  methods: {
  },
  computed: {
    jugadorActivoLocal: function () {
      // Traigo localmente el estado del jugador activo
      return this.$store.state.jugadorActivo
    },
    fichasNegras: function () {
      // Creo un array para almacenar las fichas negras
      let fichas = [];
      // Filtro el array para quedarme las fichas negras
      fichas = this.$store.getters.tablero.filter(casilla => {
        return casilla === this.$store.state.fichaNegra;
      });
      // Devuelvo el total de posiciones
      return fichas.length;
    },
    fichasBlancas: function () {
      // Creo un array para almacenar las fichas negras
      let fichas = [];
      // Filtro el array para quedarme las fichas negras
      fichas = this.$store.getters.tablero.filter(casilla => {
        return casilla === this.$store.state.fichaBlanca;
      });
      // Devuelvo el total de posiciones
      return fichas.length;
    }
  },
  watch: {
    jugadorActivoLocal: function () {
      // Observo el jugador activo para analizar el estado del tablero, si no hay casillas vacias entro
      if (!this.$store.getters.tablero.includes(this.$store.state.casillaVacia)) {
        // Si hay más negras que blancas
        if (this.fichasNegras > this.fichasBlancas) {
          // Establezco victoria de negras
          this.$store.state.victoria = this.$store.state.fichaNegra;
        }
        // Si hay más blancas que negras
        if (this.fichasNegras > this.fichasBlancas) {
          // Establezco victoria de blancas
          this.$store.state.victoria = this.$store.state.fichaBlanca;
        }
        // si hay el mismo numero
        if (this.fichasNegras === this.fichasBlancas) {
          // Establezco empate
          this.$store.state.victoria = this.$store.state.casillaVacia;
        }
        // Voy a la vista de victoria
        this.$router.push('Victoria')
      }
      // Sigo con la partida
      console.log(this.jugadorActivoLocal);
      console.log('Negras '.concat(this.fichasNegras));
      console.log('Blancas '.concat(this.fichasBlancas));
    }
  }
}
</script>


