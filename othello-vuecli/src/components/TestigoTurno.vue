<template>
  <div :class="{'turno--activo': jugadorActivoLocal === jugador, 'classic__ficha--blanca': jugador === this.$store.state.fichaBlanca, 'classic__ficha--negra': jugador === this.$store.state.fichaNegra}" class="menu__nav__fichas-opcion ficha turno"></div>
</template>

<script>
export default {
  name: 'TestigoTurno',
  props: {
    jugador: Number,
  },
  computed: {
    jugadorActivoLocal: function () {
      // Traigo localmente el estado del jugador activo
      return this.$store.state.jugadorActivo
    },
  }
  }
</script>
