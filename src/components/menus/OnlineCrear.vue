<template>
  <div class="menus">
    <div class="menu menu__crear-partida">
      <CabeceraMenus class="menu__titulo" texto="Comparte"/>
      <nav class="menu__nav">

        <div class="menu__crear-partida__codigo" v-if="this.$store.state.idPatida">
          <vue-qr :text="url" :size="200"></vue-qr>
          <button v-clipboard:copy="url">Copiar link</button>
        </div>
        <ul class="menu__nav__ul">
          <BotonJuegoOnline ir="Home" :ir_menu="this.$store.state.menuOnlineOpciones" texto="Volver"/>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BotonJuegoOnline from "../botones/BotonJuegoOnline";
import CabeceraMenus from "../textos/CabeceraMenus";
import VueQr from "vue-qr"

export default {
  name: 'NuevaPartida',
  components: {
    CabeceraMenus,
    BotonJuegoOnline,
    VueQr,
  },
  mounted: function () {
    // Regenero el id del jugador
    this.comprobarIdJugador();
  },
  methods: {
  },
  computed: {
    url: function () {
      return ''.concat(window.location.origin, this.$router.resolve({name: 'Online'}).href, '?id_partida=', this.$store.state.idPatida)
    }
  }
}
</script>
