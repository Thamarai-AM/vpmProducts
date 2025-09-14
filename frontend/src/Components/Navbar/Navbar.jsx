import React,{useState,useEffect} from 'react'
import './Navbar.css'

import logo from '../Assets/logo.png'
import signin from '../Assets/signin.png'
import cart from '../Assets/cart.png'
import search from '../Assets/search.png'
import { useCart } from '../../ContextAPIs/CartContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [menu,setMenu] = useState("home");
  const { totalQuantity } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  
  const userNameValue = localStorage.getItem("userNameValue");
  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      console.log("Searching for:", searchTerm);
      localStorage.setItem("searchData", searchTerm);
      window.location.replace(`/search`);
    }
  };

  const handleSearch = () => {
    window.location.replace(`/search`);
    localStorage.setItem("searchData", searchTerm);

  };
  const handleMenuClick = (url) => {
    window.location.href = url; // ✅ Navigate & Hard Refresh
  };


  return (
    <div>
      <nav className="greenbg">
        <div className="container">
            <div className='row padd10'>
                <div className='col-md-3'><img src={logo} alt="Logo" className="logo-img" /></div>
                <div className="col-md-5 searchDiv">
                  <div className="form-floating mb">
                    {/* Search Bar */}
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search for products..."
                      className="form-control searchInput"
                      id='globalSearch'
                      onKeyUp={handleKeyUp} 

                    />
                    <label htmlFor="globalSearch" className='searchLabel'>Search for products...</label></div>

                    <button onClick={handleSearch} className='searchButton'><img src={search} alt="" /></button>

                </div>
                <div className='col-md-4 signin'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className="row align-items-center">
                                <div className='col-md-6 signin-img'><img src={signin} alt="" /></div>                                
                                <div className="col-md-6 signin-name">
                                  {localStorage.getItem("token")
                                  ? <>
                                    <div className="nav-item dropdown">
                                      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Hi {userNameValue}
                                      </a>
                                      <ul className="dropdown-menu dropdown-ul">
                                        <li><Link to='/profile' className="dropdown-item">My Account</Link></li>
                                        <li><Link to='/wishlist' className="dropdown-item">Wishlist</Link></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><button className="dropdown-logout" onClick={()=>{localStorage.removeItem("token");localStorage.removeItem("userNameValue");localStorage.removeItem("token");window.location.replace("/")}}>Logout</button></li>
                                      </ul>
                                    </div>
                                    </>
                                  :<Link to='/login'><button className='signin-name-button'>Login</button></Link>
                                  }         
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                        <div className="row align-items-center">
                        <button onClick={() => handleMenuClick("/cart")} className='cartA'>
                            <div className='col-md-6 signin-img'><img src={cart} alt="" />
                                <span className="spanTotal">
                                    {totalQuantity}
                                </span>
                            </div>
                            <div className="col-md-6 signin-name">Cart</div>
    
                        </button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row">
                <div className='navbar'>
                    <div className="nav-menu">
                        <div className='col-md-3'><button onClick={()=>setMenu("home")}><Link to='/'>Home</Link>{menu === "home" ?<hr className='shine'/>:<></>}</button></div>
                        <div className='col-md-3'><button onClick={()=>setMenu("cooking")}><Link to="/cooking"> cooking</Link>{menu === "women" ?<hr className='shine'/>:<></>}</button></div>
                        <div className='col-md-3'><button onClick={()=>setMenu("herbal")}><Link to='/herbal'>herbal</Link>{menu === "men" ?<hr className='shine'/>:<></>}</button></div>
                        <div className='col-md-3'><button onClick={()=>setMenu("stationary")}><Link to='/stationary'>Stationary</Link>{menu === "kid" ?<hr className='shine'/>:<></>}</button></div>
                    </div>
                </div>
            </div>
            
        </div>
       </nav>
    </div>
  )
}

export default Navbar
