import React from 'react';
import { assets } from '../../assets/assets';
import "./Sidebar.css";
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className='add-items'>
        <img
          onClick={() => {
            navigate('/add');
            setShowSidebar(false);
          }}
          className='add-image'
          src={assets.add}
          alt="add"
        />
        <h1
          onClick={() => {
            navigate('/add');
            setShowSidebar(false);
          }}
          className='add-h1'
        >
          Add food
        </h1>
      </div>

      <div className='list-items'>
        <img
          onClick={() => {
            navigate('/list');
            setShowSidebar(false);
          }}
          className='list-image'
          src={assets.list}
          alt="list"
        />
        <h1
          onClick={() => {
            navigate('/list');
            setShowSidebar(false);
          }}
          className='list-h1'
        >
          Food list section
        </h1>
      </div>

      <div className='order-items'>
        <img
          onClick={() => {
            navigate('/orders');
            setShowSidebar(false);
          }}
          className='order-image'
          src={assets.parcel}
          alt="orders"
        />
        <h1
          onClick={() => {
            navigate('/orders');
            setShowSidebar(false);
          }}
          className='order-h1'
        >
          All orders from the clients
        </h1>
      </div>
    </div>
  );
};

export default Sidebar;
