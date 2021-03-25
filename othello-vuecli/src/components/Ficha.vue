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
        this.convertirFichas(x, y)
        this.$store.state.tableroJuego[x][y] = this.$store.state.jugadorActivo
        // Cambio el turno
        this.$store.commit('turno')
      }
    },
    convertirFichas: function (x, y) {
      // Array de fichas para cambiar
      let arrayFichas = [];
      // Minutos en un reloj
      // Cero
      let pasoCero = true
      if (pasoCero === true) {
        let cero = x
        if (cero <= 7 && cero >= 0) {
          if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
            if (this.$store.state.tableroJuego[cero][y] === this.$store.state.fichaBlanca) {
              arrayFichas.push({
                x: cero,
                y: y
              })
              cero = cero - 1
            } else {
              pasoCero = false
            }
          }
          if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
            if (this.$store.state.tableroJuego[cero][y] === this.$store.state.fichaNegra) {
              arrayFichas.push({
                x: cero,
                y: y
              })
              cero = cero - 1
            } else {
              pasoCero = false
            }
          }
        }
      }
      // Diez
      let pasoDiez = true
      if (pasoDiez === true) {
        let diezX = x
        let diezY = y
        if (diezX <= 7 && diezX >= 0 && diezY <= 7 && diezY >= 0) {
          if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
            if (this.$store.state.tableroJuego[diezX][diezY] === this.$store.state.fichaBlanca) {
              arrayFichas.push({
                x: diezX,
                y: diezY
              })
              diezX = diezX - 1
              diezY = diezY + 1
            } else {
              pasoDiez = false
            }
          }
          if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
            if (this.$store.state.tableroJuego[diezX][diezY] === this.$store.state.fichaNegra) {
              arrayFichas.push({
                x: diezX,
                y: diezY
              })
              diezX = diezX - 1
              diezY = diezY + 1
            } else {
              pasoDiez = false
            }
          }
        }
      }
      // Quince
      let pasoQuince = true
      if (pasoQuince === true) {
        let quince = y
        if (quince <= 7 && quince >= 0) {
          if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
            if (this.$store.state.tableroJuego[x][quince] === this.$store.state.fichaBlanca) {
              arrayFichas.push({
                x: x,
                y: quince
              })
              quince = quince + 1
            }
          }
          if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
            if (this.$store.state.tableroJuego[x][quince] === this.$store.state.fichaNegra) {
              arrayFichas.push({
                x: x,
                y: quince
              })
              quince = quince + 1
            }
          }
        }
      }
      // Veinte
      let pasoVeinte = true
      if (pasoVeinte === true) {
        let veinteX = x
        let veinteY = y
        if (veinteX <= 7 && veinteX >= 0 && veinteY <= 7 && veinteY >= 0) {
          if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
            if (this.$store.state.tableroJuego[veinteX][veinteY] === this.$store.state.fichaBlanca) {
              arrayFichas.push({
                x: veinteX,
                y: veinteY
              })
              veinteX = veinteX + 1
              veinteY = veinteY - 1
            } else {
              pasoVeinte = false
            }
          }
          if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
            if (this.$store.state.tableroJuego[veinteX][veinteY] === this.$store.state.fichaNegra) {
              arrayFichas.push({
                x: veinteX,
                y: veinteY
              })
              veinteX = veinteX + 1
              veinteY = veinteY - 1
            } else {
              pasoVeinte = false
            }
          }
        }
      }
      // Treinta
      let pasoTreinta = true
      if (pasoTreinta === true) {
        let treinta = x
        if (treinta <= 7 && treinta >= 0) {
          if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
            if (this.$store.state.tableroJuego[treinta][y] === this.$store.state.fichaBlanca) {
              arrayFichas.push({
                x: treinta,
                y: y
              })
              treinta = treinta + 1
            } else {
              pasoTreinta = false
            }
          }
          if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
            if (this.$store.state.tableroJuego[treinta][y] === this.$store.state.fichaNegra) {
              arrayFichas.push({
                x: treinta,
                y: y
              })
              treinta = treinta + 1
            } else {
              pasoTreinta = false
            }
          }
        }
      }
      // Cuarenta
      let pasoCuarenta = true
      if (pasoCuarenta === true) {
        let CuarentaX = x
        let CuarentaY = y
        if (CuarentaX <= 7 && CuarentaX >= 0 && CuarentaY <= 7 && CuarentaY >= 0) {
          if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
            if (this.$store.state.tableroJuego[CuarentaX][CuarentaY] === this.$store.state.fichaBlanca) {
              arrayFichas.push({
                x: CuarentaX,
                y: CuarentaY
              })
              CuarentaX = CuarentaX + 1
              CuarentaY = CuarentaY + 1
            } else {
              pasoCuarenta = false
            }
          }
          if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
            if (this.$store.state.tableroJuego[CuarentaX][CuarentaY] === this.$store.state.fichaNegra) {
              arrayFichas.push({
                x: CuarentaX,
                y: CuarentaY
              })
              CuarentaX = CuarentaX + 1
              CuarentaY = CuarentaY + 1
            } else {
              pasoCuarenta = false
            }
          }
        }
      }
      // CuarentaYCinco
      let pasoCuarentaYCinco = true
      if (pasoCuarentaYCinco === true) {
        let CuarentaYCinco = y
        if (CuarentaYCinco <= 7 && CuarentaYCinco >= 0) {
          if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
            if (this.$store.state.tableroJuego[x][CuarentaYCinco] === this.$store.state.fichaBlanca) {
              arrayFichas.push({
                x: x,
                y: CuarentaYCinco
              })
              CuarentaYCinco = CuarentaYCinco - 1
            }
          }
          if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
            if (this.$store.state.tableroJuego[x][CuarentaYCinco] === this.$store.state.fichaNegra) {
              arrayFichas.push({
                x: x,
                y: CuarentaYCinco
              })
              CuarentaYCinco = CuarentaYCinco - 1
            }
          }
        }
      }
      // Cincuenta
      let pasoCincuenta = true
      if (pasoCincuenta === true) {
        let CincuentaX = x
        let CincuentaY = y
        if (CincuentaX <= 7 && CincuentaX >= 0 && CincuentaY <= 7 && CincuentaY >= 0) {
          if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
            if (this.$store.state.tableroJuego[CincuentaX][CincuentaY] === this.$store.state.fichaBlanca) {
              arrayFichas.push({
                x: CincuentaX,
                y: CincuentaY
              })
              CincuentaX = CincuentaX - 1
              CincuentaY = CincuentaY - 1
            } else {
              pasoCincuenta = false
            }
          }
          if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
            if (this.$store.state.tableroJuego[CincuentaX][CincuentaY] === this.$store.state.fichaNegra) {
              arrayFichas.push({
                x: CincuentaX,
                y: CincuentaY
              })
              CincuentaX = CincuentaX - 1
              CincuentaY = CincuentaY - 1
            } else {
              pasoCincuenta = false
            }
          }
        }
      }
      arrayFichas.forEach((ficha) => {
        if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
          this.$store.state.tableroJuego[ficha.x][ficha.y] = this.$store.state.fichaNegra
          console.log(this.$store.state.tableroJuego)
        } else {
          this.$store.state.tableroJuego[ficha.x][ficha.y] = this.$store.state.fichaBlanca
          console.log(this.$store.state.tableroJuego)
        }
      })
      console.log(arrayFichas)
      console.log('cambiando')
    }
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
