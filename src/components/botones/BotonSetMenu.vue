<template>
  <li class="inicio__nav__li">
    <a @click="setMenu(ir)" class="menu__nav__link">{{ texto }}</a>
  </li>
</template>

<script>
export default {
  name: 'BotonSetMenu',
  props: {
    texto: String,
    ir: Number,
  },
  methods: {
    setMenu: function (ir) {
      return this.$store.state.menu = ir;
    }
  }
}
</script>
