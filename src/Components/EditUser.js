import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function EditUser(props) {
  const [credentials, setCredentials] = useState({
    name: "",
    contactnumber: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, authToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, contactnumber, password } = credentials;

    if (!authToken) {
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/updateuser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken
        },
        body: JSON.stringify({ name, contactnumber, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user.");
      }

      const json = await response.json();

      if (json.success) {
        setCredentials({ name: "", contactnumber: "", password: "" });
        navigate("/profile", props);
        props.showAlert("Account updated Successfully", "success");
      } else {
        props.showAlert(json.error, "danger");
      }
    } catch (error) {
      props.showAlert("An error occurred.", "danger");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    isAuthenticated && (
      <div className="container" style={{ marginTop: "120px", width: "500px" }}>
        <h2>Update Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              onChange={onChange}
              minLength={2}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contactnumber" className="form-label">Contact Number</label>
            <input
              type="number"
              className="form-control"
              id="contactnumber"
              name="contactnumber"
              value={credentials.contactnumber}
              onChange={onChange}
              minLength={10}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              value={credentials.password}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          {loading ? (
            <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">Submit</button>
          )}
        </form>
      </div>
    )
  );
}

export default EditUser;
