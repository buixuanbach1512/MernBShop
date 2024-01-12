const Permission = require('../models/permissionModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDbId');

const createPermission = asyncHandler(async (req, res) => {
    try {
        const createPer = await Permission.create(req.body);
        res.json(createPer);
    } catch (e) {
        throw new Error(e);
    }
});
const getAllPermission = asyncHandler(async (req, res) => {
    const queryObj = { ...req.query };
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    try {
        const query = Permission.find(JSON.parse(queryStr));
        const allPermission = await query;
        res.json(allPermission);
    } catch (e) {
        throw new Error(e);
    }
});
const getAPermission = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const aPermission = await Permission.findById(id);
        res.json(aPermission);
    } catch (e) {
        throw new Error(e);
    }
});
const updatePermission = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatePer = await Permission.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatePer);
    } catch (e) {
        throw new Error(e);
    }
});
const deletePermission = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletePer = await Permission.findByIdAndDelete(id);
        res.json({ message: 'Delete Permission Succesfully!' });
    } catch (e) {
        throw new Error(e);
    }
});

module.exports = { createPermission, getAllPermission, getAPermission, updatePermission, deletePermission };
