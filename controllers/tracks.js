const {tracksModel} = require("../models");
const {handleHttpError} = require("../utils/handelError");
const {matchedData} = require("express-validator");

/** Obtener un lista de la base de datos
 * @param {*} req
 * @param {*} res
 */

const getItems = async (req, res) => {

    try {
        const data = await tracksModel.find({});
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_GET_ITEMS');
    }

};

/** Obtener un detalle
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.findById(id);
        res.send({data});
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEM")
    }
};

/** Crear un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {

    try {
        const body = matchedData(req);
        const data = await tracksModel.create(body);
        res.send({data});
    } catch (e) {
        handleHttpError(res, 'ERROR_CREANDO_ITEMS');
    }

};

/** Actualizar un registro
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {

    try {
        const {id, ...body} = matchedData(req);
        const data = await tracksModel.findOneAndUpdate(
            id, body
        );
        res.send({data});
    } catch (e) {
        handleHttpError(res, 'ERROR_UPDATE_ITEMS');
    }

};

/** Exportar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteItem = (req, res) => {
};


module.exports = {getItems, getItem, createItem, updateItem, deleteItem};