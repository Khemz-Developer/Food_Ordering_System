const Carts = require("../models/Carts");

// get carts by email
const getAllCartItemsByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const result = await Carts.find({ email: email });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// post cart items
const postCartItems = async (req, res) => {
  try {
    const { menuItemId, name, recipe, image, price, quantity, email } =
      req.body;

    const existingCartItems = await Carts.findOne({ menuItemId, email });
    if (existingCartItems) {
      return res.status(400).json({ message: "Item already in cart page!" });
    }

    const cartItems = await Carts.create({
      menuItemId,
      name,
      recipe,
      image,
      price,
      quantity,
      email,
    });
    res.status(201).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete a cart items
const deleteCartItems = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Carts.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Cart item not found!" });
    }
    res.status(200).json({ message: "Cart item deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update cart items
const updateCartItems = async (req, res) => {
  const cartId = req.params.id;
  const { menuItemId, name, recipe, image, price, quantity, email } = req.body;

  try {
    const updatedCart = await Carts.findByIdAndUpdate(
      cartId,
      { menuItemId, name, recipe, image, price, quantity, email },
      { new: true, runValidators: true }
    );
    if (!updatedCart) {
      return res.status(404).json({ message: "Cart item not found!" });
    }

    return res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get single cart
const getSingleCart = async (req, res) => {
    const id = req.params.id;
    try {
    
    const result = await Carts.findById(id);
   
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllCartItemsByEmail,
  postCartItems,
  deleteCartItems,
  updateCartItems,
  getSingleCart,
};
