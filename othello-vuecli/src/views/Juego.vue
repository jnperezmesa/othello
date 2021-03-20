<template>
  <div class="main">
    <Tablero :tableroActivo="tableroDeJuego"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Tablero from '@/components/Tablero.vue'

export default {
  name: 'Juego',
  components: {
    Tablero
  },

}
</script>
