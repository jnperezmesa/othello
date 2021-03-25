<template>
  <div class="main__tablero__casilla classic__casilla" @click="colocarFicha(posicionX, positionY)">
    <div v-if="contenido === $store.state.fichaBlanca" class="ficha classic__ficha--blanca"></div>
    <div v-if="contenido === $store.state.fichaNegra" class="ficha classic__ficha--negra"></div>
    {{ posicionX }} / {{ positionY }}
  </div>
</template>

<script>
import convertirFichas from "@/mixins/convertirFichas";

export default {
  name: 'Ficha',
  props: {
    contenido: Number,
    posicionX: Number,
    positionY: Number
  },
  methods: {
    colocarFicha: function (x, y) {
      if (this.actualizarEstado === true) {
        // Inserto la ficha en la copia
        this.$store.state.tableroJuego[x][y] = this.$store.state.jugadorActivo
        // Cambio el turno
        this.$store.commit('turno')
      }
    },
  },
  computed: {
    // Revisa el estado de la ficha y lo actualiza en la base de datos
    actualizarEstado: function () {
      if (this.sePuedePonerFicha === true) {
        this.$store.state.estadoCasillas[this.posicionX][this.positionY] = true
        return true
      } else {
        this.$store.state.estadoCasillas[this.posicionX][this.positionY] = false
        return false
      }
    },
    sePuedePonerFicha: function () {
      // Interior
      if (this.posicionX !== 0 && this.positionY !== 0 && this.positionX !== 7 && this.positionY !== 7) {
        if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY + 1)] === this.$store.state.fichaBlanca ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaBlanca ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY + 1)] === this.$store.state.fichaBlanca
          ) {
            return true
          } else {
            return false
          }
        }
        if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY + 1)] === this.$store.state.fichaNegra ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaNegra ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY + 1)] === this.$store.state.fichaNegra
          ) {
            return true
          } else {
            return false
          }
        }
      }
      // Arriba (x = 0)
      if (this.posicionX === 0 && this.positionY !== 0 && this.positionX !== 7 && this.positionY !== 7) {
        if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
          if (
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaBlanca ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY + 1)] === this.$store.state.fichaBlanca
          ) {
            return true
          } else {
            return false
          }
        }
        if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
          if (
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaNegra ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY + 1)] === this.$store.state.fichaNegra
          ) {
            return true
          } else {
            return false
          }
        }
      }
      // Derecha (y = 7)
      if (this.posicionX !== 0 && this.positionY !== 0 && this.positionX !== 7 && this.positionY === 7) {
        if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaBlanca ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaBlanca
          ) {
            return true
          } else {
            return false
          }
        }
        if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaNegra ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaNegra
          ) {
            return true
          } else {
            return false
          }
        }
      }
      // Abajo (x = 7)
      if (this.posicionX !== 0 && this.positionY !== 0 && this.positionX === 7 && this.positionY !== 7) {
        if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY + 1)] === this.$store.state.fichaBlanca ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaBlanca
          ) {
            return true
          } else {
            return false
          }
        }
        if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY + 1)] === this.$store.state.fichaNegra ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaNegra
          ) {
            return true
          } else {
            return false
          }
        }
      }
      // Izquierda (y = 0)
      if (this.posicionX !== 0 && this.positionY === 0 && this.positionX !== 7 && this.positionY !== 7) {
        if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY + 1)] === this.$store.state.fichaBlanca ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaBlanca ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY + 1)] === this.$store.state.fichaBlanca
          ) {
            return true
          } else {
            return false
          }
        }
        if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY + 1)] === this.$store.state.fichaNegra ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaNegra ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY + 1)] === this.$store.state.fichaNegra
          ) {
            return true
          } else {
            return false
          }
        }
      }
      // Esquina Superior-Izquierda (x = 0 / y = 0)
      if (this.posicionX === 0 && this.positionY === 0 && this.positionX !== 7 && this.positionY !== 7) {
        if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
          if (
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaBlanca ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY + 1)] === this.$store.state.fichaBlanca
          ) {
            return true
          } else {
            return false
          }
        }
        if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
          if (
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaNegra ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY + 1)] === this.$store.state.fichaNegra
          ) {
            return true
          } else {
            return false
          }
        }
      }
      // Esquina Superior-Derecha (x = 0 / y = 7)
      if (this.posicionX === 0 && this.positionY !== 0 && this.positionX !== 7 && this.positionY === 7) {
        if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
          if (
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaBlanca
          ) {
            return true
          } else {
            return false
          }
        }
        if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
          if (
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              // Abajo
              this.$store.state.tableroJuego[(this.posicionX + 1)][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX + 1)][this.positionY] === this.$store.state.fichaNegra
          ) {
            return true
          } else {
            return false
          }
        }
      }
      // Esquina Inferior-Derecha (x = 7 / y = 7)
      if (this.posicionX !== 0 && this.positionY !== 0 && this.positionX === 7 && this.positionY === 7) {
        if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY - 1)] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaBlanca ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaBlanca
          ) {
            return true
          } else {
            return false
          }
        }
        if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY - 1)] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaNegra ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY - 1)] === this.$store.state.fichaNegra
          ) {
            return true
          } else {
            return false
          }
        }
      }
      // Esquina Inferior-Izquierda (x = 7 / y = 0)
      if (this.posicionX !== 0 && this.positionY === 0 && this.positionX === 7 && this.positionY !== 7) {
        if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaBlanca ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY + 1)] === this.$store.state.fichaBlanca ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaBlanca
          ) {
            return true
          } else {
            return false
          }
        }
        if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
          if (
              // Arriba
              this.$store.state.tableroJuego[(this.posicionX - 1)][this.positionY] === this.$store.state.fichaNegra ||
              this.$store.state.tableroJuego[(this.posicionX - 1)][(this.positionY + 1)] === this.$store.state.fichaNegra ||
              // Centro
              this.$store.state.tableroJuego[this.posicionX][(this.positionY + 1)] === this.$store.state.fichaNegra
          ) {
            return true
          } else {
            return false
          }
        }
      }
    }
  }
}
</script>
