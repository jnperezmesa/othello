<template>
  <li class="inicio__nav__li">
    <router-link to="/" class="menu__nav__link">{{ texto }}</router-link>
  </li>
</template>

<script>
export default {
  name: 'BotonVolverAInicio',
  props: {
    texto: String,
  }
}
</script>
