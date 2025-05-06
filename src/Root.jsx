// src/Root.jsx
import { Outlet } from 'react-router-dom';


const Root = () => {
  return (
    <div>
     
      <Outlet /> {/* 👈 This is critical to show nested routes */}
    </div>
  );
};

export default Root;
