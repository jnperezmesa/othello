<template>
  <div class="menus">
    <div class="menu">
      <!--- Cabecera del menu --->
      <CabeceraMenus v-if="fichasNegras < fichasBlancas" class="menu__titulo--especial" texto="ganan blancas"/>
      <CabeceraMenus v-if="fichasNegras > fichasBlancas" texto="ganan negras"/>
      <CabeceraMenus v-if="fichasNegras === fichasBlancas" texto="Empate"/>
      <nav class="menu__nav">
        <ul class="menu__nav__ul">
          <!--- Botones del menu --->
          <span @click="$store.dispatch('revancha')"><BotonJuego texto="revancha"/></span>
          <span @click="$store.commit('reset')"><BotonVolverAInicio texto="salir"/></span>
          <!--- Fin otones del menu --->
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
// Componentes
import BotonJuego from "../components/botones/BotonJuego";
import BotonVolverAInicio from "../components/botones/BotonVolverAInicio";
import CabeceraMenus from "../components/textos/CabeceraMenus";
// Mixins
import contarFichas from "../mixins/contarFichas";

export default {
  name: 'Victoria',
  components: {
    CabeceraMenus,
    BotonVolverAInicio,
    BotonJuego,
  },
  mixins: [
    // Computed
    contarFichas
  ]
}
</script>
