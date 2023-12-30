const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { createRole, getAllRole, getARole, updateRole, deleteRole } = require('../controllers/roleController');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createRole);
router.get('/', getAllRole);
router.get('/:id', authMiddleware, isAdmin, getARole);
router.put('/:id', authMiddleware, isAdmin, updateRole);
router.delete('/:id', authMiddleware, isAdmin, deleteRole);

module.exports = router;
