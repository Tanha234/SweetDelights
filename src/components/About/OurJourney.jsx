import React from "react";

const OurJourney = () => {
  return (
    <section className="py-16 px-4 md:px-44 bg-sweetPink">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left side - Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-berryPink mb-4">
            🎂 Our Journey
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            What started as a small home bakery turned into a dream come true. With a passion for baking and a love
            for creativity, we opened our online cake shop to bring handcrafted cakes straight to your doorstep.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Every cake we create is a labor of love, crafted with premium ingredients and a sprinkle of happiness.
            From classic flavors to custom designs, our mission is to turn your sweet moments into lasting memories.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Over the years, our little venture has grown into a beloved brand known for quality, warmth, and creativity.
            We're grateful for the love and support from our community—and we can’t wait to be part of your next celebration!
          </p>
        </div>

        {/* Right side - Image */}
        <div className="md:w-1/2 ms-16">
          <img
            src="https://i.pinimg.com/736x/95/e3/48/95e34840e9aee13f131b97351de194fe.jpg"
            alt="Our journey cake"
            className="w-96 h-96 rounded-xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default OurJourney;
