
import React,{useState,useEffect} from 'react'
import './AddCategory.css'
import axios from "axios";
import { useNavigate,useLocation,useParams } from "react-router-dom";


const AddCategory = () => {
  const { id } = useParams(); // Get product ID from URL (for editing)
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState("");

  // Fetch category data if editing
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/category/${id}`)
        .then(res => setCategory(res.data))
        .catch(err => console.error("Error fetching category:", err));
    }
  }, [id]);

  // Handle form input changes
  const changeHandler = async(e) => {
    // setProduct({ ...product, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
    setError(""); // Reset error on new input
  };


  // Submit form (Add or Edit category)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/category/${id}`, category);
        alert("category updated successfully!");
      } else {
        await axios.post("http://localhost:5000/category", category);
        alert("category added successfully!");
      }
      navigate("/listcategory");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.error); // Show "category name already exists" error
      } else {
        console.error("Error adding category:", error);
      }
    }
  };

    
    
  return (
    <>
      <form onSubmit={handleSubmit}>
      {/* {productId==null? <h2>Add New Product</h2>: <h2>update Product</h2>} */}
      <h2>{id ? "Edit Category" : "Add Category"}</h2>

      
      <div className="row">
          <div className="form-floating mb-3">
            <input required value={category.name} onChange={changeHandler} type="text" name='name' className="form-control"/>
            <label>Name of the category</label>
            {error && <p style={{ color: "red" }}>{error}</p>}
            
          </div>
        </div>
       
        <div className="row">
          <div className="form-floating mb-3 col">
            {/* <textarea className="form-control" style="height: 100px" value={category.description} placeholder="Description of the category" id="floatingTextarea"></textarea> */}
            {/* <label for="floatingTextarea">Description of the category</label> */}

            <input required value={category.description} onChange={changeHandler} type="text" name='description' className="form-control"/>
            <label htmlFor="floatingInput">Description of the category</label>
          </div>
        </div>
        <button type="submit" disabled={error !== ""} className='submit-button'>{id ? "Update Category" : "Add Category"}</button>
      </form>

    
    </>
  )
}

export default AddCategory

