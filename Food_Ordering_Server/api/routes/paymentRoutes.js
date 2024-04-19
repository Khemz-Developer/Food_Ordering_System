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
  console.log(payment);
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

router.get('/:email',verifyToken,async (req,res)=>{
  const email = req.params.email;
  const query = {email:email};
  try{
    const decodedEmail = req.decoded.email;
    if(email !== decodedEmail){
      res.status(403).json({message:"Forbiden Access"})
    }
    const result = await Payment.find(query).sort({createdAt:-1}).exec();
    res.status(200).json(result);

  }catch(error){
    res.status(500).json({message:error.message})
  }
})



router.get("/", verifyToken, async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.patch("/accept/:id", verifyToken, paymentController.acceptOrder);
router.patch("/reject/:id", verifyToken, paymentController.rejectOrder);

module.exports = router; // export the router
