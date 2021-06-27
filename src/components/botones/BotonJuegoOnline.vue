<template>
  <li class="inicio__nav__li">
    <span @click="menu(ir_menu)"><router-link :to="ruta(ir)" class="menu__nav__link">{{ texto }}</router-link></span>
  </li>
</template>

<script>
export default {
  name: 'BotonJuego',
  props: {
    texto: String,
    ir: String,
    ir_menu: Number,
  },
  methods: {
    ruta: function (ir) {
      if (ir.toLowerCase() === 'home') {
        return '/'
      }
      return '/'.concat(ir)
    },
    menu: function (menu) {
      return this.$store.state.menu = menu;
    }
  }
}
</script>
