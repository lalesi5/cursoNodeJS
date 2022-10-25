const bcryptjs = require("bcryptjs");

/**
 * Contraseña sin encriptar: hola.01
 * @param passwordPlain
 * @returns {Promise<void>}
 */

const encrypt = async (passwordPlain) => {
    return await bcryptjs.hash(passwordPlain, 10)
}

/**
 * Pasar contraseña sin encriptar y pasar contraseña encriptada
 * @param passwordPlain
 * @param hashPassword
 * @returns {Promise<void>}
 */

const compare = async (passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword)
}

module.exports = {encrypt, compare}