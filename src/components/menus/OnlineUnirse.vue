<template>
  <div class="menus">
    <div class="menu">
      <CabeceraMenus class="menu__titulo" texto="Unirse"/>
      <nav class="menu__nav">
        <div>
          <input type="text" v-model="idPartidaRecibido">
          <button>Pegar</button>
        </div>
        <ul class="menu__nav__ul">
          <span @click="$store.dispatch('unirseAPartidaOnline')"><span @click="guardarIdPartida()"><BotonJuego ir="Online" texto="Unirse"/></span></span>
          <BotonSetMenu :ir="this.$store.state.menuOnlineOpciones" texto="Volver"/>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BotonJuego from "../botones/BotonJuego";
import BotonSetMenu from "../botones/BotonSetMenu";
import CabeceraMenus from "../textos/CabeceraMenus";

export default {
  name: 'NuevaPartida',
  components: {
    BotonJuego,
    CabeceraMenus,
    BotonSetMenu,
  },
  data: function () {
    return {
      idPartidaRecibido: '',
    }
  },
  methods: {
    guardarIdPartida: function () {
      return this.$store.state.idPatida = this.idPartidaRecibido;
    }
  }
}
</script>
