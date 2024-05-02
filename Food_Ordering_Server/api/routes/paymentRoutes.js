const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");

const Payment = require("../models/Payments");
const Cart = require("../models/Carts");
const ObjectId = require("mongoose").Types.ObjectId; // import ObjectId from mongoose

const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require('../middleware/verifyAdmin');


router.post("/", verifyToken, async (req, res) => {
  const payment = req.body;
  //console.log(payment);
  try {
    const paymentRequest = await Payment.create(payment);

    //delete the cart items after payment
    const cartIds = payment.cartItems.map((id) => new ObjectId(id));
    const deletedCartItems = await Cart.deleteMany({ _id: { $in: cartIds } });

    res.status(200).json({ paymentRequest, deletedCartItems });
    //res.status(200).json(paymentRequest);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}); 

//get all orders according to email
//router.get('/:email', verifyToken, paymentController.getOrdersByEmail);
router.get('/pending-orders/:email', verifyToken, paymentController.getPendingOrders);
router.get('/accepted-orders/:email', verifyToken, paymentController.getAcceptedOrdersByEmail);
router.get('/rejected-orders/:email', verifyToken, paymentController.getRejectedOrdersByEmail);
router.get("/", verifyToken,paymentController.getPendingOrders);
router.patch("/accept/:id", verifyToken, paymentController.acceptOrder);
router.patch("/reject/:id", verifyToken, paymentController.rejectOrder);
router.patch("/update/:email", verifyToken, paymentController.updateOrder);
router.get("/all-accepted-orders", verifyToken, paymentController.getAcceptedOrders);
router.patch("/comfirm-delivery/:id", verifyToken, paymentController.deliveredOrder);

module.exports = router; // export the router
