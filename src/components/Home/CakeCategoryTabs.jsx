// CakeCategoryTabs.js
import { useState } from "react";

const cakeData = {
  "By Flavor": [
    { name: "Chocolate", image: "/icons/chocolate.png" },
    { name: "Vanilla", image: "/icons/vanilla.png" },
    { name: "Red Velvet", image: "/icons/redvelvet.png" },
    { name: "Strawberry", image: "/icons/strawberry.png" },
    { name: "Mango", image: "/icons/mango.png" },
  ],
  "By Occasion": [
    { name: "Birthday", image: "/icons/birthday.png" },
    { name: "Wedding", image: "/icons/wedding.png" },
    { name: "Anniversary", image: "/icons/anniversary.png" },
    { name: "Baby Shower", image: "/icons/babyshower.png" },
    { name: "Graduation", image: "/icons/graduation.png" },
  ],
  "By Type/Design": [
    { name: "Fondant", image: "/icons/fondant.png" },
    { name: "Photo Cake", image: "/icons/photo.png" },
    { name: "Cupcake", image: "/icons/cupcake.png" },
    { name: "Tier Cake", image: "/icons/tier.png" },
    { name: "Pinata", image: "/icons/pinata.png" },
  ],

};

export default function CakeCategoryTabs() {
  const tabs = Object.keys(cakeData);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="py-10 px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">Explore Cake Categories</h2>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full border ${
              activeTab === tab
                ? "bg-pink-500 text-white"
                : "bg-white text-gray-700 border-pink-400"
            } transition duration-200`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Icons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {cakeData[activeTab].map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-pink-400 shadow-md hover:scale-105 transition duration-300">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-sm font-medium">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
