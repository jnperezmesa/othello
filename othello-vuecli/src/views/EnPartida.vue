<template>
  <div class="menus">
    <div class="menu">
      <CabeceraMenus texto="menu"/>
      <nav class="menu__nav">
        <ul class="menu__nav__ul">
          <BotonVolverAInicio texto="rendirse"/>
          <BotonJuego texto="continuar"/>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BotonJuego from "../components/botones/BotonJuego";
import BotonVolverAInicio from "../components/botones/BotonVolverAInicio";
import CabeceraMenus from "../components/textos/CabeceraMenus";

export default {
  name: 'Inicio',
  components: {
    CabeceraMenus,
    BotonVolverAInicio,
    BotonJuego
  }
}
</script>
