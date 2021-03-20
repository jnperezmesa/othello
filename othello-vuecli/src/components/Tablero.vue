<template>
  <section class="main__tablero classic__tablero">
    <div class="main__tablero__columna"
         :key="indiceX"
         v-for="(x, indiceX) in estadoTablero">
        <Ficha class="main__tablero__casilla classic__casilla"
               v-for="(y, indiceY) in x"
               :key="indiceX + indiceY"
               :contenido="y"
               :posicion-x="indiceX"
               :position-y="indiceY"
        />
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
    estadoTablero: Array
  }
}
</script>
