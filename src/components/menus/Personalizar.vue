<template>
  <div class="menus">
    <div class="menu personalizar">
      <CabeceraMenus texto="personalizar"/>
      <nav class="menu__nav personalizar__contenedor">
        <div
            class="tablero"
            :class="this.$store.state.disenyoTablero.concat('__tablero')"
        >
          <div
              class="casilla"
              :class="this.$store.state.disenyoTablero.concat('__casilla')"
          >
            <div
                class="ficha"
                :class="this.$store.state.disenyoFichaBlanca.concat('__ficha--blanca')"
            ></div>
          </div>
          <div
              class="casilla"
              :class="this.$store.state.disenyoTablero.concat('__casilla')"
          >
            <div
                class="ficha"
                :class="this.$store.state.disenyoFichaNegra.concat('__ficha--negra')"
            ></div>
          </div>
          <div
              class="casilla"
              :class="this.$store.state.disenyoTablero.concat('__casilla')"
          >
            <div
                class="ficha"
                :class="this.$store.state.disenyoFichaNegra.concat('__ficha--negra')"
            ></div>
          </div>
          <div
              class="casilla"
              :class="this.$store.state.disenyoTablero.concat('__casilla')"
          >
            <div
                class="ficha"
                :class="this.$store.state.disenyoFichaBlanca.concat('__ficha--blanca')"
            ></div>
          </div>
        </div>
        <ul class="menu__nav__ul">
          <li class="menu__nav__li opciones">
            <p class="opciones__titulo">Tablero</p>
            <div class="opciones__selecionar">
              <button class="opciones__cambiar opciones__cambiar--izquierda">⬅</button>
              <p class="opciones__seleccionada">{{ this.$store.state.disenyoTablero.toLocaleUpperCase() }}</p>
              <button class="opciones__cambiar opciones__cambiar--derecha">➡</button>
            </div>
          </li>
          <li class="menu__nav__li opciones">
            <p class="opciones__titulo">Ficha negra</p>
            <div class="opciones__selecionar">
              <button class="opciones__cambiar opciones__cambiar--izquierda">⬅</button>
              <p class="opciones__seleccionada">{{ this.$store.state.disenyoTablero.toLocaleUpperCase() }}</p>
              <button class="opciones__cambiar opciones__cambiar--derecha">➡</button>
            </div>
          </li>
          <li class="menu__nav__li opciones">
            <p class="opciones__titulo">Ficha blanca</p>
            <div class="opciones__selecionar">
              <button class="opciones__cambiar opciones__cambiar--izquierda">⬅</button>
              <p class="opciones__seleccionada">{{ this.$store.state.disenyoTablero.toLocaleUpperCase() }}</p>
              <button class="opciones__cambiar opciones__cambiar--derecha">➡</button>
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

export default {
  name: 'Personalizar',
  components: {
    BotonSetMenu,
    CabeceraMenus,
  },
  data: function () {
    return {
      columnas: []
    }
  },
}
</script>
