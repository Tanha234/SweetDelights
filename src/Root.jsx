// src/Root.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';


const Root = () => {
  return (
    <div>
     <Navbar/>
      <Outlet /> {/* 👈 This is critical to show nested routes */}
    </div>
  );
};

export default Root;
