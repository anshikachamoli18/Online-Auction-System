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
// List allowed origins (make sure it's the correct frontend URL)
const allowedOrigins = ['https://online-auction-system-virid.vercel.app']; // Frontend URL

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Important if you're dealing with cookies or sessions
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
