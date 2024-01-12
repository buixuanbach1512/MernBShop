const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        subTitle: {
            type: String,
            required: true,
        },
        images: [
            {
                public_id: String,
                url: String,
            },
        ],
        description: {
            type: String,
            required: true,
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);

//Export the model
module.exports = mongoose.model('Blog', blogSchema);
