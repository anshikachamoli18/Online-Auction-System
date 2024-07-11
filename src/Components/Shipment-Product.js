import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Shipment = () => {
  const { productId, buyerId } = useParams();
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  //console.log('productId:', productId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('buyerId', buyerId);
    formdata.append('otp',otp);

    console.log('FormData to be sent:');
  for (let pair of formdata.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }
    try {
      const response = await axios.post(`http://localhost:5000/api/product/updateShipment/${productId}`, formdata,
        {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
      );
      setMessage(response.data.message);
    } catch (err) {
      setMessage('Error updating shipment status. Please try again later.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="mt-auto mx-5 mb-20 flex items-center justify-center min-h-screen">
      <div className="container max-w-md bg-blue-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Update Shipment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-gray-700">OTP</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full py-2 px-4 bg-green-500 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300"
          >
            Verify OTP and Complete Shipment
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Shipment;
