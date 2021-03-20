<template>
  <section class="main__tablero classic__tablero">
    <div class="main__tablero__columna" v-for="(x, indiceX) in tableroActivo">
      <Ficha class="main__tablero__casilla classic__casilla" :contenido="y" v-for="(y, indiceY) in x"/>
    </div>
  </section>
</template>

<script>
import Ficha from "./Ficha";

export default {
  name: 'Tablero',
  components: {
    Ficha
  },
  props: {
    disenyoTablero: String,
    tableroActivo: Array,
  }
}
</script>
