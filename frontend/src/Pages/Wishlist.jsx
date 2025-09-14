import React from "react";
import { useCart } from "../ContextAPIs/CartContext";
import { Link } from 'react-router-dom'
import delete_icon from '../Components/Assets/bin.png'
// import './CSS/CartComponent.css'
const Wishlist = () => {
  const { wishlist,removeFromWishlist} = useCart();
  return (
    <div className='container'>
    <div className="row">
      <div className="cartGrid">
      <h1>Your Wishlist</h1>

  {wishlist.length > 0 ? (
    <div className='cartGrid'>
      <div className='cartDetails'>
            <div>Product Image</div>
            <div>Title</div>
            <div>Price</div>
            <div>Remove </div>
      </div>
      {wishlist.map((item) => (
        <div key={item.id} className="cartDetailsList">
          <div>
            <Link to={`/product/${item.product_id}`}>
            <img src={item.image} alt={item.name} className='cart-image' />

            {/* <img src={`http://localhost:5000${item.image}`} className="cart-image" alt="" /> */}
            </Link>
          </div>
          <div>{item.name}</div>
          <div>₹{item.new_price}</div>
          <div><button className="remove-icon" onClick={() => removeFromWishlist(item.product_id)}><img src={delete_icon} alt="" /></button></div>

        </div>
      ))}
    </div>
  ) : (
    <p>Your wishlist is empty</p>
  )}
     </div>
    </div>
</div>

    // <div>
    //   <h2>Shopping Cart</h2>
    //   {/* <button onClick={() => login({ username: "admin",email:"admin@admin.com", password: "admin" })}>Login</button> */}
    //   {/* <button onClick={logout}>Logout</button> */}
    //   {/* {user && <p>Welcome, {user.username}</p>} */}

    //   {/* {cart.length > 0 ? (
    //     cart.map((item) => (
    //       <div key={item.id} style={{ margin: "10px", border: "1px solid #ddd", padding: "10px" }}>
    //         <h3>{item.name}</h3>
    //         <p>Price: ₹{item.new_price}</p>
    //         <p>Quantity: {item.quantity}</p>
    //         <button onClick={() => increaseQuantity(item.product_id)}>+</button>
    //         <button onClick={() => decreaseQuantity(item.product_id)}>-</button>
    //       </div>
    //     ))
    //   ) : (
    //     <p>Cart is empty.</p>
    //   )} */}

      
    // </div>
  );
};

export default Wishlist;
