<template>
  <main class="main">
    <Tablero/>
  </main>
</template>

<script>
// @ is an alias to /src
import Tablero from "../components/juego/Tablero";

export default {
  name: 'Home',
  components: {
    Tablero,
  },
}
</script>
