const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var conversationSchema = new mongoose.Schema(
    {
        groupTitle: {
            type: String,
        },
        groupName: {
            type: String,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        lastMessage: {
            type: String,
        },
        lastMessageId: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

//Export the model
module.exports = mongoose.model('Conversation', conversationSchema);
