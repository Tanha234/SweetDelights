import React, { useEffect, useState } from 'react';

const BuyNowPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [userDetails, setUserDetails] = useState({
    name: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);

    const cost = storedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(cost.toFixed(2));
  }, []);

  // Group items by name and sum their quantities
  const groupedItems = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push({ name: item.name, quantity: item.quantity });
    }
    return acc;
  }, []);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
    // Here you can send the order data to backend/server
  };

  return (
    <div className="max-w-3xl md:px-44 p-8 ">
      <h2 className="text-3xl font-bold mb-6 text-berryPink">Buy Now</h2>

      <div className="mb-6 p-4 border rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Items in Your Cart:</h3>
        <ul className="list-disc list-inside text-gray-700">
          {groupedItems.map((item, i) => (
            <li key={i}>
              {item.name} × {item.quantity}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-lg font-medium">
          Total: <span className="text-berryPink">${total}</span>
        </p>
      </div>

      <form onSubmit={handleOrderSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full border p-2 rounded"
          value={userDetails.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          className="w-full border p-2 rounded"
          value={userDetails.address}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
          value={userDetails.phone}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-berryPink text-white px-6 py-2 rounded-2xl shadow hover:bg-pink-600 transition-all duration-200"
        >
          Confirm Purchase
        </button>
      </form>
    </div>
  );
};

export default BuyNowPage;
