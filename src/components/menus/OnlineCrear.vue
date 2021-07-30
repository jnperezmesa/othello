<template>
  <div class="menus">
    <div class="menu menu__crear-partida">
      <CabeceraMenus class="menu__titulo" texto="Comparte"/>
      <nav class="menu__nav">

        <div v-if="this.$store.state.estadoDelServidor">
          <div class="menu__crear-partida__codigo" v-if="this.$store.state.idPatida">
            <vue-qr class="menu__crear-partida__codigo__qr" :text="url" :size="200"></vue-qr>
            <button class="menu__crear-partida__codigo__boton" @click="copiado = true" v-clipboard:copy="url">
              <span class="menu__crear-partida__codigo__copiar" v-if="!copiado">Copiar link</span>
              <span class="menu__crear-partida__codigo__copiar menu__crear-partida__codigo__copiar--copiado" v-else>¡Copiado!</span>
            </button>
          </div>
        </div>
        <div v-else class="mensajes">
          <p v-if="!this.$store.state.estadoDelServidor" class="mensajes__mensaje mensajes__mensaje--error">servidor no disponible</p>
          <p v-if="this.$store.state.estadoDelServidor" class="mensajes__mensaje mensajes__mensaje--informar">Esperando respuesta</p>
        </div>
        <ul class="menu__nav__ul">
          <BotonJuegoOnline ir="Home" :ir_menu="this.$store.state.menuNuevaPartida" texto="Volver"/>
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
  data: function () {
    return {
      copiado: false,
    }
  },
  methods: {
  },
  computed: {
    url: function () {
      // Construyo la url en base al codigo
      return ''.concat(window.location.origin, this.$router.resolve({name: 'Online'}).href, '?id_partida=', this.$store.state.idPatida)
    }
  }
}
</script>
