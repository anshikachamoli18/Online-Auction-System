import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import HowItWorks from './Components/HowItWorks';
import Register from './Components/Register';
import Login from './Components/Login';
import Contact from './Components/Contact';
import { useState } from 'react';
import Alert from './Components/Alert';
import Profile from './Components/Profile';
import EditUser from './Components/EditUser';
import { AuthProvider } from './Context/AuthContext';
import Postproduct from './Components/PostProduct';
import UserProducts from './Components/UserProducts';
import SearchResults from './Components/SearchResults';
import LoginForPlacingBid from './Components/LoginForPlacingBid';
import ProductDetailsForBid from './Components/ProductDetailsForBid';

function App() {
  const [alert,setAlert]=useState(null)
  const showAlert=(message,type)=>
  {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
    <style>{`
          body {
            background-color: #b0eaf5;
            font-family: "Times New Roman";
          }
        `}</style>
    <Router>
      <AuthProvider>
      <Navbar/>
      <Alert alert={alert}/>
        <div className="container">
          <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/works" element={<HowItWorks/>}/>
          <Route exact path="/register" element={<Register showAlert={showAlert}/>}/>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
          <Route exact path="/contact" element={<Contact />}/>
          <Route exact path="/profile" element={<Profile showAlert={showAlert} />}/>
          <Route exact path="/edituser" element={<EditUser showAlert={showAlert}/>}/>
          <Route exact path="/postproduct" element={<Postproduct showAlert={showAlert}/>}/>
          <Route exact path="/viewproduct" element={<UserProducts />}/>
          <Route exact path="/search-results" element={<SearchResults showAlert={showAlert}/>}/>
          <Route exact path="/login-for-placing-bid" element={<LoginForPlacingBid showAlert={showAlert}/>}/>
          <Route exact path="/product-details-for-bid" element={<ProductDetailsForBid showAlert={showAlert}/>}/>
          </Routes>
        </div>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
