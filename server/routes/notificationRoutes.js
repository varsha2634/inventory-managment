const express = require("express");
const router = express.Router();
const { getNotifications } = require("../controllers/notificationController");
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../controllers/authController');


// Route: GET /api/notifications
router.use(authenticate);
router.get("/",authorizeRole(['Admin', 'Manager', 'Staff']), getNotifications);

module.exports = router;