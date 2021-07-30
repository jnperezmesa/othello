<template>
  <div>
    <div :class="{'turno--activo': jugadorActivoLocal === jugador}" class="ficha turno turno__contenedor">
      <span v-if="jugador === this.$store.state.fichaNegra" :class="this.$store.state.disenyoFichaNegra.concat('__ficha--negra')" class="turno__ficha"></span>
      <span v-else :class="this.$store.state.disenyoFichaBlanca.concat('__ficha--blanca')" class="turno__ficha"></span>
    </div>
  </div>
</template>


<script>
export default {
  name: 'TestigoTurno',
  props: {
    jugador: Number,
  },
  data: function () {
    return {
    }
  },
  computed: {
    jugadorActivoLocal: function () {
      // Traigo localmente el estado del jugador activo
      return this.$store.state.jugadorActivo
    },
  }
  }
</script>
