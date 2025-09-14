import React, { useState,useEffect } from 'react'
import axios from 'axios';
import {  useNavigate } from "react-router-dom";

import './ListCategory.css'
import cross_icon from '../../assets/cross_icon.png'
import edit_icon from '../../assets/edit_icon.png'
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Example of using FontAwesome icons

const ListCategory = () => {
    const navigate = useNavigate();    
   const [category, setCategory] = useState([]);
      useEffect(() => {
        fetch("http://localhost:5000/category")
          .then((res) => res.json())
          .then((data) => {
            console.log("Fetched Data:", data); // Debug API response
            setCategory(data);
          })
          .catch((err) => console.error("Error fetching category:", err));
      }, []);
      
     
      const remove_category = async (category) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;
        try {
          await axios.delete(`http://localhost:5000/category/${category.id}`);
          alert('category deleted successfully');
          window.location.reload(); 
        } catch (error) {
          console.error('Error deleting category', error);
        }
      };
      const edit_category = async(id)=>{
        navigate(`/edit-category/${id}`)
      }
  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col-2">Category Name</th>
            <th scope="col-1">Description</th>
            <th scope="col-1">Edit</th>
            <th scope="col-1">Delete</th>
          </tr>
        </thead>
        <tbody>
        {category.map((category,index) => (
          <React.Fragment key={category.id}>
            <tr>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>     
                <img onClick={() => edit_category(category.id)} src={edit_icon} alt="" className="listproduct-remove-icon" />
              </td>
              <td>
                <img onClick={() => remove_category(category)} src={cross_icon} alt="" className="listproduct-remove-icon" />
              </td>
            </tr>
            
          </React.Fragment>
        ))}
      </tbody>
    </table>
             
  </div>
  )
}

export default ListCategory
