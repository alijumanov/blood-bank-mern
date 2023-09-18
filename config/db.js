const colors = require('colors');
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected To MongoDB Database ${mongoose.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log(`MongoDB Database Error ${error}`.bgRed.white);
    }
};

module.exports = connectDB;