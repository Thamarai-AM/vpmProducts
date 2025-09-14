import React from "react";
import { useCart } from "../ContextAPIs/CartContext";
import { Link } from 'react-router-dom'
import delete_icon from '../Components/Assets/bin.png'
import './CSS/CartComponent.css'
const CartComponent = () => {
  const { cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart,totalQuantity, 
    totalAmount} = useCart();
  console.log(cart)
  const validTotalQuantity = isNaN(totalQuantity) ? 0 : totalQuantity;
  const validTotalAmount = isNaN(totalAmount) ? 0 : totalAmount;

  
  return (
    <div className='container'>
    <div className="row">
      <div className="cartGrid">
      <h1>Your Cart</h1>

  {cart.length > 0 ? (
    <div className='cartGrid'>
      <div className='cartDetails'>
            <div>Product Image</div>
            <div>Title</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Total</div>
            <div>Remove </div>
      </div>
      {cart.map((item) => (
        <div key={item.id} className="cartDetailsList">
          <div>
            <Link to={`/product/${item.product_id}`}>
            <img src={item.image} alt={item.name} className='cart-image' />

            {/* <img src={`http://localhost:5000${item.image}`} className="cart-image" alt="" /> */}
            </Link>
          </div>
          <div>{item.name}</div>
          <div>₹{item.new_price}</div>
          <div className='cartDiv'>
            {/* <button className="cartButton" onClick={() => decreaseQuantity(item.product_id)} disabled={item.quantity === 1} >-</button>{item.product_id}
             */}
             <button 
                className="cartButton" 
                onClick={() => item.quantity > 1 ? decreaseQuantity(item.product_id) : removeFromCart(item.product_id)}
              >
                {item.quantity > 1 ? "-" : <img src={delete_icon} alt="" />}
              </button>
              <p className='cartButtonP'>{item.quantity}</p>
            <button className="cartButton" onClick={() => increaseQuantity(item.product_id)}>+</button>
          </div>
          <div>₹{(item.new_price * item.quantity).toFixed(2)}</div>
          <div><button className="remove-icon" onClick={() => removeFromCart(item.product_id)}><img src={delete_icon} alt="" /></button></div>

        </div>
      ))}
             {/* <h3>Total Quantity: {validTotalQuantity}</h3> */}
             {/* <h3>Total Amount: ₹{validTotalAmount.toFixed(2)}</h3> */}
      <h2 className='total'>Subtotal ({validTotalQuantity} {validTotalQuantity === 1? "item" :"items"}):  ₹{validTotalAmount}</h2>

      <div className="checkout-submit"><Link to={`/checkout`} className="submit-button checkout-button">Checkout</Link></div>
    </div>
  ) : (
    <p>Your cart is empty</p>
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

export default CartComponent;
