import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import './SearchProduct.css'
const SearchProduct = () => {
  const searchData = localStorage.getItem("searchData");
  const [products, setProducts] = useState([]); // Store fetched products
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/products/"+categoryName);
  //       setProducts(response.data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, [categoryName]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {setProducts(data)});
  }, []);

  const filteredProducts = products.filter((product) =>

    product.name.toLowerCase().includes(searchData.toLowerCase())
  );


  return (
    <div>
      <ul className="searchProductPage"> 
        <h3>Your Searched Products</h3>
        {filteredProducts.length > 0 ? (
          // filteredProducts.map((product) => (
            // <li key={product.id}>{product.name}</li>
            <div className='cartGrid'>
            <div className='cartDetails'>
                  <div>Product Image</div>
                  <div>Title</div>
                  <div>Price</div>
            </div>
            {filteredProducts.map((item) => (
              <div key={item.id} className="cartDetailsList">
                <div>
                  <Link to={`/product/${item.product_id}`}>
                  <img src={item.image} alt={item.name} className='cart-image' />
      
                  {/* <img src={`http://localhost:5000${item.image}`} className="cart-image" alt="" /> */}
                  </Link>
                </div>
                <div>{item.name}</div>
                <div>₹{item.new_price}</div>
                
              </div>
            ))}
                 
          </div>
          // ))
        ) : (
          <p>No products found.</p>
        )}
      </ul>
    </div>
  )
}

export default SearchProduct
