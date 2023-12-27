const mongoose = require('mongoose');

const connectDB = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URI_ATLAS);
        console.log('DB Connected Successfully !!');
    } catch (e) {
        console.log('DB Error');
    }
};

module.exports = connectDB;
