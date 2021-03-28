<template>
  <div class="menus">
    <div class="menu">
      <!--- Cabecera del menu --->
      <CabeceraMenus v-if="fichasNegrasLocal < fichasBlancasLocal" class="menu__titulo--especial" texto="ganan blancas"/>
      <CabeceraMenus v-if="fichasNegrasLocal > fichasBlancasLocal" texto="ganan negras"/>
      <CabeceraMenus v-if="fichasNegrasLocal === fichasBlancasLocal" texto="Empate"/>
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
  },
  computed: {
    fichasNegrasLocal: function () {
      // Creo un array para almacenar las fichas negras
      let fichas = [];
      // Filtro el array para quedarme las fichas negras
      fichas = this.$store.getters.tablero.filter(casilla => {
        return casilla === this.$store.state.fichaNegra;
      });
      // Devuelvo el total de posiciones
      return fichas.length;
    },
    fichasBlancasLocal: function () {
      // Creo un array para almacenar las fichas negras
      let fichas = [];
      // Filtro el array para quedarme las fichas negras
      fichas = this.$store.getters.tablero.filter(casilla => {
        return casilla === this.$store.state.fichaBlanca;
      });
      // Devuelvo el total de posiciones
      return fichas.length;
    }
  }
}
</script>
