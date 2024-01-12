const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { createBlog, getAllBlog, deleteBlog, updateBlog, getBlogById } = require('../controllers/blogController');

router.post('/', authMiddleware, isAdmin, createBlog);
router.get('/', getAllBlog);
router.get('/:id', getBlogById);
router.put('/:id', authMiddleware, isAdmin, updateBlog);
router.delete('/:id', authMiddleware, isAdmin, deleteBlog);

module.exports = router;
