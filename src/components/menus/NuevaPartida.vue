<template>
  <div class="menus">
    <div class="menu">
      <CabeceraMenus class="menu__titulo" texto="Nueva Partida"/>
      <nav class="menu__nav">
        <ul class="menu__nav__ul">
          <span @click="$store.dispatch('nuevaPartida')"><BotonJuego ir="Local" texto="Local"/></span>
          <BotonSetMenu style="display: none" :ir="this.$store.state.menuOnlineOpciones" texto="Online"/>
          <BotonSetMenu :ir="this.$store.state.menuInicio" texto="Volver"/>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BotonJuego from "../botones/BotonJuego";
import BotonSetMenu from "../botones/BotonSetMenu";
import CabeceraMenus from "../textos/CabeceraMenus";

export default {
  name: 'NuevaPartida',
  components: {
    CabeceraMenus,
    BotonSetMenu,
    BotonJuego
  },
}
</script>
