import React, { useEffect, useState } from 'react';

const ShopPage = () => {
  const [cakes, setCakes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCakes, setFilteredCakes] = useState([]);
  const [priceRange, setPriceRange] = useState(75);
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        const allCakes = [...data['By Flavor'], ...data['By Type/Design']];
        setCakes(allCakes);
        setFilteredCakes(allCakes);
      })
      .catch(err => console.error('Error loading data:', err));
  }, []);

  useEffect(() => {
    let filtered = cakes.filter(cake => {
      const nameMatch = cake.name.toLowerCase().includes(searchTerm.toLowerCase());
      const availableSize = cake.sizes.find(size => size.available);
      const priceMatch = availableSize?.price <= priceRange;
      return nameMatch && priceMatch;
    });

    if (sortOrder === 'low-to-high') {
      filtered.sort((a, b) => {
        const aPrice = a.sizes.find(size => size.available)?.price || 0;
        const bPrice = b.sizes.find(size => size.available)?.price || 0;
        return aPrice - bPrice;
      });
    } else if (sortOrder === 'high-to-low') {
      filtered.sort((a, b) => {
        const aPrice = a.sizes.find(size => size.available)?.price || 0;
        const bPrice = b.sizes.find(size => size.available)?.price || 0;
        return bPrice - aPrice;
      });
    }

    setFilteredCakes(filtered);
  }, [searchTerm, cakes, priceRange, sortOrder]);

  return (
    <div className="bg-[#f8f6f6] min-h-screen text-gray-800">
      {/* Banner */}
      <div className="relative">
        <img
          src="https://i.pinimg.com/736x/51/3d/7f/513d7fa3532f07b3d25f200f1f1dd440.jpg"
          className="w-full h-64 object-cover"
          alt="Shop Banner"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-pink-600 italic">Our Shop</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <div className="mb-10">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">Available Cakes</h2>
            <ul className="space-y-3 text-sm">
              {cakes
                .filter(cake => cake.priceOptionsAvailable > 0)
                .sort((a, b) => b.priceOptionsAvailable - a.priceOptionsAvailable)
                .slice(0, 8)
                .map((cake, idx) => (
                  <li key={idx} className="flex justify-between text-gray-700">
                    <span className="truncate">{cake.name}</span>
                    <span className="bg-pink-100 text-pink-600 text-xs px-2 py-0.5 rounded">
                      {cake.priceOptionsAvailable}
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">Price Filter</h2>
            <input
              type="range"
              className="w-full"
              min="5"
              max="75"
              value={priceRange}
              onChange={e => setPriceRange(Number(e.target.value))}
            />
            <p className="text-sm mt-2 text-gray-600">Under ${priceRange}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">Top Sale</h2>
            <ul className="space-y-4">
              {cakes.slice(0, 3).map((cake, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">{cake.name}</p>
                    <p className="text-xs text-gray-500 font-semibold">
                      ${cake.sizes[0]?.price}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="md:col-span-3">
          <div className="flex justify-between items-center mb-8">
            <input
              type="text"
              placeholder="Search cakes..."
              className="p-3 border border-gray-300 rounded-md w-1/2"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <select
              className="border p-2 rounded-md"
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCakes.map((cake, idx) => {
              const availableSize = cake.sizes.find(size => size.available);
              return (
                <div key={idx} className="bg-white p-4 shadow rounded-xl text-center">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{cake.name}</h3>
                  <div className="text-yellow-400 text-sm my-1">⭐⭐⭐⭐☆</div>
                  <p className="text-pink-600 font-bold text-lg mb-2">
                    ${availableSize?.price || 'N/A'}
                  </p>
                  <div className="flex gap-2 justify-center">
                    <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition">
                      Add to Cart
                    </button>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition">
                      Order Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShopPage;
