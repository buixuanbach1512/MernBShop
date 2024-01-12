const Blog = require('../models/blogModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDbId');

const createBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const createBlog = await Blog.create({ ...req.body, postedBy: _id });
        res.json(createBlog);
    } catch (e) {
        throw new Error(e);
    }
});

const getAllBlog = asyncHandler(async (req, res) => {
    const queryObj = { ...req.query };
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    try {
        const getAllBlog = await Blog.find(JSON.parse(queryStr)).populate('postedBy');
        res.json(getAllBlog);
    } catch (e) {
        throw new Error(e);
    }
});

const getBlogById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getBlogById = await Blog.findById(id).populate('postedBy');
        res.json(getBlogById);
    } catch (e) {
        throw new Error(e);
    }
});

const updateBlog = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updateBlog);
    } catch (e) {
        throw new Error(e);
    }
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteBlog = await Blog.findByIdAndDelete(id);
        res.json({ message: 'Xóa thành công' });
    } catch (e) {
        throw new Error(e);
    }
});

module.exports = {
    createBlog,
    getAllBlog,
    getBlogById,
    updateBlog,
    deleteBlog,
};
