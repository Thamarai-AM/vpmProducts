import React from 'react'
import './Navbar.css'
import navlogo from '../../Assets/logo.png'
import navProfile from '../../Assets/user.png'
const Navbar = () => {
  return (
    <div className="container text-center">
      <div className="row">
      <div className="col-2"><img src={navlogo} className='nav-logo' alt="" />  </div>
      <div className="col-8 d-flex justify-content-center align-items-center"><h2>VPM HomeMade Products Admin Panel</h2></div>
      <div className="col-2"><img src={navProfile} className='nav-profile' alt="" />
      </div>
    </div>
    <hr/>
      </div>
  )
}

export default Navbar
