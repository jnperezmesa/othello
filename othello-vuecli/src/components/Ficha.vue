<template>
  <div class="main__tablero__casilla classic__casilla">
    <div v-if="contenido === fichaBlanca" class="ficha classic__ficha--blanca"></div>
    <div v-if="contenido === fichaNegra" class="ficha classic__ficha--negra"></div>
  </div>
</template>

<script>
export default {
  name: 'Ficha',
  props: {
    contenido: Number
  }
}
</script>
