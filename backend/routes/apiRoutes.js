const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// เส้นทางสำหรับ Register
router.post('/register', authController.register);

module.exports = router;
