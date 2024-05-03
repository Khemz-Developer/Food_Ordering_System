const express = require('express');

const router = express.Router();
const menuController = require('../controllers/menuController');
const Menu = require('../models/Menu');
const verifyToken = require('../middleware/verifyToken');



//get count of each category
router.get('/count-each-category',menuController.getCountEachCategory);
// get all menu items operation
router.get('/', menuController.getAllMenuItems);
// post a new menu item operation 
router.post('/', menuController.createMenuItem);
// delete a menu item operation
router.delete('/:id',verifyToken, menuController.deleteMenuItem);
// get single menu item operation
router.get('/:id', menuController.getSingleMenuItem);
// update a menu item operation
router.patch('/:id', menuController.updateMenuItem);

module.exports = router;