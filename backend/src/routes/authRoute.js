const express = require('express');
const {
    createUser,
    loginUser,
    getAllUser,
    getOneUser,
    deleteUser,
    updateUser,
    blockUser,
    unBlockUser,
    changePassword,
    forgotPasswordToken,
    resetPassword,
    loginAdmin,
    getWishList,
    addToCart,
    getUserCart,
    createOrder,
    getOrder,
    getAllOrder,
    getOrderbyId,
    removeProdCart,
    updateQuantityCart,
    emptyCart,
    getCountOrderByMonth,
    getCountOrderByYear,
    updateOrder,
    applyCoupon,
    loginGoogle,
    getCoupon,
    deleteOrder,
    updateUserById,
} = require('../controllers/userController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// auth
router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/login-admin', loginAdmin);
router.post('/forgot-password-token', forgotPasswordToken);
router.put('/reset-password/:token', resetPassword);
router.put('/change-password', authMiddleware, changePassword);
router.post('/request', loginGoogle);

// cart
router.post('/add-to-cart', authMiddleware, addToCart);
router.get('/cart', authMiddleware, getUserCart);
router.put('/update-cart/:id/:quantity', authMiddleware, updateQuantityCart);
router.delete('/delete-cart/:id', authMiddleware, removeProdCart);
router.delete('/empty-cart', authMiddleware, emptyCart);
router.post('/cart/order', authMiddleware, createOrder);
router.post('/cart/applyCoupon', authMiddleware, applyCoupon);

// order
router.get('/all-order', authMiddleware, isAdmin, getAllOrder);
router.get('/order', authMiddleware, getOrder);
router.get('/order-by-month', authMiddleware, isAdmin, getCountOrderByMonth);
router.get('/order-by-year', authMiddleware, isAdmin, getCountOrderByYear);
router.post('/create-order', authMiddleware, createOrder);
router.get('/order/:id', authMiddleware, isAdmin, getOrderbyId);
router.put('/order/:id', authMiddleware, isAdmin, updateOrder);
router.delete('/order/:id', authMiddleware, isAdmin, deleteOrder);

// user
router.get('/all-users', getAllUser);
router.get('/wishlist', authMiddleware, getWishList);
router.get('/coupon', authMiddleware, getCoupon);
router.get('/get-user/:id', authMiddleware, getOneUser);
router.put('/edit-user', authMiddleware, updateUser);
router.put('/edit-user/:id', authMiddleware, updateUserById);
router.delete('/:id', deleteUser);

// block users
router.put('/unblock-user/:id', authMiddleware, isAdmin, unBlockUser);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);

module.exports = router;
