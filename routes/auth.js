const express = require("express");
const {loginCtrl, registerCtrl} = require("../controllers/auth")
const router = express.Router();
const {validatorRegisterItem, validatorLoginItem} = require("../validators/auth");

/**
 * Crear un registro
 */

router.post("/register", validatorRegisterItem, registerCtrl);
router.post("/login", validatorLoginItem, loginCtrl);

module.exports = router;