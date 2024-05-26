import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Register(props) {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    contactnumber: "",
    password: "",
    confirmpassword: "",
    uniqueid: "",
    image: null,
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [passwordFilled, setPasswordFilled] = useState(false); // To track if password fields have been filled
  let navigate = useNavigate();

  const resetFields = () => {
    setCredentials({
      name: "",
      email: "",
      contactnumber: "",
      password: "",
      confirmpassword: "",
      uniqueid: "",
      image: null,
    });
    setPasswordsMatch(true);
    setOtp("");
    setOtpSent(false);
    setOtpVerified(false);
    setPasswordFilled(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, contactnumber, password } = credentials;

    if (!otpVerified) {
      props.showAlert("Please verify OTP", "danger");
      return;
    }

    const uniqueid = Math.floor(Math.random() * 1000000000);
    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, contactnumber, password, uniqueid, image: null }),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        localStorage.setItem("useruniqueid", json.uniqueid);
        props.showAlert("Account created Successfully", "success");
        login(json.authToken);
        navigate("/");
      } else {
        props.showAlert(json.error, "danger");
        resetFields();
      }
    } catch (error) {
      props.showAlert("An error occurred. Please try again.", "danger");
      resetFields();
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => {
      const newState = { ...prevState, [name]: value };
      if (name === "password" || name === "confirmpassword") {
        setPasswordsMatch(newState.password === newState.confirmpassword);
        setPasswordFilled(newState.password && newState.confirmpassword);
      }
      return newState;
    });
  };

  const sendOtp = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/sendotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email }),
      });
      const json = await response.json();
      if (json.success) {
        props.showAlert("OTP sent successfully", "success");
        setOtpSent(true);
      } else {
        props.showAlert(json.error, "danger");
        resetFields();
      }
    } catch (error) {
      props.showAlert("An error occurred while sending OTP. Please try again.", "danger");
      resetFields();
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/verifyotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email, otp }),
      });
      const json = await response.json();
      if (json.success) {
        props.showAlert("OTP verified successfully", "success");
        setOtpVerified(true);
      } else {
        props.showAlert(json.error, "danger");
        resetFields();
      }
    } catch (error) {
      props.showAlert("An error occurred while verifying OTP. Please try again.", "danger");
      resetFields();
    }
  };

  return (
    <div className="container" style={{ marginTop: "120px", maxWidth: "500px", padding: "10px", borderRadius: "10px", background: "lightblue" }}>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" minLength={2} value={credentials.name} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" minLength={5} value={credentials.email} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="contactnumber" className="form-label">Contact Number</label>
          <input type="number" className="form-control" id="contactnumber" name="contactnumber" minLength={10} value={credentials.contactnumber} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" minLength={5} value={credentials.password} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmpassword" name="confirmpassword" minLength={5} value={credentials.confirmpassword} onChange={onChange} required />
          {!passwordsMatch && passwordFilled && <div className="text-danger">Passwords do not match</div>}
        </div>
        <button type="button" className="btn btn-primary" onClick={sendOtp} disabled={!passwordsMatch || otpSent}>
          {otpSent ? "OTP Sent" : "Send OTP"}
        </button>
        {otpSent && !otpVerified && (
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">Enter OTP</label>
            <input type="text" className="form-control" id="otp" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            <button type="button" className="btn btn-primary mt-2" onClick={verifyOtp}>Verify OTP</button>
          </div>
        )}
        <br />
        <button type="submit" className="btn btn-primary" disabled={!otpVerified} style={{ marginTop: "10px" }}>Submit</button>
      </form>
    </div>
  );
}

export default Register;
