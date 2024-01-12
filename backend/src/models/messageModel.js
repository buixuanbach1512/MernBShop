const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation',
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        text: {
            type: String,
        },
        images: [
            {
                public_id: String,
                url: String,
            },
        ],
    },
    { timestamps: true },
);

//Export the model
module.exports = mongoose.model('Message', messageSchema);
