<template>
  <div class="menus">
    <div class="menu">
      <CabeceraMenus class="menu__titulo" texto="Comparte"/>
      <nav class="menu__nav">
        <div>
          <p>{{ this.$store.state.idPatida }}</p>
          <button @click="$store.commit('desplegarMenu')">Copiar</button>
        </div>
        <ul class="menu__nav__ul">
          <BotonJuegoOnline ir="Home" :ir_menu="this.$store.state.menuOnlineOpciones" texto="Volver"/>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BotonJuegoOnline from "../botones/BotonJuegoOnline";
import CabeceraMenus from "../textos/CabeceraMenus";

export default {
  name: 'NuevaPartida',
  components: {
    CabeceraMenus,
    BotonJuegoOnline,
  },
}
</script>
