import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='admin-navbar'>

      <div className='title'>
        <h1 onClick={()=>navigate('/add')}>ADMIN PAGE</h1>
      </div>

      <div className='restaurant-logo'>
        <img onClick={()=>navigate('/list')} src={assets.restaurant} alt="restaurant" />
      </div>

    </div>
  )
}

export default Navbar
