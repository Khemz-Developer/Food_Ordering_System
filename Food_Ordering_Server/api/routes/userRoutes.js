const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

router.get('/', userController.getAllUsers); // get all users
router.post('/',userController.createUser); // post a new user
router.delete('/:id',userController.deleteUser); // delete a user
router.get('/admin/:email',userController.getAdmin); // get admin
router.patch('/admin/:id',userController.makeAdmin); // update admin

module.exports = router; // export the router
