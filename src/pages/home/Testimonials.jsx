import React from "react";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div className="section-container bg-white">
      <div className="flex flex-col md:flex-row items-center  justify-between gap-12 ">
        {/* left side */}
        <div className="md:w-1/2  ">
          <img
            src="/KiZo3.jpg"
            alt="testimonials"
            className="w-[500px] rounded-lg"
          />
        </div>

        {/* right side*/}

        <div className="md:w-1/2 p-1">
          <div className="text-left md:w-4/s">
            <p className="subtitle">Testimonials</p>
            <h2 className="title">What You Can Expect From EcoNest</h2>
            <div className=" ml-2">
              <blockquote className="text-base  font-medium text-secondary my-5 leading-[30px] ">
                EcoNest Café is built around the needs of modern customers who
                value both quality and sustainability. From fresh, organic
                flavors to a calm, nature-inspired environment, we aim to
                deliver an experience that is not only enjoyable but also
                meaningful. Every detail is designed to meet expectations of
                comfort, taste, and responsibility
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
