<template>
  <li class="inicio__nav__li">
    <router-link :to="ruta(ir)" class="menu__nav__link">{{ texto }}</router-link>
  </li>
</template>

<script>
export default {
  name: 'BotonJuego',
  props: {
    texto: String,
    ir: String,
  },
  methods: {
    ruta: function (ir) {
      if (ir.toLowerCase() === 'home') {
        return '/'
      }
      return '/'.concat(ir)
    }
  }
}
</script>
