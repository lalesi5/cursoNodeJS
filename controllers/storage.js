const fs = require("fs");
const {storageModel} = require("../models");
const {handleHttpError} = require("../utils/handelError");
const {matchedData} = require("express-validator");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/** Obtener un lista de la base de datos
 * @param {*} req
 * @param {*} res
 */

const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({});
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_LIST_ITEMS');
    }
};

/** Obtener un detalle
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const data = await storageModel.findById(id);
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_DETAIL_ITEMS');
    }
};

/** Crear un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
    try {
        const {file} = req
        console.log(file)
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData)
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_CREATE_ITEMS');
    }
};

/** Exportar un registro
 * @param {*} req
 * @param {*} res
 */

const deleteItem = async (req, res) => {

    try {
        const {id} = matchedData(req)
        const dataFile = await storageModel.findById(id);
        //await storageModel.deleteOne(id) *
        await storageModel.delete({_id: id})
        const {filename} = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`

        //fs.unlinkSync(filePath); //Eliminacion fisica del registro del servidor *
        const data = {
            filePath,
            deleted: 1
        }

        res.send({data})
    } catch (e) {
        console.log(e)
        handleHttpError(res, 'ERROR_DELETE_ITEMS');
    }

};


module.exports = {getItems, getItem, createItem, deleteItem};