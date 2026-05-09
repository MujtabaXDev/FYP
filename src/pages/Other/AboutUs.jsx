const AboutUs = () => {
  return (
    <div className=" bg-white/30 h-screen menu-background mt-100">
      <div className="section-container  ">
        <div className=" flex flex-col md:flex-row-reverse justify-center content-between mt-12 gap-6">
          {/* Left side */}

          <div className="md:w-3/5 space-y-7 shadow-xl  text-black bg-white/30 p-6 m-4 rounded-2xl mt-36">
            <h2 className="text-3xl font-semibold text-black">About Us</h2>
            <p className="text-black  text-ellipsis">
              EcoNest Café is more than just a place to eat — it’s a step
              towards a greener future. Built on the idea of sustainable living,
              we bring together nature, comfort, and flavor in one unique
              space.{" "}
            </p>
            <p className="text-black ">
              Our café is designed to offer a peaceful, forest-inspired
              environment where every detail reflects care for the planet. From
              organic ingredients to eco-friendly practices, we aim to create a
              dining experience that feels good and does good.
            </p>
            <p className="text-black ">
              At EcoNest, we don’t just serve food — we serve a purpose. Every
              visit is a chance to relax, reconnect with nature, and be part of
              a positive change.
            </p>
          </div>

          {/* Right Side */}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
