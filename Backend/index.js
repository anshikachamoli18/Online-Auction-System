const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const { scheduleProductsUpdate } = require('D:\\onlineauctionsystem\\Backend\\routes\\cron.js');

connectToMongo();

const app = express();
const port = 5000;

// Schedule a task to update product statuses
scheduleProductsUpdate();


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/productImages', express.static('productImages'));
app.use('/ProofImages', express.static('ProofImages'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/product', require('./routes/product'));

app.listen(port, () => {
  console.log(`Online Auction System backend listening on port http://localhost:${port}`);
});

