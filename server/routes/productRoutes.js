const express = require('express');
const { addProduct, editProduct, deleteProduct, searchProducts } = require('../controllers/productController');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../controllers/authController');

const router = express.Router();

// Product Management
router.use(authenticate);

router.post('/', authorizeRole(['Admin', 'Manager']), addProduct); // Admin and Manager can add products
router.put('/:id', authorizeRole(['Admin', 'Manager']), editProduct); // Admin and Manager can edit products
router.delete('/:id', authorizeRole(['Admin']), deleteProduct); // Only Admin can delete products
router.get('/', authorizeRole(['Admin', 'Manager', 'Staff']), searchProducts); // All roles can search products

module.exports = router;
