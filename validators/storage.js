const {check, validationResult} = require("express-validator");
const validatorResults = require("../utils/handleValidator")

const validatorGetItem = [
    check("id")
        .exists()
        .notEmpty()
        .isMongoId(),
    (req, res, next) => {
        return validatorResults(req,res,next)
    }
];

module.exports = {validatorGetItem}