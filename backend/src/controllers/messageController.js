const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDbId');

const createMessage = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const createMessage = new Message({
            conversationId: req.body.conversationId,
            sender: _id,
            text: req.body.text,
            images: req.body.images ? req.body.images : undefined,
        });
        await createMessage.save();
        res.json(createMessage);
    } catch (e) {
        throw new Error(e);
    }
});

const getAllMessageById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const allMessage = await Message.find({
            conversationId: id,
        });
        res.json(allMessage);
    } catch (e) {
        throw new Error(e);
    }
});

module.exports = {
    createMessage,
    getAllMessageById,
};
