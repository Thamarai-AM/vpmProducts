import React from 'react'
import amazon from '../Assets/amazon.png'
import flipkart from '../Assets/flipkart.svg'
import './Available.css'
const Available = () => {
  return (
    <div className='container'>
        <h2>We Are Also Available On:        </h2>
        <div className="row available">
            <div className="col-md-6">
                <img src={amazon} alt="" />
            </div>
            <div className="col-md-6">
                <img src={flipkart} alt="" />
            </div>
        </div>
      
    </div>
  )
}

export default Available
