const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            uppercase: true,
        },
        code: {
            type: String,
            minlength: 6,
            maxlength: 10,
        },
        expiry: {
            type: Date,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

couponSchema.pre('save', async function (next) {
    const randomInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    this.code = Math.random().toString(36).substr(2, randomInteger(6, 10));
    next();
});

//Export the model
module.exports = mongoose.model('Coupon', couponSchema);
