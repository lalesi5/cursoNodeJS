const express = require("express");
const router = express.Router();
const customHeader = require("../middleware/curstonHeader")
const {validatorCreateItem, validatorGetItem} = require("../validators/tracks");
const { getItems,getItem, createItem, updateItem } = require("../controllers/tracks");


router.get("/", getItems);
router.get("/:id",validatorGetItem, getItem);
router.put("/:id",validatorGetItem,validatorCreateItem, updateItem);
router.post("/",validatorCreateItem, createItem);


module.exports = router