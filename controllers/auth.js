const {matchedData} = require("express-validator");
const {encrypt, compare} = require("../utils/handlePassword");
const {userModel} = require("../models");
const {tokenSign} = require("../utils/handleJwt");
const {handleHttpError} = require("../utils/handelError")

/**
 * Este controlador es el encargado de registrar un usuario
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = {...req, password};
        const dataUser = await userModel.create(body);
        dataUser.set('password', undefined, {strict: false});

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser,
        }

        //console.log(data);

        res.send({data});
    } catch (e) {
        handleHttpError(res, "ERROR REGISTER USER");
        console.log(e);
    }
}

const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const user = await userModel.findOne({email: req.email})
            .select('password name role email');
        if (!user) {
            handleHttpError(res, "USER_NOT_EXISTS", 404);
            return
        }
        const hashPassword = user.get('password');

        const check = await compare(req.password, hashPassword)
        if (!check) {
            handleHttpError(res, "PASSWORD_INVALID", 401);
            return
        }
        user.set('password', undefined, {strict: false})
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send({data});

    } catch (e) {
        console.log(e);
        handleHttpError(res, "ERROR_LOGIN_USER");
    }
}

module.exports = {registerCtrl, loginCtrl};