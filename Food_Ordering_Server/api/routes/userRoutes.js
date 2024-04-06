const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

router.get('/',verifyToken,verifyAdmin, userController.getAllUsers); // get all users
router.post('/',userController.createUser); // post a new user
router.delete('/:id',verifyToken,verifyAdmin,userController.deleteUser); // delete a user
router.get('/admin/:email',verifyToken,userController.getAdmin); // get admin
router.patch('/admin/:id',verifyToken,verifyAdmin,userController.makeAdmin); // update admin

module.exports = router; // export the router
