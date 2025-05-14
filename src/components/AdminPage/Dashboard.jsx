import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { ShoppingCart, DollarSign, Users, AlertCircle } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('weekly');

  const summaryStats = {
    orders: 120,
    revenue: 8500,
    customers: 300,
    outOfStock: 5,
  };

  const salesDataSets = {
    weekly: [1000, 2000, 1500, 2500, 1800, 3000, 4000],
    monthly: [8000, 9000, 7000, 9500],
    yearly: [45000, 50000, 60000, 55000, 70000],
  };

  const labels = {
    weekly: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    monthly: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    yearly: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  };

  const chartData = {
    labels: labels[timeframe],
    datasets: [
      {
        label: 'Sales',
        data: salesDataSets[timeframe],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const latestOrders = [
    { id: 101, customer: 'Alice', total: '$120', status: 'Completed' },
    { id: 102, customer: 'Bob', total: '$75', status: 'Pending' },
    { id: 103, customer: 'Charlie', total: '$60', status: 'Cancelled' },
  ];

  const lowStockItems = [
    { name: 'Chocolate Cake', stock: 2 },
    { name: 'Strawberry Tart', stock: 1 },
    { name: 'Vanilla Muffin', stock: 3 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard icon={<ShoppingCart />} label="Total Orders" value={summaryStats.orders} />
        <SummaryCard icon={<DollarSign />} label="Revenue" value={`$${summaryStats.revenue}`} />
        <SummaryCard icon={<Users />} label="Customers" value={summaryStats.customers} />
        <SummaryCard icon={<AlertCircle />} label="Out of Stock" value={summaryStats.outOfStock} />
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Sales Overview</h2>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <Line data={chartData} options={{ responsive: true }} />
      </div>

      {/* Latest Orders & Low Stock Warnings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Latest Orders */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Latest Orders</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {latestOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-2">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.total}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Low Stock Warnings */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Low Stock Warnings</h2>
          <ul className="space-y-2 text-sm">
            {lowStockItems.map((item, index) => (
              <li key={index} className="flex justify-between border-b pb-1">
                <span>{item.name}</span>
                <span className="text-red-500 font-medium">Stock: {item.stock}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Summary Card Component
const SummaryCard = ({ icon, label, value }) => (
  <div className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4">
    <div className="bg-blue-100 text-blue-600 p-2 rounded-full">{icon}</div>
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  </div>
);

export default Dashboard;
