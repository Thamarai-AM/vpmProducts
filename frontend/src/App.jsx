import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import ShopCategory from './Pages/ShopCategory'
import CartComponent from './Pages/CartComponent'
import Product from './Pages/Product'
import LoginSignup from './Pages/LoginSignup'
import Profile from './Components/Profile/Profile'
import Personal from './Components/Personal/Personal'
import Address from './Components/Address/Address'
import SearchProduct from './Components/SearchProduct/SearchProduct'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Wishlist from './Pages/Wishlist'
import Checkout from './Components/Checkout/Checkout'

function App() {

  return (
    <div className='appbg'>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cooking" element={<ShopCategory banner="cooking"/>} />
          <Route path="/herbal" element={<ShopCategory banner="herbal"/>} />
          <Route path="/stationary" element={<ShopCategory banner="stationary"/>} />
          {/* <Route path='/herbal' element={<ShopCategory banner="herbal" category="herbal"/>}/> */}
          {/* <Route path='/stationary' element={<ShopCategory banner="stationary" category="stationary"/>}/> */}
          <Route path='/product' element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path='/cart' element={<CartComponent/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/personal' element={<Personal />}/>
          <Route path='/address' element={<Address />}/>
          <Route path='/search' element={<SearchProduct />}/>
          <Route path='/wishlist' element={<Wishlist />}/>
          <Route path='/checkout' element={<Checkout />}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
