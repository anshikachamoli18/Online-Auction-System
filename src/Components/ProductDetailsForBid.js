import React, { useState } from "react";
import axios from "axios";
import { useLocation ,useNavigate} from "react-router-dom";
import {useAuth} from "../Context/AuthContext";

function ProductDetailsForBid(props) {
  const [bidAmount, setBidAmount] = useState("");
  const location = useLocation();
  const product = location.state.product;
  const {authToken}=useAuth();
  const navigate=useNavigate();

  const handlePlaceBid = async () => {
    const uniqueid = localStorage.getItem("useruniqueid");
    console.log(uniqueid);
    console.log("Product seller "+product.seller);
    if (parseInt(product.seller) === parseInt(uniqueid)) {
      props.showAlert("You cannot place a bid on your own product", "danger");
      return;
    }
    if(parseFloat(bidAmount)<=parseFloat(product.currentbidprice))
      {
        props.showAlert("Bid amount should be greater than current bid price","danger");
        return;
      }
    try {
      const response = await axios.post(`http://localhost:5000/api/product/place-bid/${product._id}`, {
        bidAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      }
    );
      const json=response.data;
      if(json.success)
      {
         console.log("Bid placed successfully:", response.data);
          props.showAlert("Bid placed successfully","success");
          navigate("/");
      }
      else
      {
        props.showAlert(json.error,"danger");
      }
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  return (
    <div className="container" style={{marginTop:"200px"}}>
      <h2>Product Details</h2>
      <p>Name: {product.name}</p>
      <p>Description: {product.description}</p>
      <p>Starting Bid Price: ${product.startingbidprice}</p>
      <p>Current Bid Price: ${product.currentbidprice}</p>
      <p>Duration: {product.durationInMinutes} minutes</p>
      <p>Condition: {product.condition}</p>
      <p>Status: {product.status}</p>
      <div className="mb-3">
        <label htmlFor="bidAmount" className="form-label">
          Your Bid Amount:
        </label>
        <input
          type="number"
          className="form-control"
          id="bidAmount"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          required
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={handlePlaceBid}>
        Place Bid
      </button>
    </div>
  );
}

export default ProductDetailsForBid;
