import React, { useEffect, useState } from 'react';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const updateLocalStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleDelete = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    updateLocalStorage(updatedCart);
  };

  const handleQuantityChange = (index, type) => {
    const updatedCart = [...cart];
    if (type === 'increase') {
      updatedCart[index].quantity += 1;
    } else if (type === 'decrease' && updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    }
    updateLocalStorage(updatedCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (cart.length === 0) {
    return <div className="p-8 text-center text-gray-600">Your cart is empty.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {cart.map((item, i) => (
        <div key={i} className="border rounded-lg p-4 mb-4 shadow">
          <div className="flex items-center gap-4">
            <img src={item.image} alt={item.name} className="w-32 h-32 object-contain rounded" />
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">Size: {item.size}</p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <button
                  onClick={() => handleQuantityChange(i, 'decrease')}
                  className="px-2 py-1 border rounded text-sm"
                >
                  −
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(i, 'increase')}
                  className="px-2 py-1 border rounded text-sm"
                >
                  +
                </button>
              </div>

              <p className="text-berryPink text-lg font-medium mt-2">
                Price: ${item.price} × {item.quantity} = ${item.price * item.quantity}
              </p>
              <p className="mt-2 text-sm text-gray-700">{item.details}</p>
              {item.ingredients?.length > 0 && (
                <ul className="text-xs text-gray-600 mt-1 list-disc list-inside">
                  {item.ingredients.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={() => handleDelete(i)}
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Total Cost */}
      <div className="mt-8 text-right">
        <h3 className="text-xl font-bold">
          Total Cost: <span className="text-berryPink">${getTotalPrice()}</span>
        </h3>
      </div>
    </div>
  );
};

export default CartPage;
