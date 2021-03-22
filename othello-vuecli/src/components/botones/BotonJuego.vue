<template>
  <li class="inicio__nav__li">
    <router-link to="/juego" class="menu__nav__link">{{ texto }}</router-link>
  </li>
</template>

<script>
export default {
  name: 'BotonJuego',
  props: {
    texto: String,
  }
}
</script>
