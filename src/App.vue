<template>
  <div id="app">
    <header class="header">
      <div  v-if="this.$store.state.menuEstado" @click="$store.commit('desplegarMenu')">
        <BotonHamburgesa/>
      </div>
      <div v-else>
        <Menu :menu="this.$store.state.menu" style="background-color: red"/>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
import BotonHamburgesa from "./components/botones/BotonHamburguesa";
import Menu from "./components/Menu";

export default {
  name: 'App',
  components: {
    BotonHamburgesa,
    Menu,
  },
  data: function () {
    return {
      local: window.localStorage,
    }
  },
  mounted: function () {
    // Regenero el id del jugador
    this.comprobarIdJugador();
  },
  methods: {
    comprobarIdJugador: function () {
      if (this.$store.state.idJugador === '') {
        this.recuperarLocal();
        if (this.$store.state.idJugador === '') {
          this.$store.commit('crearIdJugador');
          setTimeout(() => {
            this.guardarEnLocal();
          }, 1000);
        }
      }
    },
    guardarEnLocal: function () {
      return this.local.setItem('othello_id', this.$store.state.idJugador)
    },
    recuperarLocal: function () {
      if (this.local.getItem('othello_id') !== null) {
        return this.$store.state.idJugador = this.local.getItem('othello_id');
      }
    },
  }
}
</script>


