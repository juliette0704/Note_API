const express = require('express');
const User = require('../models/user.model');
const { generateToken } = require('../services/authService');
const bcrypt = require('bcrypt');
const control = require('../controllers/userController')
const router = express.Router();

router.post('/login', control.findMe)
router.get('/users', control.getUsers)
router.post('/register', control.registerMe)
module.exports = router;
