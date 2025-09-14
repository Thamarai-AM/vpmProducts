import React, { useState,useEffect } from 'react'
import axios from 'axios';
import {  useNavigate } from "react-router-dom";

import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
import edit_icon from '../../assets/edit_icon.png'
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Example of using FontAwesome icons

const ListProduct = () => {
    // const [allproducts,setAllproducts] = useState([]);
    const navigate = useNavigate();
      // let [weightData, setWeightData] = useState([]); 
      
      const [toggleState, setToggleState] = useState({}); // Tracks toggles for each row

      // Handler to toggle the row state
      const handleToggle = (rowId) => {
        setToggleState((prevState) => ({
          ...prevState,
          [rowId]: !prevState[rowId],
        }));
      };
    
      const [products, setProducts] = useState([]);
      useEffect(() => {
        fetchCategory();
        fetch("http://localhost:5000/products")
          .then((res) => res.json())
          .then((data) => {
            setProducts(data);
          })
          .catch((err) => console.error("Error fetching products:", err));
      }, []);
      
      const [categoryData, setCategoryData] = useState([]);

      // Fetch all category
      const fetchCategory = async () => {
        try {
          const response = await axios.get("http://localhost:5000/category");
          setCategoryData(response.data);
        } catch (error) {
          console.error("Error fetching category:", error);
        }
      };
    
      const remove_product = async (product) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
          await axios.delete(`http://localhost:5000/product/${product.id}`);
          alert('product deleted successfully');
          window.location.reload(); 
        } catch (error) {
          console.error('Error deleting product', error);
        }
      };
      const edit_product = async(id)=>{
        console.log(id)
        // navigate(`/addproduct?id=${id}`);
        navigate(`/edit-product/${id}`)
      }
  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col-2">Product Name</th>
            <th scope="col-2">Image</th>
            <th scope="col-1">Old Price</th>
            <th scope="col-1">New Price</th>
            <th scope="col-2">Category</th>
            <th scope="col-2">Weight</th>
            <th scope="col-1">Edit</th>
            <th scope="col-1">Delete</th>
            <th scope="col-1">Description</th>
          </tr>
        </thead>
        <tbody>
        {products.map((product,index) => (
          <React.Fragment key={product.id}>
            <tr>
              <td>{product.name}</td>
              <td>    
              {product.image ? (
                <img src={product.image} alt={product.name} width="150" height="150" />
              ) : (
                <p>No Image Available</p>
              )}

              </td>
              {/* <img src={`http://localhost:5000${product.image}`} alt="" className="listproduct-product-item" /></td> */}
              <td><p>₹{product.old_price}</p></td>
              <td><p>₹{product.new_price}</p></td>
              <td>{categoryData.find(item => item.id === product.category)?.name}</td>
              <td><p>{product.weight}</p></td>
              <td>      
                <img onClick={() => edit_product(product.id)} src={edit_icon} alt="" className="listproduct-remove-icon" />
              </td>
              <td>
                <img onClick={() => remove_product(product)} src={cross_icon} alt="" className="listproduct-remove-icon" />
              </td>
              <td>
                <button onClick={() => handleToggle(product.id)}>{toggleState[product.id] ? <FaChevronUp /> : <FaChevronDown />}</button>
              </td>
            </tr>
            {toggleState[product.id] && (
              <tr >
                <td colSpan="10" >
                  {product.description}
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
             
  </div>
  )
}

export default ListProduct
