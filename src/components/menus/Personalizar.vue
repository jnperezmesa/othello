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
              <button @click="cambiarDisenyoTableroVolver" class="opciones__cambiar opciones__cambiar--izquierda">⬅</button>
              <p class="opciones__seleccionada">{{ this.$store.state.disenyoTablero.toLocaleUpperCase() }}</p>
              <button @click="cambiarDisenyoTableroAvanzar" class="opciones__cambiar opciones__cambiar--derecha">➡</button>
            </div>
          </li>
          <li class="menu__nav__li opciones">
            <p class="opciones__titulo">Ficha negra</p>
            <div class="opciones__selecionar">
              <button @click="cambiarDisenyoFichaNegraVolver" class="opciones__cambiar opciones__cambiar--izquierda">⬅</button>
              <p class="opciones__seleccionada">{{ this.$store.state.disenyoFichaNegra.toLocaleUpperCase() }}</p>
              <button @click="cambiarDisenyoFichaNegraAvanzar" class="opciones__cambiar opciones__cambiar--derecha">➡</button>
            </div>
          </li>
          <li class="menu__nav__li opciones">
            <p class="opciones__titulo">Ficha blanca</p>
            <div class="opciones__selecionar">
              <button @click="cambiarDisenyoFichaBlancaVolver" class="opciones__cambiar opciones__cambiar--izquierda">⬅</button>
              <p class="opciones__seleccionada">{{ this.$store.state.disenyoFichaBlanca.toLocaleUpperCase() }}</p>
              <button @click="cambiarDisenyoFichaBlancaAvanzar" class="opciones__cambiar opciones__cambiar--derecha">➡</button>
            </div>
          </li>
          <span @click="guardarEnLocal"><BotonSetMenu :ir="this.$store.state.menuInicio" texto="aplicar"/></span>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
// Mixims
import gestionarAlmacenamientoLocal from "../../mixins/gestionarAlmacenamientoLocal";
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
    }
  },
  mounted: function () {
  },
  methods: {
    cambiarDisenyoTableroVolver: function () {
      const opciones = this.$store.state.disenyos
      let seleccionado = this.$store.state.disenyoTablero
      const limite = opciones.length - 1
      let actual = 0
          opciones.filter((opcion, index) => {
        if (opcion === seleccionado) {
          return actual = index
        }
      });

      let nuevo

      if (actual < limite) {
        nuevo = actual + 1
      } else {
        nuevo = 0
      }

     return this.$store.state.disenyoTablero = opciones[nuevo]
    },
    cambiarDisenyoTableroAvanzar: function () {
      let opciones = this.$store.state.disenyos
      let seleccionado = this.$store.state.disenyoTablero
      const limite = opciones.length - 1
      let actual = 0
      opciones.forEach((opcion, index) => {
        if (opcion === seleccionado) {
          return actual = index
        }
      });

      let nuevo

      if (actual > 0) {
        nuevo = actual - 1
      } else {
        nuevo = limite
      }

      return this.$store.state.disenyoTablero = opciones[nuevo]
    },
    cambiarDisenyoFichaNegraVolver: function () {
      const opciones = this.$store.state.disenyos
      let seleccionado = this.$store.state.disenyoFichaNegra
      const limite = opciones.length - 1
      let actual = 0
      opciones.filter((opcion, index) => {
        if (opcion === seleccionado) {
          return actual = index
        }
      });

      let nuevo

      if (actual < limite) {
        nuevo = actual + 1
      } else {
        nuevo = 0
      }

      return this.$store.state.disenyoFichaNegra = opciones[nuevo]
    },
    cambiarDisenyoFichaNegraAvanzar: function () {
      let opciones = this.$store.state.disenyos
      let seleccionado = this.$store.state.disenyoFichaNegra
      const limite = opciones.length - 1
      let actual = 0
      opciones.forEach((opcion, index) => {
        if (opcion === seleccionado) {
          return actual = index
        }
      });

      let nuevo

      if (actual > 0) {
        nuevo = actual - 1
      } else {
        nuevo = limite
      }

      return this.$store.state.disenyoFichaNegra = opciones[nuevo]
    },
    cambiarDisenyoFichaBlancaVolver: function () {
      const opciones = this.$store.state.disenyos
      let seleccionado = this.$store.state.disenyoFichaBlanca
      const limite = opciones.length - 1
      let actual = 0
      opciones.filter((opcion, index) => {
        if (opcion === seleccionado) {
          return actual = index
        }
      });

      let nuevo

      if (actual < limite) {
        nuevo = actual + 1
      } else {
        nuevo = 0
      }

      return this.$store.state.disenyoFichaBlanca = opciones[nuevo]
    },
    cambiarDisenyoFichaBlancaAvanzar: function () {
      let opciones = this.$store.state.disenyos
      let seleccionado = this.$store.state.disenyoFichaBlanca
      const limite = opciones.length - 1
      let actual = 0
      opciones.forEach((opcion, index) => {
        if (opcion === seleccionado) {
          return actual = index
        }
      });

      let nuevo

      if (actual > 0) {
        nuevo = actual - 1
      } else {
        nuevo = limite
      }

      return this.$store.state.disenyoFichaBlanca = opciones[nuevo]
    },
  },
  mixins: [
    gestionarAlmacenamientoLocal
  ]
}
</script>
