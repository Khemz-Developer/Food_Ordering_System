const User = require("../models/User");
const Payment = require("../models/Payments");

// count price of all  success orders
const countPrice = async (req, res) => {
  try {
    const payments = await Payment.find({ status: "Success"});
    let total = 0;
    payments.map((payment) => {
      total += payment.price;
    });
    res.status(200).json(total);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// count price of all pending orders
const countPendingPrice = async (req, res) => {
  try {
    const payments = await Payment.find({ status: "Order Pending"});
    let total = 0;
    payments.map((payment) => {
      total += payment.price;
    });
    res.status(200).json(total);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all users by email
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all users count
const getUsersCount = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).countDocuments();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all user count which role is Admin
const getAdminCount = async (req, res) => {
  try {
    const users = await User.find({ role: "admin" }).countDocuments();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// post a new user
const createUser = async (req, res) => {
  const user = req.body;
  const query = { email: user.email };

  try {
    const existingUser = await User.findOne(query);
    if (existingUser) {
      return res.status(302).json({ message: "User already exists !" });
    }
    const result = await User.create(user);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get admin
const getAdmin = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  try {
    const user = await User.findOne(query);
    //console.log(user);
    if (email !== req.decoded.email) {
      return res
        .status(403)
        .json({ message: "You are not authorized to view this content" });
    }

    let admin = false;
    if (user) {
      admin = user?.role === "admin";
    }
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// make admin of a user
const makeAdmin = async (req, res) => {
    const userId = req.params.id;
    const {name, email,photoUrl,role} = req.body;
    try{
        const updatedUser = await User.findByIdAndUpdate(userId, { role:"admin"}, {new: true , runValidators: true});

        if(!updatedUser){
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json(updatedUser);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  getAdmin,
  makeAdmin,
  getUsersCount,
  getAdminCount,
  countPrice,
  countPendingPrice
};
