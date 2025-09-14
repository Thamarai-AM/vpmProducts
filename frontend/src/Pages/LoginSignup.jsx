import React,{useState} from 'react'
import { useCart } from "../ContextAPIs/CartContext";
import './CSS/LoginSignup.css'
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const navigate = useNavigate(); 
  const { login,signup } = useCart();
  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const handleLogin = async (e) => {
    await login(formData);
    navigate("/", { replace: true }); 
    window.location.reload();
  };
  const handleSignup = async (e) => {
    await signup(formData);
    navigate("/", { replace: true }); 
    window.location.reload();
  };
 
  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  return (
    <div className='container'>
      <div className="row">
      <div className="col-md-4 margin0">
          <div className='row'>
          <h1>{state}</h1>
          {state==="Sign Up" ?<div className="form-floating mb-3">
                <input type="text" className="form-control" id="formUserName" placeholder="Your Name" name="username" value={formData.username} onChange={changeHandler}/>
                <label htmlFor="formUserName">Your Name</label>
                </div>:<></>}

            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="formEmail" placeholder="Your Email" name="email" value={formData.email} onChange={changeHandler}/>
                <label htmlFor="formEmail">Your Email</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="formPassword" placeholder="Your Password" name="password" value={formData.password} onChange={changeHandler}/>
                <label htmlFor="formPassword">Your Password</label>
            </div>
            <button onClick={()=>{state==="Login"?handleLogin():handleSignup()}} className="submit-button">Continue</button>
              {state === "Sign Up"? 
                  <p className="loginsignup-login">Already have an account?<span onClick={()=>{setState("Login")}}>Login</span></p>  
                  :<p className="loginsignup-login">Create an account?<span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
{/*           
            <div className="loginsignup-agree">
              <input type="checkbox" name='' id=''/>
              <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div> */}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
