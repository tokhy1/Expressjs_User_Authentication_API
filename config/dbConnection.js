const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('put your connection string here');
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDB;