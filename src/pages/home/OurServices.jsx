import React from "react";

const serviceLists = [
  {
    id: 1,
    title: "Catering",
    des: "Delight your guests with our flavors and presentation",
    img: "/images/home/services/icon1.png",
  },
  {
    id: 2,
    title: "Fast delivery",
    des: "We deliver your order promptly to your door",
    img: "/images/home/services/icon2.png",
  },
  {
    id: 3,
    title: "Online Ordering",
    des: "Explore menu & order with ease using our Online Ordering n",
    img: "/images/home/services/icon3.png",
  },
  {
    id: 4,
    title: "Gift Cards",
    des: "Give the gift of exceptional dining with Foodi Gift Cards",
    img: "/images/home/services/icon4.png",
  },
];

const OurServices = () => {
  return (
    <div className="section-container my-20 bg-white">
      <div className="flex flex-col md:flex-row items-center justify-between gap-20">
        {/* Left side */}
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Our Story & Services</p>
            <h2 className="title text-teal-600/60 ">
              Our Journey Into Sustainable Dining
            </h2>
            <p className="my-5 text-base font-medium text-secondary leading-[30px]">
              EcoNest Café is built on a simple idea — to bring together great
              food and a meaningful experience. Our journey focuses on creating
              a space where fresh, organic flavors meet a calm, nature-inspired
              environment. Along with serving quality meals, we offer
              eco-conscious practices and a unique atmosphere that allows you to
              relax, connect, and enjoy every moment in a greener way.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="md:w-1/2">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
            {serviceLists.map((service) => (
              <div
                key={service.id}
                className="bg-teal-600/60 shadow-xl border-none rounded-lg py-5 px-4 text-center space-y-2  text-white cursor-pointer hover:border hover:border-indigo-600 transition-all duration-200"
                style={{ width: "240px", height: "180px" }} // Set fixed width and height for the card
              >
                <img src={service.img} alt="" className="mx-auto" />
                <h5 className="pt-3 font-bold"> {service.title}</h5>
                <p className="text-gray-200">{service.des}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
