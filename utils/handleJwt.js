const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/handlePropertiesEngine")
const propertiesKey = getProperties()
/**
 * Debes pasar el objeto del usuario
 * @param user
 * @returns {Promise<void>}
 */

const tokenSign = async (user) => {
    return await jwt.sign({
            [propertiesKey.data.id]: user[propertiesKey.data.id],
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h",
        }
    )
}

/**
 * Debes pasar el token de sesion wl JWT
 * @param tokenJwt
 * @returns {Promise<void>}
 */

const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET);
    } catch (e) {
        return null
    }
}

module.exports = {tokenSign, verifyToken}