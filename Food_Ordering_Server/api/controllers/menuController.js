const Menu = require("../models/Menu");

const getAllMenuItems = async (req, res) => {
    try {
        const menus = await Menu.find({}).sort({ createdAt: -1 });
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 // counting total counts in each category

 const getCountEachCategory = async (req, res) => {
    try {
      const categories = await Menu.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        }
      ]);
  
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };





// post a new menu item
const createMenuItem = async (req, res) => {

    const newMenuItem = req.body;

    try{
        const result = await Menu.create(newMenuItem);
        res.status(200).json(result);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

// delete a menu item
const deleteMenuItem = async (req, res) => {
    const menuId = req.params.id;
    try {
        const deleteMenu = await Menu.findByIdAndDelete(menuId);
        if (!deleteMenu) {
            return res.status(404).json({ message: "Menu not found" });
        }
        res.status(200).json({ message: "Menu deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get single menu item
const getSingleMenuItem = async (req, res) => {
    const menuId = req.params.id;
    try {
        const menu = await Menu.findById(menuId);
        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//update a menu item
const updateMenuItem = async (req,res) =>{
    const menuId = req.params.id;
    const {name, recipe, image, category, price} = req.body;

    try{
        const updatedMenu = await Menu.findByIdAndUpdate(menuId, {name, recipe, image, category, price}, {new:true , runValidators:true});
        if(!updatedMenu){
            return res.status(404).json({message: "Menu not found"});
        }
        res.status(200).json(updatedMenu);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
module.exports ={
    getAllMenuItems,
    createMenuItem,
    deleteMenuItem,
    getSingleMenuItem,
    updateMenuItem,
    getCountEachCategory
}