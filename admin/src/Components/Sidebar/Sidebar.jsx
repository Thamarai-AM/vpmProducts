import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../assets/add_product_icon.png'
import list_product_icon from '../../assets/list_product_icon.png'
import add_category_icon from '../../assets/add_category_icon.png'
import list_category_icon from '../../assets/list_category_icon.png'

const Sidebar = () => {
  return (
    <div className='container '>
       <div className="row mb-4 grid-hover">
          <Link to={'/addproduct'}>
            <img src={add_product_icon} className="img-rounded float-left" alt="" />
            <span className="float-right">Add Product</span>
          </Link>
      </div>
      <div className="row mb-4 grid-hover">
          <Link to={'/listproduct'}>
            <img src={list_product_icon} className="img-rounded float-left" alt="" />
            <span className="float-right">Product List</span>
          </Link>
      </div>
      <div className="row mb-4 grid-hover">
          <Link to={'/addcategory'}>
            <img src={add_category_icon} className="img-rounded float-left" alt="" />
            <span className="float-right">Add Category</span>
          </Link>
      </div>
      <div className="row mb-4 grid-hover">
          <Link to={'/listcategory'}>
            <img src={list_category_icon} className="img-rounded float-left" alt="" />
            <span className="float-right">Category List</span>
          </Link>
      </div>
      
      
    </div>
  )
}

export default Sidebar
