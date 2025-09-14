import React from 'react'
import {Routes,Route} from 'react-router-dom'

import './Admin.css'
import AddProduct from '../Components/AddProduct/AddProduct'
import ListProduct from '../Components/ListProduct/ListProduct'
import AddCategory from '../Components/AddCategory/AddCategory'
import ListCategory from '../Components/ListCategory/ListCategory'
import Sidebar from '../Components/Sidebar/Sidebar'
const Admin = () => {
  return (
    <div className="container text-center">
    <div className="row">
      <div className="col-3">      <Sidebar/>      </div>
      <div className="col-9 box-shadow">
      <Routes>
            <Route path='/addproduct' element={<AddProduct/> }/>
            <Route path='/listproduct' element={<ListProduct />}/>
            <Route path='/addcategory' element={<AddCategory/>}/>
            <Route path='/listcategory' element={<ListCategory/>}/>
            <Route path="/edit-product/:id" element={<AddProduct />} />
            <Route path="/edit-category/:id" element={<AddCategory />} />

        </Routes>
      </div>
    </div>
  </div>
  )
}

export default Admin
