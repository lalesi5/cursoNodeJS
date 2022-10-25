const express = require("express");
const {matchedData} = require("express-validator");
const {tokenSign} = require("../utils/handleJwt")
const {encrypt, compare} = require("../utils/handlePassword");
const {userModel} = require("../models")
const router = express.Router();
const {validatorRegisterItem, validatorLoginItem} = require("../validators/auth");

/**
 * Crear un registro
 */

router.post("/register", validatorRegisterItem, async (req, res) => {
    req = matchedData(req);
    const password = await encrypt(req.password)
    const body = {...req, password}
    const dataUser = await userModel.create(body)
    dataUser.set('password', undefined, {strict: false})

    const data = {
        token: await tokenSign(dataUser),
        user: dataUser
    }

    res.send({data})

})

module.exports = router;