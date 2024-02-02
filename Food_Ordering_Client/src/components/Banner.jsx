import React from "react";

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="flex flex-col items-center justify-between gap-8 py-24 md:flex-row ">
        {/*test*/}
        <div className="px-4 space-y-6 md:w-1/2">
            <h2 className="text-4xl font-bold leading-snug md:leading-snug md:text-5xl">Dive into Delights Of Delectable <span className="text-green">Food</span></h2>
            <p className="text-xl text-[#4A4A4A]">Where Each Plate Waves a Story of Culinary Mastery and Passionate Craftmanship</p>
            <button className="px-8 py-3 font-semibold text-white rounded-full btn bg-green"> Order Now</button>
        </div>

        {/*image*/}
        <div className="md:w-1/2">
            <img src="/images/home/banner.png" alt="" />
            <div>
                <img src="/images/home/b-food1.png" className="rounded-2xl"></img>
                <div>
                    <h5>Spicy noodles</h5>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
