<template>
  <div class="menus">
    <div class="menu">
      <CabeceraMenus class="menu__titulo" texto="Online"/>
      <nav class="menu__nav">
        <ul class="menu__nav__ul">
          <span @click="$store.dispatch('nuevaPartidaOnline')"><BotonSetMenu :ir="this.$store.state.menuOnlineCrear" texto="Crear"/></span>
          <BotonSetMenu :ir="this.$store.state.menuOnlineUnirse" texto="Unirse"/>
          <BotonSetMenu :ir="this.$store.state.menuNuevaPartida" texto="Volver"/>
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
  name: 'NuevaPartida',
  components: {
    CabeceraMenus,
    BotonSetMenu,
  },
}
</script>
