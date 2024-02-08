import React, { useEffect, useState } from "react";

const Menu = () => {
    
  const[menu,setMenu] = useState([])
  const[filteredItems,setFilteredItems] = useState([]);
  const[selectedCategory,setSelectedCategory] = useState("all");
  const[sortOption, setsortOption] = useState("default")

  //loading data
  useEffect(()=>{
    //fetch data from the backend --
    const fetchData = async()=>{
        try{
            const responce = await fetch("/menu.json");
            const data = responce.json();
           // console.log(data);
            setMenu(data);
        } catch(error){
            console.log("Error fetching data ",error);
        }
        
      };

      //Call the function
      fetchData()
  },[]) 
    
  return (
    <div>
      {/* menu  */}
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
        
      </div>
    </div>
  );
};

export default Menu;
