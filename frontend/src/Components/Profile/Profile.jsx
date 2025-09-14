import React, { useState } from "react";
import { Link } from 'react-router-dom'
import './Profile.css'
import Personal from "../Personal/Personal";
import Address from "../Address/Address";
import Wishlist from "../../Pages/Wishlist";
import CartComponent from "../../Pages/CartComponent";

import user_icon  from '../Assets/user.png'
import logout_icon  from '../Assets/logout.png'
// import { useCart } from '../../ContextAPIs/CartContext'
import heartgreen from '../Assets/heart-green.png'
import cartgreen from '../Assets/cartgreen.png'
const Profile = () => {
    const [activeComponent, setActiveComponent] = useState("home");
  // const { userNameValue } = useCart();
  const userNameValue = localStorage.getItem("userNameValue");

    const renderComponent = () => {
        switch (activeComponent) {
          case "personal":
            return <Personal />;
          case "address":
            return <Address />;
          case "wishlist":
             return <Wishlist />;
          case "cart":
              return <CartComponent />;
          default:
            return <Personal />;
        }
      };
    
      return (
        // <div className="container">
        // <div className="row">
        //   <div className="col-3 profileGrid">
        //     <Link to={'/personal'}>
        //         {/* <img src={add_product_icon} className="img-rounded float-left" alt="" /> */}
        //         <span className="float-right">Personal Information</span>
        //     </Link>
        //     <Link to={'/address'}>
        //         {/* <img src={user_icon} className="img-rounded float-left" alt="" /> */}
        //         <span className="float-right">Address Information</span>
        //     </Link>
        //   </div>
        //   <div className="col-8 profileGrid"><Personal/></div>
        // </div>
        // </div>
        <div className="container">
        {/* Sidebar */}
        <div className="row sideGrid">
            <div className="col-md-3 ">
                <ul className="sideUL">
                    <li className="text-center">
                        <div>Hi, {userNameValue} </div>
                    </li>
                </ul>
                <div className="sideUL">
                  <div className="sideULLI">  
                    <div className="row sideRow">
                        <div className="col-md-3 text-center"><img src={user_icon} className="img-rounded float-left" alt="" /></div>
                        <div className="col-md-9 sideH">ACCOUNT SETTINGS</div>
                    </div>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-8">
                        <ul className="detailsUL">
                            <li>
                            <button onClick={() => setActiveComponent("personal")}>
                                Personal Information
                            </button>
                            </li>
                            <li>
                            <button onClick={() => setActiveComponent("address")}>
                                Manage Addresses
                            </button>
                            </li>
                        </ul>
                        </div>
                    </div>
                    
                  </div>
                </div>
                <div className="sideUL">
                    <div className="sideULLI">  
                    <div className="row sideRow">
                        <div className="col-md-3 text-center"><img src={heartgreen} className="img-rounded float-left" alt="" /></div>
                        <div className="col-md-9 sideH">
                          <button onClick={() => setActiveComponent("wishlist")}>
                          Wishlist
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="sideUL">
                    <div className="sideULLI">  
                    <div className="row sideRow">
                        <div className="col-md-3 text-center"><img src={cartgreen} className="img-rounded float-left" alt="" /></div>
                        <div className="col-md-9 sideH">
                          <button onClick={() => setActiveComponent("cart")}>
                          Cart
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="sideUL">
                    <div className="sideULLI">  
                    <div className="row sideRow">
                        <div className="col-md-3 text-center"><img src={logout_icon} className="img-rounded float-left" alt="" /></div>
                        <div className="col-md-9 sideH">
                            <button onClick={()=>{localStorage.removeItem("token");localStorage.removeItem("userNameValue");localStorage.removeItem("profileID");window.location.replace("/")}}>Logout</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="col-md-8 sideULLeft">
                <div>{renderComponent()}</div>

            </div>
          
        </div>
  
      </div>
    );
  

    


}
export default Profile
