const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const {
    createConversation,
    getAllConversation,
    updateLastMessage,
    deleteConversation,
} = require('../controllers/conversationController');
const router = express.Router();

router.get('/', authMiddleware, getAllConversation);
router.post('/create-new-conversation', authMiddleware, createConversation);
router.put('/update-last-message/:id', authMiddleware, updateLastMessage);
router.delete('/delete-conversation/:id', authMiddleware, deleteConversation);

module.exports = router;
