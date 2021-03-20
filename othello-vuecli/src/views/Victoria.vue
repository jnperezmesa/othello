<template>
  <div class="menus">
    <div class="menu">
      <CabeceraMenus v-if="$store.state.victoria === $store.state.fichaBlanca" class="menu__titulo--especial" texto="ganan blancas"/>
      <CabeceraMenus v-if="$store.state.victoria === $store.state.fichaNegra" texto="ganan negras"/>
      <CabeceraMenus v-if="$store.state.victoria === $store.state.casillaVacia" texto="Empate"/>
      <nav class="menu__nav">
        <ul class="menu__nav__ul">
          <BotonJuego texto="revancha"/>
          <BotonVolverAInicio texto="salir"/>
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
  name: 'Victoria',
  components: {
    CabeceraMenus,
    BotonVolverAInicio,
    BotonJuego,
  }
}
</script>
