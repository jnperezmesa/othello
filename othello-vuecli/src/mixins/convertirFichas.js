export default {
    methods: {
        convertirFichas: function (x, y) {
            // Array de fichas para cambiar
            let arrayFichas = [];
            // Posición doce en punto
            let cero = x;
            if (cero <= 7 && cero >= 0) {
                if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
                    if (this.$store.state.tableroJuego[cero][y] === this.$store.state.fichaBlanca) {
                        arrayFichas.push({
                            x: cero,
                            y: y
                        })
                        cero = cero - 1
                    }
                if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
                    if (this.$store.state.tableroJuego[cero][y] === this.$store.state.fichaNegra) {
                        arrayFichas.push({
                            x: cero,
                            y: y
                        })
                        cero = cero - 1
                    }
                }
            }
            let diezX = x;
            let diezY = y
            if (diezX <= 7 && diezX >= 0 && diezY <= 7 && diezY >= 0) {
                if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
                    if (this.$store.state.tableroJuego[diezX][diezY] === this.$store.state.fichaBlanca) {
                        arrayFichas.push({
                            x: diezX,
                            y: diezY
                        })
                        diezX = diezX - 1
                        diezY = diezY - 1
                    }
                }
                if (this.$store.state.jugadorActivo === this.$store.state.fichaBlanca) {
                    if (this.$store.state.tableroJuego[diezX][diezY] === this.$store.state.fichaNegra) {
                        arrayFichas.push({
                            x: diezX,
                            y: diezY
                        })
                        diezX = diezX - 1
                        diezY = diezY - 1
                    }
                }
            }
            let quince = y;
            if (quince <= 7 && quince >= 0) {
                if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
                    if (this.$store.state.tableroJuego[x][quince] === this.$store.state.fichaBlanca) {
                        arrayFichas.push({
                            x: x,
                            y: quince
                        })
                        quince = quince + 1
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
    },
}