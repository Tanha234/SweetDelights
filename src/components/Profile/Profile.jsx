import React, { useEffect, useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { User, List, Heart, Bell } from 'lucide-react';
import { auth, storage } from '../../firebase/firebase.init';
import PersonalInfo from './PersonalInfo';

const tabs = [
  { id: 'info', label: 'Personal Info', icon: <User size={18} /> },
  { id: 'orders', label: 'My Orders', icon: <List size={18} /> },
  { id: 'wishlist', label: 'Wishlist', icon: <Heart size={18} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('info');
  const [user, setUser] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (activeTab === 'orders' && user) {
      const fetchOrders = async () => {
        try {
          const response = await fetch(`/orders?userId=${user.uid}`); // Fetch orders from the backend
          const orders = await response.json();
          setOrderHistory(orders.reverse());
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };

      fetchOrders();
    }
  }, [activeTab, user]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !auth.currentUser) return;

    try {
      const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await updateProfile(auth.currentUser, { photoURL: downloadURL });

      // Reload user and refresh UI
      await auth.currentUser.reload();
      setUser(auth.currentUser);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return <PersonalInfo />;
      case 'orders':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Order History</h2>
            <ul className="space-y-4">
              {orderHistory.length === 0 ? (
                <p className="text-gray-600">No orders found.</p>
              ) : (
                orderHistory.map((order) => (
                  <li key={order._id} className="p-4 border rounded-lg bg-white shadow-sm">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">Order #{order._id}</p>
                        <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">Status: {order.status}</p>
                        <ul className="text-sm mt-2 text-gray-700 list-disc list-inside">
                          {order.items.map((item, idx) => (
                            <li key={idx}>{item.name} × {item.quantity}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-berryPink font-bold text-lg">${order.total}</div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        );
      case 'wishlist':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Wishlist</h2>
            <p>You have 3 items saved for later.</p>
          </div>
        );
      case 'notifications':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <p>📦 Your order #12344 is out for delivery.</p>
            <p>🎉 Get 10% off on your next cake!</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 shadow-md">
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src={user?.photoURL || 'https://i.pravatar.cc/100'}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-2 object-cover"
          />
          <label className="text-xs text-blue-600 cursor-pointer hover:underline">
            Change Image
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
          <h3 className="text-lg font-semibold mt-2">{user?.displayName || 'User'}</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center w-full gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-berryPink text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="bg-white p-6 rounded-lg shadow">{renderTabContent()}</div>
      </main>
    </div>
  );
}
