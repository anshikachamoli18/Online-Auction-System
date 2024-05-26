import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProducts() {
    const [products, setProducts] = useState([]);
    //const [status, setStatus] = useState("active");

    useEffect(() => {
        async function fetchProducts() {
            const uniqueid = localStorage.getItem("uniqueid");
            try {
                const response = await axios.get(`http://localhost:5000/api/product/products/${uniqueid}`);
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProducts();
    }, []);

    return (
        <div className="product-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', padding: '20px', marginTop: "100px" }}>
            {products.map(product => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
}

function ProductCard({ product }) {
    const [elapsedTime, setElapsedTime] = useState(null);
    useEffect(() => {
        const calculateElapsedTime = () => {
            const creationTime = new Date(product.createdAt);
            const currentTime = new Date();
            const elapsedTimeMs = currentTime - creationTime;
            const elapsedMinutes = Math.floor(elapsedTimeMs / (1000 * 60));
            setElapsedTime(elapsedMinutes);
        };

        calculateElapsedTime();

        // Update elapsed time every minute
        const intervalId = setInterval(() => {
            calculateElapsedTime();
        }, 60000); // 60000 milliseconds = 1 minute

        return () => clearInterval(intervalId);
    }, [product.createdAt, product.durationInMinutes]);


    return (
        <div className="product-card" style={{ backgroundColor:  product.status==='active'? 'lightpink' : 'lightgray', padding :"10px" , borderRadius:"10px" }}>
            <div className="product-details">
                <h2>{product.name}</h2>
                <p>Category: {product.category}</p>
                <p>Description: {product.description}</p>
                <p>Starting Bid Price: ${product.startingbidprice}</p>
                <p>Current Bid Price: ${product.currentbidprice}</p>
                <p>Duration: {product.durationInMinutes} minutes</p>
                <p>Elapsed Time: {elapsedTime !== null ? `${elapsedTime} minutes` : 'Calculating...'}</p>
                <p>Condition: {product.condition}</p>
                <p>Status: {product.status}</p>
            </div>
        </div>
    );
}



export default UserProducts;
