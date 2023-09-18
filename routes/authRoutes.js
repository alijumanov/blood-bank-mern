const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { registerController, loginController, currentUserController } = require('../controllers/authController');

const router = express.Router();

// routes
// register route

router.post('/register', registerController);

// login route

router.post('/login', loginController);

// current user route

router.get('/current-user', authMiddleware, currentUserController);

module.exports = router;