require("dotenv").config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const fs = require('fs');

const path = require('path');
require("dotenv").config();


console.log('Loaded MONGO_URI:', process.env.MONGO_URI); 

const connectToMongo = require('./db');
const { scheduleProductsUpdate } = require('./routes/cron');

// Connect to MongoDB
connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

const folders = [
  'uploads',
  path.join('uploads', 'products'),
  path.join('uploads', 'proofs')
];

folders.forEach(folder => {
  const folderPath = path.join(__dirname, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log(`Created folder: ${folder}`);
  }
});

// Schedule product status update cron job
scheduleProductsUpdate();

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "https://your-frontend-domain.com"],
  credentials: true,
}));
app.use(express.json());

// Serve static image folders
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/product', require('./routes/product'));

// Start server
app.listen(port, () => {
  console.log(`✅ Online Auction System backend running at: http://localhost:${port}`);
});
