import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CakeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [cake, setCake] = useState(null);
  const [allCakes, setAllCakes] = useState([]);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedSize, setSelectedSize] = useState(null);


  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        const cakes = [...data['By Flavor'], ...data['By Type/Design']];
        setAllCakes(cakes);
        const selectedCake = cakes.find(c => String(c.id) === id);
        setCake(selectedCake);
      });
  }, [id]);

  if (!cake) return <div className="p-8 text-center text-gray-600">Loading cake details...</div>;

  const relatedProducts = allCakes.filter(item => item.id !== cake.id).slice(0, 4);

  // Function to handle the click on the "Add to Cart" button
  const handleAddToCart = () => {
    const selectedSize = ['XL', 'L', 'M', 'S'].find(size =>
      document.activeElement.textContent === size
    ) || cake.sizes.find(size => size.available)?.name;
  
    const quantity = parseInt(document.querySelector('input[type="number"]').value, 10) || 1;
    const selectedSizeData = cake.sizes.find(size => size.name === selectedSize);
  
    const cartItem = {
      id: cake.id,
      name: cake.name,
      image: cake.image,
      size: selectedSize,
      quantity,
      price: selectedSizeData?.price || 0,
      ingredients: cake.ingredients || [],
      details: cake.details || cake.description || '',
    };
  
    // Store in localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    existingCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));
  
    // Navigate to cart page
    navigate('/cart');
  };
  

  // Function to handle the click on related products
  const handleRelatedProductClick = (productId) => {
    navigate(`/cake/${productId}`); // Navigate to the selected cake's details page
  };

  return (
    <div>
      {/* Hero Banner */}
      <div
        className="h-60 bg-sweetPink flex items-center justify-center"
        style={{
          backgroundImage: `url('/cake-header.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="text-white text-4xl font-bold drop-shadow">Cake Details</h1>
      </div>

      {/* Product Section */}
      <div className="max-w-6xl mx-auto -mt-20 bg-orange-50 p-8 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 relative z-10">
        {/* Image */}
        <div>
          <img
            src={cake.image}
            alt={cake.name}
            className="w-full max-h-[400px] rounded-lg object-contain"
          />
        </div>

        {/* Product Info */}
        <div>
          <h2 className="text-2xl font-bold">{cake.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="text-yellow-500 text-sm">{'★'.repeat(Math.floor(cake.rating || 0))}</div>
            <span className="text-gray-600 text-sm">({cake.reviews || 0} reviews)</span>
          </div>
          <p className="text-berryPink text-2xl font-semibold mt-3">
            ${cake.sizes.find(size => size.available)?.price || 'N/A'}
          </p>

         

          {/* Quantity */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="w-16 border border-gray-900 px-2 py-1 text-sm rounded"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-berryPink text-white text-sm px-6 py-2 rounded hover:opacity-90">
              Buy Now
            </button>
            <button
              onClick={handleAddToCart} // Add event handler for "Add to Cart"
              className="border border-sweetPink text-sm px-6 py-2 rounded hover:bg-black hover:text-white"
            >
              Add to Cart
            </button>
          </div>

          {/* Tags */}
          <div className="text-xs text-gray-900 mt-6 space-y-1">
            <p>SKU: 1233</p>
            <p>Category: Cakes, Sweet Touch</p>
            <p>Tags: Classic, Modern</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-8 mt-10">
        <div className="flex border-b mb-4 space-x-6 text-sm font-semibold text-gray-600">
          {['description', 'info', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 capitalize ${activeTab === tab ? 'border-b-2 border-berryPink text-berryPink' : 'hover:text-berryPink'}`}
            >
              {tab === 'info' ? 'Additional Information' : tab === 'description' ? 'Description' : `Reviews (${cake.reviews || 0})`}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-700 leading-relaxed">
          {activeTab === 'description' && <p>{cake.details || cake.description || 'No description available.'}</p>}
          {activeTab === 'info' && (
            <ul className="list-disc list-inside">
              {cake.ingredients?.length ? cake.ingredients.map((ing, i) => <li key={i}>{ing}</li>) : <li>No additional information available.</li>}
            </ul>
          )}
          {activeTab === 'reviews' && <p>No reviews yet. Be the first to review this cake!</p>}
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-6xl mx-auto px-8 mt-12 mb-12">
        <h3 className="text-2xl font-bold mb-4">Related Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map(item => (
            <div key={item.id} className="border rounded-lg p-4 shadow text-center">
              <img
                src={item.image}
                alt={item.name}
                className="h-32 w-full object-contain bg-gray-50 rounded mb-2"
              />
              <h4 className="text-sm font-semibold">{item.name}</h4>
              <p className="text-xs text-berryPink mt-1">Cake • Sweet</p>
              <p className="text-berryPink text-sm font-medium">${item.sizes.find(size => size.available)?.price || 'N/A'}</p>
              <button
                className="mt-2 bg-berryPink hover:bg-pink-600 text-white text-xs px-3 py-1 rounded"
                onClick={() => handleRelatedProductClick(item.id)} // On click, navigate to the related product's details page
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CakeDetailsPage;
