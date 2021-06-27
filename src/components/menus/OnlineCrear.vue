<template>
  <div class="menus">
    <div class="menu">
      <CabeceraMenus class="menu__titulo" texto="Comparte"/>
      <nav class="menu__nav">
        <div>
          <p>{{ this.$store.state.idPatida }}</p>
          <button>Copiar</button>
        </div>
        <ul class="menu__nav__ul">
          <BotonSetMenu :ir="this.$store.state.menuOnlineOpciones" texto="Volver"/>
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
