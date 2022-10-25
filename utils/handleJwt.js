const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET
/**
 * Debes pasar el objeto del usuario
 * @param user
 * @returns {Promise<void>}
 */

const tokenSign = async (user) => {
    const sign = await jwt.sign({
            __id: user.__id,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h",
        }
    );
    return sign
}

/**
 * Debes pasar el token de sesion wl JWT
 * @param tokenJwt
 * @returns {Promise<void>}
 */

const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (e) {
        return null
    }
}

module.exports = {tokenSign, verifyToken}