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
          <span v-if="this.$store.state.tipoDePartida = this.$store.state.partidaLocal" @click="$store.dispatch('revancha')"><BotonJuego ir="Local" texto="revancha"/></span>
          <span @click="$store.commit('reset')"><BotonSetMenu :ir="this.$store.state.menuInicio" texto="salir"/></span>
          <!--- Fin otones del menu --->
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
// Componentes
import BotonJuego from "../botones/BotonJuego";
import BotonSetMenu from "../botones/BotonSetMenu";
import CabeceraMenus from "../textos/CabeceraMenus";
// Mixins
import contarFichas from "../../mixins/contarFichas";

export default {
  name: 'Victoria',
  mounted: function () {
    this.guardarGanador()
    this.$store.commit('actualizarPartida');
  },
  methods: {
    guardarGanador: function () {
      // Ciero la partida
      this.$store.state.estado = this.$store.state.estadoCerrada;
      if (this.fichasNegras < this.fichasBlancas) {
        return this.$store.state.victoria = this.$store.state.fichaBlanca;
      }
      if (this.fichasNegras > this.fichasBlancas) {
        return this.$store.state.victoria = this.$store.state.fichaNegra;
      }
      if (this.fichasNegras === this.fichasBlancas) {
        return this.$store.state.victoria = this.$store.state.empate;
      }
    }
  },
  components: {
    CabeceraMenus,
    BotonSetMenu,
    BotonJuego,
  },
  mixins: [
    // Computed
    contarFichas
  ]
}
</script>
