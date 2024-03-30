const express = require('express');
const cartController = require('../controllers/cartController'); // Import the cartController module

const router = express.Router();
const Carts = require('../models/Carts');

router.get('/:email', cartController.getAllCartItemsByEmail); // get all cart items operation)
router.post('/', cartController.postCartItems); // post our cart items to database
router.delete('/:id', cartController.deleteCartItems); // delete a cart items
router.put('/:id', cartController.updateCartItems); // update cart items
router.get('/singlecart/:id', cartController.getSingleCart); // get specific cart

module.exports = router; // export the router
