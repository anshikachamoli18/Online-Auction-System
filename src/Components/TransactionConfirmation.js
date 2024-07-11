import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TransactionConfirmation = () => {
  const { productId, buyerId } = useParams();

  const [address,setAddress]=useState({
    addressLine1:"",
    addressLine2:"",
    city:"",
    state:"",
    zipCode:"",
    country:""
  });
  const [proofOfPayment,setProofOfPayment]=useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('buyerId:', buyerId);
    console.log('productId:', productId);
    console.log('address',address);
    console.log('proofOfPayment',proofOfPayment);

    const formData = new FormData();
    formData.append('buyerId', buyerId);
    formData.append('addressLine1',address.addressLine1);
    formData.append('addressLine2',address.addressLine2);
    formData.append('city',address.city);
    formData.append('state',address.state);
    formData.append('zipcode',address.zipCode);
    formData.append('country',address.country);
    formData.append('proofOfPayment', proofOfPayment);

    console.log('FormData to be sent:');
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

    try {
      const response = await axios.post(`http://localhost:5000/api/product/confirmTransaction/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      setMessage(response.data.message);
      //setAddress(address);
    } catch (err) {
      setMessage('Error confirming transaction. Please try again later.');
      console.error('Error:', err);
    }
    console.log("Done");
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-28 mx-5 mb-20 flex items-center justify-center min-h-screen">
      <div className="container max-w-md bg-blue-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Confirm Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="addressLine1" className="block text-gray-700">
              Address Line 1
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              id="addressLine1"
              name="addressLine1"
              value={address.addressLine1}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="addressLine2" className="block text-gray-700">
              Address Line 2
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              id="addressLine2"
              name="addressLine2"
              value={address.addressLine2}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-gray-700">
              City
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              id="city"
              name="city"
              value={address.city}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-gray-700">
              State
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              id="state"
              name="state"
              value={address.state}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-gray-700">
              Zip Code
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              id="zipCode"
              name="zipCode"
              value={address.zipCode}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-gray-700">
              Country
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              id="country"
              name="country"
              value={address.country}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="proofOfPayment" className="block text-gray-700">
              Proof of Payment
            </label>
            <input
              type="file"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              id="proofOfPayment"
              name="proofOfPayment"
              // Ensure you are handling proofOfPayment correctly
              onChange={(e)=>setProofOfPayment(e.target.files[0])}
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full py-2 px-4 bg-green-500 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300"
          >
            Confirm Transaction
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default TransactionConfirmation;
