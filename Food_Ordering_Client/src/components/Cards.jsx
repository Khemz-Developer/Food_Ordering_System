import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Cards = ({ item }) => {
  const [isHeartFillted, setIsHeartFillted] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFillted(!isHeartFillted);
  };

  return (
    <div>
      {/* <div className="relative shadow-xl w-96 card bg-base-100"> */}
      <div
        to={`/menu/${item._id}`}
        className="relative mr-5 shadow-xl card md:my-5"
      >
        <div
          className={`absolute  gap-1 p-4 rating right-2 top-2 bg-green heartStar ${
            isHeartFillted ? "text-rose-500" : "text-white"
          }`}
          onClick={handleHeartClick}
        >
          <FaHeart className="w-5 h-5 cursor-pointer"></FaHeart>
        </div>
        <Link to={`/menu/${item._id}`}>
          <figure>
            <img
              className="transition-all duration-200 m hover:scale-105 md:h-72"
              src={item.image}
              alt=""
            />
          </figure>
        </Link>
        <div className="card-body">
          <Link to={`/menu/${item._id}`}>
            {" "}
            <h2 className="font-semibold ">{item.name}</h2>
          </Link>
          <p>Description of the item</p>
          <div className="justify-between item-center card-actions">
            <h5 className="font-semibold">
              <span className="font-sm text-red">$</span>
              {item.price}
            </h5>
            <button className="text-white btn bg-green">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
