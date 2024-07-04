const mongoose = require('mongoose');
const { Schema } = mongoose;

const BidderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    bidAmount: { type: Number, required: true },
});

const ProductSchema = new Schema({
    name: { type: String, required: true },
    seller: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    startingbidprice: { type: Number, required: true },
    reserveprice: { type: Number, required: true },
    currentbidprice: { type: Number, required: true },
    durationInMinutes: { type: Number, required: true },
    paymentmethods: { type: String, required: true },
    condition: { type: String, required: true },
    image:{type:String,required:true},
    status: {
        type: String,
        enum: ['active', 'expired', 'completed'],
        default: 'active'
    },
    createdAt: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    bidders: [BidderSchema],
    winners: [{ type: Schema.Types.ObjectId, ref: 'user' }],
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;