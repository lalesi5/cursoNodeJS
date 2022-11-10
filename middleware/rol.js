const { handleHttpError} = require("../utils/handelError")
/**
 * Array con los roles permitidos
 * @param {*} rol
 * @returns
 */

const checkRol = (rol) => (req,res,next) => {
    try{
        const {user} = req;
        console.log({user});
        const rolesByUser = user.role;

        const checkValueRol = rol.some((rolSingle) => rolesByUser.includes(rolSingle));

        if(!checkValueRol){
            handleHttpError(res,"USER_NO_PERMISIONS",403);
        }
        next();

    }catch (e) {
        handleHttpError(res,"ERROR_PERMISIONS",403);
    }
}

module.exports = checkRol;