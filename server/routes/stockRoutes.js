const express = require('express');
const { recordTransaction } = require('../controllers/productController');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../controllers/authController');

const router = express.Router();

// Stock Management
router.use(authenticate);

router.post('/transaction', authorizeRole(['Manager', 'Staff']), recordTransaction); // Manager and Staff can record transactions

module.exports = router;
