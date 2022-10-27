const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/session")
const customHeader = require("../middleware/curstonHeader")
const {validatorCreateItem, validatorGetItem} = require("../validators/tracks");
const { getItems,getItem, createItem, updateItem,deleteItem } = require("../controllers/tracks");


router.get("/",authMiddleware, getItems);
router.post("/",validatorCreateItem, createItem);
router.get("/:id",validatorGetItem, getItem);
router.put("/:id",validatorGetItem,validatorCreateItem, updateItem);
router.delete("/:id",validatorGetItem, deleteItem);


module.exports = router