<template>
  <div class="menus">
    <div class="menu menu--especial personalizar">
      <CabeceraMenus texto="personalizar"/>
      <nav class="menu__nav">
        <ul class="menu__nav__ul">
          <li
              class="tablero"
              :class="{ 'classic__tablero' : this.$store.state.disenyoTablero === 'classic'}"
          >
            <div
                class="casilla"
                :class="{ 'classic__casilla' : this.$store.state.disenyoTablero === 'classic'}"
            >
              <div
                  class="fichas-opcion ficha"
                  :class="{ 'classic__ficha--blanca' : this.$store.state.disenyoFichaBlanca === 'classic'}"
              ></div>
            </div>
            <div
                class="casilla"
                :class="{ 'classic__casilla' : this.$store.state.disenyoTablero === 'classic'}"
            >
              <div
                  class="fichas-opcion ficha"
                  :class="{ 'classic__ficha--negra' : this.$store.state.disenyoFichaBlanca === 'classic'}"
              ></div>
            </div>
          </li>
          <BotonSetMenu :ir="this.$store.state.menuInicio" texto="aplicar"/>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CabeceraMenus from "../textos/CabeceraMenus";
import BotonSetMenu from "../botones/BotonSetMenu";
// Dependencias
import _ from 'lodash'

export default {
  name: 'Personalizar',
  components: {
    BotonSetMenu,
    CabeceraMenus,
  },
  data: function () {
    return {
      columnas: _.range(2),
    }
  },
}
</script>
