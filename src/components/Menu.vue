<template>
  <div>
    <div v-if="menu === this.$store.state.menuInicio">
      <Inicio/>
    </div>
    <div v-if="menu === this.$store.state.menuNuevaPartida">
      <NuevaPartida/>
    </div>
    <div v-if="menu === this.$store.state.menuOnlineCrear">
      <OnlineCrear/>
    </div>
    <div v-if="menu === this.$store.state.menuJugando">
      <Jugando/>
    </div>
    <div v-if="menu === this.$store.state.menuPersonalizar">
      <Personalizar/>
    </div>
    <div v-if="menu === this.$store.state.menuVictoria">
      <Victoria/>
    </div>
  </div>
</template>

<script>
// Componentes
import Inicio from "../components/menus/Inicio";
import NuevaPartida from "../components/menus/NuevaPartida";
import OnlineCrear from "../components/menus/OnlineCrear";
import Jugando from "../components/menus/Jugando";
import Personalizar from "../components/menus/Personalizar";
import Victoria from "../components/menus/Victoria";

export default {
  name: "Menu",
  props: {
    menu: Number,
  },
  components: {
    Inicio,
    NuevaPartida,
    OnlineCrear,
    Jugando,
    Personalizar,
    Victoria,
  },
}

</script>