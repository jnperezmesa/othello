<template>
  <h1 class="menu__titulo menu__titulo">{{ texto }}</h1>
</template>

<script>
export default {
  name: 'CabeceraMenus',
  props: {
    texto: String
  }
}
</script>
