const express = require('express');
const { addSupplier, editSupplier, deleteSupplier } = require('../controllers/supplierController');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../controllers/authController');

const router = express.Router();

// Supplier Management
router.use(authenticate);

router.post('/', authorizeRole(['Admin', 'Manager']), addSupplier); // Admin and Manager can add suppliers
router.put('/:id', authorizeRole(['Admin', 'Manager']), editSupplier); // Admin and Manager can edit suppliers
router.delete('/:id', authorizeRole(['Admin']), deleteSupplier); // Only Admin can delete suppliers

module.exports = router;
