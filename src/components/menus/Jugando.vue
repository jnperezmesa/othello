<template>
  <div class="menus">
    <div class="menu">
      <CabeceraMenus texto="menu"/>
      <nav class="menu__nav">
        <ul class="menu__nav__ul">
          <span @click="$store.dispatch('rendirse')"><BotonJuego ir="Home" texto="Rendirse"/></span>
          <BotonSeguirJuego texto="Volver"/>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BotonJuego from "../botones/BotonJuego";
import BotonSeguirJuego from "../botones/BotonSeguirJuego";
import CabeceraMenus from "../textos/CabeceraMenus";

export default {
  name: 'Jugando',
  components: {
    CabeceraMenus,
    BotonJuego,
    BotonSeguirJuego,
  }
}
</script>
