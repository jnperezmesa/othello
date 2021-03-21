<template>
  <div class="menus">
    <div class="menu">
      <CabeceraMenus class="menu__titulo--especial" texto="othello"/>
      <nav class="menu__nav">
        <ul class="menu__nav__ul">
          <BotonJuego texto="nueva partida" @click="this.$store.commit('nuevaPartida')"/>
          <BotonPersonalizar/>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import BotonJuego from "../components/botones/BotonJuego";
import BotonPersonalizar from "../components/botones/BotonPersonalizar";
import CabeceraMenus from "../components/textos/CabeceraMenus";
export default {
  name: 'Inicio',
  components: {
    CabeceraMenus,
    BotonPersonalizar,
    BotonJuego
  }
}
</script>
