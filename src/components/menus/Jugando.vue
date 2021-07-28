<template>
  <div class="menus">
    <div class="menu">
      <CabeceraMenus texto="menu"/>
      <nav class="menu__nav">
        <ul class="menu__nav__ul">
          <a class="menu__nav__link" @click="$store.dispatch('rendirse')">Rendirse</a>
          <BotonSeguirJuego texto="Seguir"/>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BotonSeguirJuego from "../botones/BotonSeguirJuego";
import CabeceraMenus from "../textos/CabeceraMenus";

export default {
  name: 'Jugando',
  components: {
    CabeceraMenus,
    BotonSeguirJuego,
  }
}
</script>
