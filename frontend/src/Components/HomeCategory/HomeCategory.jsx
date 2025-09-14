import React from 'react'
import { Link } from 'react-router-dom'
import homeCook from '../Assets/homeCook.jpg'
import homeHerbal from '../Assets/homeHerbal.jpg'
import homeStat from '../Assets/homeStat.jpg'
import './HomeCategory.css'
const HomeCategory = () => {
  return (
    <div className='container'>
        <h2>SHOP BY CATEGORY</h2>
      <div className="row">
        <div className="col-md-4 ">
            <div className="product-display-home">
            <Link to={`/cooking/`}>
                
                <img src={homeCook} alt={homeCook} className='product-home' />
                <h4 className="centered">Cooking Products</h4>
            </Link>
            </div>
        </div>
        <div className="col-md-4">
        <div className="product-display-home">

            <Link to={`/herbal/`}>
                
                <img src={homeHerbal} alt={homeHerbal} className='product-home' />
                <h4 className="centered">Herbal Products</h4>
            </Link>
            </div>
        </div>
        <div className="col-md-4">
            <div className="product-display-home">

            <Link to={`/stationary/`}>
                
                <img src={homeStat} alt={homeStat} className='product-home' />
                <h4 className="centered">Stationary Products</h4>
            </Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default HomeCategory
