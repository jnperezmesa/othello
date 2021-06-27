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
    }
  },
  mounted: function () {
  },
  methods: {
  }
}
</script>


