<template>
  <div class="menus">
    <div class="menu">
      <!--- Cabecera del menu --->
      <CabeceraMenus v-if="$store.state.victoria === $store.state.fichaBlanca" class="menu__titulo--especial" texto="ganan blancas"/>
      <CabeceraMenus v-if="$store.state.victoria === $store.state.fichaNegra" texto="ganan negras"/>
      <CabeceraMenus v-if="$store.state.victoria === $store.state.casillaVacia" texto="Empate"/>
      <nav class="menu__nav">
        <ul class="menu__nav__ul">
          <!--- Botones del menu --->
          <span @click="$store.commit('revancha')"><BotonJuego texto="revancha"/></span>
          <span @click="$store.commit('resetBasico')"><BotonVolverAInicio texto="salir"/></span>
          <!--- Fin otones del menu --->
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
