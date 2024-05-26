import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Postproduct(props) {
  const [productCredentials, setProductCredentials] = useState({
    name: "",
    category: "",
    seller: "",
    description: "",
    startingbidprice: "",
    reserveprice: "",
    durationInMinutes: "",
    paymentmethods: "",
    condition: "",
    status: "active"
  });
  let navigate = useNavigate();

  // eslint-disable-next-line
  const handleSubmit = async (e) => {
    e.preventDefault();
    const seller = localStorage.getItem("uniqueid");
    const userAuthToken = localStorage.getItem("token");
    console.log(seller);
    productCredentials.seller = seller;
    //productCredentials.status = "active";
    const {
      name,
      category,
      description,
      startingbidprice,
      reserveprice,
      durationInMinutes,
      paymentmethods,
      condition
    } = productCredentials;

    console.log(productCredentials);

    const productData = {
      name,
      category,
      description,
      startingbidprice,
      reserveprice,
      durationInMinutes,
      paymentmethods,
      condition,
      seller,
      status: "active"
    };

    console.log(productData);

    try {
      const response = await fetch("http://localhost:5000/api/product/createproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        // Increase productUploadForSale in backend
        const increaseProductUploadForSaleResponse = await fetch(`http://localhost:5000/api/auth/user/increaseProductUploadForSale/${seller}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const increaseProductUploadForSaleJson = await increaseProductUploadForSaleResponse.json();
        console.log(increaseProductUploadForSaleJson);

        // Increase productUploadForSale in localStorage
        const productUploadForSale = parseInt(localStorage.getItem("productUploadForSale")) || 0;
        localStorage.setItem("productUploadForSale", productUploadForSale + 1);
        localStorage.setItem("token", userAuthToken);
        props.showAlert("Product Added Successfully", "success");
        navigate("/profile", props); // Navigate to profile after adding the product
      } else {
        props.showAlert(json.error, "danger");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setProductCredentials({ ...productCredentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container" style={{ marginTop: "120px", width: "500px", background: "lightblue", padding: "10px", borderRadius: "10px" }}>
        <h2>Add Product</h2>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name="name" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select className="form-select me-2" aria-label="Category" id="category" name="category" onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                aria-describedby="emailHelp"
                minLength={10}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="startingbidprice" className="form-label">
                Starting Bid Price
              </label>
              <input
                type="number"
                name="startingbidprice"
                className="form-control"
                id="startingbidprice"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="reserveprice" className="form-label">
                Reserve Price
              </label>
              <input
                type="number"
                name="reserveprice"
                className="form-control"
                id="reserveprice"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="durationInMinutes" className="form-label">
                Duration In Minutes
              </label>
              <input
                type="number"
                name="durationInMinutes"
                className="form-control"
                id="durationInMinutes"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="paymentmethods" className="form-label">
                Payment Methods
              </label>
              <select className="form-select me-2" aria-label="Payment Methods" id="paymentmethods" name="paymentmethods" onChange={handleChange} required>
                <option value="">Select Payment Method Accepted</option>
                <option value="upitransfer">UPI Transfer</option>
                <option value="banktransfer">Bank Transfer</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="condition" className="form-label">
                Condition
              </label>
              <input
                type="text"
                name="condition"
                className="form-control"
                id="condition"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Postproduct;
