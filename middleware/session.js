const {handleHttpError} = require("../utils/handelError")
const {verifyToken} = require("../utils/handleJwt");
const {userModel} = require("../models");

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "NEED_SESSION", 409);
            return
        }

        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
        if (tokenData._id) {
            req.user = await userModel.findById(tokenData._id);
            next();
        } else {
            handleHttpError(res, "NOT_ALLOW", 409);
        }

    } catch (e) {
        handleHttpError(res, "NOT_SESSION", 401);
    }
}

module.exports = authMiddleware;