import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { db } from '../../firebase/firebase.init'; // Adjust path if needed
import { collection, getDocs } from 'firebase/firestore';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('weekly');
  const [orders, setOrders] = useState([]);
  const [summaryStats, setSummaryStats] = useState({
    cakeOrders: 0,
    customCakeOrders: 0,
    revenue: 0,
    customers: 0,        // will hold total customers count from Firebase
    outOfStock: 0,
    availableCakes: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders
        const res = await fetch('http://localhost:5000/api/orders');
        const data = await res.json();
        setOrders(data);

        // Fetch custom cake orders
        const resCustom = await fetch('http://localhost:5000/api/customorders');
        const customData = await resCustom.json();

        // Fetch cake data
        const resCakes = await fetch('http://localhost:5000/api/cakes');
        const cakesData = await resCakes.json();

        const availableCakes = Array.isArray(cakesData)
          ? cakesData.filter(cake => cake.availability === true).length
          : 0;

        // Fetch customers from Firebase
        const usersSnapshot = await getDocs(collection(db, "users"));
        const users = usersSnapshot.docs.map(doc => doc.data());
        const totalCustomers = users.length;

        // Calculate other summary stats
        const cakeOrders = data.filter(order => order.type === 'cake').length;
        const customCakeOrders = customData.length;
        const revenue = data.reduce((sum, order) => sum + order.totalPrice, 0);
        const customers = new Set(data.map(order => order.customerId)).size; // orders customers count

        setSummaryStats({
          cakeOrders,
          customCakeOrders,
          revenue,
          customers: totalCustomers,  // Use Firebase total customers count here
          outOfStock: 5,
          availableCakes,
        });
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Latest Orders */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Latest Orders</h2>
          <span className="text-sm text-gray-500">Total Orders: {orders.length}</span>
        </div>
      </div>

      {/* Custom Orders */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Custom Orders</h2>
          <span className="text-sm text-gray-500">Total Custom Orders: {summaryStats.customCakeOrders}</span>
        </div>
      </div>

      {/* Available Cakes */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Available Cakes</h2>
          <span className="text-sm text-gray-500">{summaryStats.availableCakes}</span>
        </div>
      </div>

      {/* Total Customers */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Total Customers</h2>
          <span className="text-sm text-gray-500">{summaryStats.customers}</span>
        </div>
      </div>

      {/* Add other sections if needed */}
    </div>
  );
};

export default Dashboard;
