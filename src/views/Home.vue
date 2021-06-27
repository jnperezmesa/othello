<template>
  <main class="main">
    <Tablero/>
  </main>
</template>

<script>
// @ is an alias to /src
import Tablero from "../components/juego/Tablero";

export default {
  name: 'Home',
  components: {
    Tablero,
  },
  mounted: function () {
    // Evito que no se carge el menú cuando se pulsa atras en el navegador
    this.$store.commit('modoMenu');
  },
  methods: {
  }
}
</script>
