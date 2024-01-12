const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const {
    createPermission,
    getAllPermission,
    updatePermission,
    deletePermission,
    getAPermission,
} = require('../controllers/permissionController');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createPermission);
router.get('/', getAllPermission);
router.get('/:id', authMiddleware, isAdmin, getAPermission);
router.put('/:id', authMiddleware, isAdmin, updatePermission);
router.delete('/:id', authMiddleware, isAdmin, deletePermission);

module.exports = router;
