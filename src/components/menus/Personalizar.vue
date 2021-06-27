<template>
  <div class="menus">
    <div class="menu menu--especial">
      <CabeceraMenus texto="personalizar"/>
      <nav class="menu__nav">
        <ul class="menu__nav__ul">
          <li class="menu__nav__li">
            <h3 class="menu__nav__subtitulo">Tableros</h3>
            <ul class="menu__nav__tableros">
              <li :class="{ 'activo': this.$store.state.disenyoTablero === 'classic' }" @click="this.$store.state.disenyoTablero = 'classic'" class="menu__nav__tableros-opcion classic__miniatura"></li>
            </ul>
          </li>
          <li class="menu__nav__li">
            <h3 class="menu__nav__subtitulo">Fichas</h3>
            <div class="menu__nav__fichas">
              <div class="menu__nav__fichas--negras">
                <p class="menu__nav__fichas--negras-texto">Negras</p>
                <ul class="menu__nav__fichas-opciones">
                  <li :class="{ 'activo': this.$store.state.disenyoFichaNegra === 'classic' }" @click="this.$store.state.disenyoFichaBlanca = 'classic'" class="menu__nav__fichas-opcion ficha classic__ficha--negra"></li>
                </ul>
              </div>
              <div class="menu__nav__fichas--blancas">
                <p class="menu__nav__fichas--blancas-texto">Blancas</p>
                <ul class="menu__nav__fichas-opciones">
                  <li :class="{ 'activo': this.$store.state.disenyoFichaBlanca === 'classic' }" @click="this.$store.state.disenyoFichaNegra = 'classic'" class="menu__nav__fichas-opcion ficha classic__ficha--blanca"></li>
                </ul>
              </div>
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
  }
}
</script>
