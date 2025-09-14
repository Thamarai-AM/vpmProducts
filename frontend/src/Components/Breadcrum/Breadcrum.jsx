import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import './Breadcrum.css'
import right_arrow from '../Assets/right-arrow.png'
import like from '../Assets/like.png'
import heart from '../Assets/heart.png'
import { useCart } from '../../ContextAPIs/CartContext'

const Breadcrum = ({ productId }) => {
  const [product, setProduct] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const {  addToCart,addToWishlist, buttonText,added,addedwishlist,removeFromWishlist,wishlistProducts } = useCart();

  const getLastURLSegment = () => {
    const pathArray = window.location.pathname.split("/"); // Split URL by "/"
    return pathArray[pathArray.length - 1]; // Get last item
  };
  
  const existingProduct = wishlistProducts.find((item,index) => item.product_id && item.product_id == getLastURLSegment())

// console.log(existingProduct?.product_id);

  const navigate = useNavigate();

  const fetchCategoryName = async (val) => {
    try {
      const response = await axios.get(`http://localhost:5000/category/${val}`);
      setCategoryName(response.data.name);
    } catch (error) {
      console.error("Error fetching breadcrumb:", error);
    }
  };

  useEffect(() => {

    const fetchBreadcrumb = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/${productId}`);
        setProduct(response.data);
        fetchCategoryName(response.data.category);
      } catch (error) {
        console.error("Error fetching breadcrumb:", error);
      }
    };
    
    // const quan =()=>{
    //   cart.map((item) => (   
    //     console.log(item)

    //   ));
    // }
    
    fetchBreadcrumb();
    // quan();
  }, [productId]);

  return (
    <div>
    <div className="container">
        <ul className="breadcrumb">
                <li><Link to={`/`}>HOME</Link><img src={right_arrow} alt="" /></li>
                <li><Link to={`/${categoryName}`}>{categoryName}</Link><img src={right_arrow} alt="" /></li>
                <li><Link to={`/product/${product.id}`}>{product.name}</Link></li>
        </ul>
        
    </div>
    
    <div className="container">   
        <div className="row">
            <div className="col-md-6 text-center">
            {product.image ? (
                            <img src={product.image} alt={product.name} className='product-image' />
                          ) : (
                            <p>No Image Available</p>
                          )}
                      
             {/* <img src={`http://localhost:5000${product.image}`} className="product-image" alt="" /> */}
            </div>
            <div className="col-md-6">
                <div className="product-head">{product.name}</div>
                <hr />
                <div className="price">
                    <div className="new-price">₹{product.new_price}</div>
                    <div className="old-price">₹{product.old_price}</div>
                </div>

          <button onClick={() => addToCart(product)} className='submit-button'>{buttonText}</button> 
          {added && (
        <button onClick={() => window.location.href = "/cart"} className="submit-button">
          Go to Cart
        </button>
      )}
                {/* <button onClick={() => toggleWishlist(product)}>Remove</button> */}

      {(existingProduct?.product_id)&&(<button onClick={() => removeFromWishlist(product.id)} className='wishlist-button'><img src={heart} alt="" /></button> 
)}
    {!(existingProduct?.product_id)&&(<div className="tooltip-container">
      <button onClick={() => addToWishlist(product)} className='wishlist-button tooltip-button'>
        <img src={like} alt="" />
    </button> 
          <span className="tooltip-text">Wishlist</span>
      </div>
)}
               <hr />
                <div className="product-weight"><strong>Weight:</strong>{product.weight}</div>
                <div className="product-available"><strong>Avalability:</strong>{product.available>0 ? "In Stock" :"Unavailable"}</div>
                <div className="product-description"><strong>Description:</strong>{product.description}</div>

            </div>
        </div>
    
    </div>
  
</div>

  );
};

export default Breadcrum;
