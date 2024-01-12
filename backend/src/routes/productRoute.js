const express = require('express');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const {
    createProduct,
    getAProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    addToWishlist,
    rating,
    updateQuantity,
    getProduct,
    getProductAllCate,
    deleteRating,
    compare,
} = require('../controllers/productController');
const router = express.Router();

router.get('/get-one', getProduct);
router.get('/get-product-cate/:id', getProductAllCate);
router.post('/', authMiddleware, isAdmin, createProduct);
router.get('/compare-product/:id', compare);
router.get('/:id', getAProduct);
router.put('/wishlist', authMiddleware, addToWishlist);
router.put('/rating', authMiddleware, rating);
router.put('/delete-rating/:id/:prodId', authMiddleware, deleteRating);
router.put('/update-quantity/:id', authMiddleware, isAdmin, updateQuantity);
router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);
router.get('/', getAllProduct);
module.exports = router;
