const Size = require('../models/sizeModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDbId');

const createSize = asyncHandler(async (req, res) => {
    try {
        const createSize = await Size.create(req.body);
        res.json(createSize);
    } catch (e) {
        throw new Error(e);
    }
});
const getAllSize = asyncHandler(async (req, res) => {
    const queryObj = {...req.query}
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    try {
        const query = Size.find(JSON.parse(queryStr));
        const allSize = await query
        res.json(allSize);
    } catch (e) {
        throw new Error(e);
    }
});
const getASize = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const aSize = await Size.findById(id);
        res.json(aSize);
    } catch (e) {
        throw new Error(e);
    }
});
const updateSize = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updateSize = await Size.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateSize);
    } catch (e) {
        throw new Error(e);
    }
});
const deleteSize = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteSize = await Size.findByIdAndDelete(id);
        res.json({ message: 'Delete Size Succesfully!' });
    } catch (e) {
        throw new Error(e);
    }
});

module.exports = { createSize, getAllSize, getASize, updateSize, deleteSize };
