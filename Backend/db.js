const path = require('path');
require("dotenv").config();

const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;

console.log("✅ MONGO_URI from env:", mongoURI); // Debug line

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        
        console.log("✅ Connected to MongoDB successfully");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;
