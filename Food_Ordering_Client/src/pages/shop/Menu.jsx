import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";
const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  //loading data
  useEffect(() => {
    //fetch data from the backend --
    const fetchData = async () => {
      try {
        const responce = await fetch("/menu.json");
        const data = await responce.json();
        
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log("Error fetching data ", error);
      }
    };

    //Call the function
    fetchData();
  }, []);

  // Filtering Data Based on Category

  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
  };

  //show all data
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
  };

  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems];

    //logic
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredItems(sortedItems)
  };

  // shorting based on A-Z ,Z-A ,Low - High Pricing
  return (
    <div>
      {/* menu banner */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="flex flex-col items-center justify-center gap-8 py-48 ">
          {/*test*/}
          <div className="px-4 space-y-6 text-center ">
            <h2 className="text-4xl font-bold leading-snug md:leading-snug md:text-5xl">
              For the Love of Delicious <span className="text-green">Food</span>{" "}
            </h2>
            <p className="text-xl text-[#4A4A4A] md:w-4/5 mx-auto">
              Come with family & feel the joy of mouthwatering food such as
              Greek Salad, Lasange, Butternut Pumpkin, Tokusen Wagyu, Olivas
              Rellenas and more for a moderate cost
            </p>
            <button className="px-8 py-3 font-semibold text-white rounded-full btn bg-green">
              {" "}
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* menu shop section */}

      <div className="section-container">
        {/* filtered and sorting*/}
        <div className="flex flex-col flex-wrap items-center md:justify-between md:flex-row">
        {/* all category buttons */}
        <div className="flex flex-row flex-wrap justify-start gap-4 mt-5 md:items-center">
          <button className={selectedCategory === "all" ? "active" : ""} onClick={showAll}>All</button>
          <button className={selectedCategory === "salad" ? "active" : ""}  onClick={()=> filterItems("salad")}>Salad</button>
          <button className={selectedCategory === "pizza" ? "active" : ""}  onClick={()=> filterItems("pizza")}>Pizza</button>
          <button className={selectedCategory === "soup" ? "active" : ""}  onClick={()=> filterItems("soup")}>Soup</button>
          <button className={selectedCategory === "dessert" ? "active" : ""}  onClick={()=> filterItems("dessert")}>Dessert</button>
          <button className={selectedCategory === "drinks" ? "active" : ""}  onClick={()=> filterItems("drinks")}>Drinks</button>
        </div>
        {/* sorting filter */}

        <div className="flex justify-end mt-4 rounded-sm">
          <div className="p-2 bg-black">
            <FaFilter className="w-4 h-4 text-white"/>
          </div>
          
          {/* sorting options */}
          <select name="sort" id="sort" onChange={(e)=>handleSortChange(e.target.value)} value={sortOption} className="px-2 py-1 text-white bg-black rounded-sm">
            <option value="default">Default</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="low-to-high">Low-to-High</option>
            <option value="high-to-low">High-to-Low</option>
          </select>
        </div>
        </div>

        {/* product cards*/}
        <div className="grid grid-cols-1 gap-2 mt-3 md:grid-cols-4 sm:grid-col-2">  
            {filteredItems.map((item, i) => (
              <Cards key={i} item={item}></Cards>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
