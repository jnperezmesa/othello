<template>
  <section :class="{'main__adversario': tipo === 2, 'main__jugador': tipo === 1 }">
    <div :class="{'contador__negro': jugador === this.$store.state.fichaNegra , 'contador__blanco': jugador === this.$store.state.fichaBlanca}" class="contador">
      <span v-if="jugador === this.$store.state.fichaNegra">{{ puntuacionNegras }}</span>
      <span v-if="jugador === this.$store.state.fichaBlanca">{{ puntuacionBlancas }}</span>
    </div>
    <TestigoTurno :jugador="jugador"/>
  </section>
</template>

<script>
import TestigoTurno from "./TestigoTurno";
export default {
  name: 'Contador',
  components: {TestigoTurno},
  props: {
    puntuacionNegras: Number,
    puntuacionBlancas: Number,
    jugador: Number,
    tipo: Number
  }
  }
</script>
