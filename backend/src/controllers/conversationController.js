const Conversation = require('../models/conversationModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDbId');

const createConversation = asyncHandler(async (req, res) => {
    const { groupTitle, groupName, userId, sellerId } = req.body;
    try {
        const isConversationExist = await Conversation.findOne({ groupName });
        if (isConversationExist) {
            const conversation = isConversationExist;
            res.json(conversation);
        } else {
            const conversation = await Conversation.create({
                members: [userId, sellerId],
                groupTitle: groupTitle,
                groupName: groupName,
            });
            res.json(conversation);
        }
    } catch (e) {
        throw new Error(e);
    }
});

const getAllConversation = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const id = _id.toString();
        const conversations = await Conversation.find({
            members: {
                $in: [id],
            },
        }).sort({ createdAt: -1, updatedAt: -1 });
        res.json(conversations);
    } catch (e) {
        throw new Error(e);
    }
});

const updateLastMessage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { lastMessage, lastMessageId } = req.body;
    validateMongoDbId(id);
    try {
        const newConversation = await Conversation.findByIdAndUpdate(
            id,
            {
                lastMessage,
                lastMessageId,
            },
            { new: true },
        );
        res.json(newConversation);
    } catch (e) {
        throw new Error(e);
    }
});

const deleteConversation = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteConversation = await Conversation.findByIdAndDelete(id);
        res.json(deleteConversation);
    } catch (e) {
        throw new Error(e);
    }
});

module.exports = {
    createConversation,
    getAllConversation,
    updateLastMessage,
    deleteConversation,
};
