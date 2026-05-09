import React from "react";

const Banner = () => {
  return (
    <div className="section-container  bg-white ">
      <div className="py-30 flex flex-col md:flex-row-reverse justify-between items-center gap-6">
        {/* small cards */}
        <div className="md:w-4/7  ">
          <img
            src="/image.jpg"
            alt="banner"
            className="w-full  h-[330px] md:h-[550px] mt-32  p-1 rounded-3xl object-cover   animate-fadeIn animation-delay-500 animation-fill-mode-forwards"
          />
          <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4"></div>
        </div>
        {/* Text */}

        <div className="md:w-1/2 space-y-7 px-0 md:px-4 md:mt-32">
          <div className="  rounded-3xl shadow-xl  p-2 md:p-8 px-10  bg-teal-600/70 ">
            <h2 className="md:text-4xl text-gray-800 text-4xl font-bold md:leading-snug leading-snug">
              Step Into Nature. Dine the Eco Way{" "}
              <span className="text-white ">EcoNest Café </span>
            </h2>

            <p className="text-gray-600 text-xl mt-4">
              Welcome to EcoNest Café — where every bite is fresh, every detail
              is green, and every visit feels like a peaceful escape. From
              organic flavors to eco-friendly practices, we serve food that’s
              good for you and kind to the planet. Enjoy a warm atmosphere,
              healthy meals, and refreshing moments made with care. Every dish
              is prepared to bring comfort, taste, and sustainability together.
            </p>

            <a href="/menu">
              <button className="bg-white shadow-2xl  text-slate-700 px-8 py-3 hover:bg-teal-500  font-semibold mt-8 rounded-full hover:shadow-none hover:bg-green-600 transition-all duration-300">
                Discover More
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
