import React, { useState,useEffect } from "react";
import axios from 'axios'
import { useCart } from "../../ContextAPIs/CartContext";

import './Checkout.css'
const Checkout = () => {
    const userId = localStorage.getItem("profileID");
    const { totalQuantity, totalAmount} = useCart();
    const validTotalQuantity = isNaN(totalQuantity) ? 0 : totalQuantity;
    const validTotalAmount = isNaN(totalAmount) ? 0 : totalAmount;
  
  const [user, setUser] = useState({ address1: "", address2: "", zipcode: "" });

    useEffect(() => {
        axios.get(`http://localhost:5000/user/${userId}`)
          .then(response => {setUser(response.data)})
          .catch(error => console.error("Error fetching user data:", error));

       
      }, [userId]);
    
  return (
    <div className="container checkout">
        <h3>Checkout</h3>
        <div className="checkout-address">
          <h4>Address</h4>
          {user.username}<br />
          {user.address1}<br />{user.address2}
        </div>
        <div className="checkout-address">
          <h4>Payment Method</h4><br />
          <h5><div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                <label className="form-check-label" for="flexRadioDefault2">
                Cash on Delivery
                </label>
              </div>
            </h5><br />
        </div>
        <div className="checkout-address">
          <h4>Payment Summary</h4><br />
          <div className="payment">
            <div className="row">
              <div className="col-md-6">Shipping Fee</div>
              <div className="col-md-6 tRight">Free(0)</div>
            </div>
            <div className="row">
              <div className="col-md-6">Total items</div>
              <div className="col-md-6 tRight">{validTotalQuantity}</div>
            </div>
            <hr />
            <div className="row bold">
              <div className="col-md-6">Total</div>
              <div className="col-md-6 tRight">₹{validTotalAmount}</div>
            </div>
          </div>
          <div className="placeOrder"><button className="submit-button checkout-button">Place Order</button></div>

        </div>
    </div>
  )
}

export default Checkout
