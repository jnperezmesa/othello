<template>
  <div class="menus">
    <div class="menu">
      <CabeceraMenus class="menu__titulo" texto="Nueva Partida"/>
      <nav class="menu__nav">
        <ul class="menu__nav__ul">
          <span @click="$store.dispatch('nuevaPartida')"><BotonJuego ir="Local" texto="Local"/></span>
          <span @click="$store.dispatch('nuevaPartidaOnline')"><BotonJuegoOnline ir="Online" :ir_menu="this.$store.state.menuOnlineCrear" texto="Online"/></span>
          <BotonSetMenu :ir="this.$store.state.menuInicio" texto="Volver"/>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BotonJuego from "../botones/BotonJuego";
import BotonJuegoOnline from "../botones/BotonJuegoOnline";
import BotonSetMenu from "../botones/BotonSetMenu";
import CabeceraMenus from "../textos/CabeceraMenus";

export default {
  name: 'NuevaPartida',
  components: {
    CabeceraMenus,
    BotonSetMenu,
    BotonJuegoOnline,
    BotonJuego,
  },
}
</script>
