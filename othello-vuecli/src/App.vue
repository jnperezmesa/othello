<template>
  <div id="app">
    <header class="header">
      <router-view/>
    </header>
    <main class="main">
      <button @click="$router.push('Victoria')">Ir</button>
      <Tablero :estadoTablero="this.$store.state.tableroJuego"/>
    </main>
  </div>
</template>

<script>
import Tablero from "./components/Tablero";


export default {
  name: 'App',
  components: {
    Tablero
  },
  mounted() {
    console.log(this.$store.getters.tablero)
    console.log(this.$store.getters.fichasBlancas)
  },
  methods: {

  },
  computed: {
    jugadorActivo: function () {
      return this.$store.state.jugadorActivo
    }
  },
  watch: {
    jugadorActivo: function () {
      if (!this.$store.getters.tablero.includes(this.$store.state.casillaVacia)) {
        if (this.$store.getters.fichasNegras > this.$store.getters.fichasBlancas) {
          this.$store.state.victoria = this.$store.state.fichaNegra;
        }
        if (this.$store.getters.fichasNegras > this.$store.getters.fichasBlancas) {
          this.$store.state.victoria = this.$store.state.fichaBlanca;
        }
        if (this.$store.getters.fichasNegras === this.$store.getters.fichasBlancas) {
          this.$store.state.victoria = this.$store.state.casillaVacia;
        }
        this.$router.push('Victoria')
      }
      this.$forceUpdate()
    }
  }
}
</script>


