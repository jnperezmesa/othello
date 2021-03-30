<template>
  <div class="main__tablero__casilla classic__casilla" @click="colocarFicha(posicionX, positionY)">
    <div v-if="contenido === $store.state.fichaBlanca" class="ficha" :class="{ 'classic__ficha--blanca' : this.$store.state.disenyoFichaBlanca === 'classic'}"></div>
    <div v-if="contenido === $store.state.fichaNegra" class="ficha" :class="{ 'classic__ficha--negra' : this.$store.state.disenyoFichaNegra === 'classic'}"></div>
  </div>
</template>

<script>
// Mixins
import explorarTablero from "../mixins/explorarTablero";
// Dependencias
import _ from 'lodash'

export default {
  name: 'Casilla',
  props: {
    contenido: Number,
    posicionX: Number,
    positionY: Number
  },
  methods: {
    // Colocar
    colocarFicha: function (x, y) {
      if (this.contenido === this.$store.state.casillaVacia) {
        // Exploro el tablero y cambio las fichas
        let paso = this.convertirFichas(x, y)
        if (paso === true) {
          // Inserto la ficha en la copia
          this.$store.state.tableroJuego[x][y] = this.$store.state.jugadorActivo
          // Cambio el turno
          this.$store.commit('turno')
          // Reviso si el siguiente jugador tiene opcion de colocar ficha
          console.log('datos que entran')
          console.log(this.estadoTablero())
          let posicionesSinFiltrar = this.estadoTablero()
          let quedan = this.filtrarPosiciones(posicionesSinFiltrar)
          console.log('datos que salen')
          console.log(quedan)
          // Si no quedan huecos vacios declaro la victoria
          if (!_.includes(this.$store.getters.tablero, this.$store.state.casillaVacia)) {
            this.$router.push('Victoria')
          }
          // Si el jugador contrario no puede jugar paso turno automaticamente
          if (quedan === false) {
            this.$store.commit('turno')
          }
        }
      }
    },
    // Convertir
    convertirFichas: function (x, y) {
      let lineas = []
      // Inserto las fichas que se pueden cambiar de las columnas
      lineas.push(this.filtrarFichas(this.explorarColumnas(x), x, y))
      // Inserto las fichas que se pueden cambiar de las filas
      lineas.push(this.filtrarFichas(this.explorarFilas(y), x, y))
      // Inserto las fichas que se pueden cambiar de las diagonales A
      lineas.push(this.filtrarFichas(this.explorarDiagonalesA(x, y), x, y))
      // Inserto las fichas que se pueden cambiar de las diagonales B
      lineas.push(this.filtrarFichas(this.explorarDiagonalesB(x, y), x, y))
      // Elimini la matriz
      const fichas = _.flattenDeep(lineas)
      // Convierto todas
      fichas.forEach((ficha) => {
        this.$store.state.tableroJuego[ficha.x][ficha.y] = this.$store.state.jugadorActivo
      })
      let hecho = false
      if (fichas.length > 0) {
        hecho = true
        return hecho
      } else {
        hecho = false
        return hecho
      }
    },
    // Posivles posiciones
    estadoTablero: function () {
      // Creo un array donde guardar las posiciones posibles
      let casillas = []

      // Itero el tablero para crear un json con los datos de cada casilla
      this.$store.state.tableroJuego.forEach(function (x, indiceX){
        x.forEach(function (y, indiceY){
          casillas.push({
            x: indiceX,
            y: indiceY,
            valor: y
          })
          return casillas
        })
      })

      // Filtro el array para quedarme solo con las casillas vacias
      let casillasVacias = _.filter(casillas, {'valor': 0})

      // Creo un array donde guardar las casillas libres que estan cerca de fichas contrarias
      let libres = []

      // Itero el array de casillas vacias para quedarme con las que estan al lado de casillas con fichas contrarias
      casillasVacias.forEach((casilla) => {
        // Centro
        if (casilla.x !== 0 && casilla.y !== 0 && casilla.x !== 7 && casilla.y !== 7) {
          if (this.$store.state.jugadorActivo === 1) {
            if (
                // Arriba
                this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y - 1)] === 2 ||
                this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 2 ||
                this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y + 1)] === 2 ||
                // Centro
                this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 2 ||
                this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 2 ||
                // Abajo
                this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y - 1)] === 2 ||
                this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 2 ||
                this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y + 1)] === 2
            ) {
              return libres.push(casilla)
            }
          }
          if (this.$store.state.jugadorActivo === 2) {
            if (
                // Arriba
                this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y - 1)] === 1 ||
                this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 1 ||
                this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y + 1)] === 1 ||
                // Centro
                this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 1 ||
                this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 1 ||
                // Abajo
                this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y - 1)] === 1 ||
                this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 1 ||
                this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y + 1)] === 1
            ) {
              return libres.push(casilla)
            }
          }
        }
        // Arriba
        if (casilla.x === 0 && casilla.y !== 0 && casilla.x !== 7 && casilla.y !== 7) {
          if (this.$store.state.jugadorActivo === 1) {
            if (
                // Centro
                this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 2 ||
                this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 2 ||
                // Abajo
                this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y - 1)] === 2 ||
                this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 2 ||
                this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y + 1)] === 2
            ) {
              return libres.push(casilla)
            }
          }
          if (this.$store.state.jugadorActivo === 2) {
            if (
                // Centro
                this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 1 ||
                this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 1 ||
                // Abajo
                this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y - 1)] === 1 ||
                this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 1 ||
                this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y + 1)] === 1
            ) {
              return libres.push(casilla)
            }
          }
        }
        // Lateral derecho
        if (casilla.x !== 0 && casilla.y === 0 && casilla.x !== 7 && casilla.y !== 7) {
          if (this.$store.state.jugadorActivo === 1) {
            if (
                // Arriba
                this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 2 ||
                this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y + 1)] === 2 ||
                // Centro
                this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 2 ||
                // Abajo
                this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 2 ||
                this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y + 1)] === 2
            ) {
              return libres.push(casilla)
            }
          }
          if (this.$store.state.jugadorActivo === 2) {
            if (
                // Arriba
                this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y - 1)] === 1 ||
                this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 1 ||
                this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y + 1)] === 1 ||
                // Centro
                this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 1 ||
                this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 1 ||
                // Abajo
                this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y - 1)] === 1 ||
                this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 1 ||
                this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y + 1)] === 1
            ) {
              return libres.push(casilla)
            }
          }
        }
        // Abajo
        if (casilla.x !== 0 && casilla.y !== 0 && casilla.x === 7 && casilla.y !== 7) {
          if (this.$store.state.jugadorActivo === 1) {
            if (
                // Arriba
                this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y - 1)] === 2 ||
                this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 2 ||
                this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y + 1)] === 2 ||
                // Centro
                this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 2 ||
                this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 2
            ) {
              return libres.push(casilla)
            }
          }
          if (this.$store.state.jugadorActivo === 2) {
            if (
                // Arriba
                this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y - 1)] === 1 ||
                this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 1 ||
                this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y + 1)] === 1 ||
                // Centro
                this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 1 ||
                this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 1
            ) {
              return libres.push(casilla)
            }
          }
        }
        // Lateral izquierdo
        if (casilla.x !== 0 && casilla.y !== 0 && casilla.x !== 7 && casilla.y === 7) {
          if (this.$store.state.jugadorActivo === 1) {
            if (
                // Arriba
                this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y - 1)] === 2 ||
                this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 2 ||
                // Centro
                this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 2 ||
                // Abajo
                this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y - 1)] === 2 ||
                this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 2
            ) {
              return libres.push(casilla)
            }
          }
          if (this.$store.state.jugadorActivo === 2) {
            if (
                // Arriba
                this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y - 1)] === 1 ||
                this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 1 ||
                this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y + 1)] === 1 ||
                // Centro
                this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 1 ||
                this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 1 ||
                // Abajo
                this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y - 1)] === 1 ||
                this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 1 ||
                this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y + 1)] === 1
            ) {
              return libres.push(casilla)
            }
          }
        }
        // Esquina arriba derecha
        if (casilla.x === 0 && casilla.y === 0 && casilla.x !== 7 && casilla.y !== 7) {
          if (this.$store.state.jugadorActivo === 1) {
            if (
                // Centro
                this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 2 ||
                // Abajo
                this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 2 ||
                this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y + 1)] === 2
            ) {
              return libres.push(casilla)
            }
          }
          if (this.$store.state.jugadorActivo === 2) {
            if (
                // Centro
                this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 1 ||
                // Abajo
                this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 1 ||
                this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y + 1)] === 1
            ) {
              return libres.push(casilla)
            }
          }
        }
        // Esquina arriba izquierda
        if (casilla.x === 0 && casilla.y !== 0 && casilla.x !== 7 && casilla.y === 7) {
          if (this.$store.state.jugadorActivo === 1) {
            if (
                // Centro
                this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 2 ||
                // Abajo
                this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y - 1)] === 2 ||
                this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 2
            ) {
              return libres.push(casilla)
            }
          }
          if (this.$store.state.jugadorActivo === 2) {
            if (
                // Centro
                this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 1 ||
                // Abajo
                this.$store.state.tableroJuego[(casilla.x + 1)][(casilla.y - 1)] === 1 ||
                this.$store.state.tableroJuego[(casilla.x + 1)][casilla.y] === 1
            ) {
              return libres.push(casilla)
            }
          }
        }
        // Esquina abajo izquierda
        if (casilla.x !== 0 && casilla.y !== 0 && casilla.x === 7 && casilla.y === 7) {
          if (this.$store.state.jugadorActivo === 1) {
            if (
                // Arriba
                this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y - 1)] === 2 ||
                this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 2 ||
                // Centro
                this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 2
            ) {
              return libres.push(casilla)
            }
          }
          if (this.$store.state.jugadorActivo === 2) {
            if (
                // Arriba
                this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y - 1)] === 1 ||
                this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 1 ||
                // Centro
                this.$store.state.tableroJuego[casilla.x][(casilla.y - 1)] === 1
            ) {
              return libres.push(casilla)
            }
          }
        }
        // Esquina abajo derecha
        if (casilla.x !== 0 && casilla.y === 0 && casilla.x === 7 && casilla.y !== 7) {
          if (this.$store.state.jugadorActivo === 1) {
            if (
                // Arriba
                this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 2 ||
                this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y + 1)] === 2 ||
                // Centro
                this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 2
            ) {
              return libres.push(casilla)
            }
          }
          if (this.$store.state.jugadorActivo === 2) {
            if (
                // Arriba
                this.$store.state.tableroJuego[(casilla.x - 1)][casilla.y] === 1 ||
                this.$store.state.tableroJuego[(casilla.x - 1)][(casilla.y + 1)] === 1 ||
                // Centro
                this.$store.state.tableroJuego[casilla.x][(casilla.y + 1)] === 1
            ) {
              return libres.push(casilla)
            }
          }
        }
      })
      // Devuelvo las posiciones que tienen más posibilidades de ser ocupables
      return libres
    },
    // Filtro de posibles posiciones
    filtrarPosiciones: function (array) {
      // Guardo las casillas que se capturarían desde cada posición posible
      let lineas = []
      // Examino cada casilla candidata y compruebo cuantas fichas puede capturarse desde cada posición
      array.forEach((casilla) => {
        // Inserto las fichas que se pueden cambiar de las columnas
        lineas.push(this.filtrarFichas(this.explorarColumnas(casilla.x), casilla.x, casilla.y))
        // Inserto las fichas que se pueden cambiar de las filas
        lineas.push(this.filtrarFichas(this.explorarFilas(casilla.y), casilla.x, casilla.y))
        // Inserto las fichas que se pueden cambiar de las diagonales A
        lineas.push(this.filtrarFichas(this.explorarDiagonalesA(casilla.x, casilla.y), casilla.x, casilla.y))
        // Inserto las fichas que se pueden cambiar de las diagonales B
        lineas.push(this.filtrarFichas(this.explorarDiagonalesB(casilla.x, casilla.y), casilla.x, casilla.y))
      })

      // Elimini la matriz y
      const fichas = _.flattenDeep(lineas)

      console.log('Array posiciones')
      console.log(lineas)
      console.log(fichas)

      // Respondo si se puede jugar desde alguna casilla
      let hecho = false
      if (fichas.length > 0) {
        hecho = true
        return hecho
      } else {
        hecho = false
        return hecho
      }
    }
  },
  mixins: [
    // Methods
    explorarTablero
  ],
}
</script>
