import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './CSS/ShopCategory.css'
import { Link } from 'react-router-dom'
import grid_icon from '../Components/Assets/grid.png'
import list_icon from '../Components/Assets/list.png'
import right_arrow from '../Components/Assets/right-arrow.png'

const ShopCategory = (props) => {
    const [all_product_category, setAllProductCategory] = useState([]);
    let categoryName =props.banner;
    // console.log(all_product_category);
    

    const [priceFilter, setPriceFilter] = useState("all");
    const [sortOption, setSortOption] = useState("default");
    const [isGridView, setIsGridView] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // State for pagination
        const itemsPerPage = 3; // Number of items per page
      
  // Filter Logic
  const filteredProducts = all_product_category.filter((product) => {
    switch (priceFilter) {
      case "under-500":
        return product.new_price < 500;
      case "500-1000":
        return product.new_price >= 500 && product.new_price <= 1000;
      case "over-1000":
        return product.new_price > 1000;
      default:
        return true; // "all" case
    }
  })
  
  .sort((a, b) => {
    // Sorting logic
    if (sortOption === "price-asc") return a.new_price - b.new_price; // Sort by price (low to high)
    if (sortOption === "price-desc") return b.new_price - a.new_price; // Sort by price (high to low)
    if (sortOption === "name-asc") return a.name.localeCompare(b.name); // Sort by name (A-Z)
    if (sortOption === "name-desc") return b.name.localeCompare(a.name); // Sort by name (Z-A)
    return 0; // Default (no sorting)
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get("http://localhost:5000/products/category/"+categoryName);
            setAllProductCategory(response.data);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
    
        fetchProducts();
      }, [categoryName]);
      
  return (
    <div>
        <div className="container text-center">
            <div className="row">
                
                <ul className="breadcrumb">
                                <li><Link to={`/`}>HOME</Link><img src={right_arrow} alt="" /></li>
                                <li><Link to={`/${props.banner}`}>{props.banner}</Link></li>
                        </ul>
            </div>


            <div className="row">
              <div className="col-md-2 ">
                <div className='shopGrid'>
                  <div className="row">
                      <div className="priceDiv">
                          <h5>Price</h5>
                          <button className={`priceButton ${priceFilter === "all" ? "active" : ""}`} onClick={() => setPriceFilter("all")}>All</button>
                          <button className={`priceButton ${priceFilter === "under-500" ? "active" : ""}`} onClick={() => setPriceFilter("under-500")}>₹0 - ₹500</button>
                          <button className={`priceButton ${priceFilter === "500-1000" ? "active" : ""}`} onClick={() => setPriceFilter("500-1000")}>₹500 - ₹1000</button>
                          <button className={`priceButton ${priceFilter === "over-1000" ? "active" : ""}`} onClick={() => setPriceFilter("over-1000")}>over  ₹1000</button>
                      </div>
                  </div>
                </div>
              </div>
              <div className="col-md-9 shopDetails">
                <div className="row shopNav">
                <div className='col-md-6 shopNavLeft'>
                  <button onClick={() => setIsGridView(true)}><img src={grid_icon} alt="" /></button>
                  <button onClick={() => setIsGridView(false)}><img src={list_icon} alt="" /></button>
                </div>
                <div className='col-md-6 shopNavRight'>
                  <label>
                    Sort By:
                    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                      <option value="default">Default</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="name-asc">Name: A-Z</option>
                      <option value="name-desc">Name: Z-A</option>
                    </select>
                  </label>
                </div>
                

                </div>
                        {/* Display Products */}
                <div className={`product-container ${isGridView ? "grid-view" : "list-view"}`}>
                {paginatedProducts.map((product) => (
                  <div key={product.id}  className='product-grid' >
                    <Link to={`/product/${product.id}`}>
                    <div className='productDiv'>
                      <p>              {product.image ? (
                            <img src={product.image} alt={product.name} className='product-display-image' />
                          ) : (
                            <p>No Image Available</p>
                          )}
                      </p>
                      {/* <p><img className='product-display-image' onClick={window.scrollTo(0,0)} src={`http://localhost:5000${product.image}`} alt="" /></p> */}
                      <div className="product-details">

                      <h2>{product.name}</h2>
                      <div className="product-data">
                      <div className="item-prices">
                        <div className="item-price-new">
                            ₹{product.new_price}
                        </div>
                        <div className="item-price-old">
                            ₹{product.old_price}
                        </div>
                        </div>
                        {/* <button className='submit-button'  onClick={() => addToCart(product, 1)}>Add {product.name} to Cart</button> */}

                        <button className='submit-button'>Open {product.name} </button>
                        </div>
                    </div>

                    </div>
                    </Link>
                  </div>
                ))}
                </div>
              
              </div>
            </div>

            {/* Pagination */}
    <div style={{ marginTop: "20px", textAlign: "center" }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{
              padding: "10px",
              margin: "0 5px",
              backgroundColor: currentPage === index + 1 ? "#4CAF50" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
                        {index + 1}
          </button>
        ))}
      </div>
        </div>
      
    </div>
  )
}

export default ShopCategory
