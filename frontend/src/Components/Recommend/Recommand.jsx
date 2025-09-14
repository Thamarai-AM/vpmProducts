import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Recommand.css'
const Recommand = () => {    
    const [prodCat, setProdCat] = useState([]);


    useEffect(() => {
        fetch("http://localhost:5000/displayHome/Cat")
          .then((res) => res.json())
          .then((data) => {console.log(data);setProdCat(data)});
      }, []);

    
  return (<div className='homeCook'>
          <h3>Recommended Cooking Products</h3>

    <div className='homeGrid'>
        {prodCat.filter((product) => product.category ===1).map((product) => (
            <div key={product.id}  className='product-grid' >
            <Link to={`/product/${product.id}`}>
            <div className='productDiv'>
            <p>              {product.image ? (
                    <img src={product.image} alt={product.name} className='product-display-image' />
                ) : (
                    <p>No Image Available</p>
                )}
            </p>
            <div className="product-details">

            <h2>{product.name}</h2>
            <div className="product-data">
            <div className="item-prices">
                <div className="item-price-new">
                    ₹{product.new_price}
                </div>
                <div className="item-price-old">
                    ₹{product.old_price}
                </div>
                </div>
                </div>
            </div>

            </div>
            </Link>
        </div>
        ))}

    </div>
  </div>)
}

export default Recommand
