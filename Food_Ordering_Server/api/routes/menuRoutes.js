const express = require('express');

const router = express.Router();
const menuController = require('../controllers/menuController');
const Menu = require('../models/Menu');




// get all menu items operation
router.get('/', menuController.getAllMenuItems);
// post a new menu item operation 
router.post('/', menuController.createMenuItem);

module.exports = router;