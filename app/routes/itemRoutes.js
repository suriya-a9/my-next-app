const express = require("express");
const router = express.Router();

const { add, update, deleteItem, list } = require("../controller/itemController");

router.post('/add', add);
router.post('/update/:id', update);
router.post('/delete/:id', deleteItem);
router.get('/', list);

module.exports = router;