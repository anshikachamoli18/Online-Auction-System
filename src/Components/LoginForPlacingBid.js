import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function LoginForPlacingBid(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state.product;
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Check if OTP is already sent
      if (otpSent) {
        // Verify OTP
        const otpResponse = await axios.post("http://localhost:5000/api/auth/verifyotp", {
          email,
          otp,
        });

        if (!otpResponse.data.success) {
          setError("Invalid OTP. Please try again.");
          setLoading(false);
          return;
        }

        // OTP verified, navigate to home page
        props.showAlert("Logged in successfully", "success");
        localStorage.setItem("useruniqueid", response.data.uniqueid);
        navigate("/product-details-for-bid", { state: { product } });
        login(response.data.authToken);
        setLoading(false);
      } else {
        // Send OTP
        const otpResponse = await axios.post("http://localhost:5000/api/auth/sendotp", {
          email,
        });

        if (!otpResponse.data.success) {
          setError(otpResponse.data.error);
          setLoading(false);
          return;
        }

        // OTP sent successfully
        setOtpSent(true);
        setLoading(false);
        props.showAlert("OTP sent successfully", "success");
      }
    } catch (error) {
      setLoading(false);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container" style={{ marginTop: "120px", width: "500px", background: "lightblue", padding: "10px", borderRadius: "10px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {otpSent && (
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">
              Enter OTP
            </label>
            <input
              type="text"
              className="form-control"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginForPlacingBid;
