import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function Login(props) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      props.showAlert('Please verify OTP', 'danger');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...credentials, otp })
      });

      const json = await response.json();

      if (response.ok) {
        localStorage.setItem('useruniqueid', json.uniqueid);
        login(json.authToken);
        navigate('/');
        props.showAlert('Logged in Successfully', 'success');
      } else {
        props.showAlert('Invalid Credentials', 'danger');
      }
    } catch (error) {
      console.error('Error during login:', error);
      props.showAlert('An error occurred during login', 'danger');
    }
  };

  const sendOtp = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/sendotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email }),
      });
      const json = await response.json();
      if (json.success) {
        props.showAlert('OTP sent successfully', 'success');
        setOtpSent(true);
      } else {
        props.showAlert(json.error, 'danger');
      }
    } catch (error) {
      props.showAlert('An error occurred while sending OTP. Please try again.', 'danger');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/verifyotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, otp }),
      });
      const json = await response.json();
      if (json.success) {
        props.showAlert('OTP verified successfully', 'success');
        setOtpVerified(true);
      } else {
        props.showAlert(json.error, 'danger');
      }
    } catch (error) {
      props.showAlert('An error occurred while verifying OTP. Please try again.', 'danger');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container" style={{ marginTop: '120px', width: '500px', background: 'lightblue', padding: '10px', borderRadius: '10px' }}>
        <h2>Log in Account</h2>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                value={credentials.email}
                onChange={onChange}
                minLength={5}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
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
            {otpSent && !otpVerified && (
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">Enter OTP</label>
                <input type="text" className="form-control" id="otp" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                <button type="button" className="btn btn-primary mt-2" onClick={verifyOtp}>Verify OTP</button>
              </div>
            )}
            <button type="button" className="btn btn-primary" onClick={sendOtp} disabled={otpSent}>
              {otpSent ? "OTP Sent" : "Send OTP"}
            </button>
            <br />
            <button type="submit" className="btn btn-primary" disabled={!otpVerified} style={{ marginTop: "10px" }}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
