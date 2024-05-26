import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

function Home(props) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  
  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5000/api/product/upcoming")
      .then(response => {
        const activeProducts = response.data.filter(product => product.status === "active");
        const updatedProducts = activeProducts.map(product => {
          const endDate = new Date(product.createdAt);
          endDate.setMinutes(endDate.getMinutes() + product.durationInMinutes);
          return { ...product, endDate };
        });
        setProducts(updatedProducts);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching upcoming auctions:", error);
        props.showAlert("Failed to fetch upcoming auctions.", "danger");
        setLoading(false);
      });
  }, [props]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!category || !searchTerm) {
      props.showAlert("Please select a category and enter a product name.", "danger");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/product/search/${category}/${searchTerm}`);
      const searchResults = response.data;
      if (!searchResults || searchResults.length === 0) {
        props.showAlert("No results found", "warning");
      } else {
        navigate("/search-results", { state: { searchResults } });
      }
    } catch (error) {
      console.error("Error searching for products:", error);
      props.showAlert("An error occurred while searching for products.", "danger");
    }
    setLoading(false);
    setCategory("");
    setSearchTerm("");
  };

  const handlePlaceBid = (product) => {
    if (isAuthenticated) {
      navigate("/product-details-for-bid", { state: { product } });
    } else {
      navigate("/login-for-placing-bid", { state: { product } });
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center" style={{ fontFamily: "TimesNewRoman", color: "black", marginTop: "120px"}}>
        <ul className="text-center">
          <li className="list-group-item" style={{ fontSize: "40px" }}>Welcome to</li>
          <li className="list-group-item" style={{ fontSize: "80px", fontWeight: "bold" }}>ONLINE AUCTION SYSTEM</li>
          <li className="list-group-item" style={{ fontSize: "40px" }}>This is your chance to own a piece of history</li>
        </ul>
      </div>

      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <form onSubmit={handleSearch} className="d-flex">
              <select className="form-select me-2" aria-label="Category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
              </select>
              <input className="form-control me-2" type="search" placeholder="Product Name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} required/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '100px' }}>
        <h1 className="container d-flex justify-content-center align-items-center">UPCOMING AUCTIONS</h1>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="product-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
            {products.map((product) => (
              <div key={product._id} className="card">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Category: {product.category}</p>
                  <p className="card-text">Description: {product.description}</p>
                  <p className="card-text">Starting Bid Price: ${product.startingbidprice}</p>
                  <p className="card-text">Current Bid Price: ${product.currentbidprice}</p>
                  <p className="card-text">End Date: {product.endDate.toLocaleString()}</p>
                  <p className="card-text">Condition: {product.condition}</p>
                  <p className="card-text">Status: {product.status}</p>
                  <button className="btn btn-primary" onClick={() => handlePlaceBid(product)}>Place Bid</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
