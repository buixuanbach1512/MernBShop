const Coupon = require('../models/couponModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDbId');

const createCoupon = asyncHandler(async (req, res) => {
    try {
        const createCoup = await Coupon.create(req.body);
        res.json(createCoup);
    } catch (e) {
        throw new Error(e);
    }
});

const getAllCoupon = asyncHandler(async (req, res) => {
    const queryObj = { ...req.query };
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    try {
        const query = Coupon.find(JSON.parse(queryStr));
        const getAllCoup = await query;
        res.json(getAllCoup);
    } catch (e) {
        throw new Error(e);
    }
});

const getACoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getACoup = await Coupon.findById(id);
        res.json(getACoup);
    } catch (e) {
        throw new Error(e);
    }
});

const updateCoupon = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);
        const updateCoup = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateCoup);
    } catch (e) {
        throw new Error(e);
    }
});

const deleteCoupon = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);
        const deleteCoup = await Coupon.findByIdAndDelete(id);
        res.json({
            message: 'Delete Coupon Successfully!',
        });
    } catch (e) {
        throw new Error(e);
    }
});

const addCouponList = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { couponId } = req.body;
    validateMongoDbId(_id);
    try {
        const user = await User.findById(_id);
        const alreadyadded = user.coupon.find((id) => id.toString() === couponId);
        if (alreadyadded) {
            throw new Error('Đã nhận phiếu giảm giá này');
        } else {
            let user = await User.findByIdAndUpdate(
                _id,
                {
                    $push: { coupon: couponId },
                },
                {
                    new: true,
                },
            );
            res.json(user);
        }
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createCoupon, getAllCoupon, getACoupon, updateCoupon, deleteCoupon, addCouponList };
