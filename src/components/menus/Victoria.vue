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
          <div class="mensajes">
            <p v-if="this.$store.state.ofertaRevancha && !revancha" class="mensajes__mensaje mensajes__mensaje--informar">¿Jugamos otra?</p>
            <p v-if="revancha" class="mensajes__mensaje mensajes__mensaje--informar">Esperando</p>
          </div>
          <span v-if="this.$store.state.tipoDePartida === this.$store.state.partidaLocal" @click="$store.dispatch('revancha')"><BotonJuego ir="Local" texto="revancha"/></span>
          <span v-if="this.$store.state.tipoDePartida === this.$store.state.partidaOnline" @click="$store.dispatch('revanchaOnline')">
            <span  v-if="!revancha" @click="revancha = true"><BotonJuego ir="Online" :texto="this.$store.state.ofertaRevancha ? 'jugemos' : 'revancha'"/></span>
          </span>
          <span @click="$store.commit('reset')"><BotonJuegoOnline :ir_menu="this.$store.state.menuInicio" ir="home" texto="Salir"/></span>
          <!--- Fin otones del menu --->
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
// Componentes
import BotonJuego from "../botones/BotonJuego";
import BotonJuegoOnline from "../botones/BotonJuegoOnline";
import CabeceraMenus from "../textos/CabeceraMenus";
// Mixins
import contarFichas from "../../mixins/contarFichas";

export default {
  name: 'Victoria',
  mounted: function () {
    this.guardarGanador()
    this.$store.commit('actualizarPartida');
  },
  data: function () {
    return {
      revancha: false,
    }
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
    BotonJuegoOnline,
    BotonJuego,
  },
  mixins: [
    // Computed
    contarFichas
  ]
}
</script>
