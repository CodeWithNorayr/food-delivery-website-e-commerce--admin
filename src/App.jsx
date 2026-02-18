import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/AllOrders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  
  return (
    <div>
       <ToastContainer />
      <Navbar />
      <hr />
      
      <br />

      {showSidebar ? (<Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>)  : (
        <Routes>
          <Route
            path="/add"
            element={<Add showSidebar={showSidebar} setShowSidebar={setShowSidebar} />}
          />
          <Route
            path="/list"
            element={<List showSidebar={showSidebar} setShowSidebar={setShowSidebar} />}
          />
          <Route
            path="/orders"
            element={<Orders showSidebar={showSidebar} setShowSidebar={setShowSidebar} />}
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
