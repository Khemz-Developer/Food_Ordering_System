const Payment = require("../models/Payments");

const acceptOrder = async (req, res) => {
    const paymentId = req.params.id;
    try {
        const updateOrder = await Payment.findByIdAndUpdate(paymentId, { status: "Success" }, { new: true, runValidators: true });

        if (!updateOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(updateOrder);
    }catch(error){
        res.status(500).json({message:error.message});
    }

}

const rejectOrder = async (req, res) => {
    const paymentId = req.params.id;
    try {
        const updateOrder = await Payment.findByIdAndUpdate(paymentId, { status: "Failed" }, { new: true, runValidators: true });

        if (!updateOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(updateOrder);
    }catch(error){
        res.status(500).json({message:error.message});
    }   
}

module.exports = { 
    acceptOrder,
    rejectOrder
 }; // export the controller