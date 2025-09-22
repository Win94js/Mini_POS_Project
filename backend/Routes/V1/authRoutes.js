const express = require('express');
const router = express.Router();
const { adminAccountLogin } = require('../../Controllers/AccountController/authController');



router.post('/login',adminAccountLogin);


module.exports= router;
