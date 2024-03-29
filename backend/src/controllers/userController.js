const { generateToken } = require('../configs/jwtToken');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');
const Coupon = require('../models/couponModel');
const Order = require('../models/orderModel');
const Role = require('../models/roleModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDbId');
const sendEmail = require('./emailController');
const crypto = require('crypto');

const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, mobile, address } = req.body;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        const role = req.body.role;
        const isBlocked = req.body.isBlocked || false;
        let type = '';
        if (role) {
            type = 'admin';
        } else {
            type = 'user';
        }
        const newUser = await User.create({ name, email, password, mobile, address, type, role, isBlocked });
        res.json(newUser);
    } else {
        throw new Error('User Already Exists');
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email }).populate({ path: 'role', populate: { path: 'permissions' } });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        if (findUser.isBlocked === false) {
            res.json({
                _id: findUser?._id,
                name: findUser?.name,
                email: findUser?.email,
                address: findUser?.address,
                mobile: findUser?.mobile,
                token: generateToken(findUser?._id),
                type: findUser?.type,
                permissions: findUser?.role?.permissions,
            });
        } else {
            throw new Error('Tài khoản đã bị khóa!!!');
        }
    } else {
        throw new Error('Thông tin không hợp lệ');
    }
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findAdmin = await User.findOne({ email }).populate('role');
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
        if (findAdmin.type !== 'admin') throw new Error('Not Authorised');
        if (findAdmin.isBlocked === true) throw new Error('Tài khoản chưa được kích hoạt');
        res.json({
            _id: findAdmin?._id,
            name: findAdmin?.name,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?._id),
            permissions: findAdmin?.role?.permissions,
        });
    } else {
        throw new Error('Invalid Credentials');
    }
});

const getAllUser = asyncHandler(async (req, res) => {
    const queryObj = { ...req.query };
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    try {
        let query = User.find(JSON.parse(queryStr)).populate('role');
        const getAll = await query;
        res.json(getAll);
    } catch (e) {
        throw new Error(e);
    }
});

const getOneUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);
        const user = await User.findById({ _id: id });
        res.json(user);
    } catch (e) {
        throw new Error(e);
    }
});

const updateUser = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        validateMongoDbId(_id);
        const updateUser = await User.findByIdAndUpdate(
            { _id },
            {
                name: req?.body.name,
                email: req?.body.email,
                address: req?.body.address,
                mobile: req?.body.mobile,
            },
            {
                new: true,
            },
        );
        res.json(updateUser);
    } catch (e) {
        throw new Error(e);
    }
});

const updateUserById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);
        const updateUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updateUser);
    } catch (e) {
        throw new Error(e);
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);
        const deleteUser = await User.findByIdAndDelete({ _id: id });
        res.json(deleteUser);
    } catch (e) {
        throw new Error(JSON.stringify(e));
    }
});

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const block = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: true,
            },
            {
                new: true,
            },
        );
        res.json({
            message: 'User Blocked',
        });
    } catch (e) {
        throw new Error(e);
    }
});
const unBlockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const block = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: false,
            },
            {
                new: true,
            },
        );
        res.json({
            message: 'User Unblocked',
        });
    } catch (e) {
        throw new Error(e);
    }
});

const changePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password, newPassword } = req.body;
    validateMongoDbId(_id);
    const findUser = await User.findById(_id);
    if (findUser && (await findUser.isPasswordMatched(password))) {
        if (newPassword) {
            findUser.password = newPassword;
            const updatedPassword = await findUser.save();
            res.send('Đổi mật khẩu thành công');
        } else {
            throw new Error('Chưa nhập mật khẩu mới');
        }
    } else {
        throw new Error('Mật khẩu cũ chưa chính xác');
    }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) throw new Error('User not found with this email');
    try {
        const token = await findUser.createPasswordResetToken();
        await findUser.save();
        const resetURL = `Xin chào, Vui lòng nhấp vào liên kết này để đặt lại Mật khẩu của bạn. Liên kết này có hiệu lực đến 10 phút kể từ bây giờ. <a href='http://localhost:5174/reset-password/${token}'>Click Here</>`;
        const data = {
            to: email,
            text: 'Hey User',
            subject: 'Forgot Password Link',
            html: resetURL,
        };
        sendEmail(data);
        res.json(token);
    } catch (error) {
        throw new Error(error);
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
        passwordResetToken: hashToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error('Token Expired!');
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
});

const getWishList = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const findUser = await User.findById(_id).populate('wishlist');
        res.json(findUser);
    } catch (e) {
        throw new Error(e);
    }
});

const getCoupon = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const findUser = await User.findById(_id).populate('coupon');
        res.json(findUser);
    } catch (e) {
        throw new Error(e);
    }
});

const addToCart = asyncHandler(async (req, res) => {
    let { productId, size, color, quantity, stock } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        if (req.body.tags == 'Sản phẩm đặc biệt') {
            const price = req.body.salePrice;
            let newCart = await new Cart({
                userId: _id,
                prodId: productId,
                quantity,
                price,
                color,
                size,
                stock,
            }).save();
            res.json(newCart);
        } else {
            const price = req.body.price;
            let newCart = await new Cart({
                userId: _id,
                prodId: productId,
                quantity,
                price,
                color,
                stock,
                size,
            }).save();
            res.json(newCart);
        }
    } catch (e) {
        throw new Error(e);
    }
});

const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const getCart = await Cart.find({ userId: _id })
            .populate('userId')
            .populate('prodId')
            .populate('color')
            .populate('size');
        res.json(getCart);
    } catch (e) {
        throw new Error(e);
    }
});

const removeProdCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;
    validateMongoDbId(_id);
    try {
        const deleteProdCart = await Cart.deleteOne({ userId: _id, _id: id });
        res.json(deleteProdCart);
    } catch (e) {
        throw new Error(e);
    }
});

const updateQuantityCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { id, quantity } = req.params;
    validateMongoDbId(_id);
    try {
        const cartItem = await Cart.findOne({ userId: _id, _id: id });
        if (quantity > cartItem.stock) {
            throw new Error('Không đủ sản phẩm trong kho');
        } else {
            cartItem.quantity = quantity;
            cartItem.save();
            res.json(cartItem);
        }
    } catch (e) {
        throw new Error(e);
    }
});

const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const cart = await Cart.deleteMany({ userId: _id });
        res.json(cart);
    } catch (error) {
        throw new Error(error);
    }
});

const applyCoupon = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    const { coupon } = req.body;
    try {
        const validCoupon = await Coupon.findOne({ code: coupon });
        if (validCoupon === null) {
            throw new Error('Mã giảm giá không tồn tại');
        } else {
            const date = new Date().getTime();
            const dateExpiry = validCoupon.expiry.getTime();
            if (dateExpiry > date) {
                const user = await User.findById(_id);
                const cartUser = await Cart.find({ userId: user._id });
                let cartTotal = 0;
                for (let i = 0; i < cartUser.length; i++) {
                    cartTotal = cartTotal + cartUser[i].quantity * cartUser[i].price;
                }
                let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(0);
                res.json(totalAfterDiscount);
            } else {
                throw new Error('Mã giảm giá đã hết hạn');
            }
        }
    } catch (e) {
        throw new Error(e);
    }
});

const createOrder = asyncHandler(async (req, res) => {
    const { shippingInfo, orderItems, totalPrice, totalPriceAfterDiscount, payment, orderId } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const order = await Order.create({
            user: _id,
            shippingInfo,
            orderItems,
            totalPrice,
            totalPriceAfterDiscount,
            payment,
            orderId,
        });
        let userCart = await Cart.find({ userId: _id });
        let update = userCart.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item.prodId._id },
                    update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
                },
            };
        });
        const updated = await Product.bulkWrite(update, {});
        res.json(order);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllOrder = asyncHandler(async (req, res) => {
    const queryObj = { ...req.query };
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    try {
        const allOrder = await Order.find(JSON.parse(queryStr)).populate('user').populate('orderItems.product');
        res.json(allOrder);
    } catch (e) {
        throw new Error(e);
    }
});

const getOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const order = await Order.find({ user: _id })
            .populate('user')
            .populate('orderItems.product')
            .populate('orderItems.color');
        res.json(order);
    } catch (e) {
        throw new Error(e);
    }
});

const getOrderbyId = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const order = await Order.findById(id).populate('orderItems.product').populate('orderItems.color');
        res.json(order);
    } catch (e) {
        throw new Error(e);
    }
});

const updateOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    validateMongoDbId(id);
    try {
        const order = await Order.findByIdAndUpdate(
            id,
            {
                orderStatus: status,
            },
            {
                new: true,
            },
        );
        res.json(order);
    } catch (e) {
        throw new Error(e);
    }
});

const deleteOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        validateMongoDbId(id);
        const deleteOrder = await Order.findByIdAndDelete(id);
        res.json({
            message: 'Delete Order Successfully!',
        });
    } catch (e) {
        throw new Error(e);
    }
});

const getCountOrderByMonth = asyncHandler(async (req, res) => {
    let month = [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ];
    let d = new Date();
    let endDate = '';
    d.setDate(1);
    for (let i = 0; i < 11; i++) {
        d.setMonth(d.getMonth() - 1);
        endDate = month[d.getMonth()] + ' ' + d.getFullYear();
    }
    const data = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $lte: new Date(),
                    $gte: new Date(endDate),
                },
                orderStatus: 4,
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' },
                },
                count: { $sum: 1 },
                amount: { $sum: '$totalPriceAfterDiscount' },
            },
        },
        {
            $sort: {
                '_id.year': -1,
                '_id.month': -1,
            },
        },
    ]);
    res.json(data);
});

const getCountOrderByYear = asyncHandler(async (req, res) => {
    let month = [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ];
    let d = new Date();
    let endDate = '';
    d.setDate(1);
    for (let i = 0; i < 11; i++) {
        d.setMonth(d.getMonth() - 1);
        endDate = month[d.getMonth()] + ' ' + d.getFullYear();
    }
    const data = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $lte: new Date(),
                    $gte: new Date(endDate),
                },
                orderStatus: 4,
            },
        },
        {
            $group: {
                _id: {
                    compareDate: endDate,
                },
                count: { $sum: 1 },
                amount: { $sum: '$totalPriceAfterDiscount' },
            },
        },
    ]);
    res.json(data);
});

module.exports = {
    createUser,
    loginUser,
    loginAdmin,
    getAllUser,
    getOneUser,
    deleteUser,
    updateUser,
    updateUserById,
    blockUser,
    unBlockUser,
    changePassword,
    forgotPasswordToken,
    resetPassword,
    getWishList,
    getCoupon,
    addToCart,
    getUserCart,
    removeProdCart,
    updateQuantityCart,
    emptyCart,
    applyCoupon,
    createOrder,
    getAllOrder,
    getOrder,
    getOrderbyId,
    updateOrder,
    deleteOrder,
    getCountOrderByMonth,
    getCountOrderByYear,
};
