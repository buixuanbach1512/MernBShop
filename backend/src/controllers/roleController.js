const Role = require('../models/roleModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDbId');

const createRole = asyncHandler(async (req, res) => {
    try {
        const createRole = await Role.create(req.body);
        res.json(createRole);
    } catch (e) {
        throw new Error(e);
    }
});

const getAllRole = asyncHandler(async (req, res) => {
    try {
        const getAllRole = await Role.find().populate('permissions');
        res.json(getAllRole);
    } catch (e) {
        throw new Error(e);
    }
});

const getARole = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const aRole = await Role.findById(id);
        res.json(aRole);
    } catch (e) {
        throw new Error(e);
    }
});
const updateRole = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updateRole = await Role.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateRole);
    } catch (e) {
        throw new Error(e);
    }
});
const deleteRole = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteRole = await Role.findByIdAndDelete(id);
        res.json({ message: 'Delete Role Succesfully!' });
    } catch (e) {
        throw new Error(e);
    }
});

module.exports = {
    createRole,
    getAllRole,
    getARole,
    updateRole,
    deleteRole,
};
