/*const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var fetchProduct = require('../middleware/fetchProduct');
var fetchUser = require('../middleware/fetchUser');
const User=require('../models/User');
const nodemailer = require('nodemailer');

const JWT_SECRET = "thisisavery";

router.post('/createproduct', [
    body('name', "Enter a valid name").isLength({ min: 2 }),
    body('category').isLength({ min: 2 }),
    body('description', "Enter valid description").isLength({ min: 2 }),
    body('startingbidprice', "Enter a valid starting bid price").isNumeric(),
    body('reserveprice', "Enter a valid reserve price").isNumeric(),
    body('durationInMinutes', "Enter a valid duration").isNumeric(),
    body('paymentmethods', "Enter a valid payment method").isLength({ min: 2 }),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        let success = false;
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        
        let product = await Product.findOne({ description: req.body.description });

        if (product) {
            return res.status(400).json({ success, error: "Sorry, a product with this description already exists" });
        }

        const createdAt = new Date();
        const durationInMinutes = parseInt(req.body.durationInMinutes);
        const endDate = new Date(createdAt.getTime() + durationInMinutes * 60000); // Convert minutes to milliseconds

        product = await Product.create({
            name: req.body.name,
            seller: req.body.seller,
            category: req.body.category,
            description: req.body.description,
            startingbidprice: req.body.startingbidprice,
            reserveprice: req.body.reserveprice,
            currentbidprice: req.body.startingbidprice,
            durationInMinutes: req.body.durationInMinutes,
            paymentmethods: req.body.paymentmethods,
            condition: req.body.condition,
            status: req.body.status,
            createdAt,
            endDate,
            bidders: []
        });

        const data = {
            product: {
                id: product.id
            }
        };

        const authToken = jwt.sign(data, process.env.JWT_SECRET || JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});*/
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var fetchProduct = require('../middleware/fetchProduct');
var fetchUser = require('../middleware/fetchUser');
const nodemailer = require('nodemailer');
const User = require('../models/User');


const JWT_SECRET = "thisisavery";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D:/onlineauctionsystem/productImages');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Add unique timestamp to filename
  }
});

const upload = multer({ storage: storage });

// Ensure the 'uploads' directory exists and is accessible from the client
const fs = require('fs');
const uploadDir = path.join(__dirname, '..', 'productImages');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

router.post('/createproduct', upload.single('image'), [
  body('name', "Enter a valid name").isLength({ min: 2 }),
  body('category').isLength({ min: 2 }),
  body('description', "Enter valid description").isLength({ min: 2 }),
  body('startingbidprice', "Enter a valid starting bid price").isNumeric(),
  body('reserveprice', "Enter a valid reserve price").isNumeric(),
  body('durationInMinutes', "Enter a valid duration").isNumeric(),
  body('paymentmethods', "Enter a valid payment method").isLength({ min: 2 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    let success = false;

    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    let product = await Product.findOne({ description: req.body.description });

    if (product) {
      return res.status(400).json({ success, error: "Sorry, a product with this description already exists" });
    }

    const createdAt = new Date();
    const durationInMinutes = parseInt(req.body.durationInMinutes);
    const endDate = new Date(createdAt.getTime() + durationInMinutes * 60000); // Convert minutes to milliseconds

    product = await Product.create({
      name: req.body.name,
      seller: req.body.seller,
      category: req.body.category,
      description: req.body.description,
      startingbidprice: req.body.startingbidprice,
      reserveprice: req.body.reserveprice,
      currentbidprice: req.body.startingbidprice,
      durationInMinutes: req.body.durationInMinutes,
      paymentmethods: req.body.paymentmethods,
      condition: req.body.condition,
      status: req.body.status,
      createdAt: createdAt,
      endDate: endDate,
      image: req.file ? req.file.filename : null
    });

    success = true;
    res.json({ success, product });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


router.get('/product/:id', fetchProduct, async (req, res) => {
    try {
        const productId = req.product.id;
        const product = await Product.findById(productId);
        res.json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/products/:uniqueid', async (req, res) => {
    try {
        const { uniqueid } = req.params;
        const products = await Product.find({ seller: uniqueid });
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/upcoming', async (req, res) => {
    try {
      // Fetch products whose status is 'active' and endDate is in the future
      const products = await Product.find({ status: 'active' });
      res.json(products);
    } catch (error) {
      console.error('Error fetching upcoming auctions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/search/:category/:searchTerm', async (req, res) => {
    try {
        const { category, searchTerm } = req.params; // Extracting category and searchTerm from params
        //console.log("Category:", category);
        //console.log("Search term:", searchTerm);
        const products = await Product.find({
            name: { $regex: new RegExp(searchTerm, 'i') }, // Case-insensitive search for product name
            category, // Filter by category
            status: 'active' // Only active products
        });
        res.json(products);
    } catch (error) {
        console.error('Error searching for products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/place-bid/:productId', fetchUser, async (req, res) => {
    try {
        const { productId } = req.params;
        const { bidAmount } = req.body;
        const userId = req.user.id; // Extract userId from request

        // Fetch the product
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if bid amount is greater than current bid price
        if (bidAmount <= product.currentbidprice) {
            return res.status(400).json({ error: 'Bid amount must be higher than the current bid price' });
        }

        // Update product bid information
        product.currentbidprice = bidAmount;
        product.bidders.push({ userId, bidAmount });
        // Sort the bidders array based on bidAmount in descending order
        product.bidders.sort((a, b) => b.bidAmount - a.bidAmount);
        // Update the current bid price to the highest bid amount
        product.currentbidprice = product.bidders[0].bidAmount;
        await product.save();

        res.json({ success: true, message: 'Bid placed successfully' });
    } catch (error) {
        console.error('Error placing bid:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const checkExpiredAuctions = async () => {
    try {
        const currentTime = new Date();
        const expiredProducts = await Product.find({ status: 'expired', endDate: { $lt: currentTime } });
        
        if(expiredProducts.length === 0) {
            //console.log('No expired auctions found');
            return;
        }
        // Process each expired auction
        for (let i = 0; i < expiredProducts.length; i++) {
            const product = expiredProducts[i];
            const winningBidder = product.bidders[0]; // Assuming bidders array contains userId and bidAmount

            // Send email to winning bidder
            await sendEmailToWinner(winningBidder, product);
            console.log("Email send successfully");
            // Update product status to 'completed'
            product.status = 'completed';
            await product.save();
        }
    } catch (error) {
        console.error('Error checking expired auctions:', error);
    }
};

// Function to send email to winning bidder
const sendEmailToWinner = async (winner, product) => {
    try {
        // Fetch user details using the userId
        console.log("winner id",winner.userId);
        const user = await User.findById(winner.userId);

        if (!user) {
            console.error('User not found');
            return;
        }
        console.log("sending mail");
        // Implement logic to send email to the winning bidder
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'anshikachamoli2004@gmail.com',
                pass: 'ulot jvqp xdoo lqti'
            }
        });

        const mailOptions = {
            from: 'anshikachamoli2004@gmail.com',
            to: user.email,
            subject: 'Congratulations! You have won the bid',
            html: 
                `<p>Dear ${user.name},</p>
                <p>Congratulations! You have won the bid for the product "${product.name}".</p>
                <p>Please proceed with the payment as specified by the seller to complete the purchase.</p>
                <p>Best regards,<br/>Your Auction Platform</p>`
        };

        await transporter.sendMail(mailOptions);
        return;
    } catch (error) {
        console.error('Error sending email to winner:', error);
    }
};

setInterval(checkExpiredAuctions, 60000); 

  
module.exports = router;