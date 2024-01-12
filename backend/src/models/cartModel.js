const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        prodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        quantity: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
        },
        price: {
            type: Number,
            required: true,
        },
        color: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Color',
        },
        size: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Size',
        },
    },
    {
        timestamps: true,
    },
);

//Export the model
module.exports = mongoose.model('Cart', cartSchema);
