<template>
  <div class="juego">
    <BotonHamburgesa/>
  </div>
</template>

<script>
// @ is an alias to /src
import BotonHamburgesa from "../components/botones/BotonHamburguesa";

export default {
  name: 'Juego',
  components: {
    BotonHamburgesa
  }
}
</script>