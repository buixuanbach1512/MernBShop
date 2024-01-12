const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { createMessage, getAllMessageById } = require('../controllers/messageController');
const router = express.Router();

router.post('/create-new-message', authMiddleware, createMessage);
router.get('/get-message-by-id/:id', authMiddleware, getAllMessageById);

module.exports = router;
