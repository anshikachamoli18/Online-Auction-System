const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/onlineauctionsystem?directConnection=true&tls=false&readPreference=primary";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;
