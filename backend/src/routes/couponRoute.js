const express = require('express');
const {
    createCoupon,
    getAllCoupon,
    updateCoupon,
    deleteCoupon,
    getACoupon,
    addCouponList,
} = require('../controllers/couponController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createCoupon);
router.get('/', getAllCoupon);
router.put('/addCoupon', authMiddleware, addCouponList);
router.get('/:id', authMiddleware, isAdmin, getACoupon);
router.put('/:id', authMiddleware, isAdmin, updateCoupon);
router.delete('/:id', authMiddleware, isAdmin, deleteCoupon);

module.exports = router;
