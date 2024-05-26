import React from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {useAuth} from "../Context/AuthContext";

function SearchResults(props) {
  const location = useLocation();
  const results = location.state.searchResults || [];
  const navigate = useNavigate();
  const {isAuthenticated}=useAuth();

  const handlePlaceBid=(product) => {
    if(isAuthenticated)
    {
       navigate("/product-details-for-bid",{state :{product}});
    }
    else
    {
    navigate("/login-for-placing-bid",{state :{product}});
    }
  };
  
  return (
    <div className="container" style={{marginTop:"100px"}}>
      <h1>Search Results</h1>
      <div className="row">
        {results.map(product => (
          <div key={product._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Category: {product.category}</p>
                <p className="card-text">Description: {product.description}</p>
                <p className="card-text">Starting Bid Price: ${product.startingbidprice}</p>
                <p className="card-text">Current Bid Price: ${product.currentbidprice}</p>
                <p className="card-text">Duration: {product.durationInMinutes} minutes</p>
                <p className="card-text">Condition: {product.condition}</p>
                <p className="card-text">Status: {product.status}</p>
                <button className="btn btn-primary" onClick={() => handlePlaceBid(product)}>Place Bid</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
