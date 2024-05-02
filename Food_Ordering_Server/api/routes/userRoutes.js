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
router.get('/user-count',verifyToken,verifyAdmin,userController.getUsersCount); // get all users count
router.get('/admin-count',verifyToken,verifyAdmin,userController.getAdminCount); // get all admin count
router.get('/admin-earnings',verifyToken,verifyAdmin,userController.countPrice); // get admin earnings
router.get('/admin-pending-earnings',verifyToken,verifyAdmin,userController.countPendingPrice); // get admin pending earnings
module.exports = router; // export the router
