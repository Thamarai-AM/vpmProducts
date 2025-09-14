import React, { createContext, useReducer, useContext, useEffect,useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; 

// Create Context
const CartContext = createContext();

// Initial State
const initialState = {
  cart: [],
  wishlist: [],
  user: null,
};

// Reducer Function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload };

    case "ADD_TO_CART":
      const existingProduct = state.cart.find((item) => item.id === action.payload.id);
      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + action.payload.quantity } : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: action.payload.quantity }],
        };
      }

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ),
      };

    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload.id) };

    case "SET_WISHLIST":
      return { ...state, wishlist: action.payload };

    case "ADD_TO_WISHLIST":
      return { ...state, wishlist: [...state.wishlist, action.payload] };

    case "REMOVE_FROM_WISHLIST":
      return { ...state, wishlist: state.wishlist.filter((item) => item.id !== action.payload.id) };

    case "LOGIN":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state;
  }
};

// Cart Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const profileID = localStorage.getItem("profileID");
  // const[userNameValue,setUserNameValue] = useState(null)
  // const[profileID,setProfileID] = useState(null)
  // ✅ Calculate Total Quantity
  const totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);

  // ✅ Calculate Total Amount
  const totalAmount = state.cart.reduce((total, item) => total + item.new_price * item.quantity, 0);



  useEffect(() => {
    const profileID = localStorage.getItem("profileID");
        // const token = localStorage.getItem("token");
        // const decodedToken = jwtDecode(token);
        // console.log(decodedToken); 
        // setProfileID(decodedToken.id)
        // console.log(profileID); 

        if (profileID) {
      fetchCart(profileID);
      fetchWishlist(profileID)
    }
    // const token = localStorage.getItem("token");

    // if (token) {
    //   try {
    //     const decoded = jwtDecode(token); // ✅ Decode JWT token
    //     setUserNameValue({ username: decoded.username, user_id: decoded.user_id });
    //     console.log(decoded)
    //   } catch (error) {
    //     console.error("Invalid token:", error);
    //     localStorage.removeItem("token"); // Remove invalid token
    //   }
    // }

      // axios.get(`http://localhost:5000/wishlist/${profileID}`)
      //   .then((res) => dispatch({ type: "SET_WISHLIST", payload: res.data }))
      //   .catch((err) => console.error("Error fetching wishlist:", err));
    
  }, []);
  const [buttonText, setButtonText] = useState("Add to Cart");
  const [added, setAdded] = useState(false);

  // Cart Actions
  const addToCart = async (product, quantity = 1) => {
    setButtonText("Adding...");

    try {
      const res = await axios.post("http://localhost:5000/cart", {
        user_id: profileID,
        product_id: product.id,
        name: product.name,
        new_price: product.new_price,
        quantity: quantity,
        image:product.image
      });
      setButtonText("Added ✅");  
      setAdded(true)
      dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
    } catch (error) {
      console.error("Error adding to cart:", error);
      setButtonText("Try Again ❌");

    }
  };
  
  const increaseQuantity = (product_id) => {
    const profileID = localStorage.getItem("profileID");
  
    // console.log("Increasing quantity for:", product_id, "User:", profileID);
  
    axios.put("http://localhost:5000/cart/increase", {
      user_id: profileID,
      product_id: product_id,
    })
    .then((res) => {
      // console.log("API Response:", res.data);
      dispatch({ type: "INCREASE_QUANTITY", payload: res.data });
    })
    .catch((error) => {
      console.error("Error increasing quantity:", error.response?.data || error.message);
    });
  };
  
  const decreaseQuantity = (product_id) => {
    const profileID = localStorage.getItem("profileID");
  
    // console.log("decreasing quantity for:", product_id, "User:", profileID);
  
    axios.put("http://localhost:5000/cart/decrease", {
      user_id: profileID,
      product_id: product_id,
    })
    .then((res) => {
      // console.log("API Response:", res.data);
      dispatch({ type: "DECREASE_QUANTITY", payload: res.data });
    })
    .catch((error) => {
      console.error("Error decreasing quantity:", error.response?.data || error.message);
    });
  };
  
  const removeFromCart = async (product_id) => {
    try {
      const profileID = localStorage.getItem("profileID");
  
      const res = await axios.delete("http://localhost:5000/cart/remove", {
        data: { user_id: profileID, product_id: product_id }, // ✅ Send in `data`
      });
  
      dispatch({ type: "REMOVE_FROM_CART", payload: { id: product_id } });
  
      console.log("Removed from cart:", res.data);
      window.location.reload(); 
    } catch (error) {
      console.error("Error removing from cart:", error.response?.data || error.message);
    }
  };
  
  const [addedwishlist, setAddedwishlist] = useState(true);
  const [wishlistProducts, setWishlistProducts] = useState([]);

  // Wishlist Actions
  const addToWishlist = async (product) => {
    try {
      await axios.post("http://localhost:5000/wishlist", { 
        user_id: profileID, 
        product_id: product.id,
        name: product.name,
        new_price: product.new_price,
        image:product.image });
        // setAddedwishlist(false)

      dispatch({ type: "ADD_TO_WISHLIST", payload: product });
      window.location.reload(); 

    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };
  const fetchWishlist = async (profileID) => {
    try {
      const res = await axios.get(`http://localhost:5000/wishlist/${profileID}`);
      dispatch({ type: "SET_WISHLIST", payload: res.data });
      // console.log(res.data)
      // console.log(typeof(res.data))
      let data = [...wishlistProducts,...res.data]
      setWishlistProducts(data)
      
      if(res.data.product_id){
        setAddedwishlist(true)

      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const removeFromWishlist = async (product_id) => {
    console.log("remove wish",product_id)
    try {
      const profileID = localStorage.getItem("profileID");
  
      const res = await axios.delete("http://localhost:5000/wishlist/remove", {
        data: { user_id: profileID, product_id: product_id }, // ✅ Send in `data`
      });
      setAddedwishlist(true)
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: { id: product_id } });
  
      console.log("Removed from wishlist:", res.data);
      window.location.reload(); 
    } catch (error) {
      console.error("Error removing from wishlist:", error.response?.data || error.message);
    }
  };
  
//wishlist
// const [wishlist, setWishlist] = useState([]);

// const fetchWishlist = async (profileID) => {
//   axios.get(`http://localhost:5000/wishlist/${profileID}`)
//       .then((res) => setWishlist(res.data))
//       .catch((err) => console.error(err));
// }
//   // **🔹 Toggle Wishlist**
//   const toggleWishlist = (product) => {
//     console.log(product)
//     const exists = wishlist.some((item) => item.id === product.id);

//     if (exists) {
//       // Remove from wishlist
//       axios.delete("http://localhost:5000/wishlist", { data: { user_id: profileID, product_id: product.id } })
//         .then(() => setWishlist(wishlist.filter((item) => item.id !== product.id)))
//         .catch((err) => console.error(err));
//     } else {
//       // Add to wishlist
//       axios.post("http://localhost:5000/wishlist", { user_id: profileID, product_id: product.id })
//         .then(() => setWishlist([...wishlist, product]))
//         .catch((err) => console.error(err));
//     }
//   };


// ✅ New function to fetch cart data
const fetchCart = async (profileID) => {
  try {
    const res = await axios.get(`http://localhost:5000/cart/${profileID}`);
    dispatch({ type: "SET_CART", payload: res.data });
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
};
  // User Actions
  const login = async (formData) => {
    try {
      const res = await axios.post("http://localhost:5000/login", formData);
      console.log(res.data)
      // localStorage.setItem("profileID", res.data.id);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userNameValue", res.data.username);
      localStorage.setItem("profileID", res.data.id);
      const token = localStorage.getItem("token");

        const decodedToken = jwtDecode(token);

        console.log(decodedToken); 
        // setProfileID(decodedToken.id)

      // setUserNameValue(res.data.username)
      dispatch({ type: "LOGIN", payload: res.data });
      fetchCart(res.data.id);
      

    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userNameValue");
    localStorage.removeItem("profileID");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <CartContext.Provider value={{
      cart: state.cart,
      wishlist: state.wishlist,
      user: state.user,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      addToWishlist,
      login,
      logout,
      removeFromCart,totalQuantity, 
      totalAmount,
      removeFromWishlist,
      buttonText,added,wishlistProducts
      // addedwishlist,
      // toggleWishlist
      // userNameValue,profileID
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to Use Cart Context
export const useCart = () => useContext(CartContext);
