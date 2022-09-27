const mongoose = require('mongoose');

const database = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB Connected.....'.blue);
    } catch (error) {
        console.log(error);
    }
};

module.exports = database;
