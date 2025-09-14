import React from 'react'
import './Banner.css'
import banner1 from '../Assets/slider2.jpg'
const Banner = () => {
  return (
    <div className='container-fluid'>
    <div className="row">
      <div className='banner-content'>
          <img src={banner1} alt="" />

      </div>
    </div>
  </div>
  )
}

export default Banner
