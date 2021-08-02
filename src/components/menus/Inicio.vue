<template>
  <div class="menus">
    <div class="menu">
      <CabeceraMenus class="menu__titulo--especial" texto="othello"/>
      <nav class="menu__nav">
        <ul class="menu__nav__ul">
          <BotonSetMenu :ir="this.$store.state.menuNuevaPartida" texto="nueva partida"/>
          <BotonSetMenu :ir="this.$store.state.menuPersonalizar" texto="Personalizar"/>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BotonSetMenu from "../botones/BotonSetMenu";
import CabeceraMenus from "../textos/CabeceraMenus";

export default {
  name: 'Inicio',
  components: {
    CabeceraMenus,
    BotonSetMenu,
  },
}
</script>
