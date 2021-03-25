export default {
    methods: {
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
                                x: diezX,
                                y: diezY
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
            if (arrayFichas.length !== 0) {
                arrayFichas.forEach((ficha) => {
                    if (this.$store.state.jugadorActivo === this.$store.state.fichaNegra) {
                        this.$store.state.tableroJuego[ficha.x][ficha.y] = this.$store.state.fichaNegra
                    } else {
                        this.$store.state.tableroJuego[ficha.x][ficha.y] = this.$store.state.fichaBlanca
                    }
                })
                return true
            } else {
                return false
            }
        }
    }
}