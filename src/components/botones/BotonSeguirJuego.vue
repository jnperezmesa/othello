<template>
  <li class="inicio__nav__li">
    <a @click="$store.commit('desplegarMenu')" class="menu__nav__link">{{ texto }}</a>
  </li>
</template>

<script>
export default {
  name: 'BotonSeguirJuego',
  props: {
    texto: String,
  },
  methods: {
  }
}
</script>
