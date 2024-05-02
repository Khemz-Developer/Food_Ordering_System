const Payment = require("../models/Payments");

// Accept Order function
const acceptOrder = async (req, res) => {
  const paymentId = req.params.id;
  try {
    const updateOrder = await Payment.findByIdAndUpdate(
      paymentId,
      { status: "Success" },
      { new: true, runValidators: true }
    );

    if (!updateOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject Order function
const rejectOrder = async (req, res) => {
  const paymentId = req.params.id;
  try {
    const updateOrder = await Payment.findByIdAndUpdate(
      paymentId,
      { status: "Failed" },
      { new: true, runValidators: true }
    );

    if (!updateOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get pending orders
const getPendingOrders = async (req, res) => {
  try {
    const payments = await Payment.find({ status: "Order Pending" });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all orders according to email
const getOrdersByEmail = async (req, res) => {
  const email = req.params.email;
  const query = { email: email }; // Adding status condition
  try {
    const decodedEmail = req.decoded.email;
    if (email !== decodedEmail) {
      res.status(403).json({ message: "Forbidden Access" });
    }
    const result = await Payment.find(query).sort({ createdAt: -1 }).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all pending orders according to email
const getPendingOrdersByEmail = async (req, res) => {
  const email = req.params.email;
  const query = { email: email, status: "Order Pending" }; // Filter by email and status
  try {
    const decodedEmail = req.decoded.email;
    if (email !== decodedEmail) {
      res.status(403).json({ message: "Forbidden Access" });
    }
    const result = await Payment.find(query).sort({ createdAt: -1 }).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all accepted orders according to email
const getAcceptedOrdersByEmail = async (req, res) => {
  const email = req.params.email;
  const query = { email: email, status: "Success" }; // Filter by email and status
  try {
    const decodedEmail = req.decoded.email;
    if (email !== decodedEmail) {
      res.status(403).json({ message: "Forbidden Access" });
    }
    const result = await Payment.find(query).sort({ createdAt: -1 }).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all rejected orders according to email
const getRejectedOrdersByEmail = async (req, res) => {
  const email = req.params.email;
  const query = { email: email, status: "Failed" }; // Filter by email and status
  try {
    const decodedEmail = req.decoded.email;
    if (email !== decodedEmail) {
      res.status(403).json({ message: "Forbidden Access" });
    }
    const result = await Payment.find(query).sort({ createdAt: -1 }).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  acceptOrder,
  rejectOrder,
  getPendingOrders,
  getOrdersByEmail,
  getPendingOrdersByEmail,
  getAcceptedOrdersByEmail,
  getRejectedOrdersByEmail,
}; // export the controller
