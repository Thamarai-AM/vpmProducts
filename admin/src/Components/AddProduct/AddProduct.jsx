import React,{useState,useEffect} from 'react'
import './AddProduct.css'
import axios from "axios";
import upload_area from '../../assets/upload_area.png'
import { useNavigate,useLocation,useParams } from "react-router-dom";


const AddProduct = () => {
  const { id } = useParams(); // Get product ID from URL (for editing)
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    old_price: "",
    new_price: "",
    category: "",
    available: "",
    weight: "",
    image: ""
  });
  const [selectedValue, setSelectedValue] = useState(1); // Default selection is 1

  const [error, setError] = useState("");

  const [categories, setCategories] = useState([]);

  const fetchCategory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };
  // Fetch product data if editing
  useEffect(() => {
    fetchCategory();
    
    if (id) {
      axios.get(`http://localhost:5000/product/${id}`)
        .then(res => setProduct(res.data))
        .catch(err => console.error("Error fetching product:", err));
    }
  }, [id]);

  // Handle form input changes
  const changeHandler = async(e) => {
    console.log(e)
    // setProduct({ ...product, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setError(""); // Reset error on new input
    console.log(selectedValue)
    setSelectedValue(Number(e.target.value)); // Convert string to number

  };


  

  // Handle image upload as base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProduct({ ...product, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Submit form (Add or Edit product)
  const handleSubmit = async (e) => {
    console.log(product)
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/product/${id}`, product);
        alert("Product updated successfully!");
      } else {
        await axios.post("http://localhost:5000/product", product);
        alert("Product added successfully!");
      }
      navigate("/listproduct");
    } catch (error) {
      // console.error("Error submitting product:", error);
      if (error.response && error.response.status === 400) {
        setError(error.response.data.error); // Show "Product name already exists" error
      } else {
        console.error("Error adding product:", error);
      }
    }
  };

    
    
  return (
    <>
      <form onSubmit={handleSubmit}>
      {/* {productId==null? <h2>Add New Product</h2>: <h2>update Product</h2>} */}
      <h2>{id ? "Edit Product" : "Add Product"}</h2>

      
      <div className="row">
          <div className="form-floating mb-3">
            <input required value={product.name} onChange={changeHandler} type="text" name='name' className="form-control"/>
            <label>Name of the Product</label>
            {error && <p style={{ color: "red" }}>{error}</p>}
          

          </div>
        </div>
        <div className="row">
          <div className="form-floating mb-3 col">
            <input required id="oldPriceID" value={product.old_price} onChange={changeHandler} type="text" name='old_price' className="form-control" />
            <label>Old Price of Product</label>
          </div>
          <div className="form-floating mb-3 col">
            <input required  value={product.new_price} onChange={changeHandler}type="text" name='new_price' className="form-control" />
            <label>New Price of Product</label>
          </div>
        </div>
        <div className="row">
          <div className="form-floating mb-3 col">
            <select name="category" value={product.category} onChange={changeHandler} className="form-select" required>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <label >Select Category Type</label>
          </div>
          <div className="form-floating mb-3 col">
            <div>
          <p>Choose an Option to display in Home Page: </p>

              <label>
                <input
                  type="radio"
                  name="displayHome"
                  value={1}
                  checked={selectedValue === 1}
                  onChange={changeHandler}
                />
                Yes
              </label>

              <label>
                <input
                  type="radio"
                  name="displayHome"
                  value={0}
                  checked={selectedValue === 0}
                  onChange={changeHandler}
                />
                No 
              </label>
              </div>
          </div>
        </div>

        {/* <div className="row">
          <div className="form-floating mb-3 col">
            <div className="form-floating">
              <select required className="form-select" value={category}   onChange={(e) => setCategory(e.target.value)}>
                <option value=""></option>
                {categoryData.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
                ))}
              </select>              
              <label >Select Category Type</label>
            </div>
          </div>
        </div> */}
        <div className="row">
          <div className="form-floating mb-3 col">
            <input required id="available" value={product.available} onChange={changeHandler} type="text" name='available' className="form-control" />
            <label>Available number of the Product</label>
          </div>
          <div className="form-floating mb-3 col">
            <input required  value={product.weight} onChange={changeHandler}type="text" name='weight' className="form-control" />
            <label>Weight of the Product in units(eg:kgs)</label>
          </div>
        </div>
        
        <div className="row">
          <div className="form-floating mb-3 col">
          {/* <textarea
              className="form-control"
              // style={{ height: "100px" }} // ✅ Correct way to use style in React
              value={product.description} // ✅ Controlled component
              onChange={changeHandler}
              // placeholder="Description of the Product"
              id="floatingTextarea"
            />
            <label htmlFor="floatingTextarea">Description of the Product</label> */}


            <input required value={product.description} onChange={changeHandler} type="text" name='description' className="form-control" style={{ height: "100px" }}/>
            <label htmlFor="floatingInput">Description of the Product</label>
          </div>
        </div>
        
        <div className="row">
          <div className="form-floating mb-3 col">
          {/* <input type="file" accept="image/*" onChange={handleImageUpload} required={!id} /> */}
          {/* {product.image && <img src={product.image} alt="Preview" width="300" />} */}
            <div onClick={() => document.getElementById("imageInput").click()} style={{ cursor: "pointer", display: "inline-block" }}>
                {product.image ? (
                  <img src={product.image} alt="Preview" style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }} />
                ) : (
                  <div style={{ width: "100px", height: "100px", background: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px" }}>
                    Click to Upload
                  </div>
                )}
            </div>
            <input id="imageInput" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} required={!id} />

          </div>
        </div>
        <button type="submit" disabled={error !== ""} className='submit-button'>{id ? "Update Product" : "Add Product"}</button>
      </form>

    
    </>
  )
}

export default AddProduct
