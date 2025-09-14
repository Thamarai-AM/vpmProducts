import React from 'react'
import './Footer.css'
import facebook from '../Assets/facebook.png'
import instagram from '../Assets/instagram.png'
import whatsapp from '../Assets/whatsapp.png'
import phone from '../Assets/phone.png'
import email from '../Assets/email.png'
import pin from '../Assets/pin.png'
const Footer = () => {
  return (
    <footer>
    <div className='container'>
      <div className="row">
        <div className="col-md-4">
          <div className="row">
            <h3>VPM Homemade Products</h3>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
                voluptatem corporis error non, corrupti delectus unde, incidunt
                dolorem quam porro tenetur autem? Maxime aspernatur quas, natus
                nesciunt harum obcaecati voluptatum.
            </p>
          </div>
          <div className="row social">
            <div className="col-md-4"><img src={facebook} alt="" /></div>
            <div className="col-md-4"><img src={instagram} alt="" /></div>
            <div className="col-md-4"><img src={whatsapp} alt="" /></div> 
          </div>
        </div>
        <div className="col-md-4">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#faq">F.A.Q</a>
            </li>
            <li>
              <a href="#cookies-policy">Cookies Policy</a>
            </li>
            <li>
              <a href="#terms-of-services">Terms Of Service</a>
            </li>
            <li>
              <a href="#support">Support</a>
            </li>
            <li>
              <a href="#careers">Careers</a>
            </li>
          </ul>
        </div>
        <div className="col-md-4">
          <div className='row'>
              <h3>Subscribe</h3>
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="footerEmail" placeholder="Your email id here" />
                <label htmlFor="footerEmail">Your email id here</label>
            </div>
            <button className='submit-button'>Subscribe</button>
          </div>
          
        </div>
      </div>
      </div>
      <div className='container footer2container'>
      <div className="row footer2">
        <div className='col-md-4'>
          <p><img src={phone} alt="" /></p>
          <p>+12 123456789</p>
        </div>
        <div className='col-md-4'>
          <p><img src={email} alt="" /></p>
          <p>mail@domain.com</p>
        </div>
        <div className='col-md-4'>
        <p><img src={pin} alt="" /></p>
        <p>1234 Pearl Street</p>
        </div>
      </div>
      </div>
      <div className='container'>
      <div className="row">
        <div className="col-md-6"><p>Copyright &copy; 2025 VPM Products | All Rights Reserved</p></div>
        <div className="col-md-6"><p className='delam'>Designed and Developed by DeLAM</p></div>
        
      </div>
      
    </div>
    </footer>
  )
}

export default Footer
