const express = require('express');
const { addUser, editUser, deleteUser, getUsers } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../controllers/authController');

const router = express.Router();

// Routes for Admin
router.use(authenticate); // Authentication middleware

router.post('/', authorizeRole(['Admin']), addUser);
router.put('/:id', authorizeRole(['Admin']), editUser);
router.delete('/:id', authorizeRole(['Admin']), deleteUser);
router.get('/', authorizeRole(['Admin']), getUsers);

module.exports = router;
