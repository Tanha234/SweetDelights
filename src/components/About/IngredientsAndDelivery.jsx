import React from "react";
import { FaLeaf, FaEgg, FaAppleAlt, FaIceCream, FaTruck } from "react-icons/fa";
import { MdNoFood } from "react-icons/md";

const ingredients = [
  { icon: <FaEgg size={20} />, text: "Organic dairy and eggs" },
  { icon: <FaAppleAlt size={20} />, text: "Locally sourced fruits" },
  { icon: <FaIceCream size={20} />, text: "Premium chocolate and vanilla" },
  { icon: <MdNoFood size={20} />, text: "No artificial preservatives" },
];

const IngredientsAndDelivery = () => {
  return (
    <div className="bg-pink-50 py-16 px-4 md:px-16 space-y-20">
      {/* Ingredients Section */}
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-pink-700 mb-6">
          🌿 Ingredients You Can Trust
        </h2>
        <ul className="space-y-4 text-gray-700 text-lg">
          {ingredients.map((item, index) => (
            <li key={index} className="flex items-center gap-3 justify-center">
              <span className="text-pink-600">{item.icon}</span>
              {item.text}
            </li>
          ))}
        </ul>
      </section>

      {/* Delivery Section */}
      <section className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-pink-700 mb-6">
          🚚 Delivery & Service Areas
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          We proudly deliver across <strong>[Your City]</strong> and nearby areas.
          Our reliable delivery service ensures your cake arrives fresh and on time,
          bringing sweetness straight to your door.
        </p>
        <div className="flex justify-center mt-6 text-pink-600">
          <FaTruck size={40} />
        </div>
      </section>
    </div>
  );
};

export default IngredientsAndDelivery;
